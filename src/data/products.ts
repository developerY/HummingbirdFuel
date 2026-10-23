import { Product, Testimonial } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'circadian-mastery-system',
    name: 'The 24H Circadian Mastery System',
    subtitle: 'The apex full-spectrum stack with aerospace titanium dock',
    price: 68,
    originalPrice: 94,
    rating: 4.96,
    reviewCount: 1420,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeTQ10zN_dd-DqTgAB6_wF5qoo7TfEXfF_AmpFwZuSG102yJ4zbl6bzn4sbPK11XET7fATEWfBAVkstb1IlSon86qKGZn4S09_6bpWxQklXOr9tkYD_ilJr9maFXGrPoRLKNgq2EX-VX2zA_i-ICTXR8tYS1Me8ohgajolmB0_wf4DnKdLmPuPuIaUTiXAURHFJAl6NvFN3ddSRV27uZTm116ZjaK94Y6fCOgqSTrCyttxyzYaZ7w',
    altText: 'Futuristic luxury display of dual Hummingbird Fuel microdose sublingual spray canisters on an obsidian docking station',
    category: 'kit',
    badge: 'Recommended Starter Protocol • Save 28%',
    spraysCount: '180 Total (90 Day + 90 Night)',
    flavorOrScent: 'Citrus Zest (AM) + Alpine Mint (PM)',
    features: [
      'Dual matrix emission: AM Cognitive Ignite + PM Delta Recovery',
      'Includes aerospace Grade 5 titanium docking cradle',
      'Instant sublingual mucosal delivery bypasses GI degradation',
      '24-Hour biological circadian lock and adenosine clearance'
    ],
    keyIngredients: [
      { name: "Lion's Mane Nano-Extract (AM)", dosage: '250mg eq.', benefit: 'NGF synthesis & working memory bandwidth' },
      { name: 'Natural Caffeine Alkaloid (AM)', dosage: '35mg', benefit: 'Smooth alertness without adrenergic jitter' },
      { name: 'Methylated B-Complex (AM)', dosage: '100% DV', benefit: 'Direct mitochondrial ATP phosphorylation' },
      { name: 'L-Theanine Bio-Matrix (PM)', dosage: '120mg', benefit: 'Alpha wave generation & vagal calm' },
      { name: 'Magnesium Bisglycinate (PM)', dosage: '80mg', benefit: 'NMDA receptor down-regulation for deep delta sleep' }
    ],
    description: 'The apex full-spectrum stack. Ignites ATP phosphorylation & dopamine release at dawn; resets GABA and triggers endogenous melatonin production at dusk. Instant sublingual mucosal delivery bypasses gastrointestinal degradation.',
    usageProtocol: 'Morning: 2 sprays under tongue on waking. Night: 2 sprays under tongue 30 minutes before sleep.',
    inStock: true,
    batchNumber: 'HF-2025-04'
  },
  {
    id: 'am-day-fuel',
    name: 'AM Day Fuel Mist',
    subtitle: 'Sublingual cognitive ignite & adenosine clearance',
    price: 38,
    rating: 4.9,
    reviewCount: 890,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4RE3xi6dV_0qjJVwGbcpl8O2iiPxEBtHS9USIN59c7pPLyA_Cp9LVFZoq6m-e-4QOrYTA6LMUQSSRI8SC-UOggjNJajNHGNxE5707vlyXOvTORTyMhktZAwoX_QbiknispM60hK2-wXVvp1PLXLa8PRwvtRnkwVfG95uWW9EwaZCfIZDhGPq4fZQZwhOUHNzCRK94pQ-MbCCjTxDL3nuowuATRDykX6Axjli1_1RgrpfB-Vzqpgk',
    altText: 'Hummingbird Fuel AM Day Fuel Mist canister glowing with sharp solar amber luminescence against an obsidian reflective laboratory surface',
    category: 'day',
    badge: 'POPULAR',
    spraysCount: '90 Micro-Mists (30 Days)',
    flavorOrScent: 'Citrus Zest & Yuzu Peel',
    features: [
      'Standalone day formula for clean neural drive',
      'Lion’s Mane mycelium & bioactive Methyl-B12',
      'Pure alkaloid nanodroplets for clean adrenergic velocity',
      '0.01 mL precision nozzle with 99.8% mucosal bio-uptake'
    ],
    keyIngredients: [
      { name: "Lion's Mane Hericenones", dosage: '250mg', benefit: 'Neural plasticity & dendritic branch stimulation' },
      { name: 'Micro-Alkaloid Caffeine', dosage: '35mg', benefit: 'Adenosine receptor antagonism with zero spike' },
      { name: 'Methylfolate & B12 (Methylcobalamin)', dosage: '100% DV', benefit: 'Rapid enzymatic neurotransmitter synthesis' },
      { name: 'Citrus Terpene Complex', dosage: '15mg', benefit: 'Invigorating olfactory signaling & mucosal absorption' }
    ],
    description: 'Lion’s Mane mycelium, bioactive Methyl-B12, and pure alkaloid nanodroplets for clean adrenergic velocity. Instant mitochondrial ATP enhancement and clear mental bandwidth for deep work.',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXK_9uRM1XJzIv6dDgVFpfeEI4tlZRiTRROE-HevUDbBx-icOJkG9APeduyzm0nkuQFPhA1NTZ_1HD59hBJr-_2pjgDwhzfzU4jreAo2yjA0q4E56N39_eFix2UMl8cIk2joMTB1ZImD_19sBibWFLBaqvdOSDi1KkkwUQUh12fD-If4tqYLFwRJNxeUbn6mRKfPC-EJshI8ckivJe7nQ6GLNhD3-KOdibMYQw8za2a3oFi0cR9gU',
    altText: 'Hummingbird Fuel PM Night Reset Spray canister bathed in soft moonlit cyan and deep indigo atmospheric glow',
    category: 'night',
    badge: 'DELTA DEEP SLEEP',
    spraysCount: '90 Micro-Mists (30 Days)',
    flavorOrScent: 'Alpine Mint & French Lavender',
    features: [
      'Chelated Magnesium Bisglycinate & pharma-grade L-Theanine',
      'Botanical GABA triggers for rapid deep-wave REM sleep',
      'Reduces sleep latency to under 12 minutes',
      'Zero synthetic melatonin dependency or next-day grogginess'
    ],
    keyIngredients: [
      { name: 'Bio-Identical L-Theanine', dosage: '120mg', benefit: 'Quiets rumination & ramps slow alpha oscillations' },
      { name: 'Chelated Magnesium Bisglycinate', dosage: '80mg', benefit: 'Muscle tension release & GABAergic tone' },
      { name: 'Micro-Botanical Chamomile Extract', dosage: '20mg', benefit: 'Apigenin vagal receptor binding' },
      { name: 'Alpine Mint Terpene', dosage: '10mg', benefit: 'Airway opening & cool sublingual sensation' }
    ],
    description: 'Chelated Magnesium Bisglycinate, Pharma-grade L-Theanine, and botanical GABA triggers for rapid deep-wave REM sleep. Accelerates sleep onset, activates parasympathetic calm, and supports uninterrupted deep sleep cycles.',
    usageProtocol: 'Dispense 2 sprays sublingually 30 minutes before sleep. Darken room for optimal vagal calm.',
    inStock: true,
    batchNumber: 'HF-2025-04'
  },
  {
    id: 'am-refills-3x',
    name: '3-Pack AM Protocol Refills',
    subtitle: 'Triple batch cartridge refill kit for continuous daily drive',
    price: 95,
    originalPrice: 114,
    rating: 5.0,
    reviewCount: 312,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2MN4pEpAwPTP6IphPL00cZFvmtFSCDm5Li3xbw9MmWCyR6_eoep3b_0BIThdwlb1aft-R7g7bx3U42YtRE4GyTfEn3BCsmJ7n5ekDiS7vjfmo7OMQACAXWDMET_rnwms391Ds0qrLFbo20xQxJnkEOZdl1v-7puUgl8f7ztRzx4r9R3XSWyxqwMg8vc_saMWux1qCqqWrFut4nrCtcA5qdfpaBScWNuFwl9DluhVbCuH5qdtvBB8',
    altText: 'Three precision Hummingbird Fuel AM refill ampoules neatly aligned in a vacuum-sealed matte black tech tray',
    category: 'accessory',
    badge: 'BEST BULK VALUE',
    spraysCount: '270 Sprays (90 Days)',
    flavorOrScent: 'Citrus Zest & Yuzu Peel',
    features: [
      'Triple batch cartridge refill kit (3x full 30-day reservoirs)',
      'Zero plastic waste, hermetically sealed amber glass cartridges',
      'Snaps directly into your existing actuator chassis',
      'Saves $19 compared to purchasing standalone units'
    ],
    keyIngredients: [
      { name: 'Full AM Day Fuel Matrix', dosage: 'Triple Concentration', benefit: 'Pure mitochondrial ATP boost' }
    ],
    description: 'Triple batch cartridge refill kit. Zero plastic waste, hermetically sealed amber glass cartridges ready to snap into your actuator. Supply: 3x Full 30-Day Reservoirs (270 total sprays).',
    usageProtocol: 'Twist chassis, discard depleted vial, drop in fresh cartridge, lock into place.',
    inStock: true,
    batchNumber: 'HF-2025-04'
  },
  {
    id: 'titanium-pocket-case',
    name: 'Precision Billet Titanium Case',
    subtitle: '5-Axis CNC machined aerospace titanium Grade 5 armor',
    price: 24,
    rating: 4.9,
    reviewCount: 420,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQjoI9n1UKlCxoZXQzGPEMZeewKn8XHJiFji6cq5e6IJssdWYQ3zUwr82Fez3dBzK70ODUtjUGxSbgPi5xdos_r0zspUguyDA2OISjfTQkUcrUIogtPeSogT4I33cCVL4eij_hvSLU5xW6cYLW5jmf5yuC566VFFCjfZaZ7mXRUdbTHMLNzqqiSYlZYUKZT7a3oRFfH7y_4Wz9CUXPgaKEB692AccbmD3xTU7g23wSNWfOBRlkhp8',
    altText: 'Aerospace Grade 5 Billet Titanium pocket case for Hummingbird Fuel canisters',
    category: 'accessory',
    badge: 'HARDWARE',
    spraysCount: 'Hardware Chassis',
    flavorOrScent: 'Grade 5 Titanium • 42 Grams',
    features: [
      '5-Axis CNC machined aerospace titanium Grade 5 armor',
      'Shockproof, airtight, micro magnetic quick-snap lid',
      'Knurled tactical grip with laser-etched batch serial number',
      'Backed by Hummingbird Fuel Lifetime Warranty'
    ],
    keyIngredients: [
      { name: 'Aerospace Titanium Alloy', dosage: '100% Grade 5', benefit: 'Indestructible everyday pocket carry' }
    ],
    description: '5-Axis CNC machined aerospace titanium Grade 5 armor. Shockproof, airtight, magnetic quick-snap lock for pocket carry. Material: Grade 5 Titanium • 42 Grams.',
    usageProtocol: 'Slide microdose spray canister into chamber; lid snaps magnetically.',
    inStock: true,
    batchNumber: 'HF-EDC-TI'
  },
  {
    id: 'circadian-starter-kit',
    name: 'The 24H Circadian Starter Kit',
    subtitle: 'Dual-phase cognitive acceleration & deep sleep architecture',
    price: 68,
    originalPrice: 84,
    rating: 4.9,
    reviewCount: 1240,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiX3OYIqrdAAnCP0P0hW3Qf0-E2qi2AH9OB-dOEi_FyihjSnbTY6I-LDpyNz9XnGcS1jnY2pWUobMk1POLYdOX1_zv3FeAjhQ2rAjpO4v3gxMp_bLZw1LzS74XTzsu94g_0wsohVRvnI8P3JX-FopLOdGjWiaDN4aJHrGtPW7QCpPmiXYyYbLPOA1zXvFUft38iXEjKILP1efqVFD0tRJQQtC6Vr34dnEJeQTp6Sec54cs5eXmtPQ',
    altText: 'Two sleek minimalist matte-black microdose spray bottles labeled AM and PM sitting on a dark volcanic stone pedestal',
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
      { name: "Lion's Mane Nano-Extract (AM)", dosage: '250mg eq.', benefit: 'NGF synthesis & working memory' },
      { name: 'Natural Caffeine Alkaloid (AM)', dosage: '35mg', benefit: 'Smooth alertness without jitters' },
      { name: 'L-Theanine & Magnesium (PM)', dosage: '200mg', benefit: 'Vagal calm & delta sleep induction' }
    ],
    description: 'Includes 1x Day Fuel (Energy Mist) + 1x Night Reset (Sleep Spray). 180 total microdoses for complete circadian synchronization.',
    usageProtocol: 'Morning: 2 sprays under tongue on waking. Night: 2 sprays under tongue 30 minutes before sleep.',
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
    category: 'accessory',
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
      { name: 'AM + PM Full Formula Matrix', dosage: 'Full Spectrum', benefit: 'Identical clinical concentration' }
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
