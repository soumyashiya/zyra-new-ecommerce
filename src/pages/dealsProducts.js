/* BPC-157 & TB-500 */
import bpcFront from '../assets/images/alluvi/bpc-bpcfrontnew.jpg'
import bpcPen from '../assets/images/alluvi/bpc-bpcpen.jpg'
import bpcOpen from '../assets/images/alluvi/bpc-bpcopen.jpg'
import bpcUv from '../assets/images/alluvi/bpc-uvbpc.jpg'

/* Tirzepatide 40mg */
import tirzFront from '../assets/images/alluvi/tirzepetide-Artboard2.jpg'
import tirzCopy from '../assets/images/alluvi/tirzepetide-Artboard2copy.jpg'
import tirzOpen from '../assets/images/alluvi/tirzepetide-trizyopen.jpg'
import tirzUv from '../assets/images/alluvi/tirzepetide-trizyuv.jpg'

/* Retatrutide 20mg */
import reta20Front from '../assets/images/alluvi/retatwenty-retafront.jpeg'
import reta20A from '../assets/images/alluvi/retatwenty-Artboard4copy.jpg'
import reta20B from '../assets/images/alluvi/retatwenty-Artboard4copy3.jpg'
import reta20Uv from '../assets/images/alluvi/retatwenty-retatwentyuv.jpg'

/* Retatrutide 40mg */
import retaFront from '../assets/images/alluvi/retafourty-retafrontnew.jpg'
import retaPen from '../assets/images/alluvi/retafourty-retpen.jpg'
import retaOpen from '../assets/images/alluvi/retafourty-retaopen.jpg'
import retaUv from '../assets/images/alluvi/retafourty-retauv.jpg'

/* Glow 70mg */
import glowFront from '../assets/images/alluvi/glow-glowfrontnew.jpg'
import glowPen from '../assets/images/alluvi/glow-glowpen.jpg'
import glowOpen from '../assets/images/alluvi/glow-glowopen.jpg'
import glowUv from '../assets/images/alluvi/glow-glowuv.jpg'

/* NAD+ 1,000mg */
import nadFront from '../assets/images/alluvi/nad-nadfront.jpg'
import nadPen from '../assets/images/alluvi/nad-nadpen.jpg'
import nadOpen from '../assets/images/alluvi/nad-nadopen.jpg'
import nadUv from '../assets/images/alluvi/nad-uvnad.jpg'

const STORAGE_LOGIC =
  'Store refrigerated (2–8°C). Do not freeze. Supplied in fixed-volume sealed format for laboratory analysis.'

export const products = [
  {
    id: 'bpc-157-tb-500',
    title: 'BPC-157 & TB-500 40mg',
    subtitle: 'BPC-157 / TB-500 Research Blend',
    price: '$129.00',
    image: bpcFront,
    gallery: [bpcFront, bpcPen, bpcOpen, bpcUv],
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
    price: '$179.00',
    image: tirzFront,
    gallery: [tirzFront, tirzCopy, tirzOpen, tirzUv],
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
    price: '$129.00',
    image: reta20Front,
    gallery: [reta20Front, reta20A, reta20B, reta20Uv],
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
    price: '$219.00',
    image: retaFront,
    gallery: [retaFront, retaPen, retaOpen, retaUv],
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
    price: '$89.00',
    image: glowFront,
    gallery: [glowFront, glowPen, glowOpen, glowUv],
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
    price: '$139.00',
    image: nadFront,
    gallery: [nadFront, nadPen, nadOpen, nadUv],
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
]

export const getProductById = (id) => products.find((p) => p.id === id)
