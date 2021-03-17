module.exports = {
  env: {}, // add your env variables https://nextjs.org/docs/api-reference/next.config.js/environment-variables
  generateEtags: true,
  useFileSystemPublicRoutes: false,
  webpack: (config) => {
    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()

      if (
        entries['main.js'] &&
        !entries['main.js'].includes('./src/utils/polyfills.js')
      ) {
        entries['main.js'].unshift('./src/utils/polyfills.js')
      }

      return entries
    }

    return config
  },
}
