import React from "react";
import { BackButton } from "@/components/back-button";
import { Link } from "wouter";
import { useListComplaintTypes } from "@workspace/api-client-react";
import { ArrowRight, Info, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function ComplaintTypes() {
  const { data: complaintTypes, isLoading, error } = useListComplaintTypes();

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <BackButton />
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 font-serif text-primary">Common Banking Issues</h1>
        <p className="text-lg text-muted-foreground">
          Not sure if your issue is something AFCA can help with? Browse common complaint categories to see examples of what they cover.
        </p>
      </div>

      {isLoading && (
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {error && (
        <div className="text-center py-12 bg-destructive/5 rounded-xl border border-destructive/20">
          <p className="text-destructive font-medium">Failed to load complaint types.</p>
        </div>
      )}

      {complaintTypes && (
        <div className="grid md:grid-cols-2 gap-6">
          {complaintTypes.map((type) => (
            <Card key={type.id} className="flex flex-col h-full hover:border-primary/30 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  {type.label}
                </CardTitle>
                <CardDescription className="text-base text-foreground/80 pt-2">
                  {type.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Examples
                  </h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    {type.examples.map((example, i) => (
                      <li key={i}>{example}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/write-complaint?type=${encodeURIComponent(type.label)}`} className="w-full">
                  <Button variant="outline" className="w-full justify-between hover:bg-primary hover:text-primary-foreground">
                    Draft a complaint for this <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
