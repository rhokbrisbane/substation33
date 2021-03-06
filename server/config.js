'use strict';

module.exports = {
  port:             process.env.PORT || 8081,
  environment:      process.env.ENVIRONMENT || 'development',
  emailGateway: {
    sendEmails:     process.env.ENVIRONMENT === 'production',
    sendgridApikey: process.env.SENDGRID_APIKEY,
    accountEmail:   process.env.ACCOUNT_EMAIL
  }
};
