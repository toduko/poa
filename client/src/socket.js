import io from "socket.io-client";
import { DEV_PORT } from "../../env-constants";

const socket = io.connect(`http://localhost:${DEV_PORT}`);

export default socket;
