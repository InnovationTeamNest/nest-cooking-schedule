import type { RequestHandler } from './$types';
import config from '../config';
import Session from '$lib/server/models/Session';
import Student from '$lib/server/models/Student';
import AuthLogger from '$lib/server/loggers/logger.auth';

export const POST = (async ({ request, cookies }) => {
	// Must be the same as the one in the sign-in endpoint
	// especially path & secure
	let sessId = cookies.get('sessionid');

	if (sessId) {
		let session = await Session.findById(sessId).exec();
		if (session) {
			let user = await Student.findById(session.userId).exec();
			user?.logout(sessId);
		} else {
			AuthLogger.warn('Tried to log out a non-existent session.', {
				sessId,
				userAgent: request.headers.get('User-Agent')
			});
		}
		cookies.delete('sessionid', {
			path: config.cookies.path,
			httpOnly: config.cookies.httpOnly,
			secure: config.cookies.secure
		});
	}

	let res = new Response(null, {
		status: 200
	});
	return res;
}) satisfies RequestHandler;
