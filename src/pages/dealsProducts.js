/* Detail-page photography, one folder per product:
   src/assets/new-images/product-detail/<nn product>/ */

/* BPC-157 & TB-500 */
import bpcShot1 from '../assets/new-images/product-detail/02 BPC/ALLUVI Peptide Pen in Sage Light-1.png'
import bpcShot2 from '../assets/new-images/product-detail/02 BPC/ALLUVI pen close-up with soft sage portrait-2.png'
import bpcShot3 from '../assets/new-images/product-detail/02 BPC/Alluvi pen and carton showcase-3.png'

/* Tirzepatide 40mg */
import tirzShot1 from '../assets/new-images/product-detail/04 TIRZ/ALLUVI tirzepatide pen, clearly labelled-1.png'
import tirzShot2 from '../assets/new-images/product-detail/04 TIRZ/ALLUVI tirzepatide pen and carton-2.png'
import tirzShot3 from '../assets/new-images/product-detail/04 TIRZ/ALLUVI Tirzepatide Pen and Carton Showcase-3.png'

/* Retatrutide 20mg */
import reta20Shot1 from '../assets/new-images/product-detail/05 RET 20/Alluvi pen with woman and carton-1.png'
import reta20Shot2 from '../assets/new-images/product-detail/05 RET 20/A closer look at the ALLUVI pen-2.png'
import reta20Shot3 from '../assets/new-images/product-detail/05 RET 20/Alluvi retatrutide pen and carton-3.png'

/* Retatrutide 40mg */
import retaShot1 from '../assets/new-images/product-detail/06 RET 40/Alluvi pen and box editorial portrait-1.png'
import retaShot2 from '../assets/new-images/product-detail/06 RET 40/ALLUVI pen and carton flat lay.png'
import retaShot3 from '../assets/new-images/product-detail/06 RET 40/Alluvi pen and box in focus-3.png'

/* Glow 70mg */
import glowShot1 from '../assets/new-images/product-detail/07 GLOW/Meet Alluvi Glow with signature pen-1.png'
import glowShot2 from '../assets/new-images/product-detail/07 GLOW/ALLUVI GLOW three-peptide product hero-2.png'
import glowShot3 from '../assets/new-images/product-detail/07 GLOW/ALLUVI GLOW Pen Product Spotlight-3.png'

/* NAD+ 1,000mg */
import nadShot1 from '../assets/new-images/product-detail/01 nad/Smiling woman presenting ALLUVI NAD+ pen-1.png'
import nadShot2 from '../assets/new-images/product-detail/01 nad/Understanding NAD+ with the Alluvi pen-2.png'
import nadShot3 from '../assets/new-images/product-detail/01 nad/ALLUVI NAD+ pen and box showcase-3.png'
import nadShot4 from '../assets/new-images/product-detail/01 nad/Centered pen beside the product box-4.png'

/* MOTS-C 40mg */
import motsShot1 from '../assets/new-images/product-detail/08 MOTS/Woman presenting ALLUVI MOTS-C pen-1.png'
import motsShot2 from '../assets/new-images/product-detail/08 MOTS/Alluvi MOTS-C pen, editorial spotlight-2.png'
import motsShot3 from '../assets/new-images/product-detail/08 MOTS/ALLUVI MOTS-C Pen and Box-3.png'

/* Tesamorelin 20mg */
import tesaShot1 from '../assets/new-images/product-detail/03 TES/ALLUVI Tesamorelin Pen Product Showcase-1.png'
import tesaShot2 from '../assets/new-images/product-detail/03 TES/Alluvi Tesamorelin pen, thoughtfully designed-2.png'
import tesaShot3 from '../assets/new-images/product-detail/03 TES/Alluvi Tesamorelin Pen and Carton-3.png'

/* Carton-and-pen packshots — the card image everywhere a product is listed,
   and the first slide of the detail gallery. */
import bpcPack from '../assets/new-images/BPC-157 & TB-500 on emerald sweep-9.png'
import tirzPack from '../assets/new-images/Tirzepatide Pen.png'
import reta20Pack from '../assets/new-images/Retatrutide carton and 5 mg pen-4.png'
import retaPack from '../assets/new-images/Retatrutide carton and pen on amber backdrop-5.png'
import glowPack from '../assets/new-images/Glow GHK-CU carton and blue pen-8.png'
import nadPack from '../assets/new-images/NAD+ carton with yellow pen-6.png'
import motsPack from '../assets/new-images/MOTS-C Carton and Pen on Lilac-3.png'
import cjcPack from '../assets/new-images/CJC-1295 Pen and Carton in Coral Light-2.png'
import tesaPack from '../assets/new-images/Tesamorelin pen and carton in coral light-1.png'

const STORAGE_LOGIC =
  'Store refrigerated (2–8°C). Do not freeze. Supplied in fixed-volume sealed format for laboratory analysis.'

/* Research areas — the header mega-menu cards link here by id, and the
   catalogue page filters on `?area=<id>`. Every product carries exactly one
   `area`, so the four cards partition the catalogue with nothing orphaned. */
export const RESEARCH_AREAS = [
  { id: 'repair', label: 'Repair & recovery' },
  { id: 'metabolic', label: 'Metabolic research' },
  { id: 'cellular', label: 'Longevity & cellular' },
  { id: 'skin', label: 'Skin & hair' },
]

