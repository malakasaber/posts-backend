const { Kafka } = require("kafkajs");

class KafkaConsumer {
    constructor() {
        this.kafka = new Kafka({
            clientId: process.env.KAFKA_CLIENT_ID || "posts-consumer",
            brokers: (process.env.KAFKA_BROKERS || "localhost:9092").split(",")
        });

        this.consumer = this.kafka.consumer({
            groupId: "posts-service"
        });
    }

    async connect(topic, handler) {
        await this.consumer.connect();

        await this.consumer.subscribe({
            topic,
            fromBeginning: true
        });

        this.consumer.run({
            eachMessage: async ({ message }) => {
                const event = JSON.parse(message.value.toString());

                await handler(event);
            }
        });

        console.log("Kafka consumer connected");
    }
}

module.exports = KafkaConsumer;