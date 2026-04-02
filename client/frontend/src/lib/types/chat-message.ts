export interface ChatMessage {
    id: string
    channelId: string
    userId: string
    username: string
    content: string
    timestamp: Date
}