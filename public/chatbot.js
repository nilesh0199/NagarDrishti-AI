/**
 * NagarDrishti AI - Data Assistant Chatbot (bot-style responses + Report Issue)
 */

let chatbotOpen = false;
let chatPanel;

const BOT_GREETINGS = [
  "Hello! I'm NagarDrishti AI, your smart city data assistant. I can help you with traffic, pollution, transport, energy, and water data for your selected area. How can I assist you?",
  "Hi there! I'm here to help you understand urban analytics. Ask me about traffic, air quality, public transport, energy, or water usage. What would you like to know?",
  "Welcome! I'm NagarDrishti AI. I analyze real-time city data and can provide insights for your area. What would you like to explore?"
];

const BOT_ACKNOWLEDGMENTS = [
  "Let me fetch that data for you.",
  "One moment while I analyze that.",
  "Here's what I found:",
  "Based on current data:"
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function initChatbot() {
  const btn = document.getElementById('chatbotBtn');
  if (!btn) return;

  if (chatPanel) {
    chatPanel.remove();
    chatPanel = null;
  }

  chatPanel = document.createElement('div');
  chatPanel.className = 'chatbot-panel';
  chatPanel.style.display = 'none';
  chatPanel.innerHTML = `
    <div class="chatbot-header">
      <div>
        <strong>NagarDrishti AI</strong>
        <div class="status">● Online & Ready</div>
      </div>
      <button type="button" class="modal-close" id="chatbotClose" style="background:none;border:none;color:white;font-size:1.5rem;cursor:pointer;">×</button>
    </div>
    <div class="chatbot-messages" id="chatMessages">
      <div class="chat-message bot">
        <div class="bubble">${getRandom(BOT_GREETINGS)}</div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.25rem;">${formatTime(new Date())}</div>
      </div>
    </div>
    <div class="chat-input-wrap">
      <form id="chatForm">
        <input type="text" id="chatInput" placeholder="Ask about traffic, pollution..." autocomplete="off">
        <button type="submit">➤</button>
      </form>
    </div>
    <div class="chatbot-footer-actions">
      <button type="button" class="btn-report-issue" id="btnReportIssue">📋 Report Issue</button>
    </div>
  `;

  document.body.appendChild(chatPanel);

  btn.onclick = () => {
    chatbotOpen = !chatbotOpen;
    chatPanel.style.display = chatbotOpen ? 'flex' : 'none';
  };

  document.getElementById('chatbotClose').onclick = () => {
    chatbotOpen = false;
    chatPanel.style.display = 'none';
  };

  document.getElementById('btnReportIssue').onclick = () => {
    if (typeof showReportIssueModal === 'function') showReportIssueModal();
  };

  document.getElementById('chatForm').onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    addUserMessage(msg);
    setTimeout(() => addBotResponse(msg), 400 + Math.random() * 400);
  };
}

function formatTime(d) {
  const h = d.getHours();
  const m = d.getMinutes();
  const am = h < 12 ? 'AM' : 'PM';
  return (h % 12 || 12) + ':' + String(m).padStart(2, '0') + ' ' + am;
}

function addUserMessage(text) {
  const el = document.getElementById('chatMessages');
  if (!el) return;
  const div = document.createElement('div');
  div.className = 'chat-message user';
  div.innerHTML = `
    <div class="bubble">${escapeHtml(text)}</div>
    <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.25rem;text-align:right;">${formatTime(new Date())}</div>
  `;
  el.appendChild(div);
  el.scrollTop = el.scrollHeight;
}

function addBotResponse(userMsg) {
  const city = typeof getSelectedCity === 'function' ? getSelectedCity() : 'Nagpur';
  const area = typeof getSelectedArea === 'function' ? getSelectedArea() : 'All Areas (City Overview)';
  const areaName = area === 'All Areas (City Overview)' ? city : area;

  const lower = userMsg.toLowerCase();
  let response = '';
  let ack = getRandom(BOT_ACKNOWLEDGMENTS);

  if (lower.includes('traffic') || lower.includes('congestion')) {
    const cong = 45 + Math.floor(Math.random() * 40);
    response = `${ack}<br><br><strong>Traffic – ${areaName}</strong><br><br>• Current congestion: ${cong}%<br>• Peak hours: 8–10 AM<br>• Market activity increases density`;
  } else if (lower.includes('pollution') || lower.includes('air') || lower.includes('aqi')) {
    const aqi = 80 + Math.floor(Math.random() * 100);
    response = `${ack}<br><br><strong>Air Quality – ${areaName}</strong><br><br>• Current AQI: ${aqi}<br>• PM2.5 levels: ${(20 + Math.floor(Math.random() * 40))} µg/m³<br>• Status: ${aqi > 100 ? 'Moderate' : 'Good'}`;
  } else if (lower.includes('transport') || lower.includes('bus')) {
    const pct = 35 + Math.floor(Math.random() * 30);
    response = `${ack}<br><br><strong>Public Transport – ${areaName}</strong><br><br>• Usage: ${pct}%<br>• Bus passenger load: ${(80 + Math.floor(Math.random() * 100))} pax/hr<br>• Status: Active`;
  } else if (lower.includes('energy')) {
    const mwh = (4 + Math.random() * 4).toFixed(1);
    response = `${ack}<br><br><strong>Energy – ${areaName}</strong><br><br>• Total consumption: ${mwh} MWh<br>• Residential share: ~40%<br>• Demand status: Normal`;
  } else if (lower.includes('water')) {
    const ml = (40 + Math.random() * 40).toFixed(0);
    response = `${ack}<br><br><strong>Water – ${areaName}</strong><br><br>• Daily supply: ${ml} ML<br>• Status: Adequate`;
  } else if (lower.includes('recommend') || lower.includes('suggest')) {
    response = `${ack}<br><br><strong>Recommendations for ${areaName}</strong><br><br>• Optimize traffic signals during peak hours<br>• Monitor PM2.5 and enforce emission norms<br>• Consider solar panels on municipal buildings`;
  } else if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
    response = `${getRandom(BOT_GREETINGS)}`;
  } else if (lower.includes('thank')) {
    response = "You're welcome! Is there anything else I can help you with?";
  } else {
    response = `I can help with traffic, pollution, transport, energy, and water data for <strong>${areaName}</strong>. You can also use the "Report Issue" button below to submit a complaint. What would you like to know?`;
  }

  const el = document.getElementById('chatMessages');
  if (!el) return;
  const div = document.createElement('div');
  div.className = 'chat-message bot';
  div.innerHTML = `
    <div class="bubble">${response}</div>
    <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.25rem;">${formatTime(new Date())}</div>
  `;
  el.appendChild(div);
  el.scrollTop = el.scrollHeight;
}

function escapeHtml(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { if (document.getElementById('chatbotBtn')) initChatbot(); });
} else {
  if (document.getElementById('chatbotBtn')) initChatbot();
}
