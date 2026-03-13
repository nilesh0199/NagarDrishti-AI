/**
 * NagarDrishti AI - Express Server
 */

const express = require('express');
const path = require('path');
const { cities, areasByCity, cityCoordinates, generateMetrics, generateHourlyData, getMapMarkers } = require('./cityData');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

// API: Get cities list
app.get('/api/cities', (req, res) => {
  res.json({ cities });
});

// API: Get areas for a city
app.get('/api/cities/:city/areas', (req, res) => {
  const city = req.params.city;
  const areas = areasByCity[city] || [];
  res.json({ areas });
});

// API: Get city coordinates for map
app.get('/api/cities/:city/coordinates', (req, res) => {
  const city = req.params.city;
  const coords = cityCoordinates[city] || cityCoordinates.Nagpur;
  res.json(coords);
});

// API: Get metrics for city/area
app.get('/api/metrics', (req, res) => {
  const { city, area } = req.query;
  const metrics = generateMetrics(city || 'Nagpur', area || 'All');
  res.json(metrics);
});

// API: Get hourly chart data
app.get('/api/chart-data', (req, res) => {
  const { type, city, area } = req.query;
  const { labels, data } = generateHourlyData(12);
  res.json({ labels, data });
});

// API: Get map markers
app.get('/api/map-markers', (req, res) => {
  const { city } = req.query;
  const markers = getMapMarkers(city || 'Nagpur');
  res.json({ markers });
});

// API: Validate login
app.post('/api/login', (req, res) => {
  const { email, password, role } = req.body;
  
  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  if (role === 'Administrator' && !email.endsWith('@govt.com')) {
    return res.status(400).json({ 
      success: false, 
      message: 'Administrator access requires a government email.' 
    });
  }

  // Mock successful login
  res.json({
    success: true,
    user: {
      email,
      role,
      name: email.split('@')[0]
    }
  });
});

// Serve login as default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

app.listen(PORT, () => {
  console.log(`NagarDrishti AI server running at http://localhost:${PORT}`);
});
