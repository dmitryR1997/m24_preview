import Document, {Html, Head, Main, NextScript} from "next/document"
import getMobileDetect from "@utils/mobileDetect"

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    if(ctx.req && ctx.req.headers && ctx.req.headers["user-agent"]) {
      const detect = getMobileDetect(ctx.req.headers["user-agent"])

      if (detect.isDesktop() && process.env.NODE_ENV === "production") {
        let desktopUrl = false
        const path = ctx.asPath.split("/")

        if (path) {
          if (path[1] === "catalog" || path[1] === "vendors" || path[1] === "stati" || path[1] === "content") {
            desktopUrl = `https://massagery24.ru${ctx.asPath}`
          } else if (path[1] === "contacts") {
            desktopUrl = `https://massagery24.ru/content/contacts/`
          } else if (path[1] === "promotions") {
            desktopUrl = `https://massagery24.ru/actions/set/`
          } else if (path[1] === "") {
            desktopUrl = `https://massagery24.ru/`
          } else {
            desktopUrl = `https://massagery24.ru/`
          }
        }

        if (desktopUrl) {
          ctx.res.writeHead(301, {Location: desktopUrl}).end()
        }
      }
    }

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps
    }
  }

  render() {
    return (
      <Html lang="ru">
        <Head/>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}
