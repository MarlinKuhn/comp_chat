"use client"

import {HeadphoneOff, Headphones, LogOut, Mic, MicOff, Settings} from "lucide-react"
import {Button} from "@/components/ui/button"
import {ChannelList} from "./channel-list"
import {ChannelChat} from "./channel-chat"
import {UserAvatar} from "./user-avatar"
import {Server} from "@/lib/types/server";
import {Channel} from "@/lib/types/channel";
import {ChatMessage} from "@/lib/types/chat-message";
import {User} from "@/lib/types/user";
import {Link} from "react-router-dom";

interface ConnectedViewProps {
    server: Server
    username: string
    channels: Channel[]
    selectedChannel: Channel | null
    messages: ChatMessage[]
    currentUserState: {
        isMuted: boolean
        isDeafened: boolean
    }
    onSelectChannel: (channel: Channel) => void
    onSendMessage: (content: string) => void
    onToggleMute: () => void
    onToggleDeafen: () => void
    onDisconnect: () => void
}

export function ServerView({
                               server,
                               username,
                               channels,
                               selectedChannel,
                               messages,
                               currentUserState,
                               onSelectChannel,
                               onSendMessage,
                               onToggleMute,
                               onToggleDeafen,
                               onDisconnect,
                           }: ConnectedViewProps) {
    const currentUser: User = {
        id: "current",
        username,
        isSpeaking: false,
        isMuted: currentUserState.isMuted,
        isDeafened: currentUserState.isDeafened,
    }

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <div className="flex flex-col w-64 border-r border-border bg-sidebar shrink-0">
                {/* Server header */}
                <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                    <div
                        className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                        {server.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="font-semibold text-foreground truncate">
                            {server.name}
                        </h2>
                    </div>
                </div>

                {/* Channel list */}
                <div className="flex-1 overflow-y-auto p-2">
                    <ChannelList
                        channels={channels}
                        selectedChannel={selectedChannel}
                        onSelectChannel={onSelectChannel}
                    />
                </div>

                {/* User controls */}
                <div className="border-t border-border p-2">
                    <div className="flex items-center gap-2 rounded-md bg-secondary/50 p-2">
                        <UserAvatar user={currentUser} size="md"/>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                                {username}
                            </p>
                            <p className="text-xs text-muted-foreground">Connected</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                        <Button
                            variant={currentUserState.isMuted ? "destructive" : "ghost"}
                            size="icon-sm"
                            onClick={onToggleMute}
                            title={currentUserState.isMuted ? "Unmute" : "Mute"}
                        >
                            {currentUserState.isMuted ? (
                                <MicOff className="size-4"/>
                            ) : (
                                <Mic className="size-4"/>
                            )}
                        </Button>
                        <Button
                            variant={currentUserState.isDeafened ? "destructive" : "ghost"}
                            size="icon-sm"
                            onClick={onToggleDeafen}
                            title={currentUserState.isDeafened ? "Undeafen" : "Deafen"}
                        >
                            {currentUserState.isDeafened ? (
                                <HeadphoneOff className="size-4"/>
                            ) : (
                                <Headphones className="size-4"/>
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            title="Settings"
                            asChild
                        >
                            <Link to={"/settings"}>
                                <Settings className="size-4"/>
                            </Link>
                        </Button>
                        <div className="flex-1"/>
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={onDisconnect}
                            className="text-destructive-foreground hover:bg-destructive/10"
                            title="Disconnect"
                        >
                            <LogOut className="size-4"/>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {selectedChannel ? (
                    <ChannelChat
                        channel={selectedChannel}
                        messages={messages}
                        currentUser={username}
                        onSendMessage={onSendMessage}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <Headphones className="size-16 mb-4 opacity-30"/>
                        <p className="text-lg font-medium">Select a channel</p>
                        <p className="text-sm">Click on a voice channel to join the conversation</p>
                    </div>
                )}
            </div>
        </div>
    )
}
