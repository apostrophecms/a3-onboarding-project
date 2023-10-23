module.exports = {
  fields: {
    add: {
      firstName: {
        type: 'string',
        label: 'First Name'
      },
      lastName: {
        type: 'string',
        label: 'Last Name'
      }
    },
    group: {
      account: {
        label: 'Account',
        fields: [
          'firstName',
          'lastName'
        ]
      },
      preferences: {
        label: 'Preferences',
        // The `adminLocales` option **must** be configured in the `@apostrophecms/i18n` module for this to be allowed
        subforms: [ 'adminLocale' ]
      }
    }
  }
};
