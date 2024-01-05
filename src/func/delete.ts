import { instance } from "../lib/instance";
import { Helpers, ResponseObj, RowInput, TableInput } from "../types/rdsync_types";

export class RDSyncDelete {
    private helpers: Helpers;
    
    constructor (_helpers: Helpers) {
        this.helpers = _helpers;
    }

    /**
     * Deletes one row in async mode
     * 
     * @param params db (database name), table (table name), key
     * @returns status
     */
    public async row({db, table, key}: RowInput): Promise<ResponseObj> {
        const _db = db ? db : this.helpers.get_db_name();
        const _table = table ? table : this.helpers.get_table_name();

        if (_db == null || !_db.length) {
            throw new Error("[ ERROR ]: Database name is null. Please connect or pass this parameter");
        }

        if (_table == null || !_table.length) {
            throw new Error("[ ERROR ]: Table name is null. Please connect or pass this parameter");
        }
        
        try {
            const value = await instance.delete<ResponseObj>("row", {
                db: _db,
                table: _table,
                key: key
            }).call();
            return value;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    /**
     * Deletes one row in sync mode
     * 
     * @param params db (database name), table (table name), key
     * @param {Function} callback function which executes when operation was success
     * @param {Function} error function which executes when something went wrong
     */
    public row_sync(
        {db, table, key}: RowInput,
        callback: (data: ResponseObj) => void,
        error?: (error: Error) => void
    ): void {
        this.row({db, table, key})
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
     * Deletes table in async mode
     * 
     * @param params db (database name), name (table name)
     * @returns status
     */
    public async table({db, name}: TableInput): Promise<ResponseObj> {
        const _db = db ? db : this.helpers.get_db_name();
        const _table = name ? name : this.helpers.get_table_name();

        if (_db == null || !_db.length) {
            throw new Error("[ ERROR ]: Database name is null. Please connect or pass this parameter");
        }

        if (_table == null || !_table.length) {
            throw new Error("[ ERROR ]: Table name is null. Please connect or pass this parameter");
        }
        
        try {
            const value = await instance.delete<ResponseObj>("table", {
                db: _db,
                table: _table
            }).call();
            return value;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    /**
     * Deletes table in sync mode
     * 
     * @param params db (database name), name (table name)
     * @param {Function} callback function which executes when operation was success
     * @param {Function} error function which executes when something went wrong
     */
    public table_sync(
        {db, name}: TableInput,
        callback: (data: ResponseObj) => void,
        error?: (error: Error) => void
    ): void {
        this.table({db, name})
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
     * Deletes database in async mode
     * 
     * @param {string} name database name
     * @returns status
     */
    public async db(name?: string): Promise<ResponseObj> {
        const _db= name ? name : this.helpers.get_db_name();

        if (_db == null || !_db.length) {
            throw new Error("[ ERROR ]: Database name is null. Please connect or pass this parameter");
        }
        
        try {
            const value = await instance.delete<ResponseObj>("db", {
                db: _db,
            }).call();
            return value;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    /**
     * Deletes database in sync mode
     * 
     * @param {string} name database name
     * @param {Function} callback function which executes when operation was success
     * @param {Function} error function which executes when something went wrong
     */
    public db_sync(
        name: string,
        callback: (data: ResponseObj) => void,
        error?: (error: Error) => void
    ): void {
        this.db(name)
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