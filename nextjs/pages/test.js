import {withUserAgent} from 'next-useragent'
import React from 'react'

class SecondPage extends React.Component {

  static async getInitialProps(ctx) {
    return {useragent: ctx.ua.source, isServer: !!ctx.req}
  }

  render() {
    const {ua} = this.props

    return (
      <>
        {ua.isDesktop &&
        <p>Desktop</p>
        }
      </>
    )
  }
}

export default withUserAgent(SecondPage)
