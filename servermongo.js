
const uri = "mongodb+srv://uciiiiill:kueleker45@mongodbucil.zjjkeha.mongodb.net/?retryWrites=true&w=majority";
const express = require('express');
const app = express();
const PORT = 5001;
const mongoose = require('mongoose');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const isAuthenticated = require('./middleware/authmiddleware');

// Import controllers
const dokterController = require('./controllers/doktercontroller');
const eventController = require('./controllers/eventcontroller');
const obatController = require('./controllers/obatcontroller');
const pasienController = require('./controllers/pasiencontroller');

app.use(cors())
app.use(express.json())
app.use(cookieParser());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const connect = async () => {
    try {
        mongoose.connect(uri);
        console.log('Connected to mongoDB!')
    } catch (error) {
        throw error
    } 
}



mongoose.connection.on('disconnected', ()=>{
    console.log('MongoDB disconnected!')
});


const userController = require('./controllers/usercontroller');

// Register a new user
app.post('/register', userController.registerUser);
app.post('/login', userController.login);

// Get all users
app.get('/users', userController.getUsers);

// Get logged in users
app.get('/loggedinusers', userController.getLoggedInUsers);
// Dokter routes
app.post('/dokters', isAuthenticated, dokterController.createDokter);
app.get('/dokters/:id', isAuthenticated, dokterController.getDokterById);
app.get('/dokters', isAuthenticated, dokterController.getAllDokters);
app.put('/dokters/:id', isAuthenticated, dokterController.updateDokter);
app.delete('/dokters/:id', isAuthenticated, dokterController.deleteDokter);

// Event routes
app.post('/events', eventController.createEvent);
app.get('/events', eventController.getEvents);
app.put('/events/:id', eventController.updateEvent);
app.delete('/events/:id', eventController.deleteEvent);

// Obat routes
app.post('/obats', obatController.createObat);
app.get('/obats/:id', obatController.getObatById);
app.get('/obats', obatController.getAllObats);
app.put('/obats/:id', obatController.updateObat);
app.delete('/obats/:id', obatController.deleteObat);

// Pasien routes
app.post('/pasiens', isAuthenticated, pasienController.createPasien);
app.get('/pasiens/:id', isAuthenticated, pasienController.getPasienById);
app.get('/pasiens', isAuthenticated, pasienController.getAllPasiens);
app.put('/pasiens/:id', isAuthenticated, pasienController.updatePasien);
app.delete('/pasiens/:id', isAuthenticated, pasienController.deletePasien);
app.listen(PORT, () => {
    connect()
    console.log(`Server is running on port ${PORT}`);
  });
