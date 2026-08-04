import LegalPage from '../components/LegalPage'

const sections = [
  {
    heading: 'General',
    paragraphs: [
      'These Terms govern your use of zyralabs.com. We may update these Terms from time to time without notice. Continued use of the website constitutes acceptance of the current Terms.',
    ],
  },
  {
    heading: 'Age requirement',
    paragraphs: [
      'By accessing this site, you confirm that you are at least 18 years old and are legally able to enter into contracts. Our products and services are intended only for individuals who meet this requirement.',
    ],
  },
  {
    heading: 'Product use',
    paragraphs: [
      'Products sold on zyralabs.com are supplied strictly for research and development purposes under controlled conditions. They are not to be used for diagnosis, treatment, or prevention of any disease or medical condition, nor for human or veterinary consumption.',
    ],
  },
  {
    heading: 'Orders & payment',
    paragraphs: [
      'All orders are subject to acceptance and availability. We reserve the right to refuse or cancel orders at our discretion. Payment must be made in full before orders are dispatched.',
    ],
  },
  {
    heading: 'Dispatch & delivery',
    paragraphs: [
      'We aim to dispatch orders within a reasonable timeframe. Shipping timelines are estimates and are not guaranteed; we are not liable for delays beyond our control. See our Shipping Policy for details.',
    ],
  },
  {
    heading: 'Refund policy',
    paragraphs: [
      'Due to the nature of our products, returns are only accepted for items that are unopened, unused, and in their original condition. Opened or tampered-with items are non-refundable. See our Refund Policy for details.',
    ],
  },
  {
    heading: 'Disclaimer',
    paragraphs: [
      'All products are sold solely for laboratory research and development. Zyra Labs does not accept or condone misuse, including but not limited to human consumption, veterinary use, or resale.',
    ],
  },
  {
    heading: 'Limitation of liability',
    paragraphs: [
      'By using this site, you agree to indemnify and hold harmless Zyra Labs, its directors, and affiliates from any claims, damages, or liabilities arising from product use or misuse under these Terms.',
    ],
  },
  {
    heading: 'Account responsibility',
    paragraphs: [
      'If you create an account on our website, you are responsible for maintaining the confidentiality of your login credentials. All activity conducted under your account is your responsibility.',
    ],
  },
  {
    heading: 'Intellectual property',
    paragraphs: [
      'All trademarks, logos, and content displayed on zyralabs.com are owned or licensed by Zyra Labs. You may not reproduce, distribute, or commercially exploit any content without prior written consent.',
    ],
  },
  {
    heading: 'Governing law',
    paragraphs: [
      'These Terms are governed by and construed in accordance with the laws of the United States. Any disputes arising will be subject to the exclusive jurisdiction of the courts in Zyra Labs’ state of registration.',
    ],
  },
]

function TermsOfService() {
  return (
    <LegalPage
      eyebrow="policies"
      title="Terms of service"
      updated="August 3, 2026"
      intro="You are using the official website of Zyra Labs (“we”, “us”, “our”). By using this site, you agree to comply with the following terms. Please read them carefully. If you do not agree with any part of these terms, please do not use our website or services."
      sections={sections}
      contact={{
        lead: 'For any terms-related queries, please reach out.',
        items: [
          { label: 'Email', href: 'mailto:research@zyralabs.com', value: 'research@zyralabs.com' },
          { label: 'Website', href: 'https://zyralabs.com', value: 'zyralabs.com' },
        ],
      }}
      seoTitle="Terms of Service"
      seoPath="/terms-of-service"
      seoDescription="The terms and conditions governing your use of zyralabs.com."
    />
  )
}

export default TermsOfService
