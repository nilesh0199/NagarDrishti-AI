# NagarDrishti AI

**Where Urban Data Meets AI Insight.**

A Smart City Analytics Platform for Indian cities that helps administrators, planners, and analysts monitor traffic, pollution, transport usage, energy consumption, and water usage at both city and area levels.

## Features

- **Login** with role validation (Administrator requires @govt.com email)
- **City & Area Selection** – Choose from 9 cities and localized areas
- **Dashboard** – Metric cards, Leaflet map with hotspots, Chart.js traffic & AQI trends
- **City Data** – Raw sensor readings (Traffic, Pollution, Energy, Transport)
- **AI Insights** – Active insights and recommendations
- **Reports** – Generate and download PDF reports
- **Chatbot** – Data assistant for city/area queries
- **Settings** – Dark mode (persists in localStorage)

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Libraries:** Chart.js, Leaflet.js, jsPDF

## Quick Start

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Login

- **Administrator:** Email must end with `@govt.com` (e.g. `admin@nagpur.govt.com`)
- **Planner / Analyst:** Any email
- Password: Any (demo mode)

## Project Structure

```
/public
  login.html, dashboard.html, cityData.html, aiInsights.html
  reports.html, settings.html
  styles.css, app.js, charts.js, chatbot.js, reports.js
/server
  server.js, cityData.js
```
