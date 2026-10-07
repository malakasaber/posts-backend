require("dotenv").config();
const express = require("express");
const connectDatabase = require("./infrastructure/database/database");
const KafkaConsumer = require("./infrastructure/kafka/KafkaConsumer");
const { router: postRoutes, kafkaProducer } = require("./api/routes/postRoutes");

const app = express();

app.use(express.json());
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Posts API is running" });
});

const PORT = process.env.PORT || 3000;

const kafkaConsumer = new KafkaConsumer();

const startServer = async () => {
    await connectDatabase();
    await kafkaProducer.connect();

    await kafkaConsumer.connect("post-created", async (event) => {
        console.log("Kafka event received:", event);
    });

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();