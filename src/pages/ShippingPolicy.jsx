import LegalPage from '../components/LegalPage'

const sections = [
  {
    heading: 'Dispatch time',
    paragraphs: [
      'Orders placed and paid for before 3pm (ET) on business days are typically dispatched the same day. Orders received after 3pm or on weekends/public holidays are dispatched the next business day.',
    ],
  },
  {
    heading: 'Shipping carriers',
    paragraphs: [
      'We use tracked and signed-for courier services (e.g., USPS, UPS, FedEx) depending on destination, weight, and service availability. Once shipped, you will receive tracking information by email.',
    ],
  },
  {
    heading: 'Delivery times',
    list: [
      'Domestic orders: typically delivered 2–5 business days after dispatch.',
      'International orders: delivery times vary by location and customs handling, but usually range from 5–14 business days.',
    ],
  },
  {
    heading: 'Shipping fees',
    paragraphs: [
      'Shipping costs are shown at checkout, calculated based on your location and parcel weight. We occasionally offer free shipping promotions.',
    ],
  },
  {
    heading: 'Order tracking',
    paragraphs: [
      'All shipments include tracking. You’ll receive a tracking number once your parcel leaves our fulfillment center.',
    ],
  },
  {
    heading: 'Failed delivery attempts',
    paragraphs: [
      'If no one is available to accept the parcel, the courier may leave a notice or attempt redelivery. Please follow up with the courier directly using your tracking number.',
    ],
  },
  {
    heading: 'Customs & import duties',
    paragraphs: [
      'International buyers are responsible for any applicable customs duties, taxes, or import fees. These charges are not included in our product or shipping prices.',
    ],
  },
  {
    heading: 'Delivery issues',
    paragraphs: [
      'If your parcel is delayed, lost, or arrives damaged, please contact us at sales@zyralabs.com within 72 hours of the expected delivery date. Include your order number and tracking details.',
    ],
  },
  {
    heading: 'Address accuracy',
    paragraphs: [
      'Please ensure your delivery details are entered correctly. We cannot be held responsible for delivery issues resulting from incorrect or incomplete address information.',
    ],
  },
]

function ShippingPolicy() {
  return (
    <LegalPage
      eyebrow="policies"
      title="Shipping policy"
      updated="August 3, 2026"
      intro="This shipping policy outlines how orders placed on zyralabs.com are processed, dispatched, and delivered."
      sections={sections}
      contact={{
        lead: 'For any shipping-related queries, please reach out.',
        items: [
          { label: 'Email', href: 'mailto:sales@zyralabs.com', value: 'sales@zyralabs.com' },
          { label: 'Website', href: 'https://zyralabs.com', value: 'zyralabs.com' },
        ],
      }}
      seoTitle="Shipping Policy"
      seoPath="/shipping-policy"
      seoDescription="How Zyra Labs processes, dispatches, and delivers orders for research-grade peptides and laboratory compounds."
    />
  )
}

export default ShippingPolicy
