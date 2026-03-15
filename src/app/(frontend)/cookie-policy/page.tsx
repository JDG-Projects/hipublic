import React from 'react'
import { LegalPage } from '@/components/layout/LegalPage'

export const metadata = {
  title: 'hiPublic | Cookie Policy',
  description: 'Learn how HiPublic uses cookies and tracking technologies on its website.',
}

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      subtitle="How and why we use cookies and similar tracking technologies."
      lastUpdated="January 1, 2025"
      sections={[
        {
          heading: 'What Are Cookies',
          content: (
            <p>
              Cookies are small text files stored on your device when you visit a website. They allow
              the site to remember your actions and preferences over time, so you don&apos;t have to
              re-enter information each time you return. Cookies can be session-based (deleted when
              you close your browser) or persistent (remain until they expire or are deleted).
            </p>
          ),
        },
        {
          heading: 'How We Use Cookies',
          content: (
            <>
              <p>HiPublic uses cookies for the following purposes:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 text-white/40">
                <li><span className="text-white/50">Essential Cookies</span> — required for core site functionality such as authentication and session management.</li>
                <li><span className="text-white/50">Preference Cookies</span> — remember your settings and display choices.</li>
                <li><span className="text-white/50">Analytics Cookies</span> — help us understand how visitors interact with our site to improve performance.</li>
                <li><span className="text-white/50">Marketing Cookies</span> — used to deliver relevant advertising and track campaign effectiveness.</li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Types of Cookies We Set',
          content: (
            <>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/3 border border-white/8">
                  <p className="font-semibold text-white/70 mb-1">Authentication Cookies</p>
                  <p>Set when you log in to keep your session active. Login cookies last 2 days; if you select &quot;Remember Me&quot; they persist for 2 weeks. Cleared on logout.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/3 border border-white/8">
                  <p className="font-semibold text-white/70 mb-1">Browser Check Cookie</p>
                  <p>A temporary cookie set when you visit our login page to verify your browser accepts cookies. Contains no personal data and is discarded when you close your browser.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/3 border border-white/8">
                  <p className="font-semibold text-white/70 mb-1">Preference Cookies</p>
                  <p>Save your display preferences and UI settings. These last for one year.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/3 border border-white/8">
                  <p className="font-semibold text-white/70 mb-1">Analytics Cookies</p>
                  <p>Used to collect anonymous statistics about how visitors use our site (pages visited, time spent, referral sources). This data helps us improve our platform.</p>
                </div>
              </div>
            </>
          ),
        },
        {
          heading: 'Third-Party Cookies',
          content: (
            <>
              <p>
                Some pages on our site may embed content or tools from third-party services such as
                video players, social media widgets, or analytics providers. These third parties may
                set their own cookies subject to their own privacy policies.
              </p>
              <p>
                Third-party services we may use include Google Analytics, social media platforms,
                and advertising networks. We do not control these cookies — please refer to the
                respective providers&apos; policies for details.
              </p>
            </>
          ),
        },
        {
          heading: 'Managing Cookies',
          content: (
            <>
              <p>
                You can control and manage cookies in several ways:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2 text-white/40">
                <li><span className="text-white/50">Browser settings</span> — most browsers allow you to refuse, delete, or be notified about cookies. See your browser&apos;s help documentation for instructions.</li>
                <li><span className="text-white/50">Opt-out tools</span> — for analytics cookies, you may use tools like Google Analytics Opt-out Browser Add-on.</li>
                <li><span className="text-white/50">Cookie consent</span> — where required by law, we will ask for your consent before placing non-essential cookies.</li>
              </ul>
              <p className="mt-3">
                Please note that disabling certain cookies may affect the functionality of our
                website and some features may not work as intended.
              </p>
            </>
          ),
        },
        {
          heading: 'Cookie Retention',
          content: (
            <>
              <p>Cookies are retained for varying periods depending on their purpose:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 text-white/40">
                <li>Session cookies — deleted when you close your browser</li>
                <li>Authentication cookies — 2 days (or 2 weeks with &quot;Remember Me&quot;)</li>
                <li>Preference cookies — up to 1 year</li>
                <li>Analytics cookies — up to 2 years (as set by the analytics provider)</li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Updates to This Policy',
          content: (
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology,
              legislation, or our data practices. Any changes will be posted on this page with an
              updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>
          ),
        },
        {
          heading: 'Contact Us',
          content: (
            <p>
              If you have questions about our use of cookies, please contact us at{' '}
              <strong className="text-white/70">privacy@hipublic.com</strong>.
            </p>
          ),
        },
      ]}
    />
  )
}
