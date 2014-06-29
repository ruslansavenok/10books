Template.layout.events({
  'click .mrt-layout__logout': function () {
    Meteor.logout(function () {
      Router.go('home');
    });
  }
});
