"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Play, ExternalLink, TrendingUp } from "lucide-react"

const portfolioItems = [
  {
    id: 1,
    title: "Saybrook - Our World is Worth Fighting For",
    category: "commercial",
    description: "Environmental advocacy video showcasing the importance of preservation.",
    image: "/portfolio-tech-branding.jpg",
    results: [
      { label: "Views", value: "100K+" },
      { label: "Engagement", value: "+250%" },
    ],
    tags: ["Commercial", "Brand Film"],
  },
  {
    id: 2,
    title: "HP AMUG 2024",
    category: "corporate",
    description: "Working with HP 3D team to tell the story of what 3D is and who it helps.",
    image: "/portfolio-marketing-campaign.jpg",
    results: [
      { label: "Attendees", value: "5K+" },
      { label: "Social Reach", value: "500K+" },
    ],
    tags: ["Corporate", "Event Coverage"],
  },
  {
    id: 3,
    title: "Whüzy - Hotel Song",
    category: "music",
    description: "Music video featuring cinematic storytelling and visual artistry.",
    image: "/portfolio-food-film.jpg",
    results: [
      { label: "Views", value: "50K+" },
      { label: "Engagement", value: "+180%" },
    ],
    tags: ["Music Video", "Cinematography"],
  },
  {
    id: 4,
    title: "ABTA 2023",
    category: "corporate",
    description: "Documentary showcasing compassionate individuals helping others through challenging experiences.",
    image: "/portfolio-festival-event.jpg",
    results: [
      { label: "Impact", value: "High" },
      { label: "Community", value: "Strong" },
    ],
    tags: ["Documentary", "Corporate"],
  },
  {
    id: 5,
    title: "DiAmorte - Ashes and Sorrow",
    category: "music",
    description: "Dramatic music video with cinematic production values.",
    image: "/portfolio-fitness-app.jpg",
    results: [
      { label: "Views", value: "75K+" },
      { label: "Fan Response", value: "Excellent" },
    ],
    tags: ["Music Video", "Drama"],
  },
  {
    id: 6,
    title: "The Unusual - Stan",
    category: "music",
    description: "Music video shot in Elgin with creative visuals and storytelling.",
    image: "/portfolio-fashion-doc.jpg",
    results: [
      { label: "Views", value: "40K+" },
      { label: "Social Shares", value: "5K+" },
    ],
    tags: ["Music Video", "Indie"],
  },
  {
    id: 7,
    title: "Wedding Recaps",
    category: "wedding",
    description: "Beautiful wedding videography capturing love stories and special moments.",
    image: "/portfolio-fintech-design.jpg",
    results: [
      { label: "Happy Couples", value: "100+" },
      { label: "Referrals", value: "95%" },
    ],
    tags: ["Wedding", "Event Coverage"],
  },
  {
    id: 8,
    title: "HP IMTS Chicago 2022",
    category: "corporate",
    description: "Trade show coverage for HP showcasing innovative technology.",
    image: "/portfolio-tech-conference.jpg",
    results: [
      { label: "Booth Traffic", value: "+300%" },
      { label: "Leads Generated", value: "1K+" },
    ],
    tags: ["Corporate", "Trade Show"],
  },
  {
    id: 9,
    title: "Cam O Flage - Drug City",
    category: "music",
    description: "International music video filmed in South Africa.",
    image: "/portfolio-ecommerce-seo.jpg",
    results: [
      { label: "Views", value: "120K+" },
      { label: "International Reach", value: "Global" },
    ],
    tags: ["Music Video", "International"],
  },
]

const categories = [
  { id: "all", label: "All Projects" },
  { id: "commercial", label: "Commercial" },
  { id: "music", label: "Music Videos" },
  { id: "corporate", label: "Corporate" },
  { id: "wedding", label: "Weddings" },
]

export function PortfolioGrid() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedItem, setSelectedItem] = useState<(typeof portfolioItems)[0] | null>(null)

  const filteredItems =
    selectedCategory === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === selectedCategory)

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              className={
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:border-primary/50 bg-transparent"
              }
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="group relative overflow-hidden glass-effect border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {item.category === "film" || item.category === "events" ? (
                    <Play className="h-16 w-16 text-primary" />
                  ) : (
                    <ExternalLink className="h-12 w-12 text-primary" />
                  )}
                </div>

                {/* Results Badge */}
                <div className="absolute top-4 right-4 glass-effect px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-primary glow-cyan">{item.results[0].value}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-muted text-muted-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-4xl glass-effect border-border">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold">{selectedItem.title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Image/Video */}
                  <div className="relative aspect-video rounded-xl overflow-hidden">
                    <img
                      src={selectedItem.image || "/placeholder.svg"}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                    />
                    {(selectedItem.category === "film" || selectedItem.category === "events") && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                          <Play className="mr-2 h-5 w-5" />
                          Play Video
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-lg text-muted-foreground leading-relaxed">{selectedItem.description}</p>

                  {/* Results */}
                  <div>
                    <h4 className="text-xl font-bold mb-4">Results & Impact</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedItem.results.map((result, index) => (
                        <Card key={index} className="p-6 glass-effect border-border">
                          <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            <span className="text-sm text-muted-foreground">{result.label}</span>
                          </div>
                          <div className="text-3xl font-bold text-primary glow-cyan">{result.value}</div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h4 className="text-xl font-bold mb-3">Services Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-muted text-foreground text-sm px-4 py-2">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-4 border-t border-border">
                    <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Start Your Project
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
