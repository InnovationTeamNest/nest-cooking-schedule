import mongoose, { Schema, Query } from 'mongoose';
import Session from './Session';
import type { UserInfo } from '../../../stores/app';
import TelegramUtils from '../../../stores/telegram.server';
import AuthLogger from '../loggers/logger.auth';

export interface IStudent {
	id: string;
	fullName: string;
	telegram: {
		handle: string;
		tgId: number;
	};
	photoUrl: string;
	groupNumber: number;
	role: 'student' | 'executive';
	strikes: IStrike[];
}

export interface IStrike {
	date: Date;
	reason: 'no-show' | 'no-replacement' | 'late' | 'steal' | 'other';
	notes?: string;
}

const StudentSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true
		},
		telegram: {
			type: {
				handle: {
					type: String,
					required: true
				},
				tgId: {
					type: Number,
					required: true
				}
			},
			required: true
		},
		photoUrl: {
			type: String,
			required: true
		},
		groupNumber: {
			type: Number,
			ref: 'Group',
			required: true
		},
		role: {
			type: String,
			enum: ['student', 'executive'],
			default: 'student',
			required: true
		},
		strikes: {
			type: [
				{
					date: {
						type: Date,
						default: Date.now,
						required: true
					},
					reason: {
						type: String,
						enum: ['no-show', 'no-replacement', 'late', 'steal', 'other'],
						required: true
					},
					notes: {
						type: String,
						required: false
					}
				}
			],
			required: true
		}
	},
	{
		statics: {
			signIn: async function (userInfo: UserInfo) {
				let valid = TelegramUtils.checkTelegramAuth(userInfo);
				if (!valid) return;

				let targetUser = await this.findOne({ 'telegram.tgId': userInfo.id }).exec();

				let { hash, ...data } = userInfo;
				if (!targetUser) {
					AuthLogger.warn('An unknown user signed in for the first time:', { data });
					targetUser = await this.create({
						fullName: userInfo.first_name + ' ' + userInfo.last_name,
						telegram: {
							handle: userInfo.username,
							tgId: userInfo.id
						},
						photoUrl: userInfo.photo_url,
						groupNumber: 0,
						role: 'student',
						strikes: []
					});
				}

				let newSession = await Session.create({
					userId: targetUser.id,
					data,
					hash
				});

				return { newSession, targetUser };
			},
			verifySession: async function (sessionId: string): Promise<IStudent | false> {
				let session = await Session.findById(sessionId).exec();
				if (!session) return false;

				let targetUser = await this.findById(session.userId).exec();
				if (!targetUser) return false;

				if (
					!session.data.id ||
					!session.data.first_name ||
					!session.data.last_name ||
					!session.data.username ||
					!session.data.photo_url ||
					!session.data.auth_date ||
					!session.hash
				)
					return false;

				let checkData: UserInfo = {
					id: session.data.id,
					first_name: session.data.first_name,
					last_name: session.data.last_name,
					username: session.data.username,
					photo_url: session.data.photo_url,
					auth_date: session.data.auth_date,
					hash: session.hash
				};

				let valid = TelegramUtils.checkTelegramAuth(checkData);
				if (!valid) return false;

				return {
					id: targetUser.id,
					fullName: targetUser.fullName,
					telegram: {
						handle: targetUser.telegram.handle,
						tgId: targetUser.telegram.tgId
					},
					photoUrl: targetUser.photoUrl,
					groupNumber: targetUser.groupNumber,
					role: targetUser.role,
					strikes: targetUser.strikes.map((strike: IStrike) => ({
						date: strike.date,
						reason: strike.reason,
						notes: strike.notes
					}))
				};
			}
		},
		methods: {
			logout: async function (sessionId: string) {
				let delQuery = await Session.deleteOne({ _id: sessionId, userId: this.id }).exec();
				return delQuery.deletedCount === 1;
			},
			terminateAllSessions: async function () {
				let delQuery = await Session.deleteMany({ userId: this.id }).exec();
				return delQuery.deletedCount > 0;
			}
		}
	}
);

const Student = mongoose.model('Students', StudentSchema, 'Students', { overwriteModels: true });
export default Student;
