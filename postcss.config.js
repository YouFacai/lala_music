module.exports = {
    css: {
      loaderOptions: {
        postcss: {
          plugins: [
            require("postcss-pxtorem")({
                  rootValue: 32,
                  unitPrecision: 5,
                  propList: ['*'],
                  selectorBlackList: [],
                  replace: true,
                  mediaQuery: false,
                  minPixelValue: 0,
                  exclude: /node_modules/i
            }),
          ]
        }
      }
    },
  } 
  