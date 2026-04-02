import {User} from "@/lib/types/user";

export interface Channel {
    id: string
    name: string
    users: User[]
    type: "voice" | "text"
}