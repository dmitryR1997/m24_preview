const webpack = require("webpack")
const path = require("path")

const withPlugins = require("next-compose-plugins")
const withImages = require("next-images")
const withSourceMaps = require("@zeit/next-source-maps")
const withCss = require("@zeit/next-css")
const withSass = require("@zeit/next-sass")

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

const nextConfig = {
  htmlAttrs: { lang: "ru-Ru" },
  trailingSlash: true,
  // poweredByHeader: false,
  generateEtags: true,
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
  },
  // exportPathMap: async function(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
  //   return {
  //     "/catalog/massazhery/massazher_dlya_shei": {
  //         page: "/catalog/massazhery"
  //     }
  //   }
  // }

  async rewrites() {
    return [
      {
        source: "/catalog/massazhery/massazher_dlya_shei/",
        destination: "/catalog/massazhery-massazher_dlya_shei/",
      },
      {
        source: "/catalog/massazhnye_nakidki/medisana/",
        destination: "/catalog/massazhnye_nakidki-medisana/",
      },
      {
        source: "/catalog/massazhnye_kresla_dlya_doma/casada/spot_massage_type/",
        destination: "/catalog/massazhnye_kresla_dlya_doma-casada-spot_massage_type/",
      },
      {
        source: "/catalog/massazhnye_podushki/massazhnye-podushki-dlya-shei-i-plech/",
        destination: "/catalog/massazhnye_podushki-massazhnye-podushki-dlya-shei-i-plech/",
      },
      {
        source: "/catalog/massazhnye_kovriki/dlya-spiny/",
        destination: "/catalog/massazhnye_kovriki-dlya-spiny/",
      },
      {
        source: "/catalog/massazhnye_nakidki/na-avtomobilnoe-kreslo/",
        destination: "/catalog/massazhnye_nakidki-na-avtomobilnoe-kreslo/",
      },
      {
        source: "/catalog/massazhnye_stoly/tables_type/",
        destination: "/catalog/massazhnye_stoly-tables_type/",
      },
      {
        source: "/catalog/massazhery_dlya_nog/oto/",
        destination: "/catalog/massazhery_dlya_nog-oto/",
      },
      {
        source: "/catalog/massazhery/massazhery-dlya-spiny-i-shei/",
        destination: "/catalog/massazhery-massazhery-dlya-spiny-i-shei/",
      },
      {
        source: "/catalog/massazhery/massazhery-dlya-spiny/",
        destination: "/catalog/massazhery-massazhery-dlya-spiny/",
      },
      {
        source: "/catalog/massazhnye_podushki/auto_type/",
        destination: "/catalog/massazhnye_podushki-auto_type/",
      },
      {
        source: "/catalog/massazhnye_kovriki/casada/",
        destination: "/catalog/massazhnye_kovriki-casada/",
      },
      {
        source: "/catalog/massazhnye_stoly/stacionarnye/",
        destination: "/catalog/massazhnye_stoly-stacionarnye/",
      },
      {
        source: "/catalog/massazhery/mekhanicheskie",
        destination: "/catalog/massazhery-mekhanicheskie",
      },
      {
        source: "/catalog/massazhery_dlya_nog/casada/",
        destination: "/catalog/massazhery_dlya_nog-casada/",
      },
      {
        source: "/catalog/massazhery/vibration_massage_type/",
        destination: "/catalog/massazhery-vibration_massage_type/",
      },
      {
        source: "/catalog/massazhery_dlya_nog/germaniya/",
        destination: "/catalog/massazhery_dlya_nog-germaniya/",
      },
    ]
  },
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
  [withImages],
  // [withBundleAnalyzer]
], nextConfig)
