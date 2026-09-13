import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useListOpenaiConversations,
  useCreateOpenaiConversation,
  useGetOpenaiConversation,
  useDeleteOpenaiConversation,
  getListOpenaiConversationsQueryKey,
  getGetOpenaiConversationQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: conversations } = useListOpenaiConversations();
  const activeConversationId = conversations?.[0]?.id;

  const { data: activeConversation } = useGetOpenaiConversation(activeConversationId || 0, {
    query: {
      enabled: !!activeConversationId,
      queryKey: getGetOpenaiConversationQueryKey(activeConversationId || 0)
    }
  });

  const createConversation = useCreateOpenaiConversation();
  const deleteConversation = useDeleteOpenaiConversation();

  const [streamingContent, setStreamingContent] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (isOpen && !activeConversationId && !createConversation.isPending && conversations?.length === 0) {
      createConversation.mutate({ data: { title: "New Conversation" } }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListOpenaiConversationsQueryKey() });
        }
      });
    }
  }, [isOpen, activeConversationId, conversations, createConversation, queryClient]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeConversation?.messages, streamingContent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeConversationId || isStreaming) return;

    const userMessage = input.trim();
    setInput("");
    setIsStreaming(true);
    setStreamingContent("");

    try {
      const response = await fetch(`/api/openai/conversations/${activeConversationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: userMessage })
      });

      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.substring(6);
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.content) {
                setStreamingContent((prev) => prev + parsed.content);
              }
            } catch (err) {}
          }
        }
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to connect to the assistant.",
        variant: "destructive"
      });
    } finally {
      setIsStreaming(false);
      setStreamingContent("");
      queryClient.invalidateQueries({ queryKey: getGetOpenaiConversationQueryKey(activeConversationId) });
    }
  };

  const handleClearChat = () => {
    if (activeConversationId && confirm("Clear chat history?")) {
      deleteConversation.mutate(
        { id: activeConversationId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListOpenaiConversationsQueryKey() });
            createConversation.mutate({ data: { title: "New Conversation" } }, {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: getListOpenaiConversationsQueryKey() });
              }
            });
          }
        }
      );
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isOpen ? (
        <Card className="w-80 md:w-96 shadow-xl border-primary/20 mb-4 animate-in slide-in-from-bottom-2 fade-in duration-200">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-xl py-3 px-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AFCA Assistant
            </CardTitle>
            <div className="flex gap-1">
              {activeConversationId && activeConversation?.messages && activeConversation.messages.length > 0 && (
                 <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground" onClick={handleClearChat} disabled={deleteConversation.isPending}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 bg-card">
            <ScrollArea className="h-80 p-4" ref={scrollRef}>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted text-sm p-3 rounded-lg rounded-tl-none max-w-[85%] text-foreground">
                    Hello! I can help answer questions about the AFCA process. What would you like to know?
                  </div>
                </div>

                {activeConversation?.messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'}`}>
                      {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className={`text-sm p-3 rounded-lg max-w-[85%] whitespace-pre-wrap ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted text-foreground rounded-tl-none'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isStreaming && (
                  <div className="flex gap-2">
                    <div className="h-8 w-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-muted text-foreground text-sm p-3 rounded-lg rounded-tl-none max-w-[85%] whitespace-pre-wrap">
                      {streamingContent}
                      <span className="inline-block w-1.5 h-4 ml-1 bg-accent animate-pulse align-middle" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-3 border-t bg-card rounded-b-xl">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isStreaming || (!activeConversationId && !conversations)}
                className="flex-1 bg-background"
              />
              <Button type="submit" size="icon" disabled={isStreaming || !input.trim()}>
                {isStreaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : null}

      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90 text-primary-foreground"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
