import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

async function mongoConnect() {
  const mongoDBUri = process.env.MONGO_DB_URI;

  try {
    await mongoose.connect(mongoDBUri);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export default mongoConnect;
