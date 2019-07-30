declare module "koa-proxies" {
  import { Middleware } from "koa";
  namespace koaProxies {}
  function koaProxies(name: string, options?: any): Middleware;
  export = koaProxies;
}
