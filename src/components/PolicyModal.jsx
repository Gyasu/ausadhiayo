import { useEffect } from 'react'

const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    body: `Last updated: March 2026

Ausadhi Ayo Inc. ("we", "us", or "our") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our prescription delivery service.

**Information We Collect**
We collect personal information you provide when signing up, including your name, date of birth, phone number, email address, insurance details, prescription information, doctor and pharmacy details, and delivery address.

**How We Use Your Information**
Your information is used solely to process and deliver your prescription medications, verify your prescriptions with your doctor and pharmacy, communicate with you about your deliveries, and comply with applicable healthcare regulations.

**Data Storage & Security**
All data is stored securely and handled in accordance with HIPAA regulations. We use industry-standard encryption to protect your information during transmission and storage. We do not sell, rent, or share your personal information with third parties for marketing purposes.

**Data Retention**
We retain your information for as long as necessary to provide our services and comply with legal obligations.

**Your Rights**
You have the right to access, correct, or request deletion of your personal information. To exercise these rights, contact us at support@ausadhiayo.com.

**Contact**
If you have questions about this Privacy Policy, please contact us at support@ausadhiayo.com.`,
  },

  terms: {
    title: 'Terms of Service',
    body: `Last updated: March 2026

By using Ausadhi Ayo's prescription delivery service, you agree to the following terms.

**Eligibility**
You must be 18 years or older to use this service. By submitting a prescription, you confirm that you are the patient or an authorized representative.

**Prescription Requirements**
All prescriptions must be valid and issued by a licensed healthcare provider. We reserve the right to verify prescriptions with your doctor or pharmacy before processing any order.

**Service Availability**
Our service is currently available within Nepal. Delivery availability may vary by district. We will notify you if we are unable to deliver to your location.

**Accuracy of Information**
You are responsible for providing accurate and up-to-date information. Ausadhi Ayo is not liable for delays or errors resulting from incorrect information provided at the time of sign-up.

**Liability**
Ausadhi Ayo is not a pharmacy or medical provider. We are a delivery service that works with licensed pharmacies. We are not liable for any adverse effects resulting from medication use.

**Modifications**
We reserve the right to update these terms at any time. Continued use of the service constitutes acceptance of the updated terms.

**Contact**
For questions about these terms, contact us at support@ausadhiayo.com.`,
  },

  hipaa: {
    title: 'HIPAA Notice of Privacy Practices',
    body: `Effective Date: March 2026

This notice describes how medical information about you may be used and disclosed and how you can access this information. Please review it carefully.

**Our Obligations**
Ausadhi Ayo is required by law to maintain the privacy of your protected health information (PHI), provide you with this notice of our legal duties and privacy practices, and notify you in the event of a breach of your unsecured PHI.

**How We Use Your Health Information**
Treatment: We use your PHI to coordinate prescription fulfillment and delivery with your doctor and pharmacy.
Operations: We may use your information for internal quality assurance and service improvement purposes.
We will not use or disclose your PHI for any other purpose without your written authorization, except as required by law.

**Your Rights**
You have the right to request access to your PHI, request corrections to your PHI, request restrictions on how we use your PHI, receive a copy of this notice, and file a complaint if you believe your privacy rights have been violated.

**Complaints**
If you believe your privacy rights have been violated, you may file a complaint with us at support@ausadhiayo.com or with the relevant health authority in Nepal.

**Contact**
For HIPAA-related inquiries, contact our Privacy Officer at support@ausadhiayo.com.`,
  },

  contact: {
    title: 'Contact Support',
    body: `We're here to help. Reach out to us through any of the following channels:

**Email**
support@ausadhiayo.com
We aim to respond within 24 hours on business days.

**Phone**
+977-XXXXXXXXXX
Available Monday – Saturday, 9 AM – 6 PM NPT

**For prescription issues**
If you have an urgent issue with a prescription or delivery, please call us directly. Do not stop taking any medication without consulting your doctor.

**For account or order issues**
Email us with your confirmation number (e.g. MR-ABC123) and we will look into it as soon as possible.

**Feedback**
We're always looking to improve. If you have suggestions or feedback, we'd love to hear from you at feedback@ausadhiayo.com.`,
  },
}

export default function PolicyModal({ type, onClose }) {
  const content = CONTENT[type]

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!content) return null

  const formatted = content.body.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="policy-heading">{line.slice(2, -2)}</p>
    }
    if (line.trim() === '') return <br key={i} />
    return <p key={i} className="policy-line">{line}</p>
  })

  return (
    <div className="lang-modal-overlay" onClick={onClose}>
      <div className="policy-modal" onClick={(e) => e.stopPropagation()}>
        <div className="policy-modal-header">
          <h2>{content.title}</h2>
          <button className="policy-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div className="policy-modal-body">
          {formatted}
        </div>
      </div>
    </div>
  )
}
