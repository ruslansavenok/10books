Template.home.events({
  'click button#log-in': function () {
    Meteor.loginWithGoogle({
      requestPermissions: ['profile', 'email']
    }, function () {
      //var user = Meteor.getProfile();

      /*
      if (user.email.indexOf('10clouds.com') == -1) {
        Meteor.logout();
        alert('You Should Sign In With @10clouds.com account!');
      } else {
        Router.go('library');
      }*/
      Router.go('library');
    })
  }
});
