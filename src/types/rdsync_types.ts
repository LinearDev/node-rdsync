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
    value: string
}

export type Helpers = {
    set_url: (_url: string) => void;
    set_db_name: (name: string) => void;
    set_table_name: (name: string) => void;
    get_url: () => string | null;
    get_db_name: () => string | null;
    get_table_name: () => string | null;
}

export interface Bunch {
    key: string
    value: string
}

export interface Error {
    status: boolean,
    message: string
}