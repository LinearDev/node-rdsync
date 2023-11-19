import { instance } from "../lib/instance";
import { Error, Helpers, TableInput } from "../types/rdsync_types";

export class RDSyncCreate {
    private helpers: Helpers;
    
    constructor (_helpers: Helpers) {
        this.helpers = _helpers;
    }

    /**
     * Creates new database in async mode
     * 
     * @param {string} name name of database
     * @returns status of creation
     */
    public async create_db(name: string): Promise<Error> {
        //
        return {} as Error;
    }

    /**
     * Creates new database in sync mode
     * 
     * @param {string} name name of database
     * @param {Function} callback function which executes when operation was success
     * @param {Function} error function which executes when something went wrong
     */
    public create_db_sync(
        name: string,
        callback: (data: Error) => void,
        error?: (error: Error) => void
    ): void {
        this.create_db(name)
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
     * Creates new table in async mode
     * 
     * @param {string} data db (database name), name (table name)
     * @returns status of creation
     */
    public async create_table({db, name}: TableInput): Promise<Error> {
        const _db = db ? db : this.helpers.get_db_name();
        const _table = name ? name : this.helpers.get_table_name();

        if (_db == null || !_db.length) {
            throw new Error("[ ERROR ]: Database name is null. Please connect or pass this parameter");
        }

        if (_table == null || !_table.length) {
            throw new Error("[ ERROR ]: Table name is null. Please connect or pass this parameter");
        }
        
        try {
            const value = await instance.post(this.helpers, "table", {
                db: _db,
                name: _table,
            });
            return value;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    /**
     * Creates new table in sync mode
     * 
     * @param {string} data db (database name), name (table name)
     * @param {Function} callback function which executes when operation was success
     * @param {Function} error function which executes when something went wrong
     */
    public create_table_sync(
        {db, name}: TableInput,
        callback: (data: Error) => void,
        error?: (error: Error) => void
    ): void {
        this.create_table({db, name})
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