import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ServicesHero } from "@/components/services-hero"
import { ServicesTabs } from "@/components/services-tabs"
import { CTASection } from "@/components/cta-section"

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ServicesHero />
      <ServicesTabs />
      <CTASection />
      <Footer />
    </main>
  )
}
