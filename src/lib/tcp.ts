import { Socket, createConnection } from "net";
import { type_convertor } from "../types";
import { EventEmitter } from "events";
import { RDRequest } from "../types/rdsync_types";

let tx_pull: string[] = [];
let receiver = new EventEmitter();
let client: Socket | null;

export const tcp_init = (_ip: string, _port: number) => {
    client = createConnection(_port, _ip, () => {
        console.log("[ LOG ] TCP Client started")
    })

    client.on("data", (data: Buffer) => {
        if (data.toString().includes("\n")) {
            let chunks = data.toString().split("\n")
            const rud = chunks[0].slice(5, chunks[0].length)
            return receiver.emit("put", {
                rud,
                data: chunks[2] ? type_convertor(chunks[2], chunks[1]) : chunks[1]
            })
        }
        receiver.emit("put")
    })
}

export const send = <T>(data: {r: Buffer, rid: string}): RDRequest<T> => {
    return {
        send: () => {
            if (!client) return;
            client.write(data.r);
                
            receiver.on("put", (tx) => {
                if (tx.rud == data.rid) {
                    console.log(tx.data as T);
                }
            })
            return;
        },
        call: async () => {
            return new Promise((resolve, reject) => {
                if (!client) return reject("[ ERROR ] `Client` is null");
                client.write(data.r);

                receiver.on("put", (tx) => {
                    if (tx.rud == data.rid) {
                        resolve(tx.data as T);
                    }
                })
            })
        }
    }
}