export declare abstract class Error {
}
export declare class ForbiddenError extends Error {
    code: "Forbidden";
    constructor(cause: string);
}
export declare class UnexpectedError extends Error {
    code: "Unexpected";
}
