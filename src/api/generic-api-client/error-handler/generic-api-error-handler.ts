import { ApiError } from "./api-error";
import type { ApiErrorHandler, ApiErrorInput } from "./api-error-handler";

export class GenericApiErrorHandler implements ApiErrorHandler {
    handleError(input: ApiErrorInput): never {
        throw new ApiError(input);
    }
}
