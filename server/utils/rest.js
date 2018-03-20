//统一设置数据api请求
module.exports = {
  APIError(code, msg) {
    this.code = code || 'internal:unknown_error'
    this.msg = msg || ''
  },
  restify(pathPrefix = '/api/') {
    return async (ctx, next) => {
      if (ctx.request.path.startsWith(pathPrefix)) {
        ctx.rest = (data) => {
          ctx.response.type = 'application/json'
          ctx.response.body = data
        }
        try {
          await next()
        } catch(e) {
          ctx.response.status = 400
          ctx.response.type = 'application/json'
          ctx.response.body = {
            code: e.code || 'internal: unknown_error',
            msg: e.msg || '',
          }
        }
      } else {
        await next()
      }
    }
  }
}