const catalog = [
  {
    id: 'bpc-157-tb-500',
    title: 'BPC-157 & TB-500 40mg',
    subtitle: 'BPC-157 / TB-500 Research Blend',
    area: 'repair',
    price: '$129.00',
    image: bpcPack,
    gallery: [bpcShot1, bpcShot2, bpcShot3],
    description:
      'A 40mg BPC-157 & TB-500 formulation supplied in a pre-filled research device, provided exclusively for controlled laboratory R&D applications. Delivered in sealed format to support compound stability analysis, formulation studies, and delivery mechanism evaluation.',
    highlights: [
      '40mg total active peptide content per unit',
      'Lyophilized for stability during transport and storage',
      'Independently verified ≥99% purity',
      'CoA and HPLC report available on request',
    ],
    specs: {
      'Total content': '40mg',
      Purity: '≥99%',
      Form: 'Lyophilized powder',
      Storage: '2–8°C, dry, dark',
    },
    janoshik: {
      reportUrl:
        'https://verify.janoshik.com/tests/163218-ALLUVI_BPC157_TB500_40MG_KIT_EAI125ZEF8TB',
      batchNumber: 'BP1701FSR',
      fillVolume: '3 mL',
      rows: [
        { compound: 'BPC-157', concentration: '7.33 mg/mL', verifiedContent: '21.99 mg' },
        { compound: 'TB-500', concentration: '6.53 mg/mL', verifiedContent: '19.59 mg' },
      ],
      note: 'Concentration is measured per ml; verified content reflects the total assayed mass across the stated fill volume.',
    },
    packageContents: [
      'Pre-filled research pen (20mg BPC-157, 20mg TB-500)',
      'Research information sheet',
    ],
    storageLogic: STORAGE_LOGIC,
  },
  {
    id: 'tirzepatide',
    title: 'Tirzepatide 40mg',
    subtitle: 'GLP-1 / GIP Dual Agonist',
    area: 'metabolic',
    price: '$179.00',
    image: tirzPack,
    gallery: [tirzShot1, tirzShot2, tirzShot3],
    description:
      'A 40mg Tirzepatide formulation supplied in a pre-filled research device, provided exclusively for controlled laboratory R&D applications. Delivered in sealed format to support compound stability analysis, formulation studies, and delivery mechanism evaluation.',
    highlights: [
      '40mg research unit, lyophilized for stability',
      'Sealed, tamper-evident packaging',
      'Batch-tested for endotoxin levels',
      'Documentation included with every order',
    ],
    specs: {
      'Net content': '40mg',
      Purity: '≥99%',
      Form: 'Lyophilized powder',
      Storage: '−20°C long term · 2–8°C short term',
    },
    janoshik: {
      reportUrl:
        'https://verify.janoshik.com/tests/147174-ALLUVI_TIRZEPATIDE_40MG_KIT_T5MBWRAYD4HN',
      batchNumber: 'TR786PAOS',
      fillVolume: '3 mL',
      purity: '99.85%',
      rows: [
        { compound: 'Tirzepatide', concentration: '13.35 mg/mL', verifiedContent: '40.05 mg' },
      ],
      note: 'Concentration is measured per ml; verified content reflects the total assayed mass across the stated fill volume.',
    },
    packageContents: [
      'Pre-filled research pen (40mg Tirzepatide)',
      'Research information sheet',
    ],
    storageLogic: STORAGE_LOGIC,
  },
  {
    id: 'retatrutide-20',
    title: 'Retatrutide 20mg',
    subtitle: 'Triple Agonist Research Peptide',
    area: 'metabolic',
    price: '$129.00',
    image: reta20Pack,
    gallery: [reta20Shot1, reta20Shot2, reta20Shot3],
    description:
      'A 20mg Retatrutide formulation supplied in a pre-filled research device, provided exclusively for controlled laboratory R&D applications. Delivered in sealed format to support compound stability analysis, formulation studies, and delivery mechanism evaluation.',
    highlights: [
      '20mg research unit',
      '≥99% purity verified by HPLC',
      'Sealed, tamper-evident packaging',
      'Direct support for documentation questions',
    ],
    specs: {
      'Net content': '20mg',
      Purity: '≥99%',
      Form: 'Lyophilized powder',
      Storage: '−20°C long term',
    },
    janoshik: {
      reportUrl:
        'https://verify.janoshik.com/tests/163215-ALLUVI_RETATRUTIDE_20MG_KIT_GBHEFN58JXXZ',
      batchNumber: 'AR1721TRT',
      fillVolume: '2.4 mL',
      purity: '99.21%',
      rows: [
        { compound: 'Retatrutide', concentration: '9.57 mg/mL', verifiedContent: '22.96 mg' },
      ],
      note: 'Concentration is measured per ml; verified content reflects the total assayed mass across the stated fill volume.',
    },
    packageContents: [
      'Pre-filled research pen (20mg Retatrutide)',
      'Research information sheet',
    ],
    storageLogic: STORAGE_LOGIC,
  },
  {
    id: 'retatrutide-40',
    title: 'Retatrutide 40mg',
    subtitle: 'Triple Agonist Research Peptide',
    area: 'metabolic',
    price: '$219.00',
    image: retaPack,
    gallery: [retaShot1, retaShot2, retaShot3],
    description:
      'A 40mg Retatrutide formulation supplied in a pre-filled research device, provided exclusively for controlled laboratory R&D applications. Delivered in sealed format to support compound stability analysis, formulation studies, and delivery mechanism evaluation.',
    highlights: [
      '40mg research unit',
      '≥99% purity verified by HPLC',
      'Sealed, tamper-evident packaging',
      'Direct support for documentation questions',
    ],
    specs: {
      'Net content': '40mg',
      Purity: '≥99%',
      Form: 'Lyophilized powder',
      Storage: '−20°C long term',
    },
    janoshik: {
      reportUrl:
        'https://verify.janoshik.com/tests/163216-ALLUVI_RETATRUTIDE_40MG_KIT_TU3SQLQB9ZDQ',
      batchNumber: 'AR1739JAT',
      fillVolume: '2.4 mL',
      purity: '99.269%',
      rows: [
        { compound: 'Retatrutide', concentration: '18.22 mg/mL', verifiedContent: '43.72 mg' },
      ],
      note: 'Concentration is measured per ml; verified content reflects the total assayed mass across the stated fill volume.',
    },
    packageContents: [
      'Pre-filled research pen (40mg Retatrutide)',
      'Research information sheet',
    ],
    storageLogic: STORAGE_LOGIC,
  },
  {
    id: 'glow',
    title: 'Glow 70mg',
    subtitle: 'GHK-Cu / BPC-157 / TB-500 Research Blend',
    area: 'skin',
    price: '$89.00',
    image: glowPack,
    gallery: [glowShot1, glowShot2, glowShot3],
    description:
      'A 70mg Glow formulation supplied in a pre-filled research device, provided exclusively for controlled laboratory R&D applications. Delivered in sealed format to support compound stability analysis, formulation studies, and delivery mechanism evaluation.',
    highlights: [
      '70mg research unit',
      'High purity, batch verified',
      'Stable lyophilized form',
      'Tamper-evident sealed packaging',
    ],
    specs: {
      'Net content': '70mg',
      Purity: '≥99%',
      Form: 'Lyophilized powder',
      Storage: '2–8°C',
    },
    janoshik: {
      reportUrl: 'https://verify.janoshik.com/tests/163217-ALLUVI_GLOW_70MG_KIT_DCL3AJSE4JQP',
      batchNumber: 'GL0621XSA',
      fillVolume: '3.4 mL',
      rows: [
        { compound: 'GHK-Cu', concentration: '7.59 mg/mL', verifiedContent: '25.8 mg' },
        { compound: 'BPC-157', concentration: '2.39 mg/mL', verifiedContent: '8.13 mg' },
        { compound: 'TB-500', concentration: '1.99 mg/mL', verifiedContent: '6.76 mg' },
      ],
      note: 'Concentration is measured per ml; verified content reflects the total assayed mass across the stated fill volume.',
    },
    packageContents: [
      '2 × pre-filled research pens (each pen contains 5mg BPC-157, 5mg TB-500, 25mg GHK-Cu)',
      'Total contents: 10mg BPC-157, 10mg TB-500, 50mg GHK-Cu',
    ],
    storageLogic: STORAGE_LOGIC,
  },
  {
    id: 'nad-plus-1000',
    title: 'NAD+ 1,000mg',
    subtitle: 'Nicotinamide Adenine Dinucleotide Research Compound',
    area: 'cellular',
    price: '$139.00',
    image: nadPack,
    gallery: [nadShot1, nadShot2, nadShot3, nadShot4],
    description:
      'NAD+ (Nicotinamide Adenine Dinucleotide) research formulation for laboratory analysis and in vitro studies only. Provided exclusively for controlled laboratory R&D applications.',
    highlights: [
      '1,000mg research unit',
      '≥99% purity verified by HPLC',
      'Lyophilized for stability during transport and storage',
      'CoA available on request',
    ],
    specs: {
      'Net content': '1,000mg',
      Purity: '≥99%',
      Form: 'Lyophilized powder',
      Storage: '−20°C long term · 2–8°C short term',
    },
    packageContents: [
      '2 × pre-filled NAD+ pens (500mg each)',
      'Research information sheet',
    ],
    storageLogic: STORAGE_LOGIC,
  },
  /* Strengths below are read off the carton artwork.
     TODO: prices are placeholders — confirm before going live. */
  {
    id: 'mots-c-40',
    title: 'MOTS-C 40mg',
    subtitle: 'Mitochondrial-Derived Research Peptide',
    area: 'cellular',
    price: '$149.00',
    image: motsPack,
    gallery: [motsShot1, motsShot2, motsShot3],
    description:
      'A 40mg MOTS-C formulation supplied in a pre-filled research device, provided exclusively for controlled laboratory R&D applications. Delivered in sealed format to support compound stability analysis, formulation studies, and delivery mechanism evaluation.',
    highlights: [
      '40mg research unit (4 × 10mg)',
      '≥99% purity verified by HPLC',
      'Sealed, tamper-evident packaging',
      'Documentation included with every order',
    ],
    specs: {
      'Net content': '40mg',
      Purity: '≥99%',
      Form: 'Pre-filled pen',
      Storage: '2–8°C',
    },
    packageContents: [
      'Pre-filled research pen (40mg MOTS-C, 4 × 10mg)',
      'Research information sheet',
    ],
    storageLogic: STORAGE_LOGIC,
  },
  {
    id: 'cjc-1295',
    title: 'CJC-1295 10mg',
    subtitle: 'GHRH Analogue (without DAC)',
    area: 'repair',
    price: '$119.00',
    image: cjcPack,
    description:
      'A 10mg CJC-1295 (without DAC) formulation supplied in a pre-filled research device, provided exclusively for controlled laboratory R&D applications. Delivered in sealed format to support compound stability analysis, formulation studies, and delivery mechanism evaluation.',
    highlights: [
      '10mg research unit (25 × 400mcg)',
      '≥99% purity verified by HPLC',
      'Sealed, tamper-evident packaging',
      'Documentation included with every order',
    ],
    specs: {
      'Net content': '10mg',
      Purity: '≥99%',
      Form: 'Pre-filled pen',
      Storage: '2–8°C',
    },
    packageContents: [
      'Pre-filled research pen (10mg CJC-1295 without DAC, 25 × 400mcg)',
      'Research information sheet',
    ],
    storageLogic: STORAGE_LOGIC,
  },
  {
    id: 'tesamorelin-20',
    title: 'Tesamorelin 20mg',
    subtitle: 'GHRH Analogue Research Peptide',
    area: 'repair',
    price: '$159.00',
    image: tesaPack,
    gallery: [tesaShot1, tesaShot2, tesaShot3],
    description:
      'A 20mg Tesamorelin formulation supplied in a pre-filled research device, provided exclusively for controlled laboratory R&D applications. Delivered in sealed format to support compound stability analysis, formulation studies, and delivery mechanism evaluation.',
    highlights: [
      '20mg research unit (10 × 2mg)',
      '≥99% purity verified by HPLC',
      'Sealed, tamper-evident packaging',
      'Documentation included with every order',
    ],
    specs: {
      'Net content': '20mg',
      Purity: '≥99%',
      Form: 'Pre-filled pen',
      Storage: '2–8°C',
    },
    packageContents: [
      'Pre-filled research pen (20mg Tesamorelin, 10 × 2mg)',
      'Research information sheet',
    ],
    storageLogic: STORAGE_LOGIC,
  },
]

