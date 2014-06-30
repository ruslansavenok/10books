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

    var bookId = getBookIdFromParentRow(e.target);
    var newStatus = $(e.target).data('status-key');
    var updateDict = {status: newStatus};
    var currUser = Meteor.getUser();

    if (newStatus != 'taken') {
      notifySubscribers(bookId);

      // should run if already null
      _.extend(updateDict, {
        taken_by: null,
        taken_date: null
      });
    } else {
      _.extend(updateDict, {
        taken_by: currUser.id,
        taken_date: new Date().getTime()
      });
    }

    Books.update({_id: bookId}, {
      $set: updateDict
    });
  },


  'click .mrt__nofify-me': function (e) {
    var bookId = getBookIdFromParentRow(e.target);

    Books.update({_id: bookId}, {
      $push: {subscribers: Meteor.user()._id}
    });
  },

  'click .mrt__unnofify-me': function (e) {
    var bookId = getBookIdFromParentRow(e.target);

    Books.update({_id: bookId}, {
      $pull: {subscribers: Meteor.user()._id}
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

    notifySubscribers(bookId);

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

function notifySubscribers(bookId) {
  console.log('notify niggas');

  var book = Books.findOne({_id: bookId});
  var takenByUser = Meteor.getUser(book.taken_by);
  var emailText = 'Book "' + book.name + '" was returned by ' + takenByUser.name + ' and now available';

  _.each(book.subscribers, function (userId) {
    console.log('sending email to - ', userId);
    Meteor.call('sendMail', userId, '10Books: Book Available', emailText);
  });

  Books.update({_id: bookId}, {
    $set: {subscribers: []}
  });
}
