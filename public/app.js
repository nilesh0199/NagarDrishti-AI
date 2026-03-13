/**
 * NagarDrishti AI - Shared Application Logic
 */

const API_BASE = '';

function getUser() {
  try {
    return JSON.parse(sessionStorage.getItem('user'));
  } catch {
    return null;
  }
}

function requireAuth() {
  const user = getUser();
  if (!user) {
    window.location.href = '/login.html';
    return null;
  }
  return user;
}

function getSelectedCity() {
  const user = getUser();
  return user?.city || 'Nagpur';
}

function getSelectedArea() {
  return sessionStorage.getItem('selectedArea') || 'All Areas (City Overview)';
}

function setSelectedArea(area) {
  sessionStorage.setItem('selectedArea', area);
}

function logout() {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('selectedArea');
  window.location.href = '/login.html';
}

// Initialize dashboard header (call from dashboard pages)
function initHeader() {
  const user = requireAuth();
  if (!user) return;

  // User profile display
  const nameEl = document.getElementById('userName');
  const roleEl = document.getElementById('userRole');
  if (nameEl) nameEl.textContent = user.name || user.email?.split('@')[0];
  if (roleEl) roleEl.textContent = user.role;

  // Show Admin nav link for Administrators only
  const navAdmin = document.getElementById('navAdmin');
  if (navAdmin) navAdmin.style.display = user.role === 'Administrator' ? '' : 'none';

  // Show Planner nav link for Planners and Administrators
  const navPlanner = document.getElementById('navPlanner');
  if (navPlanner) navPlanner.style.display = (user.role === 'Planner' || user.role === 'Administrator') ? '' : 'none';

  // User profile dropdown & logout
  const profileWrap = document.getElementById('userProfileWrap');
  const profileBtn = document.getElementById('userProfileBtn');
  if (profileWrap && profileBtn) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileWrap.classList.toggle('open');
    });
    document.addEventListener('click', () => profileWrap.classList.remove('open'));
  }
  document.querySelectorAll('[data-logout]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('userProfileWrap')?.classList.remove('open');
      logout();
    });
  });

  // City dropdown
  const citySelect = document.getElementById('headerCitySelect');
  if (citySelect) {
    citySelect.value = user.city;
    citySelect.addEventListener('change', () => {
      user.city = citySelect.value;
      sessionStorage.setItem('user', JSON.stringify(user));
      window.dispatchEvent(new CustomEvent('cityChanged', { detail: { city: user.city } }));
      if (typeof window.onCityChange === 'function') window.onCityChange(user.city);
    });
  }

  // Dark mode from localStorage
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : '');
}

// Apply saved theme on load
function applySavedTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : '');
}

// Dark mode toggle (supports SVG icons or emoji fallback)
function updateThemeIcon(btn) {
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const moon = btn.querySelector('.icon-moon');
  const sun = btn.querySelector('.icon-sun');
  if (moon && sun) {
    moon.style.display = isDark ? 'none' : 'flex';
    sun.style.display = isDark ? 'flex' : 'none';
  } else {
    btn.textContent = isDark ? '☀️' : '🌙';
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : '');
  localStorage.setItem('theme', theme);
  updateThemeIcon(document.getElementById('darkModeToggle'));
}

function initDarkMode() {
  applySavedTheme();
  const btn = document.getElementById('darkModeToggle');
  if (!btn) return;
  updateThemeIcon(btn);
  btn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(theme);
  });
}

// Fetch metrics from API
async function fetchMetrics(city, area) {
  const params = new URLSearchParams({ city, area: area === 'All Areas (City Overview)' ? '' : area });
  const res = await fetch(`${API_BASE}/api/metrics?${params}`);
  return res.json();
}

// Fetch chart data
async function fetchChartData(type, city, area) {
  const params = new URLSearchParams({ type, city, area: area === 'All Areas (City Overview)' ? '' : area });
  const res = await fetch(`${API_BASE}/api/chart-data?${params}`);
  return res.json();
}

// Fetch areas for city
async function fetchAreas(city) {
  const res = await fetch(`${API_BASE}/api/cities/${encodeURIComponent(city)}/areas`);
  const data = await res.json();
  return data.areas || [];
}

// Fetch map markers
async function fetchMapMarkers(city) {
  const res = await fetch(`${API_BASE}/api/map-markers?city=${encodeURIComponent(city)}`);
  const data = await res.json();
  return data.markers || [];
}

// Fetch city coordinates
async function fetchCityCoordinates(city) {
  const res = await fetch(`${API_BASE}/api/cities/${encodeURIComponent(city)}/coordinates`);
  return res.json();
}

// Initialize notification dropdown (call on pages with #notificationBtn)
function initNotifications() {
  const btn = document.getElementById('notificationBtn');
  const dropdown = document.getElementById('notificationDropdown');
  const list = document.getElementById('notificationList');
  const empty = document.getElementById('notificationEmpty');
  const badge = document.getElementById('notificationBadge');
  if (!btn || !dropdown) return;
  const city = typeof getSelectedCity === 'function' ? getSelectedCity() : (getUser()?.city || 'Nagpur');
  const area = typeof getSelectedArea === 'function' ? getSelectedArea() : 'All Areas (City Overview)';
  const areaName = area === 'All Areas (City Overview)' ? null : area;
  const alerts = JSON.parse(localStorage.getItem('nagarAreaAlerts') || '[]');
  const relevant = alerts.filter(a => a.city === city && (areaName === null || a.area === areaName));
  if (badge) {
    badge.textContent = relevant.length;
    badge.style.display = relevant.length > 0 ? 'flex' : 'none';
  }
  if (list) {
    if (relevant.length > 0) {
      list.innerHTML = relevant.map(a => `<div class="notification-item"><strong>${a.area}</strong><br>${a.message}</div>`).join('');
      list.style.display = 'block';
      if (empty) empty.style.display = 'none';
    } else {
      list.style.display = 'none';
      if (empty) empty.style.display = 'block';
    }
  }
  btn.onclick = (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  };
  document.addEventListener('click', () => dropdown.classList.remove('open'));
}
