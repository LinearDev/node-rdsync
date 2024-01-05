import { RDSyncConnect } from "./func/connect";
import { RDSyncCreate } from "./func/create";
import { RDSyncDelete } from "./func/delete";
import { RDSyncRead } from "./func/read";
import { RDSyncWrite } from "./func/write";
import { tcp_init } from "./lib/tcp";

var db_name: string | null = null;
var table_name: string | null = null;

const set_db_name = (name: string): void => {db_name = name;}
const set_table_name = (name: string): void => {table_name = name;}
const get_db_name = (): string | null => db_name;
const get_table_name = (): string | null => table_name;

const helpers = {
    set_db_name,
    set_table_name,
    get_db_name,
    get_table_name
}
export class RDSync {
    /**
     * @param _url - Database URL address
     */
    constructor (ip: string, port: number) {
        if (!ip || !port) {
            throw new Error("[ ERROR ]: Database URL is null. Pass this parameter");
        }
        tcp_init(ip, port);
    }

    /**
     * Database read methods
     */
    public read = new RDSyncRead(helpers);

    /**
     * Database create methods
     */
    public create = new RDSyncCreate(helpers);

    /**
     * Database connect methods
     */
    public connect = new RDSyncConnect(helpers);

    /**
     * Database delete methods
     */
    public delete = new RDSyncDelete(helpers);

    /**
     * Database write methods
     */
    public write = new RDSyncWrite(helpers);
}

export default RDSync;