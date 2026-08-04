import LegalPage from '../components/LegalPage'

const sections = [
  {
    heading: 'Introduction',
    paragraphs: [
      'This Privacy Policy explains how Zyra Labs ("we", "us", "our") collects, uses, and protects your personal information when you visit or make a purchase from zyralabs.com.',
      'We are committed to safeguarding your privacy and complying with applicable data protection laws.',
    ],
  },
  {
    heading: 'What we collect',
    paragraphs: ['We may collect and process the following types of data:'],
    list: [
      'Your name and contact details',
      'Shipping and billing addresses',
      'Email correspondence or messages',
      'Purchase history and transaction details',
      'Technical data like IP address, browser type, and device information',
    ],
  },
  {
    heading: 'How we use your information',
    paragraphs: ['We use your information to:'],
    list: [
      'Process and fulfill orders',
      'Provide customer service and order updates',
      'Respond to enquiries or requests',
      'Improve website functionality and experience',
      'Comply with legal or regulatory obligations',
    ],
  },
  {
    heading: 'Third-party sharing',
    paragraphs: [
      'We only share data with trusted third-party providers who help us operate our business, such as:',
    ],
    list: ['Payment processors', 'Couriers and logistics providers', 'Website and IT service platforms'],
  },
  {
    heading: 'Data security',
    paragraphs: ['We implement appropriate security measures to protect your personal information, including:'],
    list: [
      'Secure Socket Layer (SSL) encryption on our website',
      'Limited access to data by authorized staff only',
      'Regular reviews of data security practices',
    ],
  },
  {
    heading: 'Your rights',
    paragraphs: ['You have the right to:'],
    list: [
      'Access the personal data we hold on you',
      'Request corrections to inaccurate information',
      'Request data deletion (where appropriate)',
      'Object to certain processing activities',
      'Withdraw consent at any time',
    ],
  },
  {
    heading: 'Cookies',
    paragraphs: [
      'We use cookies to enhance your experience and track usage patterns. You can manage or disable cookies in your browser settings at any time.',
    ],
  },
  {
    heading: 'Data retention',
    paragraphs: [
      'We retain your data only for as long as necessary to fulfill the purposes outlined in this policy, including legal, accounting, or regulatory obligations.',
    ],
  },
  {
    heading: 'Policy updates',
    paragraphs: [
      'We may update this Privacy Policy periodically. Any changes will be posted here with a new effective date.',
    ],
  },
]

function PrivacyPolicy() {
  return (
    <LegalPage
      eyebrow="policies"
      title="Privacy policy"
      updated="August 3, 2026"
      sections={sections}
      contact={{
        lead: 'To exercise your rights or for any data-related queries, please reach out.',
        items: [
          { label: 'Email', href: 'mailto:research@zyralabs.com', value: 'research@zyralabs.com' },
          { label: 'Website', href: 'https://zyralabs.com', value: 'zyralabs.com' },
        ],
      }}
      seoTitle="Privacy Policy"
      seoPath="/privacy-policy"
      seoDescription="How Zyra Labs collects, uses, and protects your personal information."
    />
  )
}

export default PrivacyPolicy
