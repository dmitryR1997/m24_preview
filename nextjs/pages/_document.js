import Document, {Html, Head, Main, NextScript} from "next/document"
import getMobileDetect from "@utils/mobileDetect"

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    let desktopUrl = false
    let isDesktop = false

    if(ctx.req.headers["user-agent"]) {
      const detect = getMobileDetect(ctx.req.headers["user-agent"])

      if (detect.isDesktop()) {
        isDesktop = true
        const path = ctx.asPath.split("/")

        if (path[1] === "catalog" || path[1] === "vendors" || path[1] === "stati" || path[1] === "content") {
          desktopUrl = `https://massagery24.ru${ctx.asPath}`
        } else if (path[1] === "contacts") {
          desktopUrl = `https://massagery24.ru/content/contacts/`
        } else if (path[1] === "promotions") {
          desktopUrl = `https://massagery24.ru/actions/set/`
        } else if (path[1] === "") {
          desktopUrl = `https://massagery24.ru/`
        }

        if (desktopUrl) {
          // ctx.res.statusCode = 301
          // ctx.res.setHeader("Location", desktopUrl);
        }
      }
    }

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      url: desktopUrl,
      isDesktop: isDesktop
    }
  }

  render() {
    return (
      <Html lang="ru">
        <Head/>
        <body>
        {this.props.isDesktop &&
          <p>Desktop</p>
        }
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}
