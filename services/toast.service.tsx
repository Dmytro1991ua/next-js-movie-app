import { toast } from "react-toastify";

class ToastService {
  success(message: string): void {
    toast.success(message);
  }

  error(message: string): void {
    toast.error(message);
  }

  info(message: string): void {
    toast.info(message);
  }

  warn(message: string): void {
    toast.warn(message);
  }
}

export const toastService = new ToastService();
