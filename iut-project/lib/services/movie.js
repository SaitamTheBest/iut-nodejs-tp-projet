'use strict';

const { Service } = require("@hapipal/schmervice");
const Boom = require('@hapi/boom');

module.exports = class MovieService extends Service {
    createMovie(movie) {
        const { Movie } = this.server.models();
        return Movie.query().insertAndFetch(movie);
    }

    deleteMovie(id) {
        const { Movie } = this.server.models();
        return Movie.query().deleteById(id);
    }

    updateMovie(id, movie) {
        const { Movie } = this.server.models();
        return Movie.query().findById(id).patch(movie);
    }
}
