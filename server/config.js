Books = new Meteor.Collection('books')
Categories = new Meteor.Collection('categories')


Meteor.startup(function () {
	//process.env.MONGO_URL = "mongodb://localhost:27017/meteor"
	//Books.ensureIndex( { body: "text" },{ background:true } );

	Accounts.loginServiceConfiguration.remove({
  		service: "google"
	});

	Accounts.loginServiceConfiguration.insert({
		service: "google",
		clientId: "471584135384-574afafjms570m3v6t1sekijh1lptral.apps.googleusercontent.com",
		secret: "W9napBOnGFb9FcPz2Tud6fqE"
  });



	//Books._dropIndex('books_index');
/*
	Books._ensureIndex({
		name: "text",
		author: "text"
	}, {
		name: 'books_index'
	});*/



	/*
	if (!Books.find().count()) {
		Books.insert({
			name: "Python rulez!",
			author: "Anonymous",
			url: "http://www.amazon.com/",
			status: 'in_library',
			created_at: new Date().getTime(),
			subscribers: [],
			category: 'Business & Management'
		});
		Books.insert({
			name: "Javascript  unleashed!",
			author: "Anonymous",
			url: "http://www.amazon.com/",
			status: 'in_library',
			created_at: new Date().getTime(),
			subscribers: [],
			category: 'Business & Management'
		});
		Books.insert({
			name: "Nodejs secret",
			author: "Anonymous",
			url: "http://www.amazon.com/",
			status: 'in_library',
			created_at: new Date().getTime(),
			subscribers: [],
			category: 'Business & Management'
		});
		Books.insert({
			name: "Mastering CSS",
			author: "Anonymous",
			url: "http://www.amazon.com/",
			status: 'accepted',
			created_at: new Date().getTime(),
			subscribers: [],
			category: 'Business & Management'
		});
	}*/

});


/*
var send_email = function () {
	//var books =Books.find({take_date: new Date()-60000});
	books = [];
	var books = Books.find().fetch();
	console.log('books scanned '+books.length);
	var msg = "You borrowed book over one month ago, please give it back";
	books.forEach(function(book){
		Meteor.call('sendMail', book.taken_by, msg);
	});
}
var cron = new Meteor.Cron( {
	events:{
	"* * * * *"  : send_email,
	}
});*/
//
// turn it off cause autopublishing is on
//Meteor.publish('books', function () {
//  return Books.find();
//});
