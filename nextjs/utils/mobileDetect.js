const getMobileDetect = (userAgent) => {
  const nav = typeof navigator === 'undefined'

  const isSSR = () => Boolean(nav)

  const isAndroid = () => Boolean(userAgent.match(/Android/i))
  const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i))
  const isOpera = () => Boolean(userAgent.match(/Opera Mini/i))
  const isWindows = () => Boolean(userAgent.match(/IEMobile/i))
  const isMobile = () => Boolean(isAndroid() || isIos() || isOpera() || isWindows())
  const isDesktop = () => Boolean(!isMobile())

  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSSR,
  }
}


export default getMobileDetect
