import { instance } from "../lib/instance";
import { Helpers, RowInput, TableInput } from "../types/rdsync_types";

export class RDSyncRead {
    private helpers: Helpers;
    
    constructor (_helpers: Helpers) {
        this.helpers = _helpers;
    }

    /**
     * Gets row from table in RDSync
     * 
     * @param {string} db - (optional) database name
     * @param {string} table - (optional) table name
     * @param {string} key - table key
     */
    public async row({db, table, key}: RowInput): Promise<unknown> {
        const _db = db ? db : this.helpers.get_db_name();
        const _table = table ? table : this.helpers.get_table_name();

        if (_db == null || !_db.length) {
            throw new Error("[ ERROR ]: Database name is null. Please connect or pass this parameter");
        }

        if (_table == null || !_table.length) {
            throw new Error("[ ERROR ]: Table name is null. Please connect or pass this parameter");
        }
        
        try {
            const value = await instance.get("row", {
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
     * Sync row reading
     * 
     * @param {string} db - (optional) database name
     * @param {string} table - (optional) table name
     * @param {string} key - table key
     * @param {Function} callback function which executes when operation was success
     * @param {Function} error function which executes when something went wrong
     */
    public row_sync(
        {db, table, key}: RowInput,
        callback: (data: unknown) => void,
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
     * Reads all keys from provided table
     * 
     * @param {string} db - (optional) database name
     * @param {string} name - table name
     */
    public async table({db, name}: TableInput): Promise<string[]> {
        const _db = db ? db : this.helpers.get_db_name();
        const _table = name ? name : this.helpers.get_table_name();

        if (_db == null || !_db.length) {
            throw new Error("[ ERROR ]: Database name is null. Please connect or pass this parameter");
        }

        if (_table == null || !_table.length) {
            throw new Error("[ ERROR ]: Table name is null. Please connect or pass this parameter");
        }
        
        try {
            const value = await instance.get("table", {
                db: _db,
                table: _table,
            }).call();
            return value as string[];
        } catch (e: any) {
            throw new Error(e);
        }
    }

    /**
     * Sync table keys reading
     * 
     * @param {string} db - (optional) database name
     * @param {string} name - table name
     * @param {Function} callback function which executes when operation was success
     * @param {Function} error function which executes when something went wrong
     */
    public table_sync(
        {db, name}: TableInput,
        callback: (data: string[]) => void,
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
     * Reads all table with keys and data
     * 
     * @param {string} db - (optional) database name
     * @param {string} name - table name
     */
    public async table_with_data({db, name}: TableInput): Promise<string[]> {
        const _db = db ? db : this.helpers.get_db_name();
        const _table = name ? name : this.helpers.get_table_name();

        if (_db == null || !_db.length) {
            throw new Error("[ ERROR ]: Database name is null. Please connect or pass this parameter");
        }

        if (_table == null || !_table.length) {
            throw new Error("[ ERROR ]: Table name is null. Please connect or pass this parameter");
        }
        
        try {
            const value = await instance.get("table_data", {
                db: _db,
                table: _table,
            }).call();
            return value as any[];
        } catch (e: any) {
            throw new Error(e);
        }
    }

    /**
     * Reads all table with keys and data in sync mode
     * 
     * @param {string} db - (optional) database name
     * @param {string} name - table name
     * @param {Function} callback function which executes when operation was success
     * @param {Function} error function which executes when something went wrong
     */
    public table_with_data_sync(
        {db, name}: TableInput,
        callback: (data: string[]) => void,
        error?: (error: Error) => void
    ): void {
        this.table_with_data({db, name})
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
     * Reads table names in provided database
     * 
     * @param {string} name - database name
     */
    public async db(name?: string): Promise<string[]> {
        const _db = name ? name : this.helpers.get_db_name();

        if (_db == null || !_db.length) {
            throw new Error("[ ERROR ]: Database name is null. Please connect or pass this parameter");
        }
        
        try {
            const value = await instance.get("table", {
                db: _db,
            }).call();
            return value as string[];
        } catch (e: any) {
            throw new Error(e);
        }
    }

    /**
     * Reads table names in provided database
     * 
     * @param {string} name - database name
     * @param {Function} callback function which executes when operation was success
     * @param {Function} error function which executes when something went wrong
     */
    public db_sync(
        {name}: {name?: string},
        callback: (data: string[]) => void,
        error?: (error: Error) => void
    ) {
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