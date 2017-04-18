Meteor.methods({
  sendMail: function (userId, subject, text) {
    const to = Meteor.users.findOne({_id: userId}).services.google.email;

    this.unblock();

    console.log('sending mail', to, userId, text);

    Email.send({
      to: to,
      from: 'olga.kondraciuk@10clouds.com',
      subject: subject,
      text: text
    });
  }
});

SyncedCron.add({
  name: 'Notify users, who should return book ASAP',
  schedule: function(parser) {
    return parser.text('at 9:00am')
  },
  job: function() {
    Books.find({
      status: 'taken'
    }).forEach(function (book) {
      const allowedTime = 1000 * 60 * 60 * 24 * 60 // 60 days

      if (book.taken_date < (new Date().getTime() - allowedTime)) {
        Meteor.call('sendMail',
          book.taken_by,
          '10Books: Please Return Book!',
          `
            Hey! You took ${book.name} ${moment(book.taken_date).endOf('day').fromNow()}.
            Please return it!
          `
        );
      }
    })
  }
})

SyncedCron.start()
