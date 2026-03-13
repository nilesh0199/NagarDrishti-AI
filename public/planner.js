/**
 * NagarDrishti AI - Planner Improvement Plans
 */

const PLANS_STORAGE = 'nagarPlannerPlans';

const SUGGESTED_PROBLEMS = [
  { id: 'traffic-sitabuldi', area: 'Sitabuldi', category: 'Traffic', problem: 'Heavy traffic during market hours', recommendation: 'AI-based adaptive signal control' },
  { id: 'pollution-mahal', area: 'Mahal', category: 'Environment', problem: 'Rising PM2.5 from industrial activity', recommendation: 'Enforce emission norms, install scrubbers' },
  { id: 'transport-dharampeth', area: 'Dharampeth', category: 'Transport', problem: 'Public transport demand up 15%', recommendation: 'Add bus routes during peak hours' },
  { id: 'energy-manish', area: 'Manish Nagar', category: 'Energy', problem: 'Residential energy demand growing', recommendation: 'Rooftop solar on municipal buildings' },
  { id: 'pollution-hingna', area: 'Hingna', category: 'Environment', problem: 'Industrial emissions exceeding norms', recommendation: 'Pollution control at MIDC factories' },
  { id: 'infra-wardha', area: 'Wardha Road', category: 'Infrastructure', problem: 'Street lights not working', recommendation: 'Replace faulty lights, add smart lighting' }
];

function getPlans() {
  try {
    return JSON.parse(localStorage.getItem(PLANS_STORAGE) || '[]');
  } catch { return []; }
}

function savePlans(plans) {
  localStorage.setItem(PLANS_STORAGE, JSON.stringify(plans));
}

function addPlan(plan) {
  const plans = getPlans();
  plans.unshift({
    id: Date.now(),
    ...plan,
    status: 'draft',
    createdAt: new Date().toISOString()
  });
  savePlans(plans);
  return plans[0];
}

function updatePlanStatus(id, status) {
  const plans = getPlans();
  const i = plans.findIndex(p => p.id === id);
  if (i >= 0) {
    plans[i].status = status;
    plans[i].updatedAt = new Date().toISOString();
    savePlans(plans);
  }
}

function deletePlan(id) {
  const plans = getPlans().filter(p => p.id !== id);
  savePlans(plans);
}
