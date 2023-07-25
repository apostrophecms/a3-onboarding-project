const { fullConfig } = require('../../lib/area');
module.exports = {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'Default Page'
  },
  fields: {
    add: {
      main: {
        type: 'area',
        options: {
          widgets: fullConfig
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [ 'main' ]
      }
    }
  }
};
