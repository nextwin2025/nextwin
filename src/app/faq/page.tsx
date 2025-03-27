import { Card } from "@/components/ui/card"
import { Icons } from "@/components/icons"

const faqs = [
  {
    question: "How does NextWin work?",
    answer: "NextWin is a fantasy sports platform where you can predict match outcomes, compete with other users, and win prizes. You can enter competitions by making predictions about matches, selecting winning teams, and predicting scores. The more accurate your predictions, the higher your chances of winning.",
  },
  {
    question: "How do I get started?",
    answer: "Getting started is easy! Simply create an account, verify your email, and add funds to your wallet. You can then browse available competitions, make your predictions, and enter competitions. Each competition has an entry fee and a prize pool.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept both cryptocurrency (Bitcoin, Ethereum, Tether) and fiat currency (USD) through credit/debit cards and bank transfers. All payments are processed securely through our payment partners.",
  },
  {
    question: "How are winners determined?",
    answer: "Winners are determined based on the accuracy of their predictions. Each competition has specific scoring criteria, and the user with the highest score wins the prize pool. In case of ties, the prize is split equally among the winners.",
  },
  {
    question: "Is my account secure?",
    answer: "Yes, we take security seriously. We use industry-standard encryption, two-factor authentication, and secure payment processing. Your personal information and funds are protected by multiple layers of security measures.",
  },
  {
    question: "Can I withdraw my winnings?",
    answer: "Yes, you can withdraw your winnings at any time. Withdrawals can be made in cryptocurrency or fiat currency, depending on your preference. There may be minimum withdrawal amounts and processing times depending on the payment method.",
  },
  {
    question: "What happens if a match is cancelled?",
    answer: "If a match is cancelled, the competition will be voided, and all entry fees will be refunded to the participants. We monitor matches closely and communicate any changes or cancellations to affected users.",
  },
  {
    question: "How do I contact support?",
    answer: "You can contact our support team through the contact form on our website or by emailing support@nextwin.com. We aim to respond to all inquiries within 24 hours.",
  },
]

export default function FAQPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-500 mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Find answers to common questions about NextWin. If you can't find what you're looking for, please contact our support team.
        </p>
      </div>

      <div className="grid gap-6">
        {faqs.map((faq, index) => (
          <Card key={index} className="bg-gray-900 border-yellow-500/20">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <Icons.target className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-yellow-500 mb-2">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-gray-900 border-yellow-500/20">
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">Still have questions?</h2>
          <p className="text-gray-400 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-lg">
            Contact Support
          </button>
        </div>
      </Card>
    </div>
  )
} 