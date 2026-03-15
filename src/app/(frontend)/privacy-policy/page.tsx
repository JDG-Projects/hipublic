import React from 'react'
import { LegalPage } from '@/components/layout/LegalPage'

export const metadata = {
  title: 'hiPublic | Privacy Policy',
  description: 'Learn how HiPublic collects, uses, and protects your personal data.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal information."
      lastUpdated="January 1, 2025"
      sections={[
        {
          heading: 'Who We Are',
          content: (
            <>
              <p>
                HiPublic is a global influencer marketing agency connecting brands with creators
                worldwide. Our website address is <strong className="text-white/70">https://hipublic.com</strong>.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our website or use our services. Please read this policy
                carefully. If you disagree with its terms, please discontinue use of the site.
              </p>
            </>
          ),
        },
        {
          heading: 'Information We Collect',
          content: (
            <>
              <p>We may collect information about you in the following ways:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 text-white/40">
                <li><span className="text-white/50">Personal Data</span> — name, email address, phone number, and company name you voluntarily provide when registering or contacting us.</li>
                <li><span className="text-white/50">Usage Data</span> — IP address, browser type, pages visited, time spent on pages, and other diagnostic data collected automatically.</li>
                <li><span className="text-white/50">Cookies & Tracking</span> — small files placed on your device to improve your experience and analyze site usage.</li>
                <li><span className="text-white/50">Campaign Data</span> — information related to influencer campaigns you create or participate in through our platform.</li>
              </ul>
            </>
          ),
        },
        {
          heading: 'How We Use Your Information',
          content: (
            <>
              <p>We use the collected information for purposes including:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 text-white/40">
                <li>Providing, operating, and maintaining our services</li>
                <li>Processing campaign requests and managing influencer partnerships</li>
                <li>Sending transactional and promotional communications</li>
                <li>Analyzing usage patterns to improve our platform</li>
                <li>Complying with legal obligations and resolving disputes</li>
                <li>Detecting and preventing fraudulent or unauthorized activity</li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Cookies',
          content: (
            <>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our
                website. Cookies may be set by us (first-party) or by third-party services we use.
              </p>
              <p>
                If you leave a comment or log in, we will set cookies to save your session and
                preferences. Login cookies last for two days unless you select &quot;Remember Me&quot;,
                in which case your login persists for two weeks.
              </p>
              <p>
                You can instruct your browser to refuse all cookies or to indicate when a cookie is
                being sent. See our <strong className="text-white/70">Cookie Policy</strong> for full details.
              </p>
            </>
          ),
        },
        {
          heading: 'Sharing Your Data',
          content: (
            <>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to outside
                parties except in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2 text-white/40">
                <li>With trusted service providers who assist us in operating our platform (bound by confidentiality agreements)</li>
                <li>With brand partners or influencers as required to deliver campaign services you requested</li>
                <li>When required by law, regulation, or legal process</li>
                <li>To protect the rights, property, or safety of HiPublic, our users, or others</li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Data Retention',
          content: (
            <p>
              We retain your personal data only as long as necessary to fulfill the purposes outlined
              in this policy, comply with legal obligations, resolve disputes, and enforce our
              agreements. Account data is retained for the duration of your account and for up to
              3 years after closure unless otherwise required by law.
            </p>
          ),
        },
        {
          heading: 'Your Rights',
          content: (
            <>
              <p>
                Depending on your jurisdiction, you may have the following rights regarding your
                personal data:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2 text-white/40">
                <li>Right to access the personal data we hold about you</li>
                <li>Right to rectification of inaccurate or incomplete data</li>
                <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
                <li>Right to restrict or object to processing</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent at any time</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at{' '}
                <strong className="text-white/70">privacy@hipublic.com</strong>.
              </p>
            </>
          ),
        },
        {
          heading: 'Security',
          content: (
            <p>
              We implement industry-standard technical and organizational measures to protect your
              personal data against unauthorized access, alteration, disclosure, or destruction.
              However, no method of transmission over the internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          ),
        },
        {
          heading: 'Third-Party Links',
          content: (
            <p>
              Our website may contain links to third-party websites. We are not responsible for the
              privacy practices or content of those sites. We encourage you to review the privacy
              policies of any third-party sites you visit.
            </p>
          ),
        },
        {
          heading: 'Contact Us',
          content: (
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us at{' '}
              <strong className="text-white/70">privacy@hipublic.com</strong> or write to us at
              HiPublic, Global Influencer Marketing Agency.
            </p>
          ),
        },
      ]}
    />
  )
}
