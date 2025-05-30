const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'planets.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

let planets = [];
if (fs.existsSync(DATA_FILE)) {
    planets = JSON.parse(fs.readFileSync(DATA_FILE));
}
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/planets', (req, res) => {
    res.json(planets);
});
app.get('/planets/:id', (req, res) => {
    const planet = planets.find(p => p.id === parseInt(req.params.id));
    if (!planet) return res.status(404).send('Planeta no encontrado');
    res.json(planet);
});
app.post('/planets', (req, res) => {
    const newPlanet = {
        id: planets.length + 1,
        name: req.body.name,
        discoveryDate: req.body.discoveryDate || new Date().toISOString().split('T')[0],
        diameter: req.body.diameter,
        distanceFromSun: req.body.distanceFromSun,
        interestingFacts: req.body.interestingFacts || [],
        imageUrl: req.body.imageUrl || 'https://via.placeholder.com/300?text=Nuevo+Planeta'
    };
    planets.push(newPlanet);
    savePlanets();
    res.status(201).json(newPlanet);
});

function savePlanets() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(planets, null, 2));
}
app.listen(PORT, () => {
    console.log(`Servidor de exploración espacial funcionando en http://localhost:${PORT}`);
});