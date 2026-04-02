"use client"

import {Clock, Server as ServerIcon, Trash2} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Server} from "@/lib/types/server";

interface ServerHistoryProps {
    servers: Server[]
    onSelect: (server: Server) => void
    onRemove: (id: string) => void
}

export function ServerHistory({
                                  servers,
                                  onSelect,
                                  onRemove,
                              }: ServerHistoryProps) {
    if (servers.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <Clock className="size-8 mb-2 opacity-50"/>
                <p className="text-sm">No recent servers</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2">
            {servers.map((server) => (
                <div
                    key={server.id}
                    className="group flex items-center gap-3 rounded-lg bg-secondary/50 p-3 transition-colors hover:bg-secondary cursor-pointer"
                    onClick={() => onSelect(server)}
                >
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                        <ServerIcon className="size-5 text-primary"/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                            {server.name}
                        </p>
                        <p className="text-sm text-muted-foreground">{server.ip}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                        onClick={(e) => {
                            e.stopPropagation()
                            onRemove(server.id)
                        }}
                    >
                        <Trash2 className="size-4"/>
                    </Button>
                </div>
            ))}
        </div>
    )
}
