"use client"

import {useState} from "react"
import {Server} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {ServerHistory} from "./server-history"
import type {Server as ServerType} from "@/lib/types/server"
import logo from '@/assets/images/logo.png'

interface ConnectScreenProps {
    servers: ServerType[]
    onConnect: (ip: string, username: string) => void
    onRemoveServer: (id: string) => void
}

export default function ConnectView({
                                        servers,
                                        onConnect,
                                        onRemoveServer,
                                    }: ConnectScreenProps) {
    const [ip, setIp] = useState("")
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")

    const handleConnect = () => {
        if (!ip.trim()) {
            setError("Please enter a server IP address")
            return
        }
        if (!username.trim()) {
            setError("Please enter a username")
            return
        }
        setError("")
        onConnect(ip.trim(), username.trim())
    }

    const handleSelectServer = (server: ServerType) => {
        setIp(server.ip)
        setError("")
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleConnect()
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-secondary/20">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <div className="flex h-32 items-center justify-center mb-4">
                        <img src={logo}/>
                    </div>
                </div>

                <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Server className="size-5"/>
                            Server Connection
                        </CardTitle>
                        <CardDescription>
                            Enter server details or select from history
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="ip" className="text-sm font-medium">
                                Server IP
                            </label>
                            <Input
                                id="ip"
                                placeholder="192.168.1.100"
                                value={ip}
                                onChange={(e) => setIp(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="username" className="text-sm font-medium">
                                Username
                            </label>
                            <Input
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-destructive">{error}</p>
                        )}

                        <Button onClick={handleConnect} className="w-full mt-2">
                            Connect
                        </Button>
                    </CardContent>
                </Card>

                <Card className="mt-4 border-border/50 bg-card/80 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Recent Servers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ServerHistory
                            servers={servers}
                            onSelect={handleSelectServer}
                            onRemove={onRemoveServer}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
