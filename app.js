//imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const userRoute = require('./Routes/userRout');
const authRoute = require('./Routes/authRoute');
const specialtyRoute = require('./Routes/specialtyRoute');
const jobRoute = require('./Routes/jobRoute');
const skillRoute = require('./Routes/skillRoute');

//middleware /must be added at the top
app.use(express.json());
app.use(cors());


//dotenv config
dotenv.config();

//public folder for images
app.use('/public', express.static('public'));

const swagger = swaggerJsDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Freelancing API',
      version: '1.0.0',
      description: 'API documentation for the Freelancing platform',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token in the format :Bearer <token>',
        },
      },
      responses: {
        BadRequest: {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        Unauthorized: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        ServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string' }
                }
              }
            }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./app.js', './Routes/*.js'],
});

app.use('/Freelancing/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

//routes
app.use('/Freelancing/api/v1/auth', authRoute);
app.use('/Freelancing/api/v1/users', userRoute);
app.use('/Freelancing/api/v1/specialties', specialtyRoute);
app.use('/Freelancing/api/v1/jobs', jobRoute);
app.use('/Freelancing/api/v1/skills', skillRoute);

//mongoose connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));





app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});