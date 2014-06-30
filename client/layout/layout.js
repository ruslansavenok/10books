Books = new Meteor.Collection('books');

Template.layout.events({
  'click .mrt-layout__logout': function (e) {
    e.preventDefault();

    Meteor.logout(function () {
      Router.go('home');
    });
  },


  'submit .mrt_categories-form': function (e) {
    e.preventDefault();

    var $form = $(e.target);
    var categoryName = $form.find('input[type=text]').val();
    var categoryParentId = $form.find('select').val();

    Categories.insert({
      name: categoryName,
      parent_id: categoryParentId
    });
  },


  'click .mrt__status-change': function (e) {
    e.preventDefault();

    var $target = $(e.target);
    var bookId = $target.data('book-id');
    var newStatus = $target.data('status-key');
    var book = Books.find({_id: bookId});

	var update_dict = {
		status : newStatus
	}
    if (newStatus == 'taken') {
		book.taken_by = Meteor.user()._id;
		book.taken_date = new Date().getTime();

		update_dict = _.extend(update_dict, {
			taken_by: book.taken_by,
			taken_date: book.taken_date
		});
    }
	//checking previous status
	if(book.status == 'taken' && newStatus != 'taken') {
		book.taken_by = null;
		book.taken_date = null;

		update_dict = _.extend(update_dict, {
			taken_by: book.taken_by,
			taken_date: book.taken_date
		});
	}


    Books.update(this._id, {$set: update_dict});
  },


  'click .mrt__nofify-me': function (e) {
    console.log('fuc');

    var $btn = $(e.target);
    var bookId = getBookIdFromParentRow(e.target);
    var book = Books.find({_id: bookId});
    var user = Meteor.getUser();
    var takenByUser = Meteor.getUser(book.taken_by);

    //var emailText = 'Book ' + book.name + ' was returned by ' + takenByUser.name + ' and now available';

    //Meteor.call('sendMail', user.email, '10Books: Book Available', emailText);
    Books.update({_id: bookId}, {
      $push: {subscribers: Meteor.user().id}
    });
  },

  'click .mrt__take-book': function (e) {
    var bookId = getBookIdFromParentRow(e.target);

    Books.update({_id: bookId}, {
      $set: {
        status: 'taken',
        taken_by: Meteor.getUser().id,
        taken_date: new Date().getTime()
      }
    });
  },
  'click .mrt__return-book': function (e) {
    var bookId = getBookIdFromParentRow(e.target);

    Books.update({_id: bookId}, {
      $set: {
        status: 'in_library',
        taken_by: null,
        taken_date: null
      }
    });
  },

  'submit .mrt__add-order-form': function (e) {
    e.preventDefault();

    var $form = $(e.target);
    var formData = $form.serializeObject();

    Books.insert({
      name: formData.title,
      author: formData.author,
      url: formData.url,
      requested_by: Meteor.user()._id,
      status: 'requested',
      created_at: new Date().getTime()
    });

    $('#add-order-modal').modal('hide');
  }
});

Template.layout.books = function(){
	return Books.find({}, {
    sort: {created_at: -1}
  });
}

function getBookIdFromParentRow(target) {
  return $(target).parents('.book-row').data('book-id');
}
