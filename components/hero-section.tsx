"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 glass-effect rounded-full">
              <span className="text-sm text-primary glow-cyan">Explore Our Creative World</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-balance">
              Dare To Dream
              <span className="block glow-cyan text-primary">Story | Art</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
              We're not just problem-solvers; we're world-builders. By harnessing our abilities to construct and
              influence the atmosphere through lighting, sounds, and set designs, we create realms for the stories we
              tell.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group">
                View Our Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 group bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Reel
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary glow-cyan">10+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary glow-cyan">200+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary glow-cyan">50+</div>
                <div className="text-sm text-muted-foreground">Films</div>
              </div>
            </div>
          </div>

          {/* Right: Visual Element */}
          <div className="relative h-[600px] hidden lg:block">
            <div className="absolute inset-0 glass-effect rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
              <img
                src="/abstract-digital-creative-agency-work-cyberpunk-ne.jpg"
                alt="Chicago AMP creative work"
                className="w-full h-full object-cover mix-blend-luminosity opacity-60"
              />
              <div className="absolute top-20 right-20 glass-effect p-6 rounded-xl animate-float">
                <div className="text-2xl font-bold text-primary glow-cyan">Film Production</div>
              </div>
              <div className="absolute bottom-20 left-20 glass-effect p-6 rounded-xl animate-float delay-300">
                <div className="text-2xl font-bold text-secondary glow-magenta">Photography</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
