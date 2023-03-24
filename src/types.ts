import { SendMessage } from "react-use-websocket";

export interface SocketProps {
    sendMessage: SendMessage;
    lastMessage: MessageEvent<any> | null;
}
