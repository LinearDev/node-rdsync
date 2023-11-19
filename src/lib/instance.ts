import axios from "axios";
import { Error, Helpers } from "../types/rdsync_types";

type Get = {
    db: string,
    table: string,
    key: string
}

const methodsFetch = {
    get: async <T>(helpers: Helpers, path: string, {db, table, key}: Get): Promise<T> => {
        const _url = helpers.get_url()
        if (_url == null || !_url.length) {
            throw new Error("[ ERROR ]: Database URL is null. Pass this parameter");
        }

        return "" as T;
    },
    post: async () => {},
    put: async () => {},
    delete: async () => {},
}

const methodsAxios = {
    get: async <T>(helpers: Helpers, path: string, {db, table, key}: Get): Promise<T> => {
        let _url = helpers.get_url()
        if (_url == null || !_url.length) {
            throw new Error("[ ERROR ]: Database URL is null. Pass this parameter");
        }

        if (_url[_url.length] != "/") {
            _url += "/"
        }

        try {
            const res = await axios.get(`${_url}${path}?db=${db}&table=${table}&key=${key}`);
            
            if (res.data.status || res.data.status == undefined) {
                return res.data as T;
            } else {
                throw new Error(res.data.message);
            }
        } catch (e: any) {
            throw new Error(e);
        }
    },
    post: async (helpers: Helpers, path: string, body: any): Promise<Error> => {
        let _url = helpers.get_url()
        if (_url == null || !_url.length) {
            throw new Error("[ ERROR ]: Database URL is null. Pass this parameter");
        }

        if (_url[_url.length] != "/") {
            _url += "/"
        }

        try {
            const res = await axios.post(`${_url}${path}`, body);
            
            if (res.data.status || res.data.status == undefined) {
                return res.data;
            } else {
                throw new Error(res.data.message);
            }
        } catch (e: any) {
            throw new Error(e);
        }
    },
    put: async () => {},
    delete: async (helpers: Helpers, path: string, data: any) => {
        let _url = helpers.get_url()
        if (_url == null || !_url.length) {
            throw new Error("[ ERROR ]: Database URL is null. Pass this parameter");
        }

        if (_url[_url.length] != "/") {
            _url += "/"
        }

        let query = `db=${data.db}`;
        if (data.table) {
            query += `&table=${data.table}`
        }
        if (data.key) {
            query += `&key=${data.key}`
        }

        try {
            const res = await axios.delete(`${_url}${path}?${query}`);
            
            if (res.data.status || res.data.status == undefined) {
                return res.data;
            } else {
                throw new Error(res.data.message);
            }
        } catch (e: any) {
            throw new Error(e);
        }
    },
}

// export const instance = typeof window === 'undefined' ? metodsAxios : methodsFetch;
export const instance = methodsAxios;