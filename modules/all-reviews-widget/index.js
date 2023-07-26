module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'All Reviews Widget'
  },
  fields: {
    add: {
      _selectedReview: {
        type: 'relationship',
        label: 'Review to display',
        withType: 'review',
        required: true,
        max: 1,
        builders: {
          project: {
            title: 1,
            author: 1,
            _url: 1
          }
        },
        fields: {
          add: {
            recommender: {
              type: 'string',
              label: 'Recommender',
              required: true
            },
            recommendation: {
              type: 'string',
              label: 'Recommendation',
              required: true,
              textarea: true,
              max: 50
            }
          },
          group: {
            extras: {
              label: 'Extras',
              fields: [ 'recommender', 'recommendation' ]
            }
          }
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [ '_selectedReview' ]
      }
    }
  }
};
