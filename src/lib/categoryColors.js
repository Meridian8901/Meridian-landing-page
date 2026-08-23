// Shared category → badge color map for blog posts and resources.
export const CATEGORY_COLORS = {
  // Blog categories
  Procurement: 'bg-primary/10 text-primary',
  'Supply Chain': 'bg-teal-700/10 text-teal-800',
  'Trade & Logistics': 'bg-amber-700/10 text-amber-800',
  Sourcing: 'bg-accent/20 text-accent-dark',
  'Africa Business': 'bg-emerald-700/10 text-emerald-800',
  // Resource categories
  'Cost Calculators': 'bg-sky-700/10 text-sky-800',
  'Contract Templates': 'bg-indigo-700/10 text-indigo-800',
  'SOPs & Checklists': 'bg-rose-700/10 text-rose-800',
  'Sourcing Guides': 'bg-accent/20 text-accent-dark',
}

export function categoryBadgeClass(category) {
  return CATEGORY_COLORS[category] || 'bg-primary/10 text-primary'
}
