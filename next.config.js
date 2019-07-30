const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  generateEtags: true,
  webpack: config => {
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          safari10: true
        }
      })
    ];

    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (
        entries["main.js"] &&
        !entries["main.js"].includes("./src/utils/polyfills.js")
      ) {
        entries["main.js"].unshift("./src/utils/polyfills.js");
      }

      return entries;
    };

    return config;
  }
};
