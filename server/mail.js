var host = 'smtp.mandrillapp.com';
var port = '587';
var smtpUser = 'ruslan.savenok@gmail.com';
var smtpPass = 'Vpztihb0FPmaYNP7BQ8JHg';



Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://' + smtpUser + ':' + smtpPass + '@' + host + ':' + port + '/';

  new Meteor.Cron({
    events:{
      '0 11 * * *': function () {
        Books.find({
          status: 'taken'
        }).forEach(function (book) {
          var allowedTime = 1000 * 60 * 60 * 24 * 30; // 30 days

          if (book.taken_date < (new Date().getTime() - allowedTime)) {
            var emailText = 'Hey! You took "' + book.name + '" ' + moment(book.taken_date).endOf('day').fromNow() + '. Please return it!';
            Meteor.call('sendMail', book.taken_by, '10Books: Please Return Book!', emailText);
          }
        });
      }
    }
  });
});


Meteor.methods({
  sendMail: function (userId, subject, text) {
    var to = Meteor.users.findOne({_id: userId}).services.google.email;

    this.unblock();

    console.log('sending mail', to, userId, text);

    Email.send({
      to: to,
      from: '10books@10clouds.com',
      subject: subject,
      text: text
    });
  }
});
