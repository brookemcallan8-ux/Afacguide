import React, { useState } from "react";
import { BackButton } from "@/components/back-button";
import { FileText, Search, Star, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = [
  "All",
  "Initial Complaint",
  "Financial Hardship",
  "Document Requests",
  "AFCA Submissions",
  "Evidence & Chronology",
  "Escalation",
  "Mortgage & Property",
  "Credit & Loans",
  "Account & Fees",
];

const DIFFICULTY_COLOURS: Record<string, string> = {
  beginner: "bg-green-100 text-green-800 border-green-200",
  intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
  advanced: "bg-red-100 text-red-800 border-red-200",
};

interface Template {
  id: number;
  title: string;
  description: string;
  category: string;
  situation: string;
  content: string;
  tags: string[];
  difficulty: string;
  isFeatured: boolean;
}

export default function Templates() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [templates, setTemplates] = React.useState<Template[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [expanded, setExpanded] = React.useState<number | null>(null);

  React.useEffect(() => {
    fetch(`/api/letter-templates`)
      .then((r) => r.json())
      .then((data) => {
        setTemplates(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = templates.filter((t) => {
    const matchCat = selectedCategory === "All" || t.category === selectedCategory;
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.situation.toLowerCase().includes(q) ||
      (t.tags || []).some((tag) => tag.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const featured = filtered.filter((t) => t.isFeatured);
  const regular = filtered.filter((t) => !t.isFeatured);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 pt-4">
        <BackButton />
      </div>
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Letter Templates</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            150+ professionally drafted letter templates for every stage of a banking dispute — from initial complaint to AFCA determination.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-10">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates by keyword, situation, or issue type…"
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border hover:border-primary/50 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading templates…</div>
        ) : (
          <>
            {/* Featured */}
            {featured.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <h2 className="text-lg font-semibold text-primary">Featured Templates</h2>
                </div>
                <div className="space-y-3">
                  {featured.map((t) => (
                    <TemplateCard
                      key={t.id}
                      template={t}
                      expanded={expanded === t.id}
                      onToggle={() => setExpanded(expanded === t.id ? null : t.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {regular.length > 0 && (
              <div>
                {featured.length > 0 && (
                  <h2 className="text-lg font-semibold text-primary mb-4">All Templates</h2>
                )}
                <div className="space-y-3">
                  {regular.map((t) => (
                    <TemplateCard
                      key={t.id}
                      template={t}
                      expanded={expanded === t.id}
                      onToggle={() => setExpanded(expanded === t.id ? null : t.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                No templates found. Try a different search or category.
              </div>
            )}

            <p className="text-sm text-muted-foreground mt-8 text-center">
              Showing {filtered.length} of {templates.length} templates
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function TemplateCard({
  template: t,
  expanded,
  onToggle,
}: {
  template: Template;
  expanded: boolean;
  onToggle: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(t.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card border rounded-xl shadow-sm overflow-hidden hover:border-primary/30 transition-all">
      <button
        className="w-full text-left p-5 flex items-start gap-4"
        onClick={onToggle}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${DIFFICULTY_COLOURS[t.difficulty] ?? "bg-gray-100 text-gray-700 border-gray-200"}`}>
              {t.difficulty.charAt(0).toUpperCase() + t.difficulty.slice(1)}
            </span>
            <span className="text-xs text-muted-foreground">{t.category}</span>
            {t.isFeatured && (
              <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            )}
          </div>
          <h3 className="font-semibold text-foreground leading-tight mb-1">{t.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{t.description}</p>
          {!expanded && (
            <p className="text-xs text-primary mt-2 font-medium">
              <em>When to use:</em> {t.situation.length > 100 ? t.situation.slice(0, 100) + "…" : t.situation}
            </p>
          )}
        </div>
        <div className="shrink-0 mt-1">
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t px-5 pb-5">
          <div className="bg-muted/50 rounded-lg p-4 mb-4">
            <p className="text-sm font-medium text-primary mb-1">When to use this template:</p>
            <p className="text-sm text-muted-foreground">{t.situation}</p>
          </div>
          <div className="flex justify-end mb-3">
            <Button size="sm" variant="outline" onClick={handleCopy} className="gap-2">
              {copied ? (
                <><Check className="h-4 w-4 text-green-500" /> Copied!</>
              ) : (
                <><Copy className="h-4 w-4" /> Copy Template</>
              )}
            </Button>
          </div>
          <pre className="bg-muted rounded-lg p-4 text-xs text-foreground whitespace-pre-wrap font-mono leading-relaxed max-h-96 overflow-y-auto">
            {t.content}
          </pre>
          <div className="flex flex-wrap gap-1 mt-3">
            {(t.tags || []).map((tag) => (
              <span key={tag} className="text-xs bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
