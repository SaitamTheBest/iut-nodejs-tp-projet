'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');
const MailService = require('./mail_service');

module.exports = class UserService extends Service {

    async create(user) {
        const { User } = this.server.models();
        const newUser = await User.query().insertAndFetch(user);

        // Send welcome email
        const mailService = new MailService();
        await mailService.sendWelcomeEmail(newUser.email, newUser.firstName);

        return newUser;
    }

    findAll() {
        const { User } = this.server.models();
        return User.query();
    }

    delete(id) {
        const { User } = this.server.models();
        return User.query().deleteById(id);
    }

    update(id, user) {
        const { User } = this.server.models();
        return User.query().findById(id).patch(user);
    }

    async login(email, password) {
        const { User } = this.server.models();
        const user = await User.query().findOne({ email, password });

        if (!user) {
            throw Boom.unauthorized('Invalid credentials');
        }

        return Jwt.token.generate(
            {
                aud: 'urn:audience:iut',
                iss: 'urn:issuer:iut',
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                id: user.id,
                scope: user.roles
            },
            {
                key: 'random_string',
                algorithm: 'HS512'
            },
            {
                ttlSec: 14400
            }
        );
    }
};