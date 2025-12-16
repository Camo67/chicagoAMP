"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, Camera, Lightbulb, CheckCircle } from "lucide-react"

const servicesData = {
  production: {
    icon: Video,
    title: "Video Production",
    description: "Cinematic storytelling that captivates and converts. Professional filming with expert crews.",
    services: [
      {
        name: "Commercial & Brand Films",
        details: "High-quality video content for advertising, marketing, and brand storytelling.",
        features: [
          "Concept development and scriptwriting",
          "Professional 4K+ filming with expert crews",
          "Post-production and color grading",
          "Motion graphics and animation",
        ],
        pricing: "Custom quote",
      },
      {
        name: "Music Videos",
        details: "Cinematic music videos that bring your sound to life with stunning visuals.",
        features: [
          "Creative concept development",
          "Multi-location filming",
          "Professional editing and effects",
          "Distribution-ready deliverables",
        ],
        pricing: "Custom quote",
      },
      {
        name: "Corporate & Event Videos",
        details: "Capture conferences, trade shows, product launches, and corporate events.",
        features: [
          "Multi-camera setups",
          "Live streaming capabilities",
          "Interviews and behind-the-scenes",
          "Same-day highlight reels available",
        ],
        pricing: "Starting at $2,500/day",
      },
      {
        name: "Documentaries & Brand Films",
        details: "Tell your story through compelling long-form content.",
        features: [
          "Story development and research",
          "Multi-day filming schedules",
          "Professional editing and sound design",
          "Festival-ready deliverables",
        ],
        pricing: "Custom quote",
      },
    ],
  },
  photography: {
    icon: Camera,
    title: "Photography",
    description: "Professional photography that captures moments and tells compelling visual stories.",
    services: [
      {
        name: "Event Photography",
        details: "Capture the energy and emotion of your corporate events, conferences, and gatherings.",
        features: [
          "Full-day or half-day coverage",
          "Professional editing and retouching",
          "High-resolution digital delivery",
          "Fast turnaround times",
        ],
        pricing: "Starting at $1,500/day",
      },
      {
        name: "Wedding Photography",
        details: "Beautiful wedding photography that tells your love story.",
        features: [
          "Full wedding day coverage",
          "Engagement sessions available",
          "Professional editing and albums",
          "Digital and print deliverables",
        ],
        pricing: "Custom packages available",
      },
      {
        name: "Portrait & Headshots",
        details: "Professional portraits for corporate, personal, and creative needs.",
        features: [
          "Studio or on-location sessions",
          "Professional lighting setup",
          "Multiple outfit changes",
          "Same-day turnaround available",
        ],
        pricing: "Starting at $500/session",
      },
      {
        name: "Product & Commercial",
        details: "High-quality product photography for e-commerce and marketing.",
        features: [
          "Studio photography with professional lighting",
          "Lifestyle and product shots",
          "E-commerce ready images",
          "360-degree product photography",
        ],
        pricing: "Starting at $800/project",
      },
    ],
  },
  technical: {
    icon: Lightbulb,
    title: "Technical Services",
    description: "World-class lighting, sound design, and atmosphere engineering for every production.",
    services: [
      {
        name: "Lighting Design",
        details: "Professional lighting that enhances every shot and creates the perfect atmosphere.",
        features: [
          "Strategic lighting for any environment",
          "Professional grip and electric crew",
          "Specialized equipment for all scenarios",
          "Creative atmosphere engineering",
        ],
        pricing: "Included in production",
      },
      {
        name: "Sound Design & Recording",
        details: "Crystal-clear audio recording, mixing, and sound design for all projects.",
        features: [
          "Professional audio recording equipment",
          "Sound mixing and post-production",
          "Location sound and studio recording",
          "Audio restoration and enhancement",
        ],
        pricing: "Included in production",
      },
      {
        name: "Set Design & Production",
        details: "Build immersive environments that bring your vision to life.",
        features: [
          "Set design and construction",
          "Location scouting and management",
          "Props and wardrobe coordination",
          "Full production management",
        ],
        pricing: "Custom quote",
      },
      {
        name: "Live Streaming",
        details: "Professional live streaming for events, conferences, and performances.",
        features: [
          "Multi-camera live production",
          "Professional encoding and streaming",
          "Real-time graphics and overlays",
          "Recording and post-event delivery",
        ],
        pricing: "Starting at $3,000/event",
      },
    ],
  },
}

export function ServicesTabs() {
  const [activeTab, setActiveTab] = useState<"production" | "photography" | "technical">("production")

  const currentService = servicesData[activeTab]
  const Icon = currentService.icon

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {Object.entries(servicesData).map(([key, data]) => {
            const TabIcon = data.icon
            return (
              <Button
                key={key}
                onClick={() => setActiveTab(key as any)}
                variant={activeTab === key ? "default" : "outline"}
                size="lg"
                className={
                  activeTab === key
                    ? "bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-primary/50 bg-transparent"
                }
              >
                <TabIcon className="mr-2 h-5 w-5" />
                {data.title}
              </Button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 glass-effect rounded-2xl">
              <Icon className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-4xl font-bold">{currentService.title}</h2>
            <p className="text-xl text-muted-foreground text-pretty">{currentService.description}</p>
          </div>

          {/* Services Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentService.services.map((service, index) => (
              <Card
                key={index}
                className="glass-effect border-border overflow-hidden group hover:border-primary/50 transition-all"
              >
                {/* Video Block */}
                <div className="relative aspect-video bg-muted overflow-hidden">
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                    <source
                      src={`/placeholder.svg?height=400&width=600&query=${encodeURIComponent(service.name + " example video")}`}
                      type="video/mp4"
                    />
                  </video>
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Service Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-foreground mb-1">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.details}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Features List */}
                  <div className="space-y-2">
                    {service.features.slice(0, 3).map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Starting at</div>
                      <div className="text-lg font-bold text-primary">{service.pricing}</div>
                    </div>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Learn More
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <Card className="mt-12 p-8 glass-effect border-border text-center">
            <h3 className="text-2xl font-bold mb-3">Need a Custom Solution?</h3>
            <p className="text-muted-foreground mb-6">
              We can create a tailored package that fits your specific needs and budget.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Schedule Consultation
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}
