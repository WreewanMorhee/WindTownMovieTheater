export interface ErrorType {
    message: string
    code: number
};

export const is_my_error = (error: unknown): error is ErrorType => 
    typeof error === "object" && 
    error !== null && 
    "message" in error &&
    typeof (error as ErrorType).message === "string" &&
    "code" in error && 
    typeof (error as ErrorType).code === "number"