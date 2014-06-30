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
    var status = $target.data('status-key');

    // var book = Book.find({_id: bookId})

    if (status == 'taken') {
      // book.taken_by = Meteor.user()._id
    }

    if (status == 'requested') {
      // if (!book.request_by) book.requested_by = Meteor.user()._id
    }

    // book.status = status
  },


  'click .mrt__nofify-me': function (e) {
    console.log('fuc');

    var $btn = $(e.target);
    var bookId = $btn.data('book-id');
    var user = Meteor.getUser();

    var emailText = 'Book {{ name }} was returned by {{ uname }} and now available';

    Meteor.call('sendMail', user.email, '10Books: Book Available', emailText);
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

