import LegalPage from '../components/LegalPage'

const sections = [
  {
    heading: '1. Official domain',
    paragraphs: [
      'Zyra Labs operates exclusively through zyralabs.com. We have no official storefronts, resellers, or representatives on TikTok, Instagram, Facebook, WhatsApp, Telegram, or any other social media platform.',
      'Any account, page, or individual claiming to sell Zyra Labs products or represent Zyra Labs on social media is unauthorized and not affiliated with us. Please do not send payment to or share personal information with such accounts.',
    ],
  },
  {
    heading: '2. Research-use only',
    paragraphs: [
      'Every product listed by Zyra Labs is sold strictly for laboratory research and development. Our peptides and research compounds are not medicines, supplements, or consumer goods, and they are not intended for human or veterinary use, diagnosis, or treatment.',
      'Product listings, labeling, and certificates of analysis are provided for research reference only.',
    ],
  },
  {
    heading: '3. Quality & documentation',
    paragraphs: [
      'Batches are formulated and independently tested for identity and purity before release. A certificate of analysis is available on request for verified research clients — email research@zyralabs.com with your order number.',
    ],
  },
  {
    heading: '4. Reporting impersonation',
    paragraphs: [
      'If you encounter a website, marketplace listing, or social media account impersonating Zyra Labs or misusing our name or branding, please report it to us so we can investigate.',
    ],
  },
  {
    heading: '5. Media & press enquiries',
    paragraphs: [
      'Journalists and researchers with questions about Zyra Labs, our products, or our quality-control process are welcome to reach out directly — we aim to respond to press enquiries within two business days.',
    ],
  },
]

function PressRelease() {
  return (
    <LegalPage
      eyebrow="press"
      title="Press & brand statement"
      updated="August 3, 2026"
      intro="An official statement from Zyra Labs on our official channels, product scope, and how to reach us for verification or press enquiries."
      sections={sections}
      contact={{
        lead: 'For verification, brand-misuse reports, or press enquiries, please contact:',
        items: [
          { label: 'Press', href: 'mailto:research@zyralabs.com', value: 'research@zyralabs.com' },
          { label: 'Sales', href: 'mailto:sales@zyralabs.com', value: 'sales@zyralabs.com' },
          { label: 'Website', href: 'https://zyralabs.com', value: 'zyralabs.com' },
        ],
      }}
      seoTitle="Press & Brand Statement"
      seoPath="/press-release"
      seoDescription="Zyra Labs' official statement on our authorized channels, product scope, and how to reach us for verification or press enquiries."
    />
  )
}

export default PressRelease
