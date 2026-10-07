const { Kafka } = require("kafkajs");

class KafkaProducer {
    constructor() {
        this.kafka = new Kafka({
            clientId: process.env.KAFKA_CLIENT_ID || "posts-api",
            brokers: (process.env.KAFKA_BROKERS || "localhost:9092").split(",")
        });

        this.producer = this.kafka.producer();
    }

    async connect() {
        await this.producer.connect();
        await this.createTopic("post-created");
        console.log("Kafka producer connected");
    }

    async send(topic, message) {
        await this.producer.send({
            topic,
            messages: [
                {
                    value: JSON.stringify(message)
                }
            ]
        });
    }

    async createTopic(topic) {
        const admin = this.kafka.admin();

        await admin.connect();

        await admin.createTopics({
            topics: [
                {
                    topic,
                    numPartitions: 3,
                    replicationFactor: 1
                }
            ]
        });

        await admin.disconnect();
    }

    async disconnect() {
        await this.producer.disconnect();
    }
}

module.exports = KafkaProducer;