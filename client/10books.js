Books = new Meteor.Collection("books");
Categories = new Meteor.Collection('categories');



BookStatuses = [
  {
    key: 'taken',
    caption: 'Taken'
  },
  {
    key: 'in_library',
    caption: 'In Library'
  },
  {
    key: 'requested',
    caption: 'In Orders'
  },
  {
    key: 'accepted',
    caption: 'Accepted'
  },
  {
    key: 'ordered',
    caption: 'Ordered'
  },
  {
    key: 'rejected',
    caption: 'Rejected'
  },
  {
    key: 'lost',
    caption: 'Lost'
  }
];


Categories = [
  'Design & UX',
  'Computer Security',
  'Business & Management',
  'Software Developement',
  'Web Developement',
  'Mobile Developement',
  'Databases',
  'Computer Graphics'
];


Meteor.filterBooks = function (statusesArray) {
  var query = Session.get('query');
  var filter = {};

  if (statusesArray) {
    filter.status = {$in: statusesArray}
  }

  console.log(filter)

  var books = Books.find(filter, {
    sort: {created_at: -1}
  });

  if (query && query != "") {
    var filtered = [];

    books.forEach(function (book) {
      if (book.name.toLowerCase().indexOf(query) != -1 ||
          book.author.toLowerCase().indexOf(query) != -1) {
        filtered.push(book);
      }
    });

    return filtered;
  } else {
    return books;
  }
}


Meteor.getUser = function (user) {
  if (!user) {
    user = Meteor.user();
  } else {
    user = findUserById(user);
  }

  if (_.isUndefined(user) || !user) return null;

  return {
    id: user._id,
    name: user.profile.name,
    email: user.services.google.email,
    image: user.services.google.picture,
    isAdmin: (_.indexOf(['ruslan.savenok@10clouds.com','grzegorz.slusarek@10clouds.com'], user.services.google.email) != -1)
  }
}

function findUserById(id) {
  return Meteor.users.findOne({_id: id});
}


Handlebars.registerHelper('currUser', function () {
  return Meteor.getUser();
});


Handlebars.registerHelper('bookStatuses', function () {
  return BookStatuses;
})


Handlebars.registerHelper('categories', function (active) {
  return Categories;
});


Handlebars.registerHelper('currentBookStatus', function(key){
	for (var i =0; i< BookStatuses.length; i++) {
		if (BookStatuses[i].key === key) {
			return BookStatuses[i].caption;
		}
	}
	return null;
});


Handlebars.registerHelper('compareStatuses', function(key1, key2){
	if (key1 === key2)
		return true;
	else
		return false;
});

Meteor.startup(function () {
  Handlebars.registerHelper('canRemove', function(bookId) {
    var book = Books.find({_id: bookId}).fetch()[0];
    var currUser = Meteor.getUser();

    if (!currUser || !book) return false;


    return Meteor.user()._id == book.requested_by && book.status == 'requested';
  });
});



Handlebars.registerHelper('userById', function (id) {
  return Meteor.getUser(id);
});


Handlebars.registerHelper('isUserSubscribedToBook', function (bookId, id) {
  return Books.findOne({
    _id: bookId,
    subscribers: {
      $in: [id]
    }
  });
});


Handlebars.registerHelper('option', function (name, active, options) {
  var str = '<option value="' + name + '"'+ (name == active ? ' selected' : '') + '>' + name + '</option>';

  return new Handlebars.SafeString(str);
});
