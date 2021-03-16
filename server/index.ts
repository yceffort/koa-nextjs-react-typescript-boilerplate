import Koa from 'koa'
import qs from 'koa-qs'
import bodyparser from 'koa-body'
import morgan from 'koa-morgan'
import mount from 'koa-mount'
import proxy from 'koa-proxies'
import Router from 'koa-router'
import next from 'next'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const API_URI_BASE = process.env.API_URI_BASE || ''

async function main() {
  const nextApp = next({ dev })
  const app = qs(new Koa(), 'extended')
  const router = new Router()

  await nextApp.prepare()

  const handle = nextApp.getRequestHandler()

  function renderNext(route: string) {
    return (ctx: Koa.Context) => {
      ctx.res.statusCode = 200
      ctx.respond = false

      nextApp.render(ctx.req, ctx.res, route, { ...ctx.prarams, ...ctx.query })
    }
  }

  // /
  router.get('/', renderNext('/'))

  // /hello
  router.get('/hello', renderNext('/hello'))

  app
    .use(morgan('combined'))
    .use(
      mount('/health', (ctx: Koa.Context) => {
        ctx.status = 200
      }),
    )
    .use(
      proxy('/api', {
        target: API_URI_BASE,
        changeOrigin: true,
      }),
    )
    .use(bodyparser())
    .use(router.routes())
    .use(
      mount('/', (ctx: Koa.Context) => {
        ctx.respond = false
        handle(ctx.req, ctx.res)
      }),
    )

  app.listen(port)
}

main()
