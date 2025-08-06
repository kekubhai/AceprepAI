import React from "react";
import { Check, Star, Crown } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with interview prep",
      icon: Star,
      features: [
        "3 AI mock interviews per month",
        "Basic performance insights",
        "Standard question library",
        "Email support"
      ],
      cta: "Start Free",
      popular: false,
      gradient: "from-gray-600 to-gray-700"
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "Everything you need to ace your interviews",
      icon: Crown,
      features: [
        "Unlimited AI mock interviews",
        "Advanced performance analytics",
        "Role-specific question generation",
        "Resume-based interview prep",
        "Detailed feedback reports",
        "Priority support"
      ],
      cta: "Go Pro",
      popular: true,
      gradient: "from-purple-600 to-blue-600"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "Tailored solutions for teams and organizations",
      icon: Crown,
      features: [
        "Everything in Pro",
        "Team performance dashboards",
        "Custom question libraries",
        "White-label solution",
        "Dedicated account manager",
        "24/7 premium support"
      ],
      cta: "Contact Sales",
      popular: false,
      gradient: "from-indigo-600 to-purple-600"
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-purple-50/50 to-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, 
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent ml-3">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan to accelerate your interview success. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg border ${
                plan.popular 
                  ? 'border-purple-200 scale-105 shadow-2xl' 
                  : 'border-gray-200 hover:border-purple-200'
              } transition-all duration-300 group hover:shadow-xl`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period !== "pricing" && (
                      <span className="text-gray-500 ml-1">/{plan.period}</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            All plans include our core AI interview technology and regular updates.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 14-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}
