import React, { useState } from "react";
import { BackButton } from "@/components/back-button";
import { Gavel, Star, ChevronDown, ChevronUp, BookOpen, Building2, Calendar, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface CaseStudy {
  id: number;
  title: string;
  bank: string;
  issueType: string;
  summary: string;
  chronology: string;
  outcome: string;
  keyLessons: string[];
  relevantLegislation: string[];
  isFeatured: boolean;
  year: number;
}

export default function CaseStudies() {
  const [studies, setStudies] = React.useState<CaseStudy[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  React.useEffect(() => {
    fetch(`/api/case-studies`)
      .then((r) => r.json())
      .then((data: CaseStudy[]) => {
        // Featured first, then by year
        const sorted = [...data].sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.year - a.year;
        });
        setStudies(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const featured = studies.filter((s) => s.isFeatured);
  const regular = studies.filter((s) => !s.isFeatured);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 pt-4">
        <BackButton />
      </div>
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gavel className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Case Studies</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Real banking dispute cases — what happened, how they were resolved, and what you can learn to strengthen your own complaint.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-10">
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading case studies…</div>
        ) : (
          <>
            {/* Featured (NAB first) */}
            {featured.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-5">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <h2 className="text-lg font-semibold text-primary">Featured Case Studies</h2>
                </div>
                <div className="space-y-6">
                  {featured.map((s) => (
                    <CaseStudyCard
                      key={s.id}
                      study={s}
                      expanded={expanded === s.id}
                      onToggle={() => setExpanded(expanded === s.id ? null : s.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {regular.length > 0 && (
              <div>
                {featured.length > 0 && (
                  <h2 className="text-lg font-semibold text-primary mb-5">More Case Studies</h2>
                )}
                <div className="space-y-6">
                  {regular.map((s) => (
                    <CaseStudyCard
                      key={s.id}
                      study={s}
                      expanded={expanded === s.id}
                      onToggle={() => setExpanded(expanded === s.id ? null : s.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <div className="mt-12 bg-muted rounded-2xl p-8 text-center border">
          <h3 className="text-xl font-bold mb-2">Recognise your situation?</h3>
          <p className="text-muted-foreground mb-6">
            Use our letter templates and resources to start your complaint today. AFCA is free and accessible to all Australians.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/templates">
              <Button className="bg-primary text-primary-foreground">Browse Letter Templates</Button>
            </Link>
            <Link href="/write-complaint">
              <Button variant="outline">AI Complaint Generator</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseStudyCard({
  study: s,
  expanded,
  onToggle,
}: {
  study: CaseStudy;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`bg-card border rounded-2xl shadow-sm overflow-hidden transition-all ${s.isFeatured ? "border-amber-200 shadow-amber-50" : "hover:border-primary/30"}`}>
      {s.isFeatured && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2 flex items-center gap-2">
          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
          <span className="text-sm font-semibold text-amber-800">Featured Case Study</span>
        </div>
      )}

      <button className="w-full text-left p-6" onClick={onToggle}>
        <div className="flex items-start gap-4">
          <div className="shrink-0 h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-xs font-medium bg-secondary px-2.5 py-1 rounded-full text-muted-foreground">
                {s.issueType}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" /> {s.year}
              </span>
            </div>
            <h3 className="font-bold text-lg text-foreground leading-tight mb-1">{s.title}</h3>
            <p className="text-sm font-medium text-primary mb-2">{s.bank}</p>
            <p className="text-sm text-muted-foreground line-clamp-3">{s.summary}</p>
          </div>
          <div className="shrink-0 mt-1">
            {expanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t px-6 pb-6 space-y-6">
          {/* Chronology */}
          <div>
            <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Chronology of Events
            </h4>
            <div className="bg-muted/50 rounded-xl p-4">
              <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">
                {s.chronology}
              </pre>
            </div>
          </div>

          {/* Outcome */}
          <div>
            <h4 className="font-semibold text-primary mb-3">Outcome</h4>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm text-green-900 leading-relaxed">{s.outcome}</p>
            </div>
          </div>

          {/* Key Lessons */}
          <div>
            <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Key Lessons
            </h4>
            <ul className="space-y-2">
              {(s.keyLessons || []).map((lesson, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="h-5 w-5 bg-accent/20 text-accent rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-foreground">{lesson}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legislation */}
          {s.relevantLegislation && s.relevantLegislation.length > 0 && (
            <div>
              <h4 className="font-semibold text-primary mb-3">Relevant Legislation & Standards</h4>
              <ul className="space-y-1">
                {s.relevantLegislation.map((leg, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">›</span>
                    {leg}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
