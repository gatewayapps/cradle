export interface IConsole {
    error: (message?: any, ...optionalParams: any[]) => void
    log: (message?: any, ...optionalParams: any[]) => void
    info: (message?: any, ...optionalParams: any[]) => void
    warn: (message?: any, ...optionalParams: any[]) => void
    debug: (message?: any, ...optionalParams: any[]) => void
    trace: (message?: any, ...optionalParams: any[]) => void
}

export function isConsole(object: any): object is IConsole {
    return (
        'error' in object &&
        'log' in object &&
        'info' in object &&
        'warn' in object &&
        'debug' in object &&
        'trace' in object
    )
}
