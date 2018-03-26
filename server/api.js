//注册RESTful的数据接口
const APIError = require('./utils/rest').APIError
const db = require('./db')
const router = new require('koa-router')()
const log = require('./utils/log')

/**
 * 分类帖子
 */
router.get('/api/posts', async (ctx, next) => {
  await db.Post.find(
    {'sort': ctx.query.sort},
    null,
    {
      limit: ctx.query.pageSize,
      sort: '-lastReplyTime',
      skip: ctx.query.pageSize * (ctx.query.pageIndex - 1)
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
router.get('/api/hot/:mySort', async (ctx, next) => {
  await db.Post.find(
    {'sort': ctx.params.mySort},
    null,
    {
      limit: ctx.query.pageSize,
      sort: '-light',
      skip: ctx.query.pageSize * (ctx.query.pageIndex - 1)
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

router.get('/api/hot', async (ctx, next) => {
  await db.Post.find(
    null,
    null,
    {
      limit: ctx.query.pageSize,
      sort: '-light',
      skip: ctx.query.pageSize * (ctx.query.pageIndex - 1)
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
 * findone
 */
router.get('/api/posts/:no', async (ctx, next) => {
  await db.Post.findOne({'no': ctx.params.no}).exec().then(
    (doc) => {
      ctx.rest(doc)
    },
    () => {
      throw new APIError('db:not_found', err)      
    }
  )
})

/**
 * detail
 */
router.get('/api/detail/:no', async (ctx, next) => {
  await db.Detail.findOne({'no': ctx.params.no}).exec().then(
    (doc) => {
      ctx.rest(doc)
    },
    () => {
      throw new APIError('db:not_found', err)      
    }
  )
})

module.exports = router
