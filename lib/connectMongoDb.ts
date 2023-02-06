import mongoose from "mongoose";

import { toastService } from "@/services/toast.service";

const connectMongoDb = async (): Promise<boolean | undefined> => {
  try {
    const { connection } = await mongoose.connect(
      process.env.MONGODB_URI ?? ""
    );

    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (e) {
    toastService.error((e as Error).message);
    return Promise.reject(e);
  }
};

export default connectMongoDb;
