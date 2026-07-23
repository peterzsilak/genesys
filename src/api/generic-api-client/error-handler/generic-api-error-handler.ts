import { ApiError } from "@/api/generic-api-client/error-handler/api-error";
import type {
    ApiErrorHandler,
    ApiErrorInput,
} from "@/api/generic-api-client/error-handler/api-error-handler";

export class GenericApiErrorHandler implements ApiErrorHandler {
    handleError(input: ApiErrorInput): never {
        throw new ApiError(input);
    }
}
