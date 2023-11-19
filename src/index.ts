import { RDSyncConnect } from "./func/connect";
import { RDSyncCreate } from "./func/create";
import { RDSyncDelete } from "./func/delete";
import { RDSyncRead } from "./func/read";
import { RDSyncWrite } from "./func/write";

var url: string | null = null;
var db_name: string | null = null;
var table_name: string | null = null;

const set_url = (_url: string): void => {url = _url;}
const set_db_name = (name: string): void => {db_name = name;}
const set_table_name = (name: string): void => {table_name = name;}
const get_url = (): string | null => url;
const get_db_name = (): string | null => db_name;
const get_table_name = (): string | null => table_name;

const helpers = {
    set_url,
    get_url,
    set_db_name,
    set_table_name,
    get_db_name,
    get_table_name
}

export class RDSync {
    /**
     * @param _url - Database URL address
     */
    constructor (_url: string) {
        url = _url;
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
const rdsync = new RDSync("http://localhost:3000");

const test = async () => {
    rdsync.connect.db("test");
    rdsync.connect.table("test_table");
    
    // await rdsync.create.create_table({
    //     db: "test",
    //     name: "test_table"
    // })
    // await rdsync.delete.table({})
    // await rdsync.write.one({
    //     key: "helloooooo",
    //     value: "helloooooo from RDSync"
    // })
    
    // const row = await rdsync.read.row<any>({
    //     key: "helloooooo"
    // })

    // await rdsync.delete.row({
    //     key: "helloooooo"
    // })

    // console.log(row)
}

test()