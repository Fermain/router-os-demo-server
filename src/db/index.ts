import mongoose from "mongoose";

export const setupDb = async (
  url: string,
  config: mongoose.ConnectionOptions
) => {
  try {
    return await mongoose.connect(url, config);
  } catch (error) {
    throw error;
  }
};
