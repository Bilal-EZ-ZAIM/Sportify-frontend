import { Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const plans = [
  {
    name: 'Basic',
    price: 0,
    description: 'Perfect for small events and beginners',
    features: [
      'Up to 50 participants per event',
      'Basic event management tools',
      'Email support',
      'Basic analytics',
    ],
  },
  {
    name: 'Pro',
    price: 29,
    description: 'Ideal for growing organizations',
    features: [
      'Up to 500 participants per event',
      'Advanced event management',
      'Priority support',
      'Detailed analytics',
      'Custom branding',
      'Export data in multiple formats',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    description: 'For large-scale events and organizations',
    features: [
      'Unlimited participants',
      'Full event management suite',
      '24/7 priority support',
      'Advanced analytics & reporting',
      'Custom branding & white-label',
      'API access',
      'Dedicated account manager',
    ],
  },
];

export function Pricing() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your sports event management needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative p-8 ${
                plan.popular
                  ? 'border-2 border-blue-500 shadow-xl'
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2">
                  <span className="inline-block bg-blue-500 text-white px-4 py-1 text-sm font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-gray-800 hover:bg-gray-900'
                }`}
              >
                Get Started
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Need a custom plan? <a href="#" className="text-blue-500 font-medium">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
}