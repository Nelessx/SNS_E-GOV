import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		console.log('Attempting to connect to MongoDB...');
		console.log('MongoDB URI:', process.env.MONGO_URI ? 'Present' : 'Missing');

		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
			socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`);
		return conn;
	} catch (error) {
		console.error(`MongoDB Connection Error: ${error.message}`);
		console.error('Error details:', error);
		process.exit(1); // process code 1 code means exit with failure, 0 means success
	}
};

