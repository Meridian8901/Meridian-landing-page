export const MARKETS = [
  {
    slug: 'uganda',
    name: 'Uganda',
    flag: '🇺🇬',
    focus: 'Manufacturing and agro-processing hubs around Kampala and Jinja.',
    description:
      'Uganda is home to a fast-growing base of manufacturers in food processing, plastics, and light industry — many still running procurement through fragmented, informal vendor relationships. Meridian works with Ugandan manufacturers to consolidate spend, formalise supplier contracts, and connect directly to sourcing routes from India and China through Mombasa and Dar es Salaam.',
  },
  {
    slug: 'ethiopia',
    name: 'Ethiopia',
    flag: '🇪🇹',
    focus: 'Industrial parks and textile/garment manufacturing corridors.',
    description:
      "Ethiopia's industrial park model has attracted significant manufacturing investment, particularly in textiles and garments — but procurement infrastructure and supplier visibility often lag behind production capacity. We help Ethiopian manufacturers build the sourcing and logistics discipline to match their production scale.",
  },
  {
    slug: 'kenya',
    name: 'Kenya',
    flag: '🇰🇪',
    focus: 'Regional trade gateway via the Port of Mombasa.',
    description:
      "Kenya's position as the region's primary port gateway makes it a natural hub for both direct manufacturing and re-distribution across East Africa. Meridian's Kenyan clients benefit from proximity to Mombasa's shipping infrastructure combined with direct sourcing relationships that remove agent markups.",
  },
  {
    slug: 'tanzania',
    name: 'Tanzania',
    flag: '🇹🇿',
    focus: 'Port of Dar es Salaam and inland manufacturing corridors.',
    description:
      'Tanzania combines a major port gateway in Dar es Salaam with a growing manufacturing base across food, construction materials and light industry. We work with Tanzanian manufacturers to tighten inland logistics handoffs and reduce the emergency-order cycle that erodes margin.',
  },
]

export function getMarketBySlug(slug) {
  return MARKETS.find((m) => m.slug === slug)
}
