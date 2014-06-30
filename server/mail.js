var host = 'smtp.mandrillapp.com';
var port = '587';
var smtpUser = 'ruslan.savenok@gmail.com';
var smtpPass = 'Vpztihb0FPmaYNP7BQ8JHg';

Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://' + smtpUser + ':' + smtpPass + '@' + host + ':' + port + '/';
});

Meteor.methods({
  sendMail: function (userId, subject, text) {
    var to = Meteor.users.findOne({_id: userId}).services.google.email;

    this.unblock();

    console.log('sending to', to, userId, text);

    Email.send({
      to: to,
      from: '10Books-noreply@your-mamma-is-fat.com',
      subject: subject,
      text: text
    });
  }
});
