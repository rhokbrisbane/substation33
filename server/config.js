'use strict';

module.exports = {
  port:             8081,
  environment:      process.env.ENVIRONMENT || 'development',
  emailGateway: {
    sendEmails:     true, // process.env.ENVIRONMENT === 'production',
    sendgridApikey: process.env.SENDGRID_APIKEY,
    accountEmail:   process.env.ACCOUNT_EMAIL
  }
};
