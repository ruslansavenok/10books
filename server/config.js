Books = new Meteor.Collection('books')
Categories = new Meteor.Collection('categories')


Meteor.startup(function () {

	Accounts.loginServiceConfiguration.remove({
  		service: "google"
	});

	Accounts.loginServiceConfiguration.insert({
		service: "google",
		clientId: "471584135384-574afafjms570m3v6t1sekijh1lptral.apps.googleusercontent.com",
		secret: "W9napBOnGFb9FcPz2Tud6fqE"
  });


	Books.remove({});

	Books.insert({
		name: "Python rulez!",
		author: "Anonymous",
		url: "http://www.amazon.com/",
		status: 'in_library',
		created_at: new Date().getTime()
	});
	Books.insert({
		name: "Javascript  unleashed!",
		author: "Anonymous",
		url: "http://www.amazon.com/",
		status: 'in_library',
		created_at: new Date().getTime()
	});
	Books.insert({
		name: "Nodejs secret",
		author: "Anonymous",
		url: "http://www.amazon.com/",
		status: 'in_library',
		created_at: new Date().getTime()
	});
	Books.insert({
		name: "Mastering CSS",
		author: "Anonymous",
		url: "http://www.amazon.com/",
		status: 'in_library',
		created_at: new Date().getTime()
	});
});
//
// turn it off cause autopublishing is on
//Meteor.publish('books', function () {
//  return Books.find();
//});
