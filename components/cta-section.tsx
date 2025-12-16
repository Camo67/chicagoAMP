import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative glass-effect rounded-3xl overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />

          <div className="relative z-10 p-12 md:p-16 text-center space-y-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">
              Ready to <span className="text-primary glow-cyan">Transform</span> Your Brand?
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Let's create something extraordinary together. Schedule a consultation today.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  View Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
