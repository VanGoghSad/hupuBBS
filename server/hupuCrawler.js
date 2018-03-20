const cheerio = require("cheerio")
const fs = require("fs")
const request = require("request")
const async = require("async")
const superagent = require("superagent")
const {hupuConfig} = require("./config")
const db = require('./db')
const moment = require('moment')
const crypto = require('crypto')

class HupuCrawler {
  constructor(options) {
    this.options = options
  }

  async init() {
    this._log("爬取数据=>")
    for (let o of this.options) {
      let noAndPageSizes = await this._fetchData(o)
      noAndPageSizes.forEach(h => {
        this._fetchPostReply(h)
      })
    }  
    // this.options.forEach(o => this._fetchData(o))
  }

  /**
   * 根据url获取指定页数的页面html
   */
  async _fetchHtmlByUrl(topic, pageIndex) {
    const url = pageIndex === 1 ? `http://bbs.hupu.com/${topic}` : `http://bbs.hupu.com/${topic}-${pageIndex}`
    let result = ''
    await new Promise((resolve, reject) => {
      superagent.get(url).end((err, res) => {
        resolve()
        res && (result = res.text)
      })
    })
    this._log(`成功：解析页面=>当前页"${pageIndex}`)
    return result
  }

  /**
   * 根据homepage获取用户主页html
   */
  async _fetchHtmlByHomePage(homepage) {
    let result = ''
    await new Promise((resolve, reject) => {
      superagent.get(homepage).end((err, res) => {
        resolve()
        res && (result = res.text)
      })
    })
    this._log(`成功：解析页面=>用户主页${homepage}`)
    return result
  }

  /**
   * 根据no获取帖子详情html
   */
  async _fetchHtmlByNo(no, pageIndex) {
    const url = pageIndex === 1 ? `http://bbs.hupu.com/${no}.html` : `http://bbs.hupu.com/${no}-${pageIndex}.html`
    let result = ''
    await new Promise((resolve, reject) => {
      superagent.get(url).end((err, res) => {
        resolve()
        res && (result = res.text)
      })
    })
    //this._log(`成功：解析页面=>帖子详情${no}`)
    return result
  }

  /**
   * 爬取数据存入数据库
   */
  async _fetchData({topic, pageSize}) {
    let noAndPageSizes = []
    let loop = async (pageIndex = 1) => {
      if (pageIndex > pageSize) {
        return this._log('执行完成')
      }
      let result = await this._fetchHtmlByUrl(topic, pageIndex)
      const $ = cheerio.load(result)
      $('.titlelink').each((index, item) => {
        const [reply, view] = $(item).next().next().text().split('/')
        let href = $(item).children('.truetit').attr('href')
        let light = $(item).children('.light_r').children('a').attr('title')
        const post = {
          no: href.substring(1, href.length - 5),
          title: $(item).children('.truetit').text(),
          author: $(item).next().children('.aulink').text(),
          replyCount: parseInt(reply),
          viewCount: parseInt(view),
          createDate: $(item).next().children('a[style="color:#808080;cursor: initial; "]').text(),
          homePage: $(item).next().children('.aulink').attr('href'),
          avatar: this._generateAvatarHash($(item).children('.truetit').text()),
          lastReplyer: $(item).next().next().next().children('.endauthor').text(),
          lastReplyTime: moment($(item).next().next().next().children('a').text(), 'hh:mm').utc().toDate(),
          sort: topic,
          light: light === undefined ? 0 : parseInt(light.substring(1, 3)),
          pageSize: parseInt(parseInt(reply) / 20) + 1
        }
        noAndPageSizes.push({
          no: post.no,
          pageSize: post.pageSize
        })
        //插入数据库, no唯一属性, 存在时更新, 不存在新建
        db.Post.update({no: post.no}, post, {upsert: true}, (err, doc) => {
          if (err) {
            return this._log(err)
          }
        })
      })
      return loop(++pageIndex)
    }
    await loop()
    return noAndPageSizes
  }

  /**
   * 根据帖子no爬取回复
   */
  async _fetchPostReply({no, pageSize}) {
    let detail = {
      no: no,
      content: null,
      replies: null
    }
    let replies = []
    let loop = async (pageIndex = 1) => {
      if (pageIndex > pageSize) {
        return this._log(`no.${no}回复爬取完成`)
      }
      let result = await this._fetchHtmlByNo(no, pageIndex)
      const $ = cheerio.load(result)
      if (pageIndex === 1) {
        detail.content = $('.quote-content').html()
      }
      $('.floor-show').each((index, item) => {
        if (pageIndex === 1 && index === 0) {
          //楼主
          return true
        } else {
          //回帖
          let reply = {
            replier: $(item).children('.user').children('.j_u').attr('uname'),
            replyTime: $(item).children('.floor_box').children('.author').children('.left').children('.stime').text(),
            lights: $(item).children('.floor_box').children('.author').children('.left').children('.f444').children('.ilike_icon_list').children('.stime').text(),
            to: $(item).children('.floor_box').children('table').children('tbody').children('tr').children('td').children('blockquote').children('p').children('b').children('a').text(),
            content: $(item).children('.floor_box').children('table').children('tbody').children('tr').children('td').html()  
          }
          replies.push(reply)
        }
      })
      return loop(++pageIndex)
    }
    await loop()
    detail.replies = JSON.stringify(replies)
    db.Detail.update({no: detail.no}, detail, {upsert: true}, (err, doc) => {
      if (err) {
        return this._log(err)
      }
    })
  }

  /**
   * 爬取用户头像url
   */
  async _fetchUserAvatarUrl({no, url}) {
    let result = await this._fetchHtmlByHomePage(url)
    const $ = cheerio.load(result)
    const avatar = $('#j_head').attr('src')
    db.Post.update({no: no}, {avatar: avatar}, {upsert: true}, (err, doc) => {
      if (err) {
        return this._log(err)
      }
    })
  }

  /**
   * 根据帖子标题计算hash用于生成头像
   */
  _generateAvatarHash(title) {
    const hash = crypto.createHash('md5')
    hash.update(title)
    return hash.digest('hex')
  }

  /**
   * 爬去今日步行街热贴
   */
  async _fetchDayilyHotPost() {

  }



  /**
   * 日志打印
   * */
  _log(log_str, params) {
    params
      ? console.log(log_str, ...params)
      : console.log(log_str + "  " + new Date().toLocaleString())
  }


}

module.exports = HupuCrawler
