Template.home.events({
  'click button#log-in': () => {
    Meteor.loginWithGoogle({}, (error) => {
      if (error) {
        alert(error.message);
      } else {
        Router.go('library');
      }
    })
  }
})
