module.exports = {
  options: {
    seoGoogleAnalytics: true,
    seoGoogleTagManager: true,
    seoGoogleVerification: true
  },
  fields: {
    add: {
      // Adding our array field, `primaryNav`
      primaryNav: {
        label: 'Primary site navigation',
        type: 'array',
        titleField: 'label',
        help: 'Add, remove, and reorder navigation items.',
        // The array schema for each item
        fields: {
          add: {
            label: {
              label: 'Nav item label',
              type: 'string'
            },
            type: {
              label: 'Link type',
              type: 'select',
              choices: [
                {
                  label: 'Page',
                  value: 'page'
                },
                {
                  label: 'Custom URL',
                  value: 'custom'
                }
              ]
            },
            _page: {
              label: 'Page to link',
              type: 'relationship',
              withType: '@apostrophecms/page',
              max: 1,
              required: true,
              builders: {
                project: {
                  title: 1,
                  _url: 1
                }
              },
              // Only if it's a page link
              if: {
                type: 'page'
              }
            },
            customUrl: {
              label: 'URL for custom link',
              type: 'url',
              required: true,
              // Only if it's a custom link
              if: {
                type: 'custom'
              }
            },
            // A nice option to have the link open in a new tab
            // Could use a boolean here
            target: {
              label: 'Will the link open a new browser tab?',
              type: 'checkboxes',
              choices: [
                {
                  label: 'Open in new tab',
                  value: '_blank'
                }
              ]
            }
          }
        }
      },
      quickLinks: {
        label: 'Quick links',
        type: 'array',
        titleField: 'label',
        help: 'Add, remove, and reorder navigation items.',
        // The array schema for each item
        fields: {
          add: {
            label: {
              label: 'Nav item label',
              type: 'string'
            },
            type: {
              label: 'Link type',
              type: 'select',
              choices: [
                {
                  label: 'Page',
                  value: 'page'
                },
                {
                  label: 'Custom URL',
                  value: 'custom'
                }
              ]
            },
            _page: {
              label: 'Page to link',
              type: 'relationship',
              withType: '@apostrophecms/page',
              max: 1,
              required: true,
              builders: {
                project: {
                  title: 1,
                  _url: 1
                }
              },
              // Only if it's a page link
              if: {
                type: 'page'
              }
            },
            customUrl: {
              label: 'URL for custom link',
              type: 'url',
              required: true,
              // Only if it's a custom link
              if: {
                type: 'custom'
              }
            },
            // A nice option to have the link open in a new tab
            target: {
              label: 'Will the link open a new browser tab?',
              type: 'checkboxes',
              choices: [
                {
                  label: 'Open in new tab',
                  value: '_blank'
                }
              ]
            }
          }
        }
      },
      socialLinks: {
        label: 'Social Links',
        type: 'array',
        titleField: 'label',
        fields: {
          add: {
            label: {
              label: 'Social Media Name',
              type: 'string',
              required: true
            },
            url: {
              label: 'Account URL',
              type: 'url',
              required: true
            },
            icon: {
              label: 'Icon',
              type: 'select',
              choices: [
                {
                  label: 'Facebook',
                  value: 'fab fa-facebook'
                },
                {
                  label: 'Twitter',
                  value: 'fab fa-twitter'
                },
                {
                  label: 'Instagram',
                  value: 'fab fa-instagram'
                },
                {
                  label: 'YouTube',
                  value: 'fab fa-youtube'
                },
                {
                  label: 'Pinterest',
                  value: 'fab fa-pinterest'
                },
                {
                  label: 'LinkedIn',
                  value: 'fab fa-linkedin'
                },
                {
                  label: 'RSS',
                  value: 'fas fa-rss'
                }
              ],
              required: true,
              def: 'fa-brands fa-facebook'
            }
          }
        }
      },
      _featuredPost: {
        label: 'Featured Post',
        type: 'relationship',
        withType: 'review',
        max: 1,
        required: true
      }
    },
    group: {
      navigation: {
        label: 'Navigation',
        fields: [ 'primaryNav' ]
      },
      footer: {
        label: 'Footer',
        fields: ['_featuredPost', 'quickLinks', 'socialLinks']
      }
    }
  }
};
