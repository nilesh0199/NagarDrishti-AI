/**
 * NagarDrishti AI - Report Issue (Website & City complaints)
 */

const ISSUE_STORAGE = 'nagarReportIssues';

const DEMO_REPORTS = [
  { type: 'city', subtype: 'not_clean', description: 'Garbage piled up near Sitabuldi market. Not cleaned for 3 days.', area: 'Sitabuldi', city: 'Nagpur', reportedBy: 'rajesh.k@email.com', status: 'ongoing', createdAt: '2025-03-12T09:30:00.000Z' },
  { type: 'city', subtype: 'bus_not_clean', description: 'Bus number 45 interior is very dirty. Seats torn.', area: 'Dharampeth', city: 'Nagpur', reportedBy: 'priya.m@email.com', status: 'pending', createdAt: '2025-03-12T11:15:00.000Z' },
  { type: 'website', subtype: 'data_incorrect', description: 'Traffic data for Mahal area shows wrong percentages.', area: 'Mahal', city: 'Nagpur', reportedBy: 'analyst.department@govt.in', status: 'working', createdAt: '2025-03-11T14:20:00.000Z' },
  { type: 'city', subtype: 'govt_officer', description: 'Municipal officer not responding to water supply complaint in Sadar.', area: 'Sadar', city: 'Nagpur', reportedBy: 'citizen.nagpur@email.com', status: 'pending', createdAt: '2025-03-11T16:45:00.000Z' },
  { type: 'website', subtype: 'slow', description: 'Dashboard takes too long to load in morning hours.', area: '', city: 'Nagpur', reportedBy: 'planner.officer@govt.in', status: 'solved', createdAt: '2025-03-10T08:00:00.000Z' },
  { type: 'city', subtype: 'infrastructure', description: 'Street lights not working on Wardha Road stretch.', area: 'Wardha Road', city: 'Nagpur', reportedBy: 'driver.singh@email.com', status: 'ongoing', createdAt: '2025-03-10T19:30:00.000Z' }
];

function getIssues() {
  try {
    let issues = JSON.parse(localStorage.getItem(ISSUE_STORAGE) || '[]');
    if (issues.length === 0) {
      issues = DEMO_REPORTS.map((r, i) => ({
        id: Date.now() - 1000000 + i,
        ...r,
        status: r.status || 'pending',
        createdAt: r.createdAt || new Date().toISOString()
      }));
      saveIssues(issues);
    }
    return issues;
  } catch { return []; }
}

function saveIssues(issues) {
  localStorage.setItem(ISSUE_STORAGE, JSON.stringify(issues));
}

function addIssue(issue) {
  const issues = getIssues();
  issues.unshift({
    id: Date.now(),
    ...issue,
    status: 'pending',
    createdAt: new Date().toISOString()
  });
  saveIssues(issues);
  return issues[0];
}

function updateIssueStatus(id, status) {
  const issues = getIssues();
  const i = issues.findIndex(x => x.id === id);
  if (i >= 0) {
    issues[i].status = status;
    issues[i].updatedAt = new Date().toISOString();
    saveIssues(issues);
  }
}

function showReportIssueModal() {
  const existing = document.getElementById('reportIssueModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'reportIssueModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal" style="max-width:500px;">
      <div class="modal-header">
        <h3>Report an Issue</h3>
        <button type="button" class="modal-close" id="closeReportIssue">×</button>
      </div>
      <div class="modal-body">
        <p class="subtitle" style="margin-bottom:1rem;">Choose the type of issue you want to report</p>
        <div class="report-issue-options">
          <button type="button" class="issue-type-btn" data-type="website">
            <span class="issue-icon">🖥</span>
            <strong>Website / Platform</strong>
            <small>Data incorrect, slow loading, bug, or technical issue</small>
          </button>
          <button type="button" class="issue-type-btn" data-type="city">
            <span class="issue-icon">🏙</span>
            <strong>City / Civic</strong>
            <small>Area not clean, bus not clean, complaint about govt officer</small>
          </button>
        </div>
        <div id="issueFormWrap" style="display:none;margin-top:1.5rem;">
          <div class="form-group">
            <label id="issueFormLabel">Describe the issue</label>
            <select id="issueSubtype" class="city-select" style="width:100%;margin-bottom:0.75rem;">
              <option value="">-- Select --</option>
            </select>
            <textarea id="issueDesc" rows="3" placeholder="Provide details..." style="width:100%;padding:0.75rem;border:2px solid var(--border);border-radius:8px;resize:vertical;"></textarea>
          </div>
          <div class="form-group" id="areaGroup" style="display:none;">
            <label>Area (if applicable)</label>
            <input type="text" id="issueArea" placeholder="e.g. Sitabuldi">
          </div>
          <button type="button" class="btn btn-primary" id="submitIssue">Submit Report</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  modal.style.display = 'flex';

  const websiteSubtypes = [
    { v: 'data_incorrect', t: 'Data shown is incorrect' },
    { v: 'slow', t: 'Website is slow' },
    { v: 'bug', t: 'Bug or error' },
    { v: 'other_tech', t: 'Other technical issue' }
  ];
  const citySubtypes = [
    { v: 'not_clean', t: 'Area is not clean' },
    { v: 'bus_not_clean', t: 'Bus is not clean' },
    { v: 'govt_officer', t: 'Complaint about government officer' },
    { v: 'infrastructure', t: 'Infrastructure issue' },
    { v: 'other_city', t: 'Other civic issue' }
  ];

  document.querySelectorAll('.issue-type-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.issue-type-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const type = btn.dataset.type;
      document.getElementById('issueFormWrap').style.display = 'block';
      document.getElementById('issueFormLabel').textContent = type === 'website' ? 'Issue type' : 'Complaint type';
      const opts = type === 'website' ? websiteSubtypes : citySubtypes;
      const sel = document.getElementById('issueSubtype');
      sel.innerHTML = '<option value="">-- Select --</option>' + opts.map(o => `<option value="${o.v}">${o.t}</option>`).join('');
      document.getElementById('areaGroup').style.display = type === 'city' ? 'block' : 'none';
      document.getElementById('issueDesc').value = '';
    };
  });

  document.getElementById('closeReportIssue').onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

  document.getElementById('submitIssue').onclick = () => {
    const type = document.querySelector('.issue-type-btn.selected')?.dataset.type;
    const subtype = document.getElementById('issueSubtype').value;
    const desc = document.getElementById('issueDesc').value.trim();
    const area = document.getElementById('issueArea').value.trim();
    if (!type || !subtype || !desc) {
      alert('Please fill all required fields.');
      return;
    }
    const user = typeof getUser === 'function' ? getUser() : {};
    addIssue({
      type,
      subtype,
      description: desc,
      area: area || (typeof getSelectedArea === 'function' ? getSelectedArea() : ''),
      city: typeof getSelectedCity === 'function' ? getSelectedCity() : (user?.city || ''),
      reportedBy: user?.email || user?.name || 'Anonymous'
    });
    modal.remove();
    if (typeof showReportConfirmation === 'function') showReportConfirmation();
    else alert('Thank you. Your report has been submitted.');
  };
}
