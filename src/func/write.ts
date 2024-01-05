import { instance } from "../lib/instance";
import { Bunch, Helpers, WriteRowInput } from "../types/rdsync_types";

export class RDSyncWrite {
    private helpers: Helpers;
    
    constructor (_helpers: Helpers) {
        this.helpers = _helpers;
    }

    /**
     * Write one row in async mode
     * 
     * @param {string} db database name
     * @param {string} table table name
     * @param {string} key row data key
     * @param {string} value row data value
     * @returns status of creation
     */
    public one({db, table, key, value, type}: WriteRowInput) {
        const _db = db ? db : this.helpers.get_db_name();
        const _table = table ? table : this.helpers.get_table_name();
        const _value = value;

        if (_db == null || !_db.length) {
            throw new Error("[ ERROR ]: Database name is null. Please connect or pass this parameter");
        }

        if (_table == null || !_table.length) {
            throw new Error("[ ERROR ]: Table name is null. Please connect or pass this parameter");
        }
        
        try {
            const value = instance.post("row", {
                db: _db,
                table: _table,
                key,
                value: _value,
                type
            });
            return value;
        } catch (e: any) {
            console.log(e)
            throw new Error(e);
        }
    }

    /**
     * Write bunch rows in async mode
     * 
     * @param {Bunch[]} bunch array of key - value data
     * @param {string} db database name
     * @param {string} table table name
     * @returns status of creation
     */
    public bunch(bunch: Bunch[], db?: string, table?: string) {
        const _db = db ? db : this.helpers.get_db_name();
        const _table = table ? table : this.helpers.get_table_name();

        if (_db == null || !_db.length) {
            throw new Error("[ ERROR ]: Database name is null. Please connect or pass this parameter");
        }

        if (_table == null || !_table.length) {
            throw new Error("[ ERROR ]: Table name is null. Please connect or pass this parameter");
        }
        
        try {
            const value = instance.post("bunch", {
                db: _db,
                table: _table,
                value: JSON.stringify(bunch),
            });
            return value;
        } catch (e: any) {
            throw new Error(e);
        }
    }
}