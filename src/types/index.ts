export const type_convertor = <T>(db_type: string, data: any) => {
    switch (db_type) {
        case "string":
            return String(data);
        case "int":
        case "uint":
        case "float":
            return Number(data);
        case "bool":
            return Boolean(data);
        case "date":
        case "timestamp":
        case "json":
            return JSON.parse(data) as T;
        default: 
            return data as any;
    }
}