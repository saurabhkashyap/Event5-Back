const express = require('express');
const passport = require('passport');
const EventService = require('../services/event');
const validationHandler = require('../utils/middleware/validationHandler');
const { createEventSchema } = require('../utils/schemas/event');
const adminValidationHandler = require('../utils/middleware/adminValidationHandler');
// JWT Strategy
require('../utils/auth/strategies/jwt');

function eventApi(app) {
  const router = express.Router();
  app.use('/api/event', router);

  const eventService = new EventService();

  router.post(
    '/new-event',
    passport.authenticate('jwt', { session: false }),
    adminValidationHandler(),
    validationHandler(createEventSchema),
    async function (req, res, next) {
      const { body: event } = req;

      // Add the current user_id to the event
      if (!event.user_id) {
        event.user_id = req.user.id;
      }

      try {
        // Store event in the DB and return it
        const createdEvent = await eventService.createEvent(event);
        // Response
        res.status(201).json({
          data: createdEvent,
          message: 'event created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  // Update event
  router.put(
    '/new-event',
    passport.authenticate('jwt', { session: false }),
    validationHandler(createEventSchema),
    async function (req, res, next) {
      const data = req.body;

      try {
        // Update event that have the same id
        const result = await eventService.updateEvent(data);

        // Response
        res.status(200).json({
          data: result,
          message: 'event updated successfully',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = eventApi;
