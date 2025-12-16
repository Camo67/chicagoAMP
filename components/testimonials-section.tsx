"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc",
    content:
      "Chicago AMP transformed our digital presence completely. Their creative approach and technical expertise delivered results beyond our expectations.",
    rating: 5,
    image: "/professional-woman-ceo.png",
  },
  {
    name: "Michael Chen",
    role: "Marketing Director, GrowthCo",
    content:
      "Working with AMP was a game-changer. They doubled our lead generation in just 3 months with their innovative marketing strategies.",
    rating: 5,
    image: "/professional-man-marketing.png",
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, CreativeSpace",
    content:
      "The video production quality is unmatched. They captured our brand story perfectly and helped us connect with our audience on a deeper level.",
    rating: 5,
    image: "/professional-woman-founder.png",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Client <span className="text-primary glow-cyan">Success Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Don't just take our word for it—hear from our satisfied clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 glass-effect border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="space-y-6">
                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground leading-relaxed text-pretty">"{testimonial.content}"</p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
