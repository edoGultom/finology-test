// import type { IApiError } from "../../types/error";
// import errLogo from "../../assets/error_vector.png";
// const ErrorMessage: React.FC<{ error: IApiError }> = ({ error }) => {
//   return (
//     <div className="flex h-screen flex-col gap-6 items-center justify-center bg-teal-200">
//       <div className="relative max-w-xs rounded-2xl bg-white px-6 py-4 text-center shadow-lg">
//         {/* Isi bubble */}
//         <h1 className="text-3xl font-bold text-black">{error.status} </h1>
//         <p className="mt-2 text-gray-600">{error.message}</p>

//         {/* Ekor bubble */}
//         <div
//           className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0
//                         border-l-[15px] border-l-transparent
//                         border-r-[15px] border-r-transparent
//                         border-t-[20px] border-t-white"
//         ></div>
//       </div>
//       <img src={errLogo} alt="" className="w-40 " />
//     </div>
//   );
// };

// export default ErrorMessage;

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import type { IApiError } from "../../types/error";

interface ErrorMessageProps {
  onRetry: () => void;
  error: IApiError;
}

export const ErrorMessage = ({ onRetry, error }: ErrorMessageProps) => {
  const getCustomMessage = () => {
    const fullMsg = error.message || "Unexpected error";
    const parts = fullMsg.split("–");
    return parts[1] ? parts[1].trim() : fullMsg; // ambil yang setelah dash
  };
  const getStatusTitle = () => {
    const fullMsg = error.message || "Unknown Error";
    const parts = fullMsg.split("–");
    return parts[0].trim(); // ambil bagian sebelum dash
  };
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-16 space-y-4">
      <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-card-foreground">
          {error.status} - {getStatusTitle()}
        </h3>
        <p className="text-muted-foreground max-w-md">{getCustomMessage()}</p>
      </div>

      <Button onClick={onRetry} className="mt-4">
        <RefreshCw className="w-4 h-4 mr-2" />
        Try Again
      </Button>
    </div>
  );
};
