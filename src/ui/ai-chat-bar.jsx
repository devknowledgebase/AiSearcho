"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SendIcon, SparklesIcon, PaperclipIcon, ImageIcon, XIcon } from "lucide-react"
import { cn } from "../lib/utils"
import { Button } from "./button"
import { Input } from "./input"

export function AiChatBar({ isVisible, onSend }) {
  const [message, setMessage] = React.useState("")
  const [attachment, setAttachment] = React.useState(null)
  const fileInputRef = React.useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setAttachment(file)
    }
  }

  const removeAttachment = () => {
    setAttachment(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSend = () => {
    if ((message.trim() || attachment) && onSend) {
      onSend(message, attachment)
      setMessage("")
      setAttachment(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl mx-auto px-4 md:px-0"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-2 shadow-2xl backdrop-blur-xl hover:shadow-primary/5 transition-shadow duration-500">
            {/* Background Glow */}
            <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
            
            {/* Attachment Preview */}
            <AnimatePresence>
              {attachment && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-3 pt-2 pb-1"
                >
                  <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 p-2 pr-1 animate-pulse">
                    <div className="flex size-8 items-center justify-center rounded-md bg-primary/20 text-primary">
                      <ImageIcon className="size-4" />
                    </div>
                    <span className="flex-1 text-xs text-white/60 truncate">{attachment.name}</span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="size-6 text-white/40 hover:text-white"
                      onClick={removeAttachment}
                    >
                      <XIcon className="size-3" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-2 p-1">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                variant="ghost"
                size="icon"
                className="size-10 shrink-0 rounded-xl text-white/40 hover:bg-white/5 hover:text-white transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <PaperclipIcon className="size-5" />
              </Button>
              
              <div className="flex-1">
                <Input
                  className="h-10 border-0 bg-transparent px-2 text-sm text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Ask anything to AISearcho..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSend()
                    }
                  }}
                />
              </div>

              <div className="flex items-center gap-1 pr-1">
                <Button
                  size="icon"
                  className="size-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 active:scale-95"
                  disabled={!message.trim() && !attachment}
                  onClick={handleSend}
                >
                  <SendIcon className="size-4" />
                </Button>
              </div>
            </div>
            
            {/* Glass effect gradient */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
