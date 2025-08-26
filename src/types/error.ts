export interface IApiError {
    status: number;
    message: string;
  }
  export const statusMessages: Record<number, string> = {
    400: "Bad Request – The server could not understand your request.",
    401: "Unauthorized – Please check your credentials.",
    403: "Forbidden – You don’t have permission to access this resource.",
    404: "Not Found – The requested resource could not be found.",
    500: "Internal Server Error – Something went wrong on our side.",
    503: "Service Unavailable – Please try again later.",
  };