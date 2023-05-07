import mongoose, { Schema } from 'mongoose';

const GroupSchema = new Schema({
	number: {
		type: Number,
		required: true
	},
	members: {
		type: [String],
		required: true,
		default: []
	},
	color: {
		type: String,
		required: false,
		// default is a random hex color
		default: '#' + Math.floor(Math.random() * 0xffffff).toString(16)
	}
});

const Group = mongoose.model('Group', GroupSchema);
export default Group;
