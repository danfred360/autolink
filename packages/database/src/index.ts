import bodyParser from 'body-parser';
import express from 'express';
import { Pool } from 'pg';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { createResolvers } from './Resolvers';
import { Schema } from './Schema';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Autolink Database Gateway API',
      version: '1.0.0',
      description: 'API for managing user and system data',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./**/*.ts'], // Adjusted to include subdirectories
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const resolvers = createResolvers(pool);

app.use(
  '/graphql',
  graphqlHTTP({
    Schema,
    rootValue: resolvers,
    graphiql: true, // Enable GraphiQL for testing
  })
);

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Check the health of the server
 *     description: Returns a simple status message indicating server health.
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Server is healthy"
 */
app.get('/health', (req, res) => {
  res.json({ message: 'Server is healthy' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});