const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks');
const app = express();

app.use(express.json());
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
const DB_URI = 'YOUR_MONGODB_ATLAS_URL';

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
