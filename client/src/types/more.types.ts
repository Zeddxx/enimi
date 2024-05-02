export interface ExtendedError extends Error {
    data: {
        message: string
    }
}