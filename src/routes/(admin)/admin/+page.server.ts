import type { Actions } from './$types';
import Student from '$lib/server/models/Student';
import Group from '$lib/server/models/Group';
import ActionsLogger from '$lib/server/loggers/logger.actions';
import Shift from '$lib/server/models/Shift';

export const actions = {
	generateGroups: async ({ cookies, request }) => {
		const data = await request.formData();
		const howMany = data.get('howMany');
		const session = await Student.verifySession(cookies.get('sessionid')!);

		if (!session) {
			return {
				status: 401,
				body: {
					error: 'Unauthorized'
				}
			};
		}

		if (session.role !== 'executive') {
			return {
				status: 403,
				body: {
					error: 'Forbidden'
				}
			};
		}

		if (!howMany) {
			return {
				status: 400,
				body: {
					error: 'Bad Request'
				}
			};
		}

		const groups = await Group.generate(parseInt(howMany.toString()));
		ActionsLogger.info(`${session.fullName} (${session.role}) generated ${howMany} groups.`);
		return {
			status: 200,
			body: {
				groups
			}
		};
	},
	generateShifts: async ({ cookies, request }) => {
		const data = await request.formData();
		const untilDate = data.get('until');
		const session = await Student.verifySession(cookies.get('sessionid')!);

		if (!session) {
			return {
				status: 401,
				body: {
					error: 'Unauthorized'
				}
			};
		}

		if (session.role !== 'executive') {
			return {
				status: 403,
				body: {
					error: 'Forbidden'
				}
			};
		}

		if (!untilDate || isNaN(parseInt(untilDate?.toString()))) {
			return {
				status: 400,
				body: {
					error: 'Bad Request'
				}
			};
		}

		const untilDateObj = new Date(parseInt(untilDate.toString()));

		ActionsLogger.info(
			`${session.fullName} (${session.role}) generated shifts until ${untilDateObj}.`
		);
		const shifts = await Shift.generate(untilDateObj);
	}
} satisfies Actions;
