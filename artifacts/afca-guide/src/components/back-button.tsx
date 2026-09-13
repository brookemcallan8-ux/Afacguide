import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackButton({ label = "Back" }: { label?: string }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="mb-6 text-muted-foreground hover:text-primary gap-1.5 pl-1"
      onClick={() => window.history.back()}
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  );
}
