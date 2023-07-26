module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Review',
    pluralLabel: 'Reviews',
    i18n: {
      browser: true
    }
  },
  fields: {
    add: {
      author: {
        type: 'string',
        label: 'Author',
        required: true
      },
      featuredImage: {
        type: 'area',
        label: 'Featured Image',
        max: 1,
        options: {
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      content: {
        type: 'area',
        label: 'Content',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
            '@apostrophecms/image': {},
            ratings: {}
          }
        }
      },
      category: {
        type: 'select',
        label: 'Category',
        required: true,
        choices: [
          {
            label: 'Vehicle',
            value: 'vehicle'
          },
          {
            label: 'Home & Garden',
            value: 'home-garden'
          },
          {
            label: 'Appliances',
            value: 'appliances'
          },
          {
            label: 'Electronics',
            value: 'electronics'
          },
          {
            label: 'Toys',
            value: 'toys'
          }
        ]
      },
      isFeatured: {
        type: 'boolean',
        label: 'Featured',
        def: false
      }
    },
    group: {
      content: {
        label: 'Content',
        fields: [ 'author', 'featuredImage', 'content' ]
      },
      meta: {
        label: 'Meta',
        fields: [ 'category', 'isFeatured' ]
      }
    }
  },
  components(self) {
    return {
      async latestReview(req, data) {
        const post = await self
          .find(req)
          .sort({ createdAt: -1 })
          .limit(1)
          .toObject();
        return { post };
      }
    };
  }
};
