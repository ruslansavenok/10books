var host = 'smtp.mandrillapp.com';
var port = '587';
var smtpUser = 'ruslan.savenok@gmail.com';
var smtpPass = 'Vpztihb0FPmaYNP7BQ8JHg';

Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://' + smtpUser + ':' + smtpPass + '@' + host + ':' + port + '/';
});

Meteor.methods({
  sendMail: function (to, subject, text) {
    this.unblock();

    Email.send({
      to: to,
      from: 'no-reply@your-mamma-is-fat.com',
      subject: subject,
      text: text
    });
  }
});
