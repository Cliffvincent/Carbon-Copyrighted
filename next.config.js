const bundleAnalyzer = require('@next/bundle-analyzer')
const withOffline = require('next-pwa')

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

module.exports = 
  withBundleAnalyzer(withOffline({
    output: 'export',
    pwa: {
      disable: process.env.NODE_ENV !== 'production',
      dest: 'public',
      register: false,
      skipWaiting: false,
    },
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.js$/,
        include: /node_modules\/graphql-language-service-parser/,
        use: [options.defaultLoaders.babel],
      })
      config.plugins.push(
        new options.webpack.IgnorePlugin({
          resourceRegExp: /\.html$/,
          contextRegExp: /node_modules/,
        })
      )
      config.plugins.push(
        new options.webpack.IgnorePlugin({
          resourceRegExp: /\.css$/,
          contextRegExp: /node_modules\/codemirror\/mode/,
        })
      )

      return config
    },
    rewrites() {
      return [{ source: '/api/image', destination: '/api/image/index' }]
    },
    redirects() {
      return [
        {
          source: '/privacy',
          destination:
            'https://carbon-app.notion.site/PRIVACY-POLICY-65f08f57a8a14f91931d778f9a471a7d',
          permanent: false,
        },
        {
          source: '/terms',
          destination:
            'https://carbon-app.notion.site/TERMS-OF-USE-d159661077fe4ef2974e6108b36aeece',
          permanent: false,
        },
        {
          source: '/offsets',
          destination:
            'https://www.wren.co/join/carbon?utm_campaign=share&utm_medium=profile_referral_link',
          permanent: false,
        },
      ]
    },
    // async headers() {
    //   return [
    //     {
    //       source: "/:file*",
    //       headers: [
    //         { key: "Access-Control-Allow-Origin", value: "*" },
    //       ]
    //     }
    //   ]
    // },
  }))
