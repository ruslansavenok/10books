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
  }
});
