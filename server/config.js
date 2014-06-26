Meteor.startup(function () {

	Accounts.loginServiceConfiguration.remove({
  		service: "google"
	});

	Accounts.loginServiceConfiguration.insert({
		service: "google",
		clientId: "471584135384-574afafjms570m3v6t1sekijh1lptral.apps.googleusercontent.com",
		secret: "W9napBOnGFb9FcPz2Tud6fqE"
  	});
});