/* Display order everywhere products are listed. The two Retatrutide
   strengths are kept apart so near-identical cartons never sit side by side. */
const DISPLAY_ORDER = [
  'bpc-157-tb-500',
  'tirzepatide',
  'mots-c-40',
  'retatrutide-40',
  'glow',
  'retatrutide-20',
  'cjc-1295',
  'nad-plus-1000',
  'tesamorelin-20',
]

/* Merchandising badge shown on product cards. Leave an id out for no badge. */
const TAGS = {
  'bpc-157-tb-500': 'Best seller',
  'retatrutide-40': 'Best seller',
  tirzepatide: 'Best seller',
  'mots-c-40': 'New',
  glow: 'Limited',
  'cjc-1295': 'New',
  'nad-plus-1000': 'Limited',
  'tesamorelin-20': 'New',
}

/* Brand colour per product, picked from each packshot's backdrop:
   [light, deep, glow RGB]. Drives buttons and tinted cards site-wide. */
const ACCENTS = {
  'bpc-157-tb-500': ['#4fcf7d', '#1e9a52', '30 154 82'],
  tirzepatide: ['#4db8ff', '#1580dc', '21 128 220'],
  'retatrutide-20': ['#ff9a3c', '#f26b0f', '242 107 15'],
  'retatrutide-40': ['#ffa64a', '#ee7410', '238 116 16'],
  glow: ['#ff72b8', '#de3189', '222 49 137'],
  'nad-plus-1000': ['#f9b928', '#dc8a00', '220 138 0'],
  'mots-c-40': ['#b36cf0', '#8a2fd1', '138 47 209'],
  'cjc-1295': ['#ff7f86', '#ea4a5a', '234 74 90'],
  'tesamorelin-20': ['#ff6a4d', '#df301e', '223 48 30'],
}

export const products = DISPLAY_ORDER.map((id) => ({
  ...catalog.find((p) => p.id === id),
  tag: TAGS[id],
  accent: ACCENTS[id],
}))

export const getProductById = (id) => products.find((p) => p.id === id)
