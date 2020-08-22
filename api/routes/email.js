const express = require('express');
const EmailService = require('../services/email');
const validationHandler = require('../utils/middleware/validationHandler');
const { createEmailSchema } = require('../utils/schemas/email');

function emailApi(app) {
  const router = express.Router();
  app.use('/api/email', router);

  const emailService = new EmailService();

  router.post('/', validationHandler(createEmailSchema), async function (
    req,
    res,
    next
  ) {
    const { body: email } = req;

    try {
      // Send email
      const emailSended = await emailService.sendEmail(email);
      // Response
      res.status(201).json({
        data: emailSended,
        message: 'email send',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = emailApi;
