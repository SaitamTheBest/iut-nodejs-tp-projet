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

    async updateMovie(id, movie) {
        const { Movie } = this.server.models();
        const { User } = this.server.models();

        const oldMovie = await Movie.query().findById(id);
        await Movie.query().findById(id).patch(movie);
        const updatedMovie = await Movie.query().findById(id);

        const usersWithFavorite = await User.query()
            .join('favorite_movies', 'favorite_movies.userId', 'user.id')
            .where('favorite_movies.movieId', id);

        const mailService = new MailService();
        for (const user of usersWithFavorite) {
            await mailService.sendMovieUpdatedEmail(user.email, updatedMovie.title, oldMovie.title);
        }

        return updatedMovie;
    }

}
