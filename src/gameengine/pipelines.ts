import { Subject } from "rxjs";
import {PlayerConnectionInfo} from "../types/player-connection-info";

export const playerConnectedSubject = new Subject<PlayerConnectionInfo>();
export const roomCreatedSubject = new Subject();
