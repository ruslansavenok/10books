Handlebars.registerHelper('currUser', function () {
  var user = Meteor.user();
  if (!user) return null;

  return {
    name: user.profile.name,
    email: user.services.google.email,
    image: user.services.google.picture
  }
});
