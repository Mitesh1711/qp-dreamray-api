const express = require('express');
const recordsRoutes = require('./routes/records');
const userRoutes = require('./routes/users');
const departmentRoutes = require('./routes/departments');
const challengesRoutes = require('./routes/challenges');
const commentsRoutes = require('./routes/comments');
const announcementsRoutes = require('./routes/announcements');
const notificationRoutes = require('./routes/notifications');
const appraisalRoutes = require('./routes/appraisals');

//express server initialisation
const app = express();

//Managin cross origin access control error
app.use((req, res, next) => {
    // Configure when deploying for the front end requests url
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
    next();
})

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/api/user', userRoutes );
app.use('/api/records', recordsRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/challenges', challengesRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/announcements', announcementsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/appraisals', appraisalRoutes);

module.exports = app;
