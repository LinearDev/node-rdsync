import { instance } from "../lib/instance";
import { Bunch, Error, Helpers, WriteRowInput } from "../types/rdsync_types";

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
    public async one({db, table, key, value}: WriteRowInput): Promise<Error> {
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
            const value = await instance.post(this.helpers, "row", {
                db: _db,
                table: _table,
                key,
                value: _value
            });
            return value;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    /**
     * Write one row in sync mode
     * 
     * @param data ?db, ?table, key, value
     * @param {Function} callback function which executes when operation was success
     * @param {Function} error function which executes when something went wrong
     */
    public one_sync(
        {db, table, key, value}: WriteRowInput,
        callback: (data: Error) => void,
        error?: (error: Error) => void
    ): void {
        this.one({db, table, key, value})
        .then((data) => {
            callback(data);
        })
        .catch((err) => {
            if (error) {
                error(err);
            } else {
                console.error(error);
            }
        });
    }

    /**
     * Write bunch rows in async mode
     * 
     * @param {Bunch[]} bunch array of key - value data
     * @param {string} db database name
     * @param {string} table table name
     * @returns status of creation
     */
    public async bunch(bunch: Bunch[], db?: string, table?: string): Promise<Error> {

        return {} as Error;
    }

    /**
     * Write bunch rows in sync mode
     * 
     * @param {Bunch[]} bunch array of key - value data
     * @param {Function} callback function which executes when operation was success
     * @param {string} db database name
     * @param {string} table table name
     * @param {Function} error function which executes when something went wrong
     * @returns status of creation
     */
    public bunch_sync(
        bunch: Bunch[],
        callback: (data: Error) => void,
        db?: string, table?: string,
        error?: (error: Error) => void
    ): void {
        this.bunch(bunch, db, table)
        .then((data) => {
            callback(data);
        })
        .catch((err) => {
            if (error) {
                error(err);
            } else {
                console.error(error);
            }
        });
    }
}