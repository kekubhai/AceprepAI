import { useSlideIn } from "@/app/hooks/useSlideIn"
import { Check, Star, Sparkles, Crown, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Pricing() {
  const [ref, isVisible] = useSlideIn()

  const plans = [
    {
      name: 'Starter',
      price: '$19',
      period: '/month',
      description: 'Perfect for individuals starting their interview journey',
      features: [
        '5 AI Mock Interviews',
        'Basic Performance Analytics',
        'Email Support',
        'Resume Review',
        'Interview Question Bank'
      ],
      cta: 'Start Free Trial',
      popular: false,
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      name: 'Professional',
      price: '$49',
      period: '/month',
      description: 'Most popular choice for serious job seekers',
      features: [
        'Unlimited AI Mock Interviews',
        'Advanced Performance Analytics',
        'Priority Support (24/7)',
        'Personalized Learning Path',
        'Industry-Specific Prep',
        'Video Interview Practice',
        'Salary Negotiation Training'
      ],
      cta: 'Get Started',
      popular: true,
      icon: <Star className="w-6 h-6" />,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Tailored solutions for teams and organizations',
      features: [
        'Everything in Professional',
        'Custom AI Training',
        'Dedicated Account Manager',
        'API Access',
        'White-label Solution',
        'Team Analytics Dashboard',
        'Custom Integrations'
      ],
      cta: 'Contact Sales',
      popular: false,
      icon: <Crown className="w-6 h-6" />,
    },
  ]

  return (
    <section id="pricing" ref={ref} className={`py-24 relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-sm font-medium text-green-800 mb-6">
            💎 Simple, Transparent Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose the perfect plan
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              for your success
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Start your free trial today. No credit card required. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''} border border-gray-100`}>
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${plan.popular ? 'from-blue-500 to-purple-600' : 'from-gray-100 to-gray-200'} rounded-2xl mb-4`}>
                    <span className={plan.popular ? 'text-white' : 'text-gray-600'}>
                      {plan.icon}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  {plan.name !== 'Enterprise' && (
                    <p className="text-sm text-gray-500">Billed monthly</p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${plan.popular ? 'text-blue-500' : 'text-green-500'}`} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-200 hover:scale-105 flex items-center justify-center ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-2 border-transparent hover:border-gray-300'
                }`}>
                  {plan.cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Need a custom solution? We&rsquo;re here to help.
          </p>
          <Link href="/contact" passHref>
            <button className="inline-flex items-center px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-200 hover:scale-105">
              Schedule a Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

