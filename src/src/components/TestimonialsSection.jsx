import React from 'react';
// import { Card, CardContent } from '@/components/ui/card';
import { Quote, QuoteIcon } from 'lucide-react';
import { Card, CardContent } from './ui/Card';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    image: "/assets/profile1.png",
    quote: "Within a week of optimizing my resume with this tool, I landed interviews at three top tech companies. The AI suggestions were spot-on and helped me highlight achievements I hadn't even thought to include!",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Marketing Director",
    image: "/assets/profile2.png",
    quote: "After struggling to get past ATS systems for months, this tool helped me understand exactly what was missing from my resume. I'm now in my dream role thanks to the personalized optimization suggestions.",
    rating: 5
  },
  {
    name: "Emily Thompson",
    role: "Project Manager",
    image: "/assets/profile3.png",
    quote: "The AI analysis found several key improvements I needed to make. The interface was intuitive, and the suggestions were clear and actionable. Definitely worth it!",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Are Saying</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Join thousands of professionals who've transformed their job search with our AI-powered tool
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative bg-white dark:bg-black transition-colors duration-200">
              <CardContent className="p-6">
                <QuoteIcon className="w-8 h-8 text-violet-500 mb-4" />
                
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>

                <p className="text-gray-700 dark:text-gray-200 italic">
                  "{testimonial.quote}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;