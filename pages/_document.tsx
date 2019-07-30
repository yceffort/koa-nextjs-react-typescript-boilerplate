import React from "react";
import Document, {
  Head,
  Main,
  NextScript,
  DocumentContext
} from "next/document";
import { ServerStyleSheet } from "styled-components";

interface Props {
  styleTags: any;
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps({ req, renderPage }: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const page = renderPage((App: any) => (props: any) =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();

    let userAgent = undefined;
    if (req && req.headers) userAgent = req.headers["user-agent"];

    // const initialProps = await Document.getInitialProps(context);
    return {
      ...page,
      styleTags,
      isPublic: !userAgent || !userAgent.match(/(iOS|Android)/i)
    };
  }

  render() {
    const {
      props: { styleTags }
    } = this;

    return (
      <html>
        <Head>
          {styleTags}
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta property="og:type" content="article" />
          <meta property="og:locale" content="ko_KR" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, minimum-scale=1, viewport-fit=cover"
          />
          <link
            rel="apple-touch-icon-precomposed"
            href="/icons/favicon-152x152.png"
          />
          <link rel="icon" href="/icons/favicon-152x152.png" />
          <meta name="msapplication-TileColor" content="#1CC0A6" />
          <link rel="manifest" href="/manifest.json" />

          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html:
                "body { margin: 0 !important; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); -webkit-touch-callout: none; }"
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
