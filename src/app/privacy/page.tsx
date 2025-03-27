import { Card } from "@/components/ui/card"
import { Icons } from "@/components/icons"

const sections = [
  {
    title: "1. Information We Collect",
    content: "We collect information that you provide directly to us, including name, email address, payment information, and any other information you choose to provide. We also collect information about your use of our platform, including your predictions, competition entries, and transaction history.",
  },
  {
    title: "2. How We Use Your Information",
    content: "We use the information we collect to operate, maintain, and provide you with the features and functionality of NextWin, to process your transactions, to communicate with you, and to improve our platform.",
  },
  {
    title: "3. Information Sharing",
    content: "We do not sell your personal information. We may share your information with service providers who assist in operating our platform, processing payments, or providing customer support. We may also share information when required by law.",
  },
  {
    title: "4. Data Security",
    content: "We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "5. Cookies and Tracking",
    content: "We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
  },
  {
    title: "6. Your Rights",
    content: "You have the right to access, correct, or delete your personal information. You may also have the right to restrict or object to certain processing of your information. Contact us to exercise these rights.",
  },
  {
    title: "7. Children's Privacy",
    content: "Our platform is not intended for children under 18. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal information, please contact us.",
  },
  {
    title: "8. Changes to Privacy Policy",
    content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.",
  },
  {
    title: "9. Contact Us",
    content: "If you have any questions about this Privacy Policy, please contact us at privacy@nextwin.com.",
  },
]

export default function PrivacyPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-500 mb-4">Privacy Policy</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          This Privacy Policy describes how NextWin collects, uses, and shares your personal information when you use our platform.
        </p>
      </div>

      <div className="grid gap-6">
        {sections.map((section, index) => (
          <Card key={index} className="bg-gray-900 border-yellow-500/20">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <Icons.target className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-yellow-500 mb-2">{section.title}</h3>
                  <p className="text-gray-400">{section.content}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-gray-900 border-yellow-500/20">
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">Questions About Privacy?</h2>
          <p className="text-gray-400 mb-6">
            If you have any questions about our privacy policy or data practices, please contact our privacy team.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-lg">
            Contact Privacy Team
          </button>
        </div>
      </Card>
    </div>
  )
} 