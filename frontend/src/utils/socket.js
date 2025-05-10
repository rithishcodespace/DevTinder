import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
    return io(BASE_URL); // establishes socket connection to backend (frontend <-> backend)
}