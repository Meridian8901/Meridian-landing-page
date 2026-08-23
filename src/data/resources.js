export const RESOURCE_CATEGORIES = [
  'All',
  'Cost Calculators',
  'Contract Templates',
  'SOPs & Checklists',
  'Sourcing Guides',
]

export const RESOURCES = [
  {
    slug: 'landed-cost-calculator',
    title: 'Landed Cost Calculator',
    category: 'Cost Calculators',
    fileType: 'Excel',
    premium: false,
    description:
      'Calculate the true landed cost of imports from India or China to East Africa — includes freight, insurance, duties, port charges, and last-mile.',
    fullDescription: [
      'Landed cost is the single most misunderstood number in East African procurement. The quoted factory price is rarely more than 60–70% of what a unit actually costs by the time it reaches your warehouse — freight, insurance, duties, port handling, clearing fees and last-mile transport all stack on top, often invisibly.',
      'This calculator breaks every one of those components into its own line item, so you can compare suppliers and sourcing routes on a true apples-to-apples basis instead of unit price alone.',
      'It is built around the same landed cost model we use in our own client engagements — the same one referenced throughout our sourcing and managed supply work.',
      'Drop in your freight quote, Incoterm, duty rate and port charges, and the sheet does the rest — including a side-by-side comparison view for evaluating two or more supplier quotes at once.',
    ],
  },
  {
    slug: 'supplier-evaluation-scorecard',
    title: 'Supplier Evaluation Scorecard',
    category: 'Sourcing Guides',
    fileType: 'Excel',
    premium: false,
    description:
      'Score and compare suppliers across 12 dimensions including price, quality, lead time, payment terms, and compliance.',
    fullDescription: [
      'Most supplier decisions are still made on gut feel and a single price quote. This scorecard forces a structured comparison across the 12 dimensions that actually predict whether a supplier relationship will hold up under pressure: price, quality consistency, lead time reliability, payment terms, minimum order quantities, communication responsiveness, and compliance posture among them.',
      'Each dimension is weighted so you can tune the model to what matters most for a given category of spend — raw materials versus MRO versus finished goods will usually carry very different weightings.',
      'Use it during RFQ evaluation to remove bias from the shortlisting process and create a defensible, auditable record of why a supplier was selected.',
    ],
  },
  {
    slug: 'rfq-template-manufacturing',
    title: 'RFQ Template — Manufacturing Inputs',
    category: 'Contract Templates',
    fileType: 'Word',
    premium: false,
    description:
      'A ready-to-use Request for Quotation template for raw materials and manufacturing components, with technical specification fields.',
    fullDescription: [
      'A well-structured RFQ is what separates a comparable set of supplier quotes from a pile of mismatched numbers you can\'t actually evaluate against each other.',
      'This template is built specifically for raw materials and manufacturing components — with dedicated fields for technical specifications, tolerances, certifications, packaging requirements and delivery terms, so every supplier is quoting against exactly the same brief.',
      'It also includes standard clauses for payment terms, validity period and sample requirements, so nothing critical gets left as an afterthought in the negotiation.',
    ],
  },
  {
    slug: 'procurement-sop-import',
    title: 'Procurement SOP — Import Process',
    category: 'SOPs & Checklists',
    fileType: 'PDF',
    premium: false,
    description:
      'Step-by-step SOP for managing an import procurement cycle from PR to delivery, including LC documentation checklist.',
    fullDescription: [
      'A documented Standard Operating Procedure is what turns "we know how to do this" into a process that survives staff turnover, holiday coverage and scale.',
      'This SOP maps the full import procurement cycle — from purchase requisition and approval, through supplier PO issuance, LC or TT payment documentation, shipment tracking, customs clearance and final goods receipt.',
      'Includes a complete LC documentation checklist so nothing is missing when it\'s time to present to the bank, plus clear ownership at each stage of the cycle.',
    ],
  },
  {
    slug: 'ethical-sourcing-checklist',
    title: 'Ethical Sourcing Audit Checklist',
    category: 'SOPs & Checklists',
    fileType: 'PDF',
    premium: false,
    description:
      '40-point checklist to audit supplier compliance across labor, environment, and governance dimensions.',
    fullDescription: [
      'For manufacturers supplying European, US, or sustainability-conscious buyers, demonstrating ethical sourcing practice is no longer optional — it is a condition of doing business.',
      'This 40-point checklist covers the three dimensions global buyers scrutinise most closely: labor practices, environmental management, and governance/transparency.',
      'Use it as a pre-audit self-assessment for your own supplier base, or as the working document during an on-site supplier audit.',
    ],
  },
  {
    slug: 'east-africa-import-duty-guide',
    title: 'East Africa Import Duty Reference Guide',
    category: 'Sourcing Guides',
    fileType: 'PDF',
    premium: true,
    description:
      'HS code duty rates, VAT, and exemptions for Uganda, Kenya, Tanzania, and Ethiopia — updated 2025.',
    fullDescription: [
      'Import duty structures across East Africa vary significantly by country, HS code and applicable trade agreement — and getting them wrong at the quoting stage routinely turns a profitable order into a loss.',
      'This reference guide consolidates duty rates, VAT treatment, and available exemptions for Uganda, Kenya, Tanzania and Ethiopia in one place, organised by HS code category for the inputs manufacturers source most often.',
      'Updated for 2025, including notes on EAC Common External Tariff categories and country-specific investment incentive exemptions where applicable.',
    ],
  },
]

export function getResourceBySlug(slug) {
  return RESOURCES.find((r) => r.slug === slug)
}
