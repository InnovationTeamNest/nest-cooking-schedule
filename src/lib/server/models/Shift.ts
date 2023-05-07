import mongoose, { Schema } from 'mongoose';

const ShiftSchema = new Schema({
	group: {
		type: {
			number: {
				type: Number,
				required: true
			},
			members: [String],
			color: String
		},
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	type: {
		type: String,
		enum: ['normal', 'punishment', 'replacement'],
		default: 'normal'
	},
	when: {
		type: String,
		enum: ['lunch', 'dinner'],
		default: 'lunch'
	}
});

const Shift = mongoose.model('Shifts', ShiftSchema);
export default Shift;
