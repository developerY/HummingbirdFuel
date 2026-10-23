import { Product, Testimonial } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'circadian-starter-kit',
    name: 'The 24H Circadian Starter Kit',
    subtitle: 'Dual-phase cognitive acceleration & deep sleep architecture',
    price: 68,
    originalPrice: 84,
    rating: 4.9,
    reviewCount: 1240,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiX3OYIqrdAAnCP0P0hW3Qf0-E2qi2AH9OB-dOEi_FyihjSnbTY6I-LDpyNz9XnGcS1jnY2pWUobMk1POLYdOX1_zv3FeAjhQ2rAjpO4v3gxMp_bLZw1LzS74XTzsu94g_0wsohVRvnI8P3JX-FopLOdGjWiaDN4aJHrGtPW7QCpPmiXYyYbLPOA1zXvFUft38iXEjKILP1efqVFD0tRJQQtC6Vr34dnEJeQTp6Sec54cs5eXmtPQ',
    altText: 'Two sleek minimalist matte-black microdose spray bottles labeled AM and PM sitting on a dark volcanic stone pedestal with subtle warm amber underglow',
    category: 'kit',
    badge: 'Best Value • Complete 24H Kit',
    spraysCount: '180 Total (90 AM + 90 PM)',
    flavorOrScent: 'Citrus Zest (AM) + Alpine Mint (PM)',
    features: [
      '1x Day Fuel (Energy Mist) + 1x Night Reset (Sleep Spray)',
      '180 total microdoses for complete circadian synchronization',
      'Dual aviation-grade pocket canisters',
      'Sublingual capillary bypass with 99.8% bioavailability'
    ],
    keyIngredients: [
      { name: "Lion's Mane Nano-Extract (AM)", dosage: '250mg eq.', benefit: 'NGF synthesis & working memory bandwidth' },
      { name: 'Natural Caffeine Alkaloid (AM)', dosage: '35mg', benefit: 'Smooth alertness without adrenergic jitter' },
      { name: 'Methylated B-Complex (AM)', dosage: '100% DV', benefit: 'Direct mitochondrial ATP phosphorylation' },
      { name: 'L-Theanine Bio-Matrix (PM)', dosage: '120mg', benefit: 'Alpha wave generation & vagal calm' },
      { name: 'Magnesium Bisglycinate (PM)', dosage: '80mg', benefit: 'NMDA receptor down-regulation for deep delta sleep' }
    ],
    description: 'Includes 1x Day Fuel (Energy Mist) + 1x Night Reset (Sleep Spray). 180 total microdoses for complete circadian synchronization. Experience boundless cognitive drive by day and uninterrupted, restorative REM and slow-wave sleep cycles by night.',
    usageProtocol: 'Morning: 2 sprays under tongue on waking. Night: 2 sprays under tongue 30 minutes before sleep.',
    inStock: true,
    batchNumber: 'HF-2025-04'
  },
  {
    id: 'am-day-fuel',
    name: 'AM Day Fuel Mist',
    subtitle: 'Sublingual cognitive ignite & adenosine clearance',
    price: 38,
    rating: 4.8,
    reviewCount: 890,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBed-XnVjVm-Wx-ihO0ulhqG_CesArj0WxpN6Dh_cVPCpgqZxVdFhIBx1HJ5Y2O4Dl01v45PZx7EiePyotEvM9aHX0kgC-OLC5boRl4VFZm53AhqGbkOgFUhH7wrk5pleAtrH7y7oL4Fh9VWOalb0v4jRZoPVKECPsY7j0krKFaKJ_onmI5Aq37qHmBWVNDp3oQJv_CRfHXi9SGsAz7kVOP-Xn4bwYyLMv8wdZf3jCA86WJ8lECFbI',
    altText: 'Single high tech pocket spray bottle in sleek obsidian matte finish with neon orange typography and an illuminated flame nozzle on dark glass studio background',
    category: 'day',
    spraysCount: '90 Sprays (45 Days)',
    flavorOrScent: 'Citrus Zest',
    features: [
      'Standalone day formula for clean neural drive',
      'Instant mitochondrial ATP enhancement',
      'Eliminates coffee crash & digestive irritation',
      'Pocket-sized anodized aluminum flask'
    ],
    keyIngredients: [
      { name: "Lion's Mane Hericenones", dosage: '250mg', benefit: 'Neural plasticity & dendritic branch stimulation' },
      { name: 'Micro-Alkaloid Caffeine', dosage: '35mg', benefit: 'Adenosine receptor antagonism with zero spike' },
      { name: 'Methylfolate & B12 (Methylcobalamin)', dosage: '100% DV', benefit: 'Rapid enzymatic neurotransmitter synthesis' },
      { name: 'Citrus Terpene Complex', dosage: '15mg', benefit: 'Invigorating olfactory signaling & mucosal absorption' }
    ],
    description: 'Standalone day formula. Instant mitochondrial ATP enhancement, nootropic focus, and clear mental bandwidth for deep work. Micronized delivery achieves peak plasma concentration in under 90 seconds.',
    usageProtocol: 'Dispense 1-2 sprays directly sublingually (under tongue). Hold for 15 seconds before swallowing.',
    inStock: true,
    batchNumber: 'HF-2025-04'
  },
  {
    id: 'pm-night-reset',
    name: 'PM Night Reset Spray',
    subtitle: 'Parasympathetic vagal activation & delta sleep inducer',
    price: 38,
    rating: 4.9,
    reviewCount: 640,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoOG5iTr34l8jZT08kDjkh1y2fHG1otwolMjEMhWxgGZ8AlOxVEzoeni9HjiPD6BEIu-0jw2pzBaF8ZSch3qeYV0W0DiZTmOSucmzoBeRVOG1_cj7xi7li9a5ibkMhXUGNkiIKBwPKSj39wBtN6spXoxBz_jDDCBf8qsswwkUgm9-D1yxA7rXgtVUqXKu-togizFvKNCYKDti12fS7HLrKbHSTZxkMYjT3t0kiXzSdp0QsUET_Gxk',
    altText: 'Matte dark blue-violet biohacking microdose spray bottle with glowing cyan laser-etched font Hummingbird Fuel Night on a reflective dark slate surface',
    category: 'night',
    spraysCount: '90 Sprays (45 Days)',
    flavorOrScent: 'Alpine Mint',
    features: [
      'Reduces sleep latency to under 12 minutes',
      'Non-hormonal (Zero melatonin dependency or next-day grogginess)',
      'Stimulates nocturnal mitochondrial cell repair',
      'Clinically formulated for high-stress executives & athletes'
    ],
    keyIngredients: [
      { name: 'Bio-Identical L-Theanine', dosage: '120mg', benefit: 'Quiets rumination & ramps slow alpha oscillations' },
      { name: 'Chelated Magnesium Bisglycinate', dosage: '80mg', benefit: 'Muscle tension release & GABAergic tone' },
      { name: 'Micro-Botanical Chamomile Extract', dosage: '20mg', benefit: 'Apigenin vagal receptor binding' },
      { name: 'Organic Alpine Peppermint Terpene', dosage: '10mg', benefit: 'Airway opening & cool sublingual sensation' }
    ],
    description: 'Standalone sleep protocol. Accelerates sleep onset, activates parasympathetic calm, and supports uninterrupted deep sleep cycles without synthetic hormone grogginess.',
    usageProtocol: 'Dispense 2 sprays sublingually 30 minutes before sleep. Darken room for optimal vagal calm.',
    inStock: true,
    batchNumber: 'HF-2025-04'
  },
  {
    id: 'refill-pod-bundle',
    name: 'Aviation Eco-Refill Cartridge Duo',
    subtitle: '2x 90-spray recyclable aluminum drop-in cartridges',
    price: 54,
    originalPrice: 66,
    rating: 4.8,
    reviewCount: 312,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiX3OYIqrdAAnCP0P0hW3Qf0-E2qi2AH9OB-dOEi_FyihjSnbTY6I-LDpyNz9XnGcS1jnY2pWUobMk1POLYdOX1_zv3FeAjhQ2rAjpO4v3gxMp_bLZw1LzS74XTzsu94g_0wsohVRvnI8P3JX-FopLOdGjWiaDN4aJHrGtPW7QCpPmiXYyYbLPOA1zXvFUft38iXEjKILP1efqVFD0tRJQQtC6Vr34dnEJeQTp6Sec54cs5eXmtPQ',
    altText: 'Two eco-friendly aluminum refill cartridges for the Hummingbird Fuel microdose spray system',
    category: 'kit',
    badge: 'Eco-Refill 2-Pack',
    spraysCount: '180 Total Sprays',
    flavorOrScent: '1x Citrus + 1x Alpine Mint',
    features: [
      'Compatible with all Hummingbird Fuel dispenser chassis',
      'Zero-waste 100% recyclable aerospace aluminum casing',
      'Saves 25% compared to purchasing new chassis',
      'Nitrogen-sealed freshness septum'
    ],
    keyIngredients: [
      { name: 'AM + PM Full Formula Matrix', dosage: 'Full Spectrum', benefit: 'Identical clinical concentration to full dispensers' }
    ],
    description: 'Refill your existing Hummingbird Fuel pocket chassis with our nitrogen-sealed aluminum cartridge duo. Includes 1 AM Fuel pod and 1 PM Reset pod.',
    usageProtocol: 'Twist outer shell counter-clockwise, drop out empty cartridge, insert new refill, click into locked position.',
    inStock: true,
    batchNumber: 'HF-2025-04'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    rating: 5,
    quote: '"I replaced my four daily espresso shots with two sprays of AM Fuel. Zero heart palpitations, no sour stomach, and my Oura ring deep sleep increased by 38 minutes within the first week."',
    author: 'Dr. Kieran Vance',
    title: 'Longevity Researcher & Triathlete',
    initials: 'DR',
    colorClass: 'text-[#ffb59e]'
  },
  {
    id: 'test-2',
    rating: 5,
    quote: '"The sublingual delivery is unbelievable. You feel your cognitive horizon sharpen within 90 seconds. And the PM formula shuts down racing thoughts right before bed."',
    author: 'Elena Rostova',
    title: 'Tech Founder & High-Output Executive',
    initials: 'EL',
    colorClass: 'text-[#ffb77f]'
  },
  {
    id: 'test-3',
    rating: 5,
    quote: '"As a flight engineer working across multiple time zones, my circadian rhythm was wrecked. Hummingbird Fuel gave me complete operational control over my wake and sleep windows."',
    author: 'Marcus Kane',
    title: 'Commercial Flight Specialist',
    initials: 'MK',
    colorClass: 'text-[#00f0ff]'
  }
];
