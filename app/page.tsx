import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { BentoServices } from "@/components/bento-services"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <BentoServices />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
