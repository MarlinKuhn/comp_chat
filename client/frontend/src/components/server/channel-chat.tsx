"use client"

import {useEffect, useRef, useState} from "react"
import {Hash, Send} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {UserAvatar} from "./user-avatar"
import type {Channel} from "@/lib/types/channel"
import type {ChatMessage} from "@/lib/types/chat-message"
import type {User} from "@/lib/types/user"

interface ChannelChatProps {
    channel: Channel
    messages: ChatMessage[]
    currentUser: string
    onSendMessage: (content: string) => void
}

function formatTime(date: Date): string {
    return date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
}

function formatDate(date: Date): string {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
        return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday"
    }
    return date.toLocaleDateString([], {month: "short", day: "numeric"})
}

export function ChannelChat({
                                channel,
                                messages,
                                currentUser,
                                onSendMessage,
                            }: ChannelChatProps) {
    const [input, setInput] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const channelMessages = messages.filter((m) => m.channelId === channel.id)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }, [channelMessages])

    const handleSend = () => {
        if (input.trim()) {
            onSendMessage(input.trim())
            setInput("")
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    // Group messages by date
    const groupedMessages: { date: string; messages: ChatMessage[] }[] = []
    let currentDate = ""

    channelMessages.forEach((message) => {
        const msgDate = formatDate(message.timestamp)
        if (msgDate !== currentDate) {
            currentDate = msgDate
            groupedMessages.push({date: msgDate, messages: [message]})
        } else {
            groupedMessages[groupedMessages.length - 1].messages.push(message)
        }
    })

    return (
        <div className="flex flex-col h-full">
            {/* Chat header */}
            <div className="flex items-center gap-2 border-b border-border px-4 py-3 shrink-0">
                <Hash className="size-5 text-muted-foreground"/>
                <h2 className="font-semibold text-foreground">{channel.name}</h2>
                <span className="text-sm text-muted-foreground">
          {channel.users.length} {channel.users.length === 1 ? "user" : "users"}{" "}
                    connected
        </span>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
                {channelMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                        <Hash className="size-12 mb-3 opacity-30"/>
                        <p className="font-medium">
                            Welcome to #{channel.name}
                        </p>
                        <p className="text-sm">
                            This is the start of the chat history.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {groupedMessages.map((group) => (
                            <div key={group.date} className="flex flex-col gap-3">
                                <div className="relative flex items-center py-2">
                                    <div className="flex-1 border-t border-border"/>
                                    <span className="px-3 text-xs font-medium text-muted-foreground">
                    {group.date}
                  </span>
                                    <div className="flex-1 border-t border-border"/>
                                </div>

                                {group.messages.map((message) => {
                                    const mockUser: User = {
                                        id: message.userId,
                                        username: message.username,
                                        isSpeaking: false,
                                        isMuted: false,
                                        isDeafened: false,
                                    }

                                    return (
                                        <div key={message.id} className="flex gap-3 group">
                                            <UserAvatar user={mockUser} size="md" showStatus={false}/>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-baseline gap-2">
                          <span className="font-medium text-foreground">
                            {message.username}
                          </span>
                                                    <span className="text-xs text-muted-foreground">
                            {formatTime(message.timestamp)}
                          </span>
                                                </div>
                                                <p className="text-foreground/90 break-words">
                                                    {message.content}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                        <div ref={messagesEndRef}/>
                    </div>
                )}
            </div>

            {/* Message input */}
            <div className="border-t border-border px-4 py-3 shrink-0">
                <div className="flex gap-2">
                    <Input
                        placeholder={`Message #${channel.name}`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1"
                    />
                    <Button onClick={handleSend} size="icon" disabled={!input.trim()}>
                        <Send className="size-4"/>
                    </Button>
                </div>
            </div>
        </div>
    )
}
