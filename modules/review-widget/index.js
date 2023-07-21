module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Review Widget',
  },
  fields: {
    add: {
      displaySingle: {
        type: 'boolean',
        label: 'Display single review or list?',
        required: true,
        def: true,
        toggle: {
          true: 'Display single review',
          false: 'Display list of reviews'
        }
      },
      includeImage: {
        type: 'boolean',
        label: 'Include Image?',
        def: false,
        toggle: {
          true: 'Add image to review card',
          false: 'Show card without image'
        },
        if: {
          displaySingle: true
        }
      },
      imagePosition: {
        type: 'radio',
        label: 'Image Position',
        def: 'left',
        choices: [
          {
            label: 'Left',
            value: 'left'
          },
          {
            label: 'Right',
            value: 'right'
          }
        ],
        if: {
          includeImage: true
        }
      },
      _review: {
        type: 'relationship',
        withType: 'review',
        required: true,
        if: {
          displaySingle: true
        }
      },
      category: {
        type: 'select',
        label: 'Category',
        required: true,
        def: 'all',
        choices: [
          {
            label: 'All',
            value: 'all'
          },
          {
            label: 'vehicle',
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
        ],
        if: {
          displaySingle: false
        }
      },
      time: {
        type: 'select',
        label: 'Type',
        choices: [
          {
            label: 'Latest',
            value: 'latest'
          },
          {
            label: 'Featured',
            value: 'featured'
          }
        ],
        if: {
          displaySingle: false
        }
      },
      number: {
        type: 'integer',
        label: 'Number of Reviews',
        min: 1,
        max: 10,
        if: {
          displaySingle: false
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [ 'displaySingle' ]
      },
      single: {
        label: 'Single Review',
        fields: [ '_review', 'includeImage', 'imagePosition' ]
      },
      list: {
        label: 'List of Reviews',
        fields: [ 'category', 'time', 'number' ]
      }
    }
  },
  components(self) {
    return {
      async returnReviews(req, data) {
        const criteria = (data.category === 'all') ? {} : { category: data.category };
        if (data.time === 'featured') {
          criteria.isFeatured = true;
        }
        const limit = data.number;
        /* Because we are not in the `review` module, we need to use `self.apos.modules.review` to access that module. To search the same module, we would use `self.find()`. We only need the 'title', '_url', and 'category' so we are limiting the returned data with `project({})`.
        */
        const reviews = await self.apos.modules.review.find(req, criteria)
          .project({
            title: 1,
            _url: 1,
            category: 1
          })
          .sort({ createdAt: -1 })
          .limit(limit)
          .toArray();
        return {
          reviews: reviews
        };
      }
    };
  }
};