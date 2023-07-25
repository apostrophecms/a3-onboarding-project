module.exports = {
  fields: {
    add: {
      _featuredPost: {
        label: 'Featured Post',
        type: 'relationship',
        withType: 'review',
        max: 1,
        required: true
      }
    },
    group: {
      footer: {
        label: 'Footer',
        fields: [ '_featuredPost' ]
      }
    }
  }
};
