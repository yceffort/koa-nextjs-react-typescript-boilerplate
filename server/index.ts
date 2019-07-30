import next from "next";
import Koa from "koa";
import morgan from "koa-morgan";
import Router from "koa-router";
import mount from "koa-mount";
import proxy from "koa-proxies";
import bodyparser from "koa-body";

const port = parseInt(process.env.PORT || "8080", 10);
const dev = process.env.NODE_ENV !== "production";

function renderNext(nextApp: any, route: string) {
  return (ctx: Koa.Context) => {
    ctx.res.statusCode = 200;
    ctx.respond = false;

    nextApp.render(ctx.req, ctx.res, route, {
      ...((ctx.request && ctx.request.body) || {}),
      ...ctx.params,
      ...ctx.query
    });
  };
}

async function main() {
  const nextApp = next({ dev });
  const app = new Koa();
  const router = new Router();

  await nextApp.prepare();
  const handle = nextApp.getRequestHandler();

  router.get("/", renderNext(nextApp, "/"));

  app
    .use(morgan("combined"))
    .use(
      mount("/health", (ctx: Koa.Context) => {
        handle(ctx.req, ctx.res);
        ctx.status = 200;
      })
    )
    .use(
      proxy("/api", {
        target: process.env.API_URI_BASE,
        changeOrigin: true
      })
    )
    .use(bodyparser())
    .use(router.routes())
    .use(
      mount("/", (ctx: Koa.Context) => {
        handle(ctx.req, ctx.res);
        ctx.respond = false;
      })
    );

  app.listen(port);
}

main();

// app.prepare().then(() => {
//   createServer((req, res) => {
//     const parsedUrl = parse(req.url!, true);
//     const { pathname, query } = parsedUrl;

//     if (pathname === "/a") {
//       app.render(req, res, "/a", query);
//     } else if (pathname === "/b") {
//       app.render(req, res, "/b", query);
//     } else {
//       handle(req, res, parsedUrl);
//     }
//   }).listen(port);
// });
