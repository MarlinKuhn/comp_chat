import ConnectView from "@components/connect/connect-view";
import {useEffect, useState} from "react";
import {Config} from "@wails/go/app/App";
import {Server} from "@/lib/types/server";
import {useNavigate} from "react-router-dom";

export default function ConnectPage() {
    let navigate = useNavigate();
    const [servers, setServers] = useState<Server[]>([])
    useEffect(() => {
        async function getCfg() {
            const cfg = await Config()
            const newServers: Server[] = []
            for (const server of cfg.servers) {
                newServers.push({
                    ip: server.ip,
                    name: server.userName,
                    id: server.ip,
                    lastConnected: new Date()
                })
            }
            setServers(newServers)
        }

        getCfg()
    }, [])

    function onConnect(ip: string, name: string) {
        navigate('/server')
    }

    function onRemoveServer(id: string) {

    }

    return (
        <ConnectView servers={servers} onConnect={onConnect} onRemoveServer={onRemoveServer}/>
    )
}