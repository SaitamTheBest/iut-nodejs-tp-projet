'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class FavoriteMovies extends Model {

    static get tableName() {
        return 'favorite_movies';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            userId: Joi.number().integer().greater(0).required(),
            movieId: Joi.number().integer().greater(0).required(),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }
};