/**
 * NagarDrishti AI - City and Area Data
 * Realistic datasets for Indian cities
 */

const cities = [
  'Nagpur', 'Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Ahmedabad', 'Kolkata'
];

const areasByCity = {
  Nagpur: [
    { name: 'Sitabuldi', type: 'Traffic Hotspot', lat: 21.1458, lng: 79.0882 },
    { name: 'Dharampeth', type: 'Residential', lat: 21.1425, lng: 79.0915 },
    { name: 'Mahal', type: 'Pollution Zone', lat: 21.1350, lng: 79.0850 },
    { name: 'Sadar', type: 'Commercial', lat: 21.1500, lng: 79.0950 },
    { name: 'Manish Nagar', type: 'Residential', lat: 21.1600, lng: 79.1000 },
    { name: 'Trimurti Nagar', type: 'Commercial', lat: 21.1550, lng: 79.1020 },
    { name: 'Wardha Road', type: 'Traffic Hotspot', lat: 21.1400, lng: 79.0750 },
    { name: 'Civil Lines', type: 'Commercial', lat: 21.1480, lng: 79.0880 },
    { name: 'Mankapur', type: 'Residential', lat: 21.1520, lng: 79.0920 },
    { name: 'Hingna', type: 'Industrial', lat: 21.1250, lng: 79.0550 },
    { name: 'Seminary Hills', type: 'Residential', lat: 21.1380, lng: 79.0780 },
    { name: 'Bharat Nagar', type: 'Residential', lat: 21.1320, lng: 79.0820 }
  ],
  Delhi: [
    { name: 'Connaught Place', type: 'Commercial', lat: 28.6328, lng: 77.2197 },
    { name: 'Karol Bagh', type: 'Traffic Hotspot', lat: 28.6519, lng: 77.1907 },
    { name: 'Dwarka', type: 'Residential', lat: 28.5921, lng: 77.0469 },
    { name: 'Rohini', type: 'Residential', lat: 28.7495, lng: 77.0630 },
    { name: 'Saket', type: 'Commercial', lat: 28.5244, lng: 77.2066 },
    { name: 'Lajpat Nagar', type: 'Traffic Hotspot', lat: 28.5672, lng: 77.2431 },
    { name: 'Chandni Chowk', type: 'Commercial', lat: 28.6519, lng: 77.2315 },
    { name: 'Vasant Kunj', type: 'Residential', lat: 28.5244, lng: 77.1597 },
    { name: 'Mayur Vihar', type: 'Residential', lat: 28.6099, lng: 77.2975 },
    { name: 'Nehru Place', type: 'Commercial', lat: 28.5501, lng: 77.2502 }
  ],
  Mumbai: [
    { name: 'Andheri', type: 'Traffic Hotspot', lat: 19.1136, lng: 72.8697 },
    { name: 'Bandra', type: 'Commercial', lat: 19.0596, lng: 72.8295 },
    { name: 'Dadar', type: 'Traffic Hotspot', lat: 19.0182, lng: 72.8437 },
    { name: 'Powai', type: 'Residential', lat: 19.1197, lng: 72.9081 },
    { name: 'Thane', type: 'Residential', lat: 19.2183, lng: 72.9781 },
    { name: 'Borivali', type: 'Residential', lat: 19.2307, lng: 72.8567 },
    { name: 'Goregaon', type: 'Commercial', lat: 19.1598, lng: 72.8406 },
    { name: 'Santacruz', type: 'Commercial', lat: 19.0830, lng: 72.8371 },
    { name: 'Chembur', type: 'Pollution Zone', lat: 19.0596, lng: 72.9005 },
    { name: 'Worli', type: 'Commercial', lat: 18.9982, lng: 72.8150 }
  ],
  Bangalore: [
    { name: 'Koramangala', type: 'Commercial', lat: 12.9352, lng: 77.6245 },
    { name: 'Indiranagar', type: 'Traffic Hotspot', lat: 12.9784, lng: 77.6408 },
    { name: 'Whitefield', type: 'IT Hub', lat: 12.9698, lng: 77.7499 },
    { name: 'MG Road', type: 'Commercial', lat: 12.9750, lng: 77.6063 },
    { name: 'Electronic City', type: 'IT Hub', lat: 12.8456, lng: 77.6603 },
    { name: 'HSR Layout', type: 'Residential', lat: 12.9113, lng: 77.6382 },
    { name: 'Marathahalli', type: 'Traffic Hotspot', lat: 12.9592, lng: 77.6974 },
    { name: 'Jayanagar', type: 'Residential', lat: 12.9250, lng: 77.5937 },
    { name: 'Bannerghatta Road', type: 'Traffic Hotspot', lat: 12.8876, lng: 77.5975 },
    { name: 'Yeshwanthpur', type: 'Commercial', lat: 13.0285, lng: 77.5344 }
  ],
  Pune: [
    { name: 'FC Road', type: 'Commercial', lat: 18.5074, lng: 73.8077 },
    { name: 'Viman Nagar', type: 'IT Hub', lat: 18.5675, lng: 73.9142 },
    { name: 'Koregaon Park', type: 'Commercial', lat: 18.5314, lng: 73.8945 },
    { name: 'Hinjewadi', type: 'IT Hub', lat: 18.5912, lng: 73.7389 },
    { name: 'Aundh', type: 'Residential', lat: 18.5582, lng: 73.8077 },
    { name: 'Baner', type: 'Residential', lat: 18.5596, lng: 73.7864 },
    { name: 'Kothrud', type: 'Traffic Hotspot', lat: 18.5074, lng: 73.8077 },
    { name: 'Shivajinagar', type: 'Commercial', lat: 18.5314, lng: 73.8474 },
    { name: 'Hadapsar', type: 'Industrial', lat: 18.4969, lng: 73.9419 },
    { name: 'Pimpri', type: 'Industrial', lat: 18.6298, lng: 73.7997 }
  ],
  Hyderabad: [
    { name: 'Banjara Hills', type: 'Commercial', lat: 17.4239, lng: 78.4738 },
    { name: 'Jubilee Hills', type: 'Commercial', lat: 17.4232, lng: 78.4731 },
    { name: 'Madhapur', type: 'IT Hub', lat: 17.4484, lng: 78.3908 },
    { name: 'Gachibowli', type: 'IT Hub', lat: 17.4401, lng: 78.3489 },
    { name: 'Secunderabad', type: 'Commercial', lat: 17.4399, lng: 78.4983 },
    { name: 'Kukatpally', type: 'Residential', lat: 17.4843, lng: 78.3984 },
    { name: 'Abids', type: 'Traffic Hotspot', lat: 17.3850, lng: 78.4867 },
    { name: 'Hitech City', type: 'IT Hub', lat: 17.4484, lng: 78.3908 },
    { name: 'Begumpet', type: 'Commercial', lat: 17.4375, lng: 78.4731 },
    { name: 'Dilsukhnagar', type: 'Residential', lat: 17.3711, lng: 78.5284 }
  ],
  Chennai: [
    { name: 'T Nagar', type: 'Commercial', lat: 13.0418, lng: 80.2341 },
    { name: 'Anna Nagar', type: 'Residential', lat: 13.0878, lng: 80.2085 },
    { name: 'Velachery', type: 'IT Hub', lat: 12.9716, lng: 80.2206 },
    { name: 'Adyar', type: 'Commercial', lat: 13.0067, lng: 80.2206 },
    { name: 'Guindy', type: 'Industrial', lat: 13.0067, lng: 80.2206 },
    { name: 'OMR', type: 'IT Hub', lat: 12.9067, lng: 80.2206 },
    { name: 'Egmore', type: 'Commercial', lat: 13.0792, lng: 80.2636 },
    { name: 'Porur', type: 'Residential', lat: 13.0358, lng: 80.1564 },
    { name: 'Tambaram', type: 'Residential', lat: 12.9249, lng: 80.1025 },
    { name: 'Nungambakkam', type: 'Commercial', lat: 13.0588, lng: 80.2422 }
  ],
  Ahmedabad: [
    { name: 'Satellite', type: 'Residential', lat: 23.0225, lng: 72.5714 },
    { name: 'SG Highway', type: 'Commercial', lat: 23.0650, lng: 72.5714 },
    { name: 'Vastrapur', type: 'Commercial', lat: 23.0350, lng: 72.5450 },
    { name: 'Navrangpura', type: 'Commercial', lat: 23.0350, lng: 72.5650 },
    { name: 'Bodakdev', type: 'Residential', lat: 23.0250, lng: 72.5550 },
    { name: 'Maninagar', type: 'Residential', lat: 23.0050, lng: 72.5950 },
    { name: 'Naroda', type: 'Industrial', lat: 23.0650, lng: 72.6550 },
    { name: 'Paldi', type: 'Residential', lat: 23.0150, lng: 72.5750 },
    { name: 'Drive-In Road', type: 'Commercial', lat: 23.0550, lng: 72.5450 },
    { name: 'Gota', type: 'Residential', lat: 23.1050, lng: 72.5550 }
  ],
  Kolkata: [
    { name: 'Salt Lake', type: 'Residential', lat: 22.5742, lng: 88.4337 },
    { name: 'Park Street', type: 'Commercial', lat: 22.5535, lng: 88.3514 },
    { name: 'Howrah', type: 'Traffic Hotspot', lat: 22.5958, lng: 88.2636 },
    { name: 'Dum Dum', type: 'Residential', lat: 22.6200, lng: 88.4200 },
    { name: 'New Town', type: 'IT Hub', lat: 22.5800, lng: 88.4500 },
    { name: 'Ballygunge', type: 'Residential', lat: 22.5281, lng: 88.3537 },
    { name: 'Jadavpur', type: 'Residential', lat: 22.4969, lng: 88.3697 },
    { name: 'Esplanade', type: 'Commercial', lat: 22.5653, lng: 88.3491 },
    { name: 'Bidhannagar', type: 'Residential', lat: 22.5742, lng: 88.4337 },
    { name: 'Gariahat', type: 'Commercial', lat: 22.5200, lng: 88.3600 }
  ]
};

const cityCoordinates = {
  Nagpur: { lat: 21.1458, lng: 79.0882, zoom: 12 },
  Delhi: { lat: 28.6139, lng: 77.2090, zoom: 11 },
  Mumbai: { lat: 19.0760, lng: 72.8777, zoom: 11 },
  Bangalore: { lat: 12.9716, lng: 77.5946, zoom: 11 },
  Pune: { lat: 18.5204, lng: 73.8567, zoom: 11 },
  Hyderabad: { lat: 17.3850, lng: 78.4867, zoom: 11 },
  Chennai: { lat: 13.0827, lng: 80.2707, zoom: 11 },
  Ahmedabad: { lat: 23.0225, lng: 72.5714, zoom: 11 },
  Kolkata: { lat: 22.5726, lng: 88.3639, zoom: 11 }
};

/**
 * Generate realistic random metrics for a city/area
 */
function generateMetrics(city, area = 'All') {
  const trafficCongestion = 45 + Math.random() * 40;
  const aqi = 80 + Math.floor(Math.random() * 120);
  const transportUsage = 10000 + Math.floor(Math.random() * 70000);
  const energyMWh = 200 + Math.random() * 400;
  const waterML = 30 + Math.random() * 60;

  return {
    trafficCongestion: Math.round(trafficCongestion * 10) / 10,
    aqi,
    publicTransportUsage: transportUsage,
    energyConsumption: Math.round(energyMWh * 10) / 10,
    waterUsage: Math.round(waterML * 10) / 10
  };
}

/**
 * Generate hourly data for charts
 */
function generateHourlyData(hours = 12) {
  const labels = [];
  const data = [];
  const now = new Date();
  for (let i = hours - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setHours(d.getHours() - i);
    labels.push(d.getHours() + ':00');
    data.push(Math.floor(30 + Math.random() * 70));
  }
  return { labels, data };
}

/**
 * Get map markers for city (traffic, pollution, energy zones)
 */
function getMapMarkers(city, area = 'All') {
  const areas = areasByCity[city] || [];
  return areas.map(a => ({
    ...a,
    type: a.type.includes('Traffic') ? 'traffic' : 
          a.type.includes('Pollution') ? 'pollution' : 
          a.type.includes('Industrial') ? 'energy' : 'general'
  }));
}

module.exports = {
  cities,
  areasByCity,
  cityCoordinates,
  generateMetrics,
  generateHourlyData,
  getMapMarkers
};
