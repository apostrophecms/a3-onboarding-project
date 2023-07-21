module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Ratings Widget',
  },
  fields: {
    add: {
      productQuality: {
        type: 'range',
        label: 'Product Quality',
        min: 1,
        max: 5,
        step: 1
      },
      productSafety: {
        type: 'range',
        label: 'Product Safety',
        min: 1,
        max: 5,
        step: 1
      },
      productValue: {
        type: 'range',
        label: 'Product Value',
        min: 1,
        max: 5,
        step: 1
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [ 'productQuality', 'productSafety', 'productValue' ]
      }
    }
  },
  components(self) {
    return {
      async stars(req, data) {
        // Performs any data manipulation of retrieval
        // before it is passed to the component template
        return {
          starsData: data.starsData
        };
      }
    };
  }
};
