if (!Roles.getAllRoles().count()) {
  Roles.createRole('admin')
  Roles.createRole('editor')
}


if (!Categories.find().count()) {
  [
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
  ].forEach((category) => {
    Categories.insert({name: category })
  })
}


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
