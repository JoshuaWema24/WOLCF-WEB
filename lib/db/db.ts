import { connect, connection, ConnectionStates } from "mongoose";

export const connectDb = async (): Promise<void> => {
	try {
		const readyState = connection.readyState;
		if (readyState === ConnectionStates.connected) {
			return;
		} else if (readyState === ConnectionStates.connecting) {
			console.log("Db Connecting📡...");
		} else if (readyState === ConnectionStates.disconnected) {
			const db = await connect(process.env.MONGO_URI!);
			console.log(`Db connected : ${db.connection.name}🛢️`);
		}
	} catch (error: any) {
		console.error("⚠️Db Not Connected!", error);
		process.exit(1);
	}
};
