'use strict';

const Joi = require('joi');
const MessageBrokerService = require('../services/message_broker_service');

module.exports = [
    {
        method: 'get',
        path: '/export',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                query: Joi.object({
                    email: Joi.string().email().required(),
                })
            },
        },
        async handler(request, h) {
            const { email } = request.query;

            const { User } = request.server.models();
            const user = await User.query().findOne({ email });
            if (!user) {
                return h.response({ error: 'Email not found' }).code(404);
            }

            const { Movie } = request.server.models();
            const movies = await Movie.query();

            const message = {
                email: email,
                movies: movies,
            };

            const messageBrokerService = new MessageBrokerService();
            await messageBrokerService.publishMessage('generate_csv', message);

            return h.response().code(202);
        }
    },
];