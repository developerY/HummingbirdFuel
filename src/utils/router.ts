import { ActiveScreen } from '../types';

export interface RouteState {
  screen: ActiveScreen;
  subpage?: string;
  subtab?: string;
  query?: Record<string, string>;
}

export interface NavDestination {
  id: string;
  title: string;
  category: 'Pages' | 'Cyber-Physical Modules' | 'Store Categories' | 'Interactive Tools';
  description: string;
  icon: string;
  route: RouteState;
  keywords: string[];
  badge?: string;
}

/**
 * Parses current location hash into structured route
 * Supports independent screens:
 * - #/science
 * - #/cyber-physical (or #/cyber-physical/:subtab)
 * - #/store (or #/store/:category)
 * - #/contact
 * - #/
 */
export function parseRoute(rawHash?: string): RouteState {
  const hash = rawHash !== undefined ? rawHash : (typeof window !== 'undefined' ? window.location.hash : '');
  const clean = hash.replace(/^#\/?/, '').trim();

  if (!clean || clean === 'home') {
    return { screen: 'home' };
  }

  const [pathPart, queryPart] = clean.split('?');
  const segments = pathPart.split('/').filter(Boolean);

  const query: Record<string, string> = {};
  if (queryPart) {
    const params = new URLSearchParams(queryPart);
    params.forEach((value, key) => {
      query[key] = value;
    });
  }

  const root = segments[0]?.toLowerCase();

  // Cyber-Physical Systems (Dedicated Page)
  if (root === 'cyber-physical' || root === 'cyberphysical' || root === 'clinical-explorer') {
    const subtab = segments[1]?.toLowerCase() || 'overview';
    return {
      screen: 'cyberphysical',
      subtab,
      query,
    };
  }

  // Science / Sublingual Cellular Delivery (Dedicated Page)
  if (root === 'science' || root === 'fuel' || root === 'delivery') {
    if (segments[1]?.toLowerCase() === 'cyberphysical' || segments[1]?.toLowerCase() === 'cyber-physical') {
      return {
        screen: 'cyberphysical',
        subtab: segments[2]?.toLowerCase() || 'overview',
        query,
      };
    }
    return {
      screen: 'science',
      query,
    };
  }

  // Store & Categories (Dedicated Page)
  if (root === 'store') {
    const subpage = segments[1]?.toLowerCase() || query.category || 'all';
    return {
      screen: 'store',
      subpage,
      query,
    };
  }

  // Contact & Concierge (Dedicated Page)
  if (root === 'contact') {
    return {
      screen: 'contact',
      query,
    };
  }

  return { screen: 'home' };
}

/**
 * Builds canonical hash URL for a route
 */
export function buildHash(route: RouteState): string {
  if (route.screen === 'home') {
    return '#/';
  }

  if (route.screen === 'science' || route.screen === 'fuel') {
    return '#/science';
  }

  if (route.screen === 'cyberphysical') {
    if (route.subtab && route.subtab !== 'overview') {
      return `#/cyber-physical/${route.subtab}`;
    }
    return '#/cyber-physical';
  }

  if (route.screen === 'store') {
    if (route.subpage && route.subpage !== 'all') {
      return `#/store/${route.subpage}`;
    }
    return '#/store';
  }

  if (route.screen === 'contact') {
    return '#/contact';
  }

  return '#/';
}

/**
 * Generates full absolute URL for sharing
 */
export function buildAbsoluteUrl(route: RouteState): string {
  if (typeof window === 'undefined') return '';
  const base = `${window.location.origin}${window.location.pathname}`;
  return `${base}${buildHash(route)}`;
}

/**
 * Updates URL hash without forcing full page reload
 */
export function updateHash(route: RouteState, replace = false) {
  if (typeof window === 'undefined') return;
  const hash = buildHash(route);
  if (window.location.hash === hash) return;

  if (replace) {
    window.history.replaceState(null, '', hash);
  } else {
    window.history.pushState(null, '', hash);
  }
}

/**
 * Searchable destinations for Command Palette (⌘K) & Mega-menu
 */
export const NAV_DESTINATIONS: NavDestination[] = [
  // Primary Pages
  {
    id: 'page-home',
    title: 'Home • Overview',
    category: 'Pages',
    description: 'Circadian protocol architecture, micro-mist delivery physics, and interactive calculator',
    icon: 'home',
    route: { screen: 'home' },
    keywords: ['home', 'overview', 'landing', 'main', 'intro']
  },
  {
    id: 'page-science',
    title: 'Science • Sublingual Cellular Delivery',
    category: 'Pages',
    description: 'Direct lingual venous conduit vs. hepatic first-pass loss, AM/PM matrices, and wearable telemetry',
    icon: 'biotech',
    route: { screen: 'science' },
    keywords: ['science', 'sublingual', 'mucosa', 'absorption', 'delivery', 'bioavailability', 'formulations']
  },
  {
    id: 'page-cyberphysical',
    title: 'Cyber-Physical Systems & Clinical Explorer',
    category: 'Pages',
    description: 'Closed-loop Bateman PK/PD simulator, ISF sensors, McCarthy 2025 RCT, ADHD/oncology, and FDA engine',
    icon: 'memory',
    route: { screen: 'cyberphysical', subtab: 'overview' },
    keywords: ['cyber-physical', 'pk/pd', 'clinical', 'bateman', 'simulator', 'fda', 'mccarthy', 'hardware']
  },
  {
    id: 'page-store',
    title: 'Store • Full Catalog & Hardware',
    category: 'Pages',
    description: '24H Mastery Kits, AM Day Fuel, PM Night Reset, and Aviation Titanium hardware',
    icon: 'storefront',
    route: { screen: 'store', subpage: 'all' },
    keywords: ['store', 'shop', 'order', 'buy', 'catalog', 'products', 'price']
  },
  {
    id: 'page-contact',
    title: 'Contact Biohacker Clinical Concierge',
    category: 'Pages',
    description: 'Direct inquiry for customized circadian dosing protocols and enterprise inquiries',
    icon: 'support_agent',
    route: { screen: 'contact' },
    keywords: ['contact', 'support', 'help', 'email', 'concierge', 'advisory']
  },

  // Cyber-Physical Sub-Modules
  {
    id: 'cp-overview',
    title: 'Cyber-Physical > Overview & Reality Matrix',
    category: 'Cyber-Physical Modules',
    description: '6-dimension matrix comparing 2026 Wearable Delivery vs true Cyber-Physical Systems',
    icon: 'grid_view',
    route: { screen: 'cyberphysical', subtab: 'overview' },
    keywords: ['reality matrix', 'comparison', 'speculative', 'latency', 'cyber-physical', 'overview'],
    badge: 'Reality Matrix'
  },
  {
    id: 'cp-sensors',
    title: 'Cyber-Physical > Sensors & OS Ingestion',
    category: 'Cyber-Physical Modules',
    description: 'ISF microneedles vs optical PPG, 60m wake latency buffer, and SDNN vs RMSSD filtering',
    icon: 'sensors',
    route: { screen: 'cyberphysical', subtab: 'ingestion' },
    keywords: ['sensors', 'isf', 'microneedle', 'ppg', 'latency', 'wake buffer', 'hrv', 'sdnn', 'rmssd'],
    badge: 'Sensors'
  },
  {
    id: 'cp-simulator',
    title: 'Cyber-Physical > Bateman PK/PD Simulator',
    category: 'Cyber-Physical Modules',
    description: 'Live interactive Bateman superposition curves, CYP1A2 genotypes, and Borbély UMP alertness',
    icon: 'query_stats',
    route: { screen: 'cyberphysical', subtab: 'algorithm' },
    keywords: ['bateman', 'simulator', 'pk/pd', 'pharmacokinetics', 'cyp1a2', 'genotype', 'alertness', 'borbely', 'curve'],
    badge: 'Live Simulator'
  },
  {
    id: 'cp-spray',
    title: 'Cyber-Physical > McCarthy 2025 Hardware & Spray Kinetics',
    category: 'Cyber-Physical Modules',
    description: 'McCarthy et al. 2025 double-blind RCT trial results and sub-5-micron piezoelectric actuation',
    icon: 'air',
    route: { screen: 'cyberphysical', subtab: 'delivery' },
    keywords: ['spray', 'mccarthy', 'rct', 'trial', 'piezoelectric', 'solenoid', 'droplet', 'dv50', 'kinetics'],
    badge: 'McCarthy Hardware'
  },
  {
    id: 'cp-clinical',
    title: 'Cyber-Physical > Clinical Verticals (ADHD & Oncology)',
    category: 'Cyber-Physical Modules',
    description: 'ADHD tachyphylaxis vs steady micro-titration & oncology circadian chronotherapy gating',
    icon: 'healing',
    route: { screen: 'cyberphysical', subtab: 'clinical' },
    keywords: ['adhd', 'oncology', 'cancer', 'chronotherapy', 'tachyphylaxis', 'methylphenidate', 'clinical'],
    badge: 'Clinical Verticals'
  },
  {
    id: 'cp-regulatory',
    title: 'Cyber-Physical > 2026 FDA Section 520(o) Engine',
    category: 'Cyber-Physical Modules',
    description: 'Interactive FDA regulatory diagnostic engine under 21st Century Cures Act & SaMD rules',
    icon: 'gavel',
    route: { screen: 'cyberphysical', subtab: 'regulatory' },
    keywords: ['fda', 'regulatory', 'section 520', 'cures act', 'samd', 'combination product', '510k', 'law'],
    badge: 'FDA Engine'
  },

  // Store Subpages & Categories
  {
    id: 'store-kits',
    title: 'Store > Circadian Starter Kits & Titanium Case',
    category: 'Store Categories',
    description: 'All-in-one day/night starter packages with milled aviation titanium pocket case',
    icon: 'inventory_2',
    route: { screen: 'store', subpage: 'kit' },
    keywords: ['starter kit', 'circadian kit', 'titanium case', 'hardware', 'bundle'],
    badge: 'Hardware'
  },
  {
    id: 'store-day',
    title: 'Store > AM Day Fuel (Lion’s Mane + Methyl B12)',
    category: 'Store Categories',
    description: 'Rapid cognitive ignition micro-mist with sustained zero-crash focus',
    icon: 'wb_sunny',
    route: { screen: 'store', subpage: 'day' },
    keywords: ['am fuel', 'day fuel', 'lions mane', 'morning', 'energy spray', 'focus'],
    badge: 'AM Fuel'
  },
  {
    id: 'store-night',
    title: 'Store > PM Night Reset (L-Theanine + Magnesium)',
    category: 'Store Categories',
    description: 'Parasympathetic vagal trigger for deep slow-wave delta sleep',
    icon: 'nights_stay',
    route: { screen: 'store', subpage: 'night' },
    keywords: ['pm reset', 'night spray', 'theanine', 'magnesium', 'sleep', 'delta waves'],
    badge: 'PM Reset'
  },
  {
    id: 'store-refills',
    title: 'Store > Refill 3-Packs & Refill Duos',
    category: 'Store Categories',
    description: 'High-yield eco-refill cartridges for your titanium Hummingbird chassis',
    icon: 'recycling',
    route: { screen: 'store', subpage: 'refills' },
    keywords: ['refills', 'cartridges', '3-pack', 'replacements', 'eco'],
    badge: 'Refills'
  },
  {
    id: 'store-coa',
    title: 'Store > COA Purity Reports & Batch Verification',
    category: 'Store Categories',
    description: 'Inspect third-party HPLC purity, heavy metal zero-tolerance, and batch certificates',
    icon: 'verified_user',
    route: { screen: 'store', subpage: 'coa' },
    keywords: ['coa', 'certificate of analysis', 'batch', 'hplc', 'purity', 'testing', 'lab report'],
    badge: 'Lab Verified'
  },

  // Interactive Tools
  {
    id: 'tool-spray-sim',
    title: 'Tool • Sublingual Aerosol Mist Simulator',
    category: 'Interactive Tools',
    description: 'Simulate high-velocity acoustic micro-droplet plume physics in real time',
    icon: 'stream',
    route: { screen: 'cyberphysical', subtab: 'delivery' },
    keywords: ['spray demo', 'mist simulator', 'droplet animation', 'spray test', 'plume']
  },
  {
    id: 'tool-calculator',
    title: 'Tool • Circadian Microdose Protocol Calculator',
    category: 'Interactive Tools',
    description: 'Calculate your personalized AM/PM micro-mist schedule based on wake time & metabolic rate',
    icon: 'calculate',
    route: { screen: 'home' },
    keywords: ['calculator', 'dosing', 'schedule', 'custom dosage', 'protocol']
  }
];
