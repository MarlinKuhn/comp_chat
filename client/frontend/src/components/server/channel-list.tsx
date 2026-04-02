"use client"

import {ChannelItem} from "./channel-item"
import type {Channel} from "@/lib/types/channel"

interface ChannelListProps {
    channels: Channel[]
    selectedChannel: Channel | null
    onSelectChannel: (channel: Channel) => void
}

export function ChannelList({
                                channels,
                                selectedChannel,
                                onSelectChannel,
                            }: ChannelListProps) {
    return (
        <div className="flex flex-col gap-1">
            <div className="px-2 py-1.5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Voice Channels
                </h3>
            </div>
            {channels.map((channel) => (
                <ChannelItem
                    key={channel.id}
                    channel={channel}
                    isSelected={selectedChannel?.id === channel.id}
                    onSelect={onSelectChannel}
                />
            ))}
        </div>
    )
}
