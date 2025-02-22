'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/favorites/{movieId}',
        options: {
            auth: {
                scope: ['user']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    movieId: Joi.number().integer().required().description('ID of the movie to add to favorites')
                })
            }
        },
        handler: async (request, h) => {
            const { favoriteMoviesService } = request.services();
            const { id: userId } = request.auth.credentials;
            const { movieId } = request.params;

            try {
                const favorite = await favoriteMoviesService.addFavorite(userId, movieId);
                return h.response(favorite).code(201);
            } catch (error) {
                console.error('Erreur dans POST /favorites:', error);
                return h.response({ error: error.message }).code(error.output?.statusCode || 500);
            }
        }
    },
    {
        method: 'delete',
        path: '/favorites/{movieId}',
        options: {
            auth: {
                scope: ['user']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    movieId: Joi.number().integer().required().description('ID of the movie to remove from favorites')
                })
            }
        },
        handler: async (request, h) => {
            const { favoriteMoviesService } = request.services();
            const { id: userId } = request.auth.credentials;
            const { movieId } = request.params;

            try {
                await favoriteMoviesService.removeFavorite(userId, movieId);
                return h.response().code(204);
            } catch (error) {
                console.error('Erreur dans DELETE /favorites:', error);
                return h.response({ error: error.message }).code(error.output?.statusCode || 500);
            }
        }
    }
];