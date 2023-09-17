import mongoose from 'mongoose';

// 36:56
const connectDB = async () => {
	if (mongoose.connections[0].readyState) {
		return true;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI);

		console.log('MongoDB connect');
		return true;
	} catch (error) {
		console.log(error);
	}
}

export default connectDB;