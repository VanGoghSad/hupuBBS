//注册RESTful的数据接口
const APIError = require('./utils/rest').APIError
const db = require('./db')
const router = new require('koa-router')()
const log = require('./utils/log')

/**
 * 分类帖子
 */
router.post('/api/posts', async (ctx, next) => {
  await db.Post.find(
    {'sort': ctx.request.body.sort},
    null,
    {
      limit: ctx.request.body.pageSize,
      sort: '-lastReplyTime',
      skip: ctx.request.body.pageSize * (ctx.request.body.pageIndex - 1)
    }
  ).exec().then(
    (doc) => {
      ctx.rest(doc)
    },
    () => {
      throw new APIError('db:not_found', err)      
    }
  )
})

/**
 * 每日热贴
 */
router.post('/api/hot', async (ctx, next) => {
  await db.Post.find(
    null,
    null,
    {
      limit: ctx.request.body.pageSize,
      sort: '-light',
      skip: ctx.request.body.pageSize * (ctx.request.body.pageIndex - 1)
    }
  ).exec().then(
    (doc) => {
      ctx.rest(doc)
    },
    () => {
      throw new APIError('db:not_found', err)      
    }
  )
})

module.exports = router
