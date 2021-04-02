import Document, { Html, Head, Main, NextScript } from "next/document"

import DeferNextScript from "@utils/DeferNextScript"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head/>
        <body>
          <Main />
          <DeferNextScript/>
        </body>
      </Html>
    )
  }
}
