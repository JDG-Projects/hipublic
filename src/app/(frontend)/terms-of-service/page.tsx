import React from 'react'
import { LegalPage } from '@/components/layout/LegalPage'

export const metadata = {
  title: 'hiPublic | Terms of Service',
  description: 'Read the terms and conditions governing your use of HiPublic services.',
}

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle="The rules and conditions that govern your use of HiPublic."
      lastUpdated="January 1, 2025"
      sections={[
        {
          heading: 'Acceptance of Terms',
          content: (
            <p>
              By accessing or using HiPublic&apos;s website, platform, or services, you agree to be
              bound by these Terms of Service and our Privacy Policy. If you do not agree to these
              terms, do not use our services. We reserve the right to update these terms at any time,
              and your continued use constitutes acceptance of the revised terms.
            </p>
          ),
        },
        {
          heading: 'Description of Services',
          content: (
            <>
              <p>
                HiPublic provides influencer marketing services including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2 text-white/40">
                <li>Connecting brands and media buyers with influencers and content creators</li>
                <li>Campaign strategy, management, and execution</li>
                <li>Creator sourcing, vetting, and performance analytics</li>
                <li>Content production coordination and brand safety review</li>
                <li>Performance reporting and ROI tracking</li>
              </ul>
            </>
          ),
        },
        {
          heading: 'User Accounts',
          content: (
            <>
              <p>
                To access certain features, you must register for an account. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2 text-white/40">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain the security of your password and account credentials</li>
                <li>Notify us immediately of any unauthorized access or security breach</li>
                <li>Accept responsibility for all activity that occurs under your account</li>
              </ul>
              <p className="mt-3">
                We reserve the right to suspend or terminate accounts that violate these terms or
                engage in fraudulent, abusive, or illegal activity.
              </p>
            </>
          ),
        },
        {
          heading: 'Acceptable Use',
          content: (
            <>
              <p>You agree not to use our services to:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 text-white/40">
                <li>Violate any applicable laws, regulations, or third-party rights</li>
                <li>Upload or transmit malicious code, spam, or harmful content</li>
                <li>Engage in deceptive, fraudulent, or misleading practices</li>
                <li>Misrepresent your identity, affiliation, or campaign performance data</li>
                <li>Circumvent platform fees, payment processes, or contractual obligations</li>
                <li>Scrape, crawl, or extract data from our platform without authorization</li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Campaigns & Payments',
          content: (
            <>
              <p>
                Campaign agreements between brands and influencers facilitated through HiPublic are
                subject to separate campaign briefs and contracts. HiPublic acts as an intermediary
                and is not liable for the performance of either party.
              </p>
              <p>
                All fees for HiPublic&apos;s services are as agreed in your service contract.
                Payments are due as specified in your agreement. Late payments may incur additional
                charges as outlined in your contract.
              </p>
            </>
          ),
        },
        {
          heading: 'Intellectual Property',
          content: (
            <>
              <p>
                All content on the HiPublic platform — including logos, graphics, text, and software
                — is the property of HiPublic or its licensors and is protected by intellectual
                property laws.
              </p>
              <p>
                Campaign content created by influencers remains the property of the respective
                creator unless otherwise agreed in a campaign contract. By submitting content through
                our platform, you grant HiPublic a non-exclusive license to use it for service
                delivery and promotional purposes related to the campaign.
              </p>
            </>
          ),
        },
        {
          heading: 'Confidentiality',
          content: (
            <p>
              Both parties agree to keep confidential any proprietary information, campaign data,
              pricing, and business strategies shared through the platform. This obligation survives
              termination of your account or any campaign agreement.
            </p>
          ),
        },
        {
          heading: 'Disclaimers & Limitation of Liability',
          content: (
            <>
              <p>
                HiPublic&apos;s services are provided &quot;as is&quot; without warranties of any kind,
                express or implied. We do not guarantee specific campaign results, influencer
                performance, or audience metrics.
              </p>
              <p>
                To the maximum extent permitted by law, HiPublic shall not be liable for any
                indirect, incidental, consequential, or punitive damages arising from your use of
                our services, even if advised of the possibility of such damages.
              </p>
            </>
          ),
        },
        {
          heading: 'Governing Law',
          content: (
            <p>
              These Terms of Service shall be governed by and construed in accordance with applicable
              laws. Any disputes arising from these terms shall be resolved through binding
              arbitration or in the courts of competent jurisdiction as determined by HiPublic.
            </p>
          ),
        },
        {
          heading: 'Contact',
          content: (
            <p>
              For questions regarding these Terms of Service, contact us at{' '}
              <strong className="text-white/70">legal@hipublic.com</strong>.
            </p>
          ),
        },
      ]}
    />
  )
}
