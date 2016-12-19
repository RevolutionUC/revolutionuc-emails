# revolutionuc-email

[![MIT License](https://img.shields.io/github/license/revolutionuc/revolutionuc-email.svg?maxAge=2592000)]()
[![Dependencies Status](https://david-dm.org/revolutionuc/revolutionuc-email/status.svg)](https://david-dm.org/revolutionuc/revolutionuc-email)
[![Dependencies Status](https://david-dm.org/revolutionuc/revolutionuc-email/dev-status.svg)](https://david-dm.org/revolutionuc/revolutionuc-email?type=dev)

> Transactional and marketing email templates and builder for RevolutionUC

This module creates rich emails with inline css for better email client support.

## api

The api allows the creation of transactional emails (ex. Mailgun).

```javascript
const Email = require('revolutionuc-email')

const email = new Email()
email.build(templateData)
```

### Marketing emails

The email builder allows templates to be built for marketing purposes (ex. MailChimp).
