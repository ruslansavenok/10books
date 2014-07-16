$(document).on('click', function (e) {
  var $target = $(e.target);
  var isTargetButton          = $target.is('.dropdown-toggle');
  var isTargetChildOfButton   = $target.parents('.dropdown-toggle').length;
  var isTargetDropdown        = $target.is('.dropdown-menu');
  var isTargetChildOfDropdown = $target.parents('.dropdown-menu').length;

  if (!isTargetButton && !isTargetChildOfButton && !isTargetDropdown && !isTargetChildOfDropdown) {
    $('.dropdown-menu').parent().removeClass('open');
  }
});

Template.layout.events({
  'click .mrt__vote': function (e) {
    var $btn = $(e.currentTarget);

    if ($btn.hasClass('active')) {
      return;
    }

    var $btns = $btn.parent().find('.mrt__vote');
    var currUser = Meteor.getUser();
    var newVote = $btn.data('vote');

    $btns.removeClass('active');
    $btn.addClass('active');

    var bookId = getBookIdFromParentRow(e.target);
    var prevVote = BookVotes.findOne({user_id: currUser.id, book_id: bookId});


    if (prevVote) {
      BookVotes.update({_id: prevVote._id}, {
        $set: {
          vote: newVote
        }
      });
    } else {
      BookVotes.insert({
        book_id: bookId,
        user_id: currUser.id,
        vote: newVote
      })
    }

    var bookAction;

    // DownVote
    if (newVote < 0) {
      bookAction = {
        upvotes: (prevVote && prevVote.vote > 0 ? -1 : 0),
        downvotes: -1
      }
    } else {
      bookAction = {
        upvotes: 1,
        downvotes: (prevVote && prevVote.vote < 0 ? 1 : 0)
      }
    }

    Books.update(bookId, {
      $inc: bookAction
    })
  },


  'click .mrt__filter-dropdown-toggle': function (e) {
    var $btn = $(e.target);
    var $dpd = $btn.next();

    $dpd.parent().toggleClass('open');
  },


  'change .mrt__filter-dropdown-form input': function (e) {
    var $form = $(e.target).parents('form');
    var filter = $form.serializeObject().filter;

    Session.set('status_filter', filter);
  },

  'change .categories-select': function (e) {
    var newCategory = $(e.target).val();
    var bookId = getBookIdFromParentRow(e.target);

    Books.update({_id: bookId}, {
      $set: {
        category: newCategory
      }
    });
  },


  'keyup .mrt__perform-search': function (e) {
    Session.set('query', $(e.target).val());
  },


  'click .mrt-layout__logout': function (e) {
    e.preventDefault();

    Meteor.logout(function () {
      Router.go('home');
    });
  },


  'click .mrt__remove-book': function (e) {
    e.preventDefault();

    if (!confirm('Are you sure?')) return;

    var id = getBookIdFromParentRow(e.target);

    Books.remove({_id: id});
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
      category: formData.category,
      requested_by: Meteor.user()._id,
      status: 'requested',
      created_at: new Date().getTime()
    });

    $('#add-order-modal').modal('hide');
    $form[0].reset();
  }
});





function getBookIdFromParentRow(target) {
  return $(target).parents('.book-row').data('book-id');
}


function notifySubscribers(bookId) {
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
