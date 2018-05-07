module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      const webpackConfig = config;
      webpackConfig.output.publicPath = `${process.cwd()}/dist/`;
    }
  },
};
