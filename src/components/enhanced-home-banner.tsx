import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Clock, DollarSign } from "lucide-react"

export default function EnhancedHomeBanner() {
  const features = [
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Win Big",
      description: "Prize pools up to $10,000",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Join Thousands",
      description: "Active community of players",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Daily Competitions",
      description: "New matches every day",
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Instant Payouts",
      description: "Via bank or crypto",
    },
  ]

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gradient-premium-start to-gradient-premium-end">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      
      <div className="relative px-6 py-16 sm:px-12 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Predict Sports & Win Cash
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-blue-100"
          >
            Join thousands of players making predictions and winning big on NextWin.com.
            Enter competitions for soccer, cricket, rugby, and F1 races.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Button size="lg" className="bg-cta hover:bg-cta-600 text-white text-lg px-8 py-6">
              Start Predicting Now
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white text-lg px-8 py-6">
              Learn More
            </Button>
          </motion.div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <div className="rounded-lg bg-white/10 p-2">
                    {feature.icon}
                  </div>
                  {feature.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-blue-100">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 