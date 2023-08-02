module.exports = {
  handlers(self) {
    return {
      '@apostrophecms/page:beforeSend': {
        webpack(req) {
          req.data.isDev = (process.env.NODE_ENV !== 'production');
        }
      }
    };
  },
  helpers(self) {
    return {
      debugMode() {
        return process.env.DEBUG === 'true';
      }
    };
  }
};
