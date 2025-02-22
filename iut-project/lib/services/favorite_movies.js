'use strict';

const { Service } = require("@hapipal/schmervice");
const Boom = require('@hapi/boom');

module.exports = class FavoriteMoviesService extends Service {
    async addFavorite(userId, movieId) {
        const { FavoriteMovies } = this.server.models();
        const existingFavorite = await FavoriteMovies.query().findOne({ userId, movieId });

        if (existingFavorite) {
            throw Boom.conflict('Movie is already in favorites');
        }

        return FavoriteMovies.query().insertAndFetch({ userId, movieId });
    }

    async removeFavorite(userId, movieId) {
        const { FavoriteMovies } = this.server.models();
        const favorite = await FavoriteMovies.query().findOne({ userId, movieId });

        if (!favorite) {
            throw Boom.notFound('Movie is not in favorites');
        }

        return FavoriteMovies.query().deleteById(favorite.id);
    }
}