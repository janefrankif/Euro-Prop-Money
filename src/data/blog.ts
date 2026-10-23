export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  content: string[];
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'legal-rules-european-films',
    slug: 'legal-rules-for-prop-money-in-european-films',
    title: 'Legal Rules for Prop Money in European Films: ECB Decision 2013/10 Explained',
    category: 'Legal Compliance',
    readTime: '5 min read',
    date: 'October 2026',
    summary: 'A definitive guide for Line Producers and Prop Masters navigating European Central Bank regulations, dimensional variance thresholds, and customs transit clearance.',
    tags: ['ECB Regulations', 'Prop Master Guide', 'Customs Clearance'],
    content: [
      'Producing crime thrillers, heist features, or television dramas within the European Union requires strict adherence to European Central Bank Decision ECB/2013/10. Under Article 2, unauthorized reproductions of euro banknotes are classified as counterfeits unless specific legal criteria are satisfied.',
      'To qualify for legal safe harbor, two-sided reproductions must either be at least 125% of the genuine banknote’s length and width or less than 75% of both dimensions. Furthermore, indelible markings such as "FOR MOTION PICTURE USE ONLY" and "PROP SPECIMEN" must be prominently printed on both obverse and reverse faces.',
      'Paper selection is equally critical. Genuine euro notes use 100% cotton fiber. Legally compliant movie props utilize non-cotton, non-fluorescent cellulose bond paper without optical variable inks, security threads, or foil watermarks.',
      'When shooting on public location streets, always carry an official Certificate of Manufacture and notify local police liaisons to avoid public panic and set shutdowns.'
    ],
  },
  {
    id: 'prop-money-ai-video-production',
    slug: 'how-to-use-prop-money-in-ai-video-production',
    title: 'How to Use Prop Money in AI Video Production & Virtual Studio Sets',
    category: 'Virtual Production',
    readTime: '4 min read',
    date: 'October 2026',
    summary: 'Discover how generative AI video tools, NeRF 3D capture, and LED volume stages benefit from tangible, camera-calibrated prop currency.',
    tags: ['AI Filmmaking', 'Virtual Production', 'LED Volume Stages'],
    content: [
      'As AI video generation tools (such as Sora, Runway Gen-3, and Unreal Engine 5 virtual stages) transform production pipelines, tangible physical props remain irreplaceable for realistic actor hand-offs, physics interactions, and lighting bounce.',
      'When filming on LED volume stages, high-gloss paper props bounce uncontrolled LED panel reflections into camera sensors, disrupting generative inpainting and motion vectors. Our ultra-matte 120gsm bond paper absorbs scattered light, ensuring seamless integration between live-action footage and AI background plates.',
      'Photogrammetry and Gaussian Splatting workflows also require non-specular surface textures to construct clean 3D assets for digital doubles and synthetic VFX inserts.'
    ],
  },
  {
    id: 'anamorphic-lenses-sensor-glare',
    slug: 'anamorphic-lenses-vs-prop-banknotes-sensor-glare',
    title: 'Anamorphic Lenses vs Prop Banknotes: Eliminating Camera Glare Under 8K Sensors',
    category: 'Cinematography',
    readTime: '6 min read',
    date: 'September 2026',
    summary: 'Why cheap glossy novelty money fails on ARRI ALEXA 35 and RED V-Raptor sensors, and how non-reflective coatings preserve logarithmic latitude.',
    tags: ['Cinematography', 'ARRI ALEXA', 'Lighting Setups'],
    content: [
      'Cinematographers know that lighting a money counting scene requires balancing key highlights and soft fill without blowing out paper whites. Budget commercial props coated with plastic sheen produce intense specular streaks across anamorphic glass.',
      'Under high-output 1.2kW HMI and 800W tungsten bounce sources, CINE EURO’s specialized matte finish maintains accurate tonality across 17+ stops of dynamic range on ARRI Log-C4 and RED IPP2 color spaces.',
      'Macro close-up tests confirm that micro-lettering reads crisp on 8K camera monitors while remaining within European legal safety bounds.'
    ],
  },
  {
    id: 'customs-clearance-co-productions',
    slug: 'customs-clearance-checklist-european-co-productions',
    title: 'Props On Call Sheet: Customs Clearance Checklist for European Co-Productions',
    category: 'Production Logistics',
    readTime: '4 min read',
    date: 'September 2026',
    summary: 'Essential procedures for transporting large quantities of prop money across European borders, ATA Carnet preparation, and airport security.',
    tags: ['Logistics', 'ATA Carnet', 'Border Transport'],
    content: [
      'Crossing international borders with bags or cases filled with hundreds of thousands in prop euro banknotes can trigger immediate border security detentions without proper paperwork.',
      'Every bulk order from CINE EURO includes a stamped, dual-language Certificate of Authenticity and reference to ECB Decision 2013/10. Include these documents directly into your art department ATA Carnet manifest.',
      'Always store prop bundles in identifiable production equipment flight cases with clear "ART DEPARTMENT PROPERTY" tagging rather than unmarked luggage.'
    ],
  },
];
