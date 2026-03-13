/**
 * NagarDrishti AI - Government-style PDF Report Generation (with graphs)
 */

async function generateReport(city, area, timeRange, topics) {
  const timeLabel = { '24h': 'Last 24 Hours', '7d': 'Last 7 Days', '30d': 'Last 30 Days' }[timeRange] || timeRange;
  const filename = `NagarDrishti_Report_${city}_${area.replace(/\s+/g, '_')}_${Date.now()}.pdf`;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Government-style header
  doc.setFillColor(30, 58, 95);
  doc.rect(0, 0, 210, 28, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Government of India', 105, 12, { align: 'center' });
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text('NagarDrishti AI - Smart City Analytics', 105, 20, { align: 'center' });
  doc.text('Where Urban Data Meets AI Insight', 105, 26, { align: 'center' });

  doc.setTextColor(0, 0, 0);
  let y = 38;

  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('OFFICIAL CITY ANALYTICS REPORT', 105, y, { align: 'center' });
  y += 10;

  doc.setFont(undefined, 'normal');
  doc.setFontSize(11);
  doc.text(`City: ${city}`, 20, y);
  doc.text(`Area: ${area}`, 110, y);
  y += 7;
  doc.text(`Report Period: ${timeLabel}`, 20, y);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 110, y);
  y += 12;

  // Horizontal line
  doc.setDrawColor(200, 200, 200);
  doc.line(20, y, 190, y);
  y += 10;

  doc.setFont(undefined, 'bold');
  doc.setFontSize(11);
  doc.text('Topics Covered', 20, y);
  y += 6;
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  topics.forEach(t => {
    doc.text('• ' + t, 25, y);
    y += 5;
  });
  y += 5;

  const m = await fetch(`/api/metrics?city=${encodeURIComponent(city)}&area=${encodeURIComponent(area)}`).then(r => r.json());

  doc.setFont(undefined, 'bold');
  doc.text('Summary Metrics', 20, y);
  y += 6;
  doc.setFont(undefined, 'normal');
  doc.text(`Traffic Congestion: ${m.trafficCongestion}%`, 25, y); y += 5;
  doc.text(`Air Quality (AQI): ${m.aqi}`, 25, y); y += 5;
  doc.text(`Public Transport Usage: ${m.publicTransportUsage.toLocaleString()} passengers`, 25, y); y += 5;
  doc.text(`Energy Consumption: ${m.energyConsumption} MWh`, 25, y); y += 5;
  doc.text(`Water Usage: ${m.waterUsage} ML/day`, 25, y); y += 8;

  // Chart - fetch data and render (canvas must be in DOM for Chart.js)
  const chartData = await fetch(`/api/chart-data?type=traffic&city=${encodeURIComponent(city)}&area=${encodeURIComponent(area)}`).then(r => r.json());
  if (typeof Chart !== 'undefined' && chartData.labels && chartData.data) {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 180;
    canvas.style.cssText = 'position:absolute;left:-9999px;';
    document.body.appendChild(canvas);
    const chart1 = new Chart(canvas, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [{
          label: 'Traffic Density',
          data: chartData.data,
          borderColor: '#1e3a5f',
          backgroundColor: 'rgba(30, 58, 95, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: '#e0e0e0' }, ticks: { color: '#333', font: { size: 9 } } },
          x: { grid: { color: '#e0e0e0' }, ticks: { color: '#333', font: { size: 9 } } }
        }
      }
    });
    await new Promise(r => setTimeout(r, 100));
    const imgData = canvas.toDataURL('image/png');
    document.body.removeChild(canvas);
    chart1.destroy();
    if (y > 240) doc.addPage();
    doc.addImage(imgData, 'PNG', 20, y, 170, 70);
    y += 78;
  }

  // AQI Chart
  const aqiData = await fetch(`/api/chart-data?type=aqi&city=${encodeURIComponent(city)}&area=${encodeURIComponent(area)}`).then(r => r.json());
  if (typeof Chart !== 'undefined' && aqiData.labels && aqiData.data) {
    const canvas2 = document.createElement('canvas');
    canvas2.width = 400;
    canvas2.height = 180;
    canvas2.style.cssText = 'position:absolute;left:-9999px;';
    document.body.appendChild(canvas2);
    const chart2 = new Chart(canvas2, {
      type: 'line',
      data: {
        labels: aqiData.labels,
        datasets: [{
          label: 'AQI',
          data: aqiData.data,
          borderColor: '#c2410c',
          backgroundColor: 'rgba(194, 65, 12, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: '#e0e0e0' }, ticks: { color: '#333', font: { size: 9 } } },
          x: { grid: { color: '#e0e0e0' }, ticks: { color: '#333', font: { size: 9 } } }
        }
      }
    });
    await new Promise(r => setTimeout(r, 100));
    const imgData2 = canvas2.toDataURL('image/png');
    document.body.removeChild(canvas2);
    chart2.destroy();
    if (y > 250) doc.addPage();
    doc.addImage(imgData2, 'PNG', 20, y, 170, 70);
    y += 75;
  }

  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('This is an official document generated by NagarDrishti AI. For official use only.', 105, doc.internal.pageSize.height - 10, { align: 'center' });

  doc.save(filename);

  return {
    city,
    area,
    timeRange: timeLabel,
    topics,
    date: new Date().toLocaleString(),
    filename,
    blob: null
  };
}

function downloadReport(report) {
  const tr = (report.timeRange || '').includes('24') ? '24h' : (report.timeRange || '').includes('7') ? '7d' : '30d';
  generateReport(report.city, report.area, tr, report.topics || ['City Overview']);
}
