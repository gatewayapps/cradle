export interface IConsole {
    error: (message?: any, ...optionalParams: any[]) => void;
    log: (message?: any, ...optionalParams: any[]) => void;
    info: (message?: any, ...optionalParams: any[]) => void;
    warn: (message?: any, ...optionalParams: any[]) => void;
    debug: (message?: any, ...optionalParams: any[]) => void;
    trace: (message?: any, ...optionalParams: any[]) => void;
}
export declare function isConsole(object: any): object is IConsole;
//# sourceMappingURL=IConsole.d.ts.map