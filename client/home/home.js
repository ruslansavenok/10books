

Template.home.events({
	'click button#log-out': function () {
		console.log('log out');
		Meteor.logout();
	},
	'click button#log-in': function () {
		Meteor.loginWithGoogle({
			requestPermissions: ['profile', 'email']
		}, function () {
			var user = Template.home.getUserProfile();

			if (user.email.indexOf('10clouds.com') == -1) {
				Meteor.logout();
				alert('You Should Sign In With @10clouds.com account!');
			}
		})
	}
});


Template.home.getUserProfile = function () {
	var user = Meteor.user();
	if (!user) return;

	return {
		name: user.profile.name,
		email: user.services.google.email,
		image: user.services.google.picture
	}
}