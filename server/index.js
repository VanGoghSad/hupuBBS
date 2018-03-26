const ZhihuImgCrawler = require('./zhihuImgCrawler')
const HupuCrawler = require('./hupuCrawler')
const Schedule = require('node-schedule')
const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const log = require('./utils/log')
const api = require('./api')
const restify = require('./utils/rest').restify

// new ZhihuImgCrawler().init({question_number: '314250946'})

const app = new koa()
let hupuCrawler = new HupuCrawler([{topic: 'pubg', pageSize: 1}, {topic: 'lol', pageSize: 1}])
// let rule = new Schedule.RecurrenceRule()
// //每20m同步一次数据
// rule.minute = [0, 20, 40]
// Schedule.scheduleJob(rule, () => {
//     hupuCrawler.init()
// })
hupuCrawler.init()

app.use(bodyParser())
//下面两个中间件必须按顺序执行，因为restify中对next()进行了异常处理
app.use(restify())
app.use(api.routes()).use(api.allowedMethods())

app.listen(3000)
log('app started at port 3000...')
