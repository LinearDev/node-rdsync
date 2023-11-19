import { instance } from "../lib/instance";
import { Helpers, RowInput, TableInput } from "../types/rdsync_types";

export class RDSyncRead {
    private helpers: Helpers;
    
    constructor (_helpers: Helpers) {
        this.helpers = _helpers;
    }

    public async row<T>({db, table, key}: RowInput): Promise<T> {
        const _db = db ? db : this.helpers.get_db_name();
        const _table = table ? table : this.helpers.get_table_name();

        if (_db == null || !_db.length) {
            throw new Error("[ ERROR ]: Database name is null. Please connect or pass this parameter");
        }

        if (_table == null || !_table.length) {
            throw new Error("[ ERROR ]: Table name is null. Please connect or pass this parameter");
        }
        
        try {
            const value = await instance.get<T>(this.helpers, "row", {
                db: _db,
                table: _table,
                key: key
            });
            return value;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    public row_sync<T>(
        {db, table, key}: RowInput,
        callback: (data: T) => void,
        error?: (error: Error) => void
    ): void {
        this.row<T>({db, table, key})
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

    public async table({db, name}: TableInput) {

    }

    public table_sync({db, name}: TableInput): void {
        this.table({db, name});
    }

    public async db(name?: string) {

    }

    public db_sync(name?: string) {
        
    }
}