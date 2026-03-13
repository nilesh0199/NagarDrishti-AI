/**
 * NagarDrishti AI - Chart.js utilities & Metric Detail Modals
 */

function getChartColors() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    line: isDark ? '#60a5fa' : '#2563eb',
    fill: isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(37, 99, 235, 0.2)',
    grid: isDark ? '#334155' : '#e2e8f0',
    text: isDark ? '#94a3b8' : '#64748b'
  };
}

function initTrafficChart(canvas, labels, data) {
  const colors = getChartColors();
  return new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Vehicle Density Index',
        data,
        borderColor: colors.line,
        backgroundColor: colors.fill,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: colors.grid }, ticks: { color: colors.text } },
        x: { grid: { color: colors.grid }, ticks: { color: colors.text } }
      }
    }
  });
}

function initAQIChart(canvas, labels, data) {
  const colors = getChartColors();
  return new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'AQI',
        data,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: colors.grid }, ticks: { color: colors.text } },
        x: { grid: { color: colors.grid }, ticks: { color: colors.text } }
      }
    }
  });
}

function initBarChart(canvas, labels, data, label) {
  const colors = getChartColors();
  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{ label, data, backgroundColor: colors.fill, borderColor: colors.line, borderWidth: 1 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: colors.grid }, ticks: { color: colors.text } },
        x: { grid: { color: colors.grid }, ticks: { color: colors.text } }
      }
    }
  });
}

const METRIC_BULLETS = {
  traffic: [
    'Morning peak traffic occurs between 8–10 AM as commuters head to work.',
    'Evening congestion intensifies near market and commercial zones.',
    'Vehicle density index correlates with business hours and school timings.',
    'Commercial zones contribute to higher vehicle density throughout the day.',
    'AI Insight: Consider adaptive traffic signals to reduce peak-hour congestion by up to 30%.'
  ],
  aqi: [
    'AQI trends typically rise during morning and evening rush hours.',
    'Industrial activity and vehicle emissions contribute to PM2.5 levels.',
    'Peak pollution often aligns with low wind conditions.',
    'Hourly readings help identify pollution hotspots for targeted action.',
    'AI Insight: Green zones show 15–20% better AQI; expansion of such areas recommended.'
  ],
  transport: [
    'Public transport usage peaks during 7–9 AM and 5–7 PM.',
    'Bus passenger load correlates with residential and office area density.',
    'Weekday usage is typically 40% higher than weekends.',
    'Route optimization data supports capacity planning.',
    'AI Insight: Adding 2–3 routes in high-demand corridors could reduce private vehicle use by 12%.'
  ],
  energy: [
    'Energy consumption peaks during afternoon (2–4 PM) and evening (7–9 PM).',
    'Residential demand accounts for approximately 40% of total load.',
    'Commercial zones drive midday peaks.',
    'Seasonal variations show 20% higher demand in summer months.',
    'AI Insight: Rooftop solar on municipal buildings could offset 15–20% of daytime demand.'
  ],
  water: [
    'Water usage peaks during morning (6–9 AM) and evening (6–9 PM).',
    'Residential consumption drives the majority of daily supply demand.',
    'Commercial and industrial zones show steady daytime usage.',
    'Supply adequacy varies by area; some zones experience pressure during peak hours.',
    'AI Insight: Smart metering and leak detection could reduce non-revenue water by 10–15%.'
  ]
};

function showMetricDetail(metricType, title, currentValue, city, area) {
  const existing = document.getElementById('metricDetailModal');
  if (existing) existing.remove();

  const areaName = area === 'All Areas (City Overview)' ? city : area;
  const bullets = METRIC_BULLETS[metricType] || METRIC_BULLETS.traffic;
  const chartType = ['traffic', 'aqi'].includes(metricType) ? metricType : 'traffic';
  const chartCanvasType = metricType === 'aqi' ? 'aqi' : 'traffic';

  const modal = document.createElement('div');
  modal.id = 'metricDetailModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal" style="max-width:640px;">
      <div class="modal-header">
        <h3>${title} – ${areaName}</h3>
        <button type="button" class="modal-close" id="closeMetricDetail">×</button>
      </div>
      <div class="modal-body chart-detail">
        <div class="chart-container" style="height:220px;">
          <canvas id="detailChart"></canvas>
        </div>
        <div class="stat-row">
          <strong>Summary</strong>
          <ul style="margin:0.5rem 0 0 1rem;">
            ${bullets.slice(0, 4).map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>
        <div class="ai-insight">
          <strong>AI Insight</strong>
          <p style="margin:0.5rem 0 0;">${bullets[4] || bullets[bullets.length - 1]}</p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  modal.style.display = 'flex';

  document.getElementById('closeMetricDetail').onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

  const areaParam = area === 'All Areas (City Overview)' ? '' : area;
  fetch('/api/chart-data?type=' + chartType + '&city=' + encodeURIComponent(city) + '&area=' + encodeURIComponent(areaParam))
    .then(r => r.json())
    .then(({ labels, data }) => {
      const canvas = document.getElementById('detailChart');
      if (chartCanvasType === 'aqi') initAQIChart(canvas, labels, data);
      else initTrafficChart(canvas, labels, data);
    });
}

function showChartDetail(type, title, subtitle) {
  showMetricDetail(type, title, null,
    typeof getSelectedCity === 'function' ? getSelectedCity() : (typeof getUser === 'function' && getUser()?.city) || 'Nagpur',
    typeof getSelectedArea === 'function' ? getSelectedArea() : 'All Areas (City Overview)'
  );
}
