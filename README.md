# Posts Backend System

A small event-driven backend system built with **Node.js, Express, MongoDB, Apache Kafka, Docker, and REST APIs**, following a simplified **Domain-Driven Design (DDD)** structure.

The system provides a Posts API for creating, retrieving, and listing posts. When a post is created, an event is published to Kafka and consumed by a Kafka consumer for processing.

---

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Apache Kafka**
- **KafkaJS**
- **Docker & Docker Compose**
- **REST API**
- **Domain-Driven Design (DDD)**
- **AWS** for deployment

---

## Architecture

The project follows a simplified DDD-inspired layered architecture:

```text
src/
├── api/
│   ├── controllers/
│   │   └── PostController.js
│   └── routes/
│       └── postRoutes.js
│
├── application/
│   └── post/
│       ├── CreatePost.js
│       ├── GetPost.js
│       └── ListPosts.js
│
├── domain/
│   └── post/
│       ├── Post.js
│       └── PostRepository.js
│
├── infrastructure/
│   ├── database/
│   │   ├── database.js
│   │   ├── MongoPostRepository.js
│   │   └── PostModel.js
│   │
│   └── kafka/
│       ├── KafkaProducer.js
│       └── KafkaConsumer.js
│
└── server.js
````

### Layers

**Domain**

* Contains the core Post entity.
* Defines the `PostRepository` abstraction.

**Application**

* Contains the use cases:

  * Create Post
  * Get Post
  * List Posts
* Handles application logic and publishes the `post.created` event.

**Infrastructure**

* Implements persistence using MongoDB.
* Implements Kafka producer and consumer.
* Handles external infrastructure concerns.

**API**

* Defines REST routes.
* Controllers handle HTTP requests and responses.

---

## REST API

### Create Post

```http
POST /posts
```

Request body:

```json
{
  "title": "My First Post",
  "content": "This is a test post."
}
```

Response:

```json
{
  "id": "post-id",
  "title": "My First Post",
  "content": "This is a test post.",
  "createdAt": "2026-10-07T21:12:34.385Z"
}
```

---

### Get All Posts

```http
GET /posts
```

Returns all posts stored in MongoDB.

---

### Get Post by ID

```http
GET /posts/:id
```

Returns a single post by its ID.

---

## MongoDB

MongoDB is used as the application's persistence layer.

The project uses a repository pattern to keep the application layer independent from the database implementation.

```text
Application
     ↓
PostRepository
     ↓
MongoPostRepository
     ↓
MongoDB
```

The `PostRepository` defines the required operations, while `MongoPostRepository` provides the MongoDB implementation.

---

## Kafka Event Flow

When a new post is created, the application publishes a `post.created` event to the Kafka topic:

```text
POST /posts
     │
     ▼
PostController
     │
     ▼
CreatePost Use Case
     │
     ├──────────────► MongoDB
     │
     ▼
Kafka Producer
     │
     ▼
post-created topic
     │
     ▼
Kafka Consumer
     │
     ▼
Event Processing / Logging
```

Example event:

```json
{
  "event": "post.created",
  "post": {
    "id": "6ac6b5c26bb8d451040f44f0",
    "title": "Docker Kafka Test",
    "content": "Testing the complete backend system",
    "createdAt": "2026-10-07T21:12:34.385Z"
  },
  "timestamp": "2026-10-07T21:12:34.400Z"
}
```

The Kafka consumer receives the event and logs it for demonstration of the event-driven flow.

---

## Running with Docker

### Prerequisites

Make sure you have:

* Docker
* Docker Compose

### 1. Clone the repository

```bash
git clone https://github.com/malakasaber/posts-backend.git
cd posts-backend
```

### 2. Build and start the services

```bash
docker compose up --build
```

This starts:

* Node.js API
* MongoDB
* Apache Kafka

### 3. Access the API

The API will be available at:

```text
http://127.0.0.1:3000
```

---

## Environment Variables

The application uses the following environment variables:

```env
PORT=3000
MONGO_URI=mongodb://mongodb:27017/posts_db
KAFKA_BROKERS=kafka:9092
KAFKA_CLIENT_ID=posts-api
```

When running through Docker Compose, the API communicates with MongoDB and Kafka using their Docker service names.

---

## Running Without Docker

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/posts_db
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=posts-api
```

Then start the application:

```bash
npm start
```

MongoDB and Kafka must be running locally.

---

## Docker Services

The project uses Docker Compose to orchestrate the complete backend environment:

```text
┌─────────────────────┐
│      Node.js API    │
│      Port: 3000     │
└──────────┬──────────┘
           │
     ┌─────┴─────┐
     │           │
     ▼           ▼
┌──────────┐  ┌──────────┐
│ MongoDB  │  │  Kafka   │
│ Database │  │  Events  │
└──────────┘  └──────────┘
```

---

## Deployment

The application is deployed on **Amazon Web Services (AWS)** using a Docker-based deployment.

The deployed API is publicly accessible at:

```text
<DEPLOYED_API_URL>
```

The deployed system runs the API, MongoDB, and Kafka services using Docker Compose.

---

## Postman Collection

A Postman collection containing the available API endpoints is included in the repository:

```text
postman/
└── Posts-Backend.postman_collection.json
```

The collection includes:

* Create Post
* Get All Posts
* Get Post by ID

For the deployed version, the collection uses the deployed API URL.

---

## Project Requirements

| Requirement        | Implementation                           |
| ------------------ | ---------------------------------------- |
| DDD Structure      | Domain, Application, Infrastructure, API |
| REST API           | Express.js                               |
| Create Item        | `POST /posts`                            |
| Get Item           | `GET /posts/:id`                         |
| List Items         | `GET /posts`                             |
| MongoDB            | Mongoose + MongoDB                       |
| Repository Pattern | `PostRepository` + `MongoPostRepository` |
| Kafka Producer     | `KafkaProducer`                          |
| Kafka Consumer     | `KafkaConsumer`                          |
| Event Flow         | `post.created` Kafka event               |
| Docker             | Dockerfile                               |
| Docker Compose     | API + MongoDB + Kafka                    |
| Cloud Deployment   | AWS                                      |
| Public Access      | Deployed API endpoint                    |
| API Testing        | Postman collection                       |

---

## Event-Driven Flow

The main event-driven workflow is:

```text
Client
  │
  │ POST /posts
  ▼
API Controller
  │
  ▼
CreatePost Use Case
  │
  ├──► MongoDB
  │
  └──► Kafka Producer
          │
          ▼
      post-created
          │
          ▼
     Kafka Consumer
          │
          ▼
     Event Processing
```

This demonstrates asynchronous communication between the post creation flow and an event consumer.

---

## Author

**Malak Ahmed Saber**

Computer Science Graduate - Cairo University

GitHub:
[https://github.com/malakasaber](https://github.com/malakasaber)

LinkedIn:
[https://linkedin.com/in/malak-ahmed-saber-26a37b288/](https://linkedin.com/in/malak-ahmed-saber-26a37b288/)

````