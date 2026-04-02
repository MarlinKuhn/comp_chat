"use client"

import {cn} from "@/lib/utils"
import {MicOff, VolumeX} from "lucide-react"
import type {User} from "@/lib/types/user"

interface UserAvatarProps {
    user: User
    size?: "sm" | "md" | "lg"
    showStatus?: boolean
}

const sizeClasses = {
    sm: "size-6 text-xs",
    md: "size-8 text-sm",
    lg: "size-10 text-base",
}

const statusIconSize = {
    sm: "size-3",
    md: "size-4",
    lg: "size-5",
}

function getInitials(name: string): string {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
}

function getAvatarColor(name: string): string {
    const colors = [
        "bg-rose-500",
        "bg-orange-500",
        "bg-amber-500",
        "bg-emerald-500",
        "bg-teal-500",
        "bg-cyan-500",
        "bg-blue-500",
        "bg-violet-500",
        "bg-purple-500",
        "bg-pink-500",
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
}

export function UserAvatar({
                               user,
                               size = "sm",
                               showStatus = true,
                           }: UserAvatarProps) {
    return (
        <div className="relative">
            <div
                className={cn(
                    "relative flex items-center justify-center rounded-full font-medium text-white transition-all duration-200",
                    sizeClasses[size],
                    getAvatarColor(user.username),
                    user.isSpeaking && "ring-2 ring-green-500 ring-offset-2 ring-offset-background"
                )}
            >
                {/* Speaking glow effect */}
                {user.isSpeaking && (
                    <div className="absolute inset-0 rounded-full bg-green-500/30 animate-pulse"/>
                )}
                <span className="relative z-10">{getInitials(user.username)}</span>
            </div>

            {/* Status icons */}
            {showStatus && (user.isMuted || user.isDeafened) && (
                <div
                    className={cn(
                        "absolute -bottom-0.5 -right-0.5 flex items-center justify-center rounded-full bg-background p-0.5",
                        size === "sm" && "-bottom-0 -right-0"
                    )}
                >
                    {user.isDeafened ? (
                        <VolumeX
                            className={cn("text-destructive-foreground", statusIconSize[size])}
                        />
                    ) : user.isMuted ? (
                        <MicOff
                            className={cn("text-destructive-foreground", statusIconSize[size])}
                        />
                    ) : null}
                </div>
            )}
        </div>
    )
}
