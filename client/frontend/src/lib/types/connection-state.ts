import {Server} from "@/lib/types/server";

export interface ConnectionState {
    isConnected: boolean
    currentServer: Server | null
    username: string
}