"use client"

import {cn} from "@/lib/utils"
import {ChevronRight, Volume2} from "lucide-react"
import {UserAvatar} from "./user-avatar"
import type {Channel} from "@/lib/types/channel"

interface ChannelItemProps {
    channel: Channel
    isSelected: boolean
    onSelect: (channel: Channel) => void
}

export function ChannelItem({
                                channel,
                                isSelected,
                                onSelect,
                            }: ChannelItemProps) {
    return (
        <div className="flex flex-col">
            <button
                onClick={() => onSelect(channel)}
                className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors w-full",
                    isSelected
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
            >
                <Volume2 className="size-4 shrink-0"/>
                <span className="flex-1 truncate font-medium text-sm">
          {channel.name}
        </span>
                <span className="text-xs text-muted-foreground">
          {channel.users.length > 0 && channel.users.length}
        </span>
                <ChevronRight
                    className={cn(
                        "size-4 shrink-0 transition-transform",
                        isSelected && "rotate-90"
                    )}
                />
            </button>

            {/* Users list */}
            {channel.users.length > 0 && (
                <div className="ml-6 mt-1 flex flex-col gap-1 border-l border-border/50 pl-3">
                    {channel.users.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center gap-2 py-1 text-sm text-muted-foreground"
                        >
                            <UserAvatar user={user} size="sm"/>
                            <span
                                className={cn(
                                    "truncate",
                                    user.isSpeaking && "text-foreground font-medium"
                                )}
                            >
                {user.username}
              </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
