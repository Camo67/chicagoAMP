export function PortfolioHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse delay-700" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block px-4 py-2 glass-effect rounded-full">
            <span className="text-sm text-primary glow-cyan">100+ Successful Projects</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-balance">
            Our <span className="text-primary glow-cyan">Creative Work</span>
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed text-pretty max-w-2xl mx-auto">
            Explore our portfolio of transformative projects that have helped brands grow and thrive.
          </p>
        </div>
      </div>
    </section>
  )
}
