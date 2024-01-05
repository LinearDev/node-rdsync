import net from "net";

export type TableInput = {
    name?: string,
    db?: string
}

export interface RowInput {
    db?: string,
    table?: string,
    key: string
}

export interface WriteRowInput extends RowInput {
    value: string,
    type: RDSyncImportTypes
}

export type Helpers = {
    set_db_name: (name: string) => void;
    set_table_name: (name: string) => void;
    get_db_name: () => string | null;
    get_table_name: () => string | null;
}

export interface Bunch {
    key: any
    value: any
}

export interface Error {
    status: boolean,
    message: string
}

export interface ResponseObj {
    code: number,
    message: string
}

export interface RDRequest<T> {
    send: () => void;
    call: () => Promise<T>
}

export type RDSyncImportTypes = "string" | "int" | "uint" | "float" | "bool" | "date" | "timestamp" | "json";