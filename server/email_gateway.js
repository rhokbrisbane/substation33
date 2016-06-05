'use strict';

const config   = require('./config');
const sendgrid = require('sendgrid')(config.emailGateway.sendgridApikey);

module.exports = {
  // args.to who to send the email
  // args.templateName
  sendThankYouEmail: (args) => {
    if(!args.to) { throw "Argument Error: Missing 'to' argument" }
    //if(!config.emailGateway.sendEmails) { return console.log(`[DEV] Email sent to: ${args.to}`) }

    let templateIds = {
      default: "65e49ee3-bf0c-4e6f-a3bb-1f987b40a6a1"
    };
    let templateId = templateIds[args.templateNanme];;
    let email = new sendgrid.Email();
    email.setFrom(config.emailGateway.accountEmail);
    email.setSubject('Thank You');
    email.setHtml(`Really, really thank you ${args.to}`);
    email.addTo(args.to);
    email.setFilters({"templates": {"settings": {"enabled": 1, "template_id": templateId}}});
    // cardEmail.addSubstitution('-greeting-', "Happy Friday!"); // You don't need to have a subsitution, but if you want it, here's how you do that :)


    sendgrid.send(email);
    console.log('emailGateway#sendThankYouEmail - done');
  }
}
