import mongoose, { Schema } from 'mongoose';
import ActionsLogger from '../loggers/logger.actions';

const ShiftSchema = new Schema(
	{
		group: {
			type: Schema.Types.ObjectId,
			ref: 'Group',
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
	},
	{
		statics: {
			getPojoShifts: async function () {
				return (await this.find().populate({ path: 'group', populate: { path: 'members' } }))
					.map((x) => x.toObject())
					.map((x) => ({
						...x,
						_id: x._id.toString(),
						group: { ...x.group, _id: x.group._id.toString() }
					}))
					.map((x) => ({
						...x,
						group: {
							...x.group,
							members: x.group.members.map((y) => ({
								...y,
								id: y._id.toString(),
								_id: y._id.toString(),
								telegram: { ...y.telegram, _id: y.telegram._id.toString() }
							}))
						}
					}));
			},
			generate: async function (untilDate: Date) {
				const lastShift = await this.findOne().sort({ date: -1, when: 1 }).populate('group');

				let group = 1;
				if (lastShift) {
					group = lastShift.group.number + 1;
				}

				const numberOfGroups = await mongoose.model('Group').countDocuments();

				let date = lastShift?.date ?? new Date();
				date.setHours(0, 0, 0, 0);

				if (lastShift && lastShift.when === 'lunch') {
					// must set dinner too, so we go back one day
					date = new Date(date.getTime() - 24 * 60 * 60 * 1000);
				}

				const n = Math.ceil((untilDate.getTime() - date.getTime()) / (7 * 24 * 60 * 60 * 1000));

				ActionsLogger.info(
					`Generating ${n} weeks of shifts starting from ${date.toDateString()} (last group: ${
						lastShift?.group?.number ?? -1
					}) up until ${untilDate.toDateString()}`
				);

				const shifts = [];
				for (let i = 0; i < n; i++) {
					if (date > untilDate) break;
					// Every week, Saturday and Sunday, there are two shifts per day, lunch and dinner
					const day = date.getDay();
					const saturday = 6 - day;
					const saturdayDate = new Date(date.getTime() + saturday * 24 * 60 * 60 * 1000);
					const sundayDate = new Date(saturdayDate.getTime() + 24 * 60 * 60 * 1000);

					let groupNumber = ((group - 1) % numberOfGroups) + 1;
					let groupId = (await mongoose.model('Group').findOne({ number: groupNumber }))._id;

					if (!(await this.exists({ date: saturdayDate, when: 'lunch' }))) {
						shifts.push({
							group: groupId,
							date: saturdayDate,
							type: 'normal',
							when: 'lunch'
						});
						groupNumber = (groupNumber % numberOfGroups) + 1;
						groupId = (await mongoose.model('Group').findOne({ number: groupNumber }))._id;
					}

					if (!(await this.exists({ date: saturdayDate, when: 'dinner' }))) {
						shifts.push({
							group: groupId,
							date: saturdayDate,
							type: 'normal',
							when: 'dinner'
						});
						groupNumber = (groupNumber % numberOfGroups) + 1;
						groupId = (await mongoose.model('Group').findOne({ number: groupNumber }))._id;
					}

					if (!(await this.exists({ date: sundayDate, when: 'lunch' }))) {
						shifts.push({
							group: groupId,
							date: sundayDate,
							type: 'normal',
							when: 'lunch'
						});
						groupNumber = (groupNumber % numberOfGroups) + 1;
						groupId = (await mongoose.model('Group').findOne({ number: groupNumber }))._id;
					}

					if (!(await this.exists({ date: sundayDate, when: 'dinner' }))) {
						shifts.push({
							group: groupId,
							date: sundayDate,
							type: 'normal',
							when: 'dinner'
						});
					}

					date = new Date(sundayDate.getTime() + 24 * 60 * 60 * 1000);
					group = groupNumber + 1;
				}

				ActionsLogger.info(`Filled ${shifts.length} shifts.`);

				return (await this.insertMany(shifts))
					.map((x) => x.toObject())
					.map((x) => ({ ...x, _id: x._id.toString(), group: x.group.toString() }));
			}
		}
	}
);

const Shift = mongoose.model('Shifts', ShiftSchema, 'Shifts', { overwriteModels: true });
export default Shift;
