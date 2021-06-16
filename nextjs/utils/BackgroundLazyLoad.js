import React from "react"

class BackgroundLazyLoad extends React.Component {
  constructor(props) {
    super(props)

    this.bg = React.createRef()

    this.state = {
      src: null
    }
  }

  componentDidMount() {
    const imageSrc = this.props["data-image-src"]

    const imageLoader = new Image()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.rootBounds.height < entry.boundingClientRect.height ||
          entry.intersectionRatio === 1
        ) {
          imageLoader.src = imageSrc

          imageLoader.onload = () => {
            this.setState({ src: imageSrc })
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
    )

    if (this.bg.current) {
      observer.observe(this.bg.current)
    }
  }

  render() {
    const styles = this.props.style ? this.props.style : {}

    if(this.state.src) {
      styles.backgroundImage = `url(${this.state.src})`
    }

    return <div ref={this.bg} {...this.props} style={{ ...styles }} />
  }
}

export default BackgroundLazyLoad
