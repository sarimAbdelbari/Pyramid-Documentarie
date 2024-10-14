require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const routeRoutes = require("./routes/routeRoute");
const userRoutes = require('./routes/usersRoute');
const statRoutes = require('./routes/statRoutes')
const groopRoutes = require('./routes/groopRoute');
const authRoutes = require('./routes/authRoute');
const mongoose = require('mongoose');
const { verifyToken } = require('./middleware/authMiddleware');

const app = express();

const PORT = process.env.PORT || 5000;

// * Middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// * Configure CORS options
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200
};

// * Use CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

//  * Routes
app.use('/api/route' , routeRoutes);
app.use('/api/groop', groopRoutes);
app.use('/api/users' , userRoutes);
app.use('/api/stats' , statRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json([{ msg: 'Welcome To The App' }]);
});

// * Connect to DB and start server
const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

      // * Ensure  successful database connection.
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to DB");
    } catch (error) {
        console.error("Failed to connect to DB", error);
    }
};

// * Potantial For Seperating the Index to (A Server.js and An App.js)
startServer();
