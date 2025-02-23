'use strict';

const amqp = require('amqplib');
const MailService = require('./mail_service');

module.exports = class MessageBrokerService {
    constructor() {
        this.connection = null;
        this.channel = null;
    }

    async connect() {
        this.connection = await amqp.connect('amqp://localhost:5672');
        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue('generate_csv');
    }

    async publishMessage(queue, message) {
        if (!this.channel) {
            await this.connect();
        }
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }

    async consumeMessages() {
        if (!this.channel) {
            await this.connect();
        }

        this.channel.consume('generate_csv', async (msg) => {
            const message = JSON.parse(msg.content.toString());
            await this.processGenerateCsv(message);
            this.channel.ack(msg);
        });
    }

    async processGenerateCsv(message) {
        const { email, movies } = message;

        const csv = this.generateCsv(movies);

        const mailService = new MailService();
        await mailService.sendCsvEmail(email, csv);
    }

    generateCsv(movies) {
        const header = 'Title,Description,Published at,Producer,Created at,Updated at\n';
        const rows = movies.map(movie => `${movie.title},${movie.description},${movie.publishedAt},${movie.producer},${movie.createdAt},${movie.updatedAt}`).join('\n');
        return header + rows;
    }
};