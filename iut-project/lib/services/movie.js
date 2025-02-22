'use strict';

const { Service } = require("@hapipal/schmervice");
const MailService = require("./mail_service");

module.exports = class MovieService extends Service {
    async createMovie(movie) {
        const { Movie } = this.server.models();
        const newMovie = await Movie.query().insertAndFetch(movie);

        const { User } = this.server.models();
        const users = await User.query();

        const mailService = new MailService();
        for (const user of users) {
            await mailService.sendAddNewMovieEmail(user.email, newMovie.title);
        }

        return newMovie;
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
