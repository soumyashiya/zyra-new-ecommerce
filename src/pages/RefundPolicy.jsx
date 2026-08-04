import LegalPage from '../components/LegalPage'

const sections = [
  {
    heading: 'Research-use products',
    paragraphs: [
      'All items sold by Zyra Labs, including peptides and laboratory research compounds, are intended strictly for research and development purposes. They are not intended for human consumption, diagnosis, or treatment. By purchasing, you agree to these terms.',
    ],
  },
  {
    heading: 'Returns eligibility',
    paragraphs: [
      'Due to the sensitive nature of our products and to maintain quality assurance, we do not accept returns on opened or used items. Only unopened, unused items in their original condition may be considered for return.',
    ],
  },
  {
    heading: 'Return window',
    paragraphs: [
      'You may request a return within 7 days of delivery. If 7 days have passed since your order was received, we unfortunately cannot offer a refund or exchange.',
    ],
  },
  {
    heading: 'Non-returnable items',
    paragraphs: ['We are unable to accept returns for:'],
    list: [
      'Opened or used items',
      'Products not stored correctly (e.g., not kept refrigerated)',
      'Items not in their original packaging',
      'Returns initiated after 7 days from delivery',
    ],
  },
  {
    heading: 'Reporting issues',
    paragraphs: [
      'If your order arrives damaged, incorrect, or defective, contact our support team at sales@zyralabs.com within 48 hours of delivery. Include your order number, a description of the issue, and supporting photos.',
    ],
  },
  {
    heading: 'Return approval',
    paragraphs: [
      'Once we receive your request, we will assess it and notify you of the approval status. If approved, we will issue return instructions. Return postage is the customer’s responsibility unless the error was ours.',
    ],
  },
  {
    heading: 'Refund processing',
    paragraphs: [
      'Approved refunds are processed to your original payment method within 5–10 business days.',
    ],
  },
  {
    heading: 'Delayed refunds',
    paragraphs: ['If you haven’t received your refund after 10 business days:'],
    list: [
      'First, check with your bank or card issuer.',
      'Then contact us at sales@zyralabs.com for assistance.',
    ],
  },
]

function RefundPolicy() {
  return (
    <LegalPage
      eyebrow="policies"
      title="Refund policy"
      updated="August 3, 2026"
      intro="Thank you for choosing Zyra Labs. We take pride in delivering premium-quality, research-use-only products. Please read the following carefully to understand our returns and refund process."
      sections={sections}
      contact={{
        lead: 'For any order or refund-related queries, please reach out.',
        items: [
          { label: 'Email', href: 'mailto:sales@zyralabs.com', value: 'sales@zyralabs.com' },
          { label: 'Website', href: 'https://zyralabs.com', value: 'zyralabs.com' },
        ],
      }}
      seoTitle="Refund Policy"
      seoPath="/refund-policy"
      seoDescription="Zyra Labs' refund and returns policy for research-grade peptides and laboratory compounds."
    />
  )
}

export default RefundPolicy
