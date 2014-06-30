Template.layout.events({
  'click .mrt-layout__logout': function () {
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
  }
});
