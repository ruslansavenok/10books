Books = new Meteor.Collection('books');
Categories = new Meteor.Collection('categories');


Handlebars.registerHelper('currUser', function () {
  var user = Meteor.user();
  if (!user) return null;

  return {
    name: user.profile.name,
    email: user.services.google.email,
    image: user.services.google.picture
  }
});

/*
function recurseTree(tree, newKey, newId) {
    if(_isEmpty(tree)) {
        tree[newKey] = {_id: newId};
        return;
    }

    var child = null; // find current tree's child
    for(var key in tree) {
        if (key != '_id') {
            child = tree[key]; // found a child
            break;
        }
    }
    if (child) { // recursively process on child
        recurseTree(child, newKey, newId);
    } else { // no child, so just fill the tree
        tree[newKey] = {_id: newId};
    }
}*/
/*
Handlebars.registerHelper('categories', function () {
  var categories = Categories.find();


  function build(parentId, array) {
    array = array || [];

    _.each(categories, function (category) {
      if (category.parent_id == parentId) {
        array.push(category);
        category.children = category.children || [];
        build(category._id, category.children);
      }
    });

    return array;
  }

  return build(-1, categories);
});

Handlebars.registerHelper('times', function (n, block) {
  var accum = '';
  for(var i = 0; i < n; ++i) {
    accum += block.fn(i);
  }
  return accum;
});
*/
