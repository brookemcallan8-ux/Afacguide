import React, { useState } from "react";
import { BackButton } from "@/components/back-button";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Send, Save, Copy, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { useCreateComplaint, useListComplaintTypes } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

const formSchema = z.object({
  issueType: z.string().min(1, "Please select an issue type"),
  financialInstitution: z.string().min(2, "Please enter the institution's name"),
  accountNumber: z.string().optional(),
  incidentDate: z.string().optional(),
  description: z.string().min(20, "Please provide more details about what happened"),
  desiredOutcome: z.string().min(10, "Please specify what you want them to do"),
  complainantName: z.string().min(2, "Please enter your name"),
  complainantAddress: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function WriteComplaint() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialType = searchParams.get("type") || "";

  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [copied, setCopied] = useState(false);
  
  const { toast } = useToast();
  const { data: complaintTypes } = useListComplaintTypes();
  const createComplaint = useCreateComplaint();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      issueType: initialType,
      financialInstitution: "",
      accountNumber: "",
      incidentDate: "",
      description: "",
      desiredOutcome: "",
      complainantName: "",
      complainantAddress: "",
    },
  });

  const generateLetter = async (data: FormValues) => {
    setIsGenerating(true);
    setGeneratedLetter("");
    setStep(3); // Move to generation/result step

    try {
      const response = await fetch('/api/complaints/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to generate letter');
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.substring(6);
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.content) {
                setGeneratedLetter((prev) => prev + parsed.content);
              }
              if (parsed.done) {
                // Done
              }
            } catch (e) {
              // Ignore parse errors for incomplete chunks
            }
          }
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate the complaint letter. Please try again.",
        variant: "destructive",
      });
      setStep(2); // Go back to form
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "The letter has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    const data = form.getValues();
    createComplaint.mutate(
      {
        data: {
          issueType: data.issueType,
          financialInstitution: data.financialInstitution,
          summary: data.description.substring(0, 100) + '...',
          generatedLetter,
          status: 'draft'
        }
      },
      {
        onSuccess: () => {
          toast({
            title: "Saved successfully",
            description: "Your complaint draft has been saved.",
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to save the complaint draft.",
            variant: "destructive",
          });
        }
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <BackButton />
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 font-serif text-primary">Write Your Complaint</h1>
        <p className="text-muted-foreground">
          Answer a few questions and our AI assistant will draft a formal complaint letter tailored to AFCA's requirements.
        </p>
      </div>

      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10">
          <div 
            className="h-full bg-accent transition-all duration-300" 
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
        </div>
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors ${
              step >= i 
                ? "bg-accent border-accent text-accent-foreground" 
                : "bg-background border-muted text-muted-foreground"
            }`}
          >
            {i}
          </div>
        ))}
      </div>

      <Card className="border-primary/10 shadow-lg">
        <CardContent className="p-6 md:p-8">
          {step === 1 && (
            <Form {...form}>
              <form onSubmit={() => setStep(2)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary">The Basics</h3>
                  
                  <FormField
                    control={form.control}
                    name="issueType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What is the issue about?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an issue type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {complaintTypes?.map((type) => (
                              <SelectItem key={type.id} value={type.label}>
                                {type.label}
                              </SelectItem>
                            ))}
                            {!complaintTypes && (
                              <SelectItem value="Other">Other Banking Issue</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="financialInstitution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Financial Institution Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Commonwealth Bank" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Leave blank if not applicable" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="incidentDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Incident (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 15 March 2024" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    type="button" 
                    onClick={async () => {
                      const isValid = await form.trigger(["issueType", "financialInstitution"]);
                      if (isValid) setStep(2);
                    }}
                    className="bg-primary text-primary-foreground"
                  >
                    Next Details <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {step === 2 && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(generateLetter)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary">The Details</h3>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What happened?</FormLabel>
                        <FormDescription>Explain the situation simply. The AI will format it professionally.</FormDescription>
                        <FormControl>
                          <Textarea 
                            placeholder="I noticed a charge I didn't make. I called the bank but they refused to refund it..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="desiredOutcome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What do you want them to do?</FormLabel>
                        <FormDescription>How can they fix this?</FormDescription>
                        <FormControl>
                          <Textarea 
                            placeholder="I want the $50 fee refunded and my account reinstated..." 
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="complainantName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="complainantAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Address (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Example St..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Generate Letter <Send className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-primary">Your Draft Letter</h3>
                {isGenerating && (
                  <span className="flex items-center text-sm text-accent font-medium">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Drafting...
                  </span>
                )}
              </div>

              <div className="bg-muted/30 border rounded-lg p-6 font-mono text-sm whitespace-pre-wrap min-h-[300px]">
                {generatedLetter || (isGenerating ? "Thinking..." : "Something went wrong.")}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(2)}
                  disabled={isGenerating}
                >
                  Edit Details
                </Button>
                <div className="flex-1 flex gap-2 justify-end">
                  <Button 
                    variant="secondary" 
                    onClick={handleCopy}
                    disabled={isGenerating || !generatedLetter}
                  >
                    {copied ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    Copy Letter
                  </Button>
                  <Button 
                    onClick={handleSave}
                    disabled={isGenerating || !generatedLetter || createComplaint.isPending}
                    className="bg-primary text-primary-foreground"
                  >
                    {createComplaint.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Draft
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
