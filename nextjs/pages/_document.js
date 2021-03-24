import Document, { Html, Head, Main } from "next/document";

import DeferNextScript from "@utils/DeferNextScript"

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head/>
        <body>
          <Main />
          <DeferNextScript/>
        </body>
      </Html>
    )
  }
}
