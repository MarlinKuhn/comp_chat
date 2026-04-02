import {Channel} from "@/lib/types/channel";
import {ServerView} from "@components/server/server-view";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {User} from "@/lib/types/user";

export default function ServerPage() {
    let navigate = useNavigate();
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)
    const [user, setUser] = useState<User>({
        id: "1",
        isDeafened: false,
        isMuted: false,
        username: "Marlin",
        isSpeaking: true,
    })
    return (
        <ServerView
            server={{
                name: "Test",
                lastConnected: new Date(),
                id: "test",
                ip: "192.168.0.1",
            }}
            username={user.username}
            channels={[
                {
                    name: "Home",
                    id: "1234",
                    type: "voice",
                    users: [
                        user,
                    ],
                }
            ]}
            selectedChannel={selectedChannel}
            messages={[
                {
                    id: "1",
                    content: "Hello, world!",
                    username: user.username,
                    channelId: "1234",
                    timestamp: new Date(),
                    userId: "1",
                }
            ]}
            currentUserState={{
                isMuted: user.isMuted,
                isDeafened: user.isDeafened,
            }}
            onSelectChannel={function (channel: Channel): void {
                setSelectedChannel(channel)
            }}
            onSendMessage={function (content: string): void {
                throw new Error("Function not implemented.");
            }}
            onToggleMute={function (): void {
                setUser((prev) => ({...prev, isMuted: !prev.isMuted}))
            }}
            onToggleDeafen={function (): void {
                setUser((prev) => ({...prev, isDeafened: !prev.isDeafened}))
            }}
            onDisconnect={function (): void {
                navigate("/")
            }}/>
    )
}