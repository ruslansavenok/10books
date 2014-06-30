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



Meteor.getUser = function (user) {
  user = findUserById(user) || Meteor.user();
  if (_.isUndefined(user)) return null;

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

Handlebars.registerHelper('userById', function (id) {
  return findUserById(id);
});

Handlebars.registerHelper('isUserSubscribedToBook', function (id) {
  return Books.findOne({
    subscribers: {
      $in: [id]
    }
  });
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
