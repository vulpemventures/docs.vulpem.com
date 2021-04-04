module.exports = function (context, options) {
  // ...
  return {
    name: 'custom-webpack-config',
    configureWebpack(config, isServer, utils) {
      return {
        target: "web",
        node: {
          fs: 'empty',
        }
      };
    },
  };
};

