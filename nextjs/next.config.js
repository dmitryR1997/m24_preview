const webpack = require("webpack")
const path = require("path")

const withPlugins = require("next-compose-plugins")
const withImages = require("next-images")
const withSourceMaps = require("@zeit/next-source-maps")
const withCss = require("@zeit/next-css")
const withSass = require("@zeit/next-sass")

const nextConfig = {
  // htmlAttrs: { lang: "ru-Ru" },
  // trailingSlash: true,
  // poweredByHeader: false,
  // generateEtags: true,
  // compress: false,
  webpack (config, options) {
    // config.module.rules.push({
    //   test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
    //   use: {
    //     loader: "url-loader",
    //     options: {
    //       limit: 100000,
    //       esModule: true,
    //       name: "[name].[ext]"
    //     }
    //   }
    // })

    return config
  }
  // exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
  //   return {
  //     "/": { page: "/" },
  //   }
  // },
}

module.exports = withPlugins([
  [withCss],
  [
    withSass,
    {
      cssModules: false,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[hash:base64:6]",
      },
    },
  ],
  [withImages]
], nextConfig)
