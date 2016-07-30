AdminConfig = {}

// Fix User listing
// https://github.com/yogiben/meteor-admin/issues/293
Meteor.startup(function () {
  const emailCol = AdminTables.Users.options.columns[1]
  emailCol.render = function(value) {
    return value && value[0] ? value[0].address : 'no email';
  }
})
