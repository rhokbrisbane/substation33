'use strict';

const config   = require('./config');
const sendgrid = require('sendgrid')(config.emailGateway.sendgridApikey);

module.exports = {
  // args.to who to send the email
  sendThankYouEmail: (args) => {
    if(!args.to) { throw "Argument Error: Missing 'to' argument" }
    if(!config.emailGateway.sendEmails) { return console.log(`[DEV] Email sent to: ${args.to}`) }

    let email = new sendgrid.Email();
    email.setFrom(config.emailGateway.accountEmail);
    email.setSubject('Thank You');
    email.setHtml(`Really, really thank you ${args.to}`);
    email.addTo(args.to);

    console.log('config.emailGateway.accountEmail', config.emailGateway.accountEmail);
    console.log('config.emailGateway.sendgridApikey', config.emailGateway.sendgridApikey);

    sendgrid.send(email);
    console.log('emailGateway#sendThankYouEmail - done');
  }
}
