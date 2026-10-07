require("dotenv").config();

const express = require("express");

const connectDatabase = require("./infrastructure/database/database");
const postRoutes = require("./api/routes/postRoutes");

const app = express();

app.use(express.json());

app.use("/posts", postRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Posts API is running"
    });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDatabase();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();