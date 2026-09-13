import React from "react";
import { BackButton } from "@/components/back-button";
import { useListComplaints, useDeleteComplaint, getListComplaintsQueryKey } from "@workspace/api-client-react";
import { format } from "date-fns";
import { FileText, Trash2, Calendar, Building, Copy, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQueryClient } from "@tanstack/react-query";

export default function MyComplaints() {
  const { data: complaints, isLoading } = useListComplaints();
  const deleteComplaint = useDeleteComplaint();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [copiedId, setCopiedId] = React.useState<number | null>(null);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this draft?")) {
      deleteComplaint.mutate(
        { id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListComplaintsQueryKey() });
            toast({ title: "Draft deleted" });
          },
          onError: () => {
            toast({ title: "Failed to delete draft", variant: "destructive" });
          }
        }
      );
    }
  };

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({ title: "Copied to clipboard" });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <BackButton />
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 font-serif text-primary">My Drafts</h1>
          <p className="text-muted-foreground">
            Saved complaint letters that you've generated.
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card border rounded-lg p-6 flex flex-col gap-4">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      )}

      {complaints?.length === 0 && (
        <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-xl font-medium mb-2">No drafts yet</h3>
          <p className="text-muted-foreground mb-6">You haven't saved any complaint letters.</p>
        </div>
      )}

      {complaints && complaints.length > 0 && (
        <Accordion type="single" collapsible className="space-y-4">
          {complaints.map((complaint) => (
            <AccordionItem 
              key={complaint.id} 
              value={complaint.id.toString()}
              className="bg-card border rounded-lg px-2 shadow-sm"
            >
              <AccordionTrigger className="hover:no-underline px-4 py-4">
                <div className="flex flex-col items-start text-left gap-2 flex-1">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-semibold text-lg">{complaint.issueType}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 font-normal bg-muted px-2 py-1 rounded-full">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(complaint.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground flex items-center gap-2 font-medium">
                    <Building className="h-4 w-4" />
                    {complaint.financialInstitution}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="pt-4 border-t space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-foreground/80">Summary</h4>
                    <p className="text-sm text-muted-foreground">{complaint.summary}</p>
                  </div>
                  
                  {complaint.generatedLetter && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-foreground/80">Generated Letter</h4>
                      <div className="bg-muted/30 border rounded-lg p-4 font-mono text-xs whitespace-pre-wrap max-h-96 overflow-y-auto">
                        {complaint.generatedLetter}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-2 pt-4">
                    {complaint.generatedLetter && (
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleCopy(complaint.generatedLetter!, complaint.id)}
                      >
                        {copiedId === complaint.id ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                        Copy
                      </Button>
                    )}
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(complaint.id)}
                      disabled={deleteComplaint.isPending}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
