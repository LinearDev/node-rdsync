import { RDRequest } from "../types/rdsync_types";
import { send } from "./tcp";
import { ulid } from "ulid";

// End of line
const EOL = "\n"

/** Preparing tx according to a tcp transactional pipelining protocol
 * 
 * ----------------------------------------
 * | 0x1 | ...head data go here... | 0x17 |
 * ----------------------------------------
 * | 0x2 | ...body data go here... | 0x17 |
 * ----------------------------------------
 */
const prepareQuery = (data: any) => {
    let bufArr = [];
    const rid = ulid();
    //header section start
    bufArr.push(Buffer.from([0x01]))

    // request type
    bufArr.push(Buffer.from(`req: ${data.req}${EOL}`))
    // request id
    bufArr.push(Buffer.from(`rud: ${rid}${EOL}`))
    // db
    bufArr.push(Buffer.from(`db: ${data.db}${EOL}`))
    
    if (data.table) {
        bufArr.push(Buffer.from(`table: ${data.table}${EOL}`))
    }
    if (data.key) {
        bufArr.push(Buffer.from(`key: ${data.key}${EOL}`))
    }
    if (data.type) {
        bufArr.push(Buffer.from(`type: ${data.type}${EOL}`))
    }
    //header section end
    bufArr.push(Buffer.from([0x17]))
    bufArr.push(Buffer.from([0x02]))
    if (data.value) {
        bufArr.push(Buffer.from(`${data.value}`))
    }
    bufArr.push(Buffer.from([0x17]))
    // query += "\c\r"
    return {
        r: Buffer.concat(bufArr),
        rid
    };
}

const methodsAxios = {
    get: <T>(path: string, data: any): RDRequest<T> => {
        data.req = `get_${path}`;
        const q = prepareQuery(data);

        const res = send<T>(q);
        return res;
    },
    post: <T>(path: string, data: any): RDRequest<T> => {
        data.req = `add_${path}`;
        let q = prepareQuery(data);

        const res = send<T>(q);
        return res;
    },
    put: () => {},
    delete: <T>(path: string, data: any): RDRequest<T> => {
        data.req = `delete_${path}`;
        let q = prepareQuery(data);

        const res = send<T>(q);
        return res;
    },
}

export const instance = methodsAxios;