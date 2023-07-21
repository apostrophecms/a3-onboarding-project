const { fields } = require('./lib/fields');

module.exports = {
  // extending a core module creates a new instance of that module type
  // with a new name, but all the same functions
  extend: '@apostrophecms/widget-type',
  icons: {
    'view-column-outline': 'ViewColumnOutline'
  },
  options: {
    label: 'Row Widget',
    icon: 'view-column-outline',
    previewIcon: 'view-column-outline'
  },
  fields: {
    add: fields
  },
  helpers(self) {
    return {
      layoutToColumns(layout) {
        const layoutMap = {
          1: [ 12 ],
          2: [ 6, 6 ],
          3: [ 4, 4, 4 ],
          4: [ 3, 3, 3, 3 ],
          '4-8': [ 4, 8 ],
          '8-4': [ 8, 4 ],
          '3-9': [ 3, 9 ],
          '9-3': [ 9, 3 ]
        };
        return layoutMap[layout] || [ 12 ];
      }
    };
  }
};
