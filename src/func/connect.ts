import { Helpers } from "../types/rdsync_types";

export class RDSyncConnect {
    private helpers: Helpers

    constructor (helpers: Helpers) {
        this.helpers = helpers;
    }
    
    /**
     * Connect to database by name
     * 
     * @param {string} name name of the database to connect
     */
    public db(name: string): void {
        this.helpers.set_db_name(name);
    }

    /**
     * Connect to database table by name
     * 
     * @param {string} name name of the table to connect
     */
    public table(name: string): void {
        this.helpers.set_table_name(name)
    }
}