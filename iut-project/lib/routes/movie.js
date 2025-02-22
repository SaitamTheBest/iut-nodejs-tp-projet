'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/movie',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    title: Joi.string().required().example('The Matrix').description('Title of the movie'),
                    description: Joi.string().required().example('A movie about a computer hacker').description('Description of the movie'),
                    publishedAt: Joi.date().required().example('1999-03-31').description('Release date of the movie'),
                    producer: Joi.string().required().example('Lana Wachowski').description('Director of the movie')
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();

            return await movieService.createMovie(request.payload);
        }
    },
    {
        method: 'patch',
        path: '/movie/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('Id of the movie')
                }),
                payload: Joi.object({
                    title: Joi.string().example('The Matrix').description('Title of the movie'),
                    description: Joi.string().example('A movie about a computer hacker').description('Description of the movie'),
                    publishedAt: Joi.date().example('1999-03-31').description('Release date of the movie'),
                    producer: Joi.string().example('Lana Wachowski').description('Director of the movie')
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();

            return await movieService.updateMovie(request.params.id, request.payload);
        }
    },
    {
        method: 'delete',
        path: '/movie/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('Id of the movie')
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();

            return await movieService.deleteMovie(request.params.id);
        }
    }
];