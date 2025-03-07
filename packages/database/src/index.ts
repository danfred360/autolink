import bodyParser from 'body-parser';
import express from 'express';
import { Pool } from 'pg';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Fetches all users from the database.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "john@example.com"
 */
app.get('/users', async (req, res) => {
  console.log(`Received request for users: ${req.method} ${req.url}`);
  try {
    const result = await pool.query('SELECT * FROM Users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Error fetching users');
  }
});

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