Books = new Meteor.Collection("books");
BookVotes = new Meteor.Collection("book_votes");
Categories = new Meteor.Collection('categories');

Session.set('query', null); // this should be setted per page
Session.set('status_filter', null);

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
  'Web Developement',
  'Mobile Developement',
  'Programming & Software Developement',
  'Computer Security',
  'Databases',
  'Operating systems',
  'Design & UX',
  'Computer Graphics',
  'Business & Management',
  'Recruitment'
];


Meteor.filterBooks = function (statusesArray) {
  var query = Session.get('query');
  var filter = {};

  if (statusesArray) {
    filter.status = {$in: statusesArray}
  }

  var books = Books.find(filter, {
    sort: {created_at: -1}
  });

  if (query && query != "") {
    var filtered = [];

    books.forEach(function (book) {
      if (book.name.toLowerCase().indexOf(query) != -1 ||
          book.author.toLowerCase().indexOf(query) != -1 ||
          (book.category && book.category.toLowerCase().indexOf(query) != -1)) {
        filtered.push(book);
      }
    });

    if (filtered.length) return filtered;
  } else {
    if (books.count()) return books;
  }
}

function findUserById(id) {
  return Meteor.users.findOne({_id: id});
}


Handlebars.registerHelper('currUser', function () {
  return Meteor.user();
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

    if (!Meteor.userId() || !book) return false;


    return Meteor.userId() == book.requested_by && book.status == 'requested';
  });
});



Handlebars.registerHelper('userById', function (id) {
  return Meteor.users.find({_id: id});
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


Handlebars.registerHelper('userVote', function (bookId) {
  var voteObj = BookVotes.findOne({user_id: Meteor.userId(), book_id: bookId});

  if (!voteObj) {
    return {
      vote: 0
    }
  } else {
    return {
      vote: voteObj.vote
    }
  }
});
