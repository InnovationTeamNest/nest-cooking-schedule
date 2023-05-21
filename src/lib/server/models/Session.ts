import mongoose, { Schema } from 'mongoose';

const SessionSchema = new Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		required: true
	},
	data: {
		type: {
			id: Number,
			first_name: String,
			last_name: String,
			username: String,
			photo_url: String,
			auth_date: Number
		},
		required: true
	},
	hash: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
});

const Session = mongoose.model('Session', SessionSchema, 'Sessions', { overwriteModels: true });
export default Session;
