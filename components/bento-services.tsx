"use client"

import { Card } from "@/components/ui/card"
import { Video, Camera, Lightbulb, Music, Mic, Film } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Video,
    title: "Commercial Video",
    description: "High-quality video production for brands, products, and corporate storytelling.",
    metrics: "50+ films",
    color: "text-primary",
    image: "/OneDrive_1_17-12-2025/john with cameras at zebra.jpg"
  },
  {
    icon: Music,
    title: "Music Videos",
    description: "Cinematic music videos that bring your sound to life with stunning visuals.",
    metrics: "30+ videos",
    color: "text-secondary",
    video: "https://www.youtube.com/embed/hktW_HhhJfo?si=8qgWFqab6T5eL77W"
  },
  {
    icon: Camera,
    title: "Event Coverage",
    description: "Capture the energy and emotion of your corporate events, conferences, and gatherings.",
    metrics: "200+ events",
    color: "text-primary",
    image: "/L1000582-2.jpg"
  },
  {
    icon: Film,
    title: "Wedding Films",
    description: "Beautiful wedding videography that tells your love story.",
    metrics: "100+ weddings",
    color: "text-secondary",
    image: "/weddings.png"
  },
  {
    icon: Lightbulb,
    title: "Lighting & Set Design",
    description: "Professional lighting and atmosphere creation to enhance every production.",
    metrics: "Expert crew",
    color: "text-primary",
    image: "/OneDrive_1_17-12-2025/Camera Setup.jpg"
  },
  {
    icon: Mic,
    title: "Sound Design",
    description: "Professional audio recording, mixing, and sound design for all projects.",
    metrics: "Studio quality",
    color: "text-secondary",
    image: "/sound.jpg"
  },
]

export function BentoServices() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Our <span className="text-primary glow-cyan">Creative Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            World-building through lighting, sound, and set design. Creating realms for the stories we tell.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Link href="/services" key={index}>
                <Card className="group relative h-full p-8 glass-effect border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-300" />

                  <div className="relative space-y-4">
                    {/* Show video if available, otherwise show image or icon */}
                    {service.video ? (
                      <div className="w-full h-32 rounded-lg overflow-hidden">
                        <iframe
                          src={service.video}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    ) : service.image ? (
                      <div className="w-full h-32 rounded-lg overflow-hidden">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    ) : (
                      <div className={`${service.color} w-12 h-12 flex items-center justify-center`}>
                        <Icon size={32} />
                      </div>
                    )}

                    <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>

                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>

                    <div className="pt-4 border-t border-border">
                      <span className={`text-sm font-semibold ${service.color}`}>{service.metrics}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
