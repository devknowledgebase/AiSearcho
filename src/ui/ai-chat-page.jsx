"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SparklesIcon, BotIcon, UserIcon, ImageIcon, ChevronDownIcon } from "lucide-react"
import { cn } from "../lib/utils"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { AiChatBar } from "./ai-chat-bar"

const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content: "Hi there! I'm AISearcho. How can I help you today? I can help with account settings, data analysis, or just a friendly chat.",
  },
]

export function AiChatPage() {
  const [messages, setMessages] = React.useState(INITIAL_MESSAGES)
  const [isTyping, setIsTyping] = React.useState(false)
  const scrollRef = React.useRef(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages, isTyping])

  const handleSend = async (content, attachment) => {
    const newMessage = { role: "user", content, attachment };
    const currentMessages = [...messages, newMessage];
    
    setMessages(currentMessages);
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      if (!apiKey) {
        throw new Error("VITE_OPENROUTER_API_KEY is missing. If you are on Vercel, please add it to your Environment Variables.");
      }

      const apiMessages = currentMessages.map(msg => ({
        role: msg.role,
        content: msg.content,
        ...(msg.reasoning_details && { reasoning_details: msg.reasoning_details })
      }));

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://ai-searcho.vercel.app",
          "X-Title": "AISearcho"
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-3-super-120b-a12b:free",
          messages: apiMessages,
          reasoning: { enabled: true }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API HTTP Error:", response.status, errorData);
        const errorMessage = errorData.error?.message || `Status ${response.status}`;
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("API Success Response:", result);
      
      if (result.choices && result.choices.length > 0) {
        const assistantMessage = result.choices[0].message;
        setMessages(prev => [...prev, {
          role: "assistant",
          content: assistantMessage.content,
          reasoning_details: assistantMessage.reasoning || assistantMessage.reasoning_details
        }]);
      } else {
        console.error("API Error:", result);
        setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I received an invalid response from the server." }]);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: `Sorry, I encountered an error: ${error.message}. Please try again later or check your API key.` 
      }]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="relative flex h-[calc(100svh-var(--header-height))] flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5 bg-black/20 backdrop-blur-md z-10">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
          <SparklesIcon className="size-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">AI Assistant</h2>
          <p className="text-xs text-white/40">Powered by AISearcho Intelligence</p>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar pb-32"
      >
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${message.role === "user" ? "bg-white/5 border-white/10 text-white" : "bg-primary/10 border-primary/20 text-primary"}`}>
                {message.role === "user" ? <UserIcon className="size-5" /> : <BotIcon className="size-5" />}
              </div>
              <div className="flex flex-col gap-2 max-w-[80%]">
                <div className={`rounded-2xl p-4 text-sm leading-relaxed ${message.role === "user" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10" : "bg-white/5 border border-white/10 text-white/90"}`}>
                  {message.reasoning_details && (
                    <details className="mb-3 group">
                      <summary className="text-xs font-medium text-white/50 cursor-pointer hover:text-white/80 select-none list-none uppercase tracking-wider flex items-center gap-1.5 transition-colors [&::-webkit-details-marker]:hidden">
                        <SparklesIcon className="size-3 text-primary" />
                        Thinking Process
                        <ChevronDownIcon className="size-3 ml-1 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="mt-2 text-xs italic text-white/50 border-l-2 border-white/20 pl-3 py-1 whitespace-pre-wrap">
                        {(() => {
                          try {
                            const parsed = typeof message.reasoning_details === "string" 
                              ? JSON.parse(message.reasoning_details) 
                              : message.reasoning_details;
                            if (Array.isArray(parsed)) {
                              return parsed.map(p => p.text).join("");
                            }
                            return parsed.text || JSON.stringify(parsed);
                          } catch (e) {
                            return String(message.reasoning_details);
                          }
                        })()}
                      </div>
                    </details>
                  )}
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />,
                      li: ({node, ...props}) => <li className="pl-1" {...props} />,
                      h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-3 mt-5 tracking-tight" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-lg font-bold mb-3 mt-5 tracking-tight" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-base font-bold mb-2 mt-4 tracking-tight" {...props} />,
                      a: ({node, ...props}) => <a className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors" target="_blank" rel="noreferrer" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />,
                      table: ({node, ...props}) => (
                        <div className="overflow-x-auto mb-4 my-4 rounded-lg border border-white/10">
                          <table className="min-w-full divide-y divide-white/10 text-sm" {...props} />
                        </div>
                      ),
                      thead: ({node, ...props}) => <thead className="bg-white/5" {...props} />,
                      tbody: ({node, ...props}) => <tbody className="divide-y divide-white/5 bg-black/20" {...props} />,
                      th: ({node, ...props}) => <th className="px-4 py-3 text-left font-medium text-white/70" {...props} />,
                      td: ({node, ...props}) => <td className="px-4 py-3 text-white/80" {...props} />,
                      code: ({node, inline, className, children, ...props}) => {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                          <div className="bg-black/50 rounded-lg p-4 mb-4 overflow-x-auto border border-white/10">
                            <code className={cn("text-sm font-mono text-white/90", className)} {...props}>
                              {children}
                            </code>
                          </div>
                        ) : (
                          <code className="bg-black/30 text-white/90 px-1.5 py-0.5 rounded-md text-sm font-mono border border-white/5" {...props}>
                            {children}
                          </code>
                        )
                      }
                    }}
                  >
                    {typeof message.content === 'string' 
                      ? message.content 
                      : Array.isArray(message.content)
                        ? message.content.map(c => c.text || JSON.stringify(c)).join(' ')
                        : message.content?.text || JSON.stringify(message.content)}
                  </ReactMarkdown>
                </div>
                {message.attachment && (
                  <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 p-2 text-[10px] text-white/40 w-fit">
                    <ImageIcon className="size-3" />
                    {message.attachment.name}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-primary/10 border-primary/20 text-primary">
                <BotIcon className="size-5" />
              </div>
              <div className="flex items-center gap-1 rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                <div className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                <div className="size-1.5 rounded-full bg-primary animate-bounce" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input area */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none z-50">
        <div className="pointer-events-auto">
          <AiChatBar isVisible={true} onSend={handleSend} />
        </div>
      </div>
    </div>
  )
}
