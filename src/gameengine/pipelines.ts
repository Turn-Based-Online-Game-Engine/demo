import { Subject } from "rxjs";
import { PlayerConnectionInfo } from "../socket/socket-room";

export const playerConnectedSubject = new Subject<PlayerConnectionInfo>();
export const roomCreatedSubject = new Subject();