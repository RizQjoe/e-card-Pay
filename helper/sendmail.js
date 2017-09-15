var nodemailer = require('nodemailer');

function sendmail(name, email, purpose, text, cb) {
  var smtpTransport = nodemailer.createTransport({
    host: "mail.smtp2go.com",
    port: 25, 
    secure: false,
    auth: {
      user: "warungcardpay",
      pass: "Y3cxdjhsNTU0enYw"
    }
  });
    
  smtpTransport.sendMail({
    from: "shopkeeper@warung-card-pay.heroku.com",
    to: email,
    subject: purpose,
    text: text  
  }, () => cb());
}

module.exports = sendmail;