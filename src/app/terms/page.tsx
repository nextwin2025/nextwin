import { Card } from "@/components/ui/card"
import { Icons } from "@/components/icons"

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing and using NextWin, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our platform.",
  },
  {
    title: "2. Eligibility",
    content: "To use NextWin, you must be at least 18 years old and legally able to enter into binding contracts. You must also comply with all applicable laws and regulations in your jurisdiction regarding online gaming and betting.",
  },
  {
    title: "3. Account Registration",
    content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when registering.",
  },
  {
    title: "4. Deposits and Withdrawals",
    content: "All deposits and withdrawals are subject to our payment policies. We reserve the right to refuse or limit any transaction. Withdrawals may be subject to verification and processing times.",
  },
  {
    title: "5. Competition Rules",
    content: "Each competition has specific rules and scoring criteria. By entering a competition, you agree to abide by these rules. We reserve the right to modify or cancel competitions at any time.",
  },
  {
    title: "6. Intellectual Property",
    content: "All content on NextWin, including but not limited to text, graphics, logos, and software, is the property of NextWin and is protected by intellectual property laws.",
  },
  {
    title: "7. User Conduct",
    content: "Users must not engage in any fraudulent, abusive, or manipulative behavior. We reserve the right to suspend or terminate accounts that violate these terms.",
  },
  {
    title: "8. Limitation of Liability",
    content: "NextWin is not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the platform.",
  },
  {
    title: "9. Privacy Policy",
    content: "Your use of NextWin is also governed by our Privacy Policy. By using our platform, you agree to our collection and use of information as described in the Privacy Policy.",
  },
  {
    title: "10. Changes to Terms",
    content: "We reserve the right to modify these terms at any time. Continued use of NextWin after changes constitutes acceptance of the modified terms.",
  },
]

export default function TermsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-500 mb-4">Terms and Conditions</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Please read these terms carefully before using NextWin. By using our platform, you agree to be bound by these terms.
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
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">Need Legal Assistance?</h2>
          <p className="text-gray-400 mb-6">
            If you have any questions about our terms and conditions, please contact our legal team.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-lg">
            Contact Legal Team
          </button>
        </div>
      </Card>
    </div>
  )
} 