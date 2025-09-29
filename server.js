/********************************************************************************
*  WEB322 – Assignment 01
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
*  Name: Aleksandra Plavsic Tubic   Student ID: 134686245   Date: 2025-09-28
********************************************************************************/


const express = require('express');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

const projectData = require('./modules/projects');


app.get('/', (req, res) => {
  res.send('Assignment 2: Aleksandra Plavsic Tubic - 134686245');
});


app.get('/solutions/projects', (req, res) => {
  projectData.getAllProjects()
    .then(data => res.send(data))
    .catch(err => res.status(500).send(String(err)));
});


app.get('/solutions/projects/id-demo', (req, res) => {
  projectData.getProjectById(-44444444) 
    .then(item => res.send(item))
    .catch(err => res.status(404).send(String(err)));
});


app.get('/solutions/projects/sector-demo', (req, res) => {
  projectData.getProjectsBySector('ind') 
    .then(list => res.send(list))
    .catch(err => res.status(404).send(String(err)));
});


projectData.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));
  })
  .catch(err => {
    console.error('Initialization failed:', err);
    process.exit(1);
  });

module.exports = app;