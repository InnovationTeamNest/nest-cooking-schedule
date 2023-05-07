import type { Handle } from '@sveltejs/kit';
import Student from '$lib/server/models/Student';
import '$lib/server/database';
import config from './routes/api/config';
import AuthLogger from '$lib/server/loggers/logger.auth';

export const handle = (async ({ event, resolve }) => {
	let request = event.request;
	let sessId = event.cookies.get('sessionid');

	if (sessId) {
		let session = await Student.verifySession(sessId);
		if (session) {
			event.locals.user = session;
			AuthLogger.info(`User authenticated.`, { userInfo: session });
		} else {
			event.cookies.delete('sessionid', {
				...config.cookies
			});
			AuthLogger.warn(
				"An invalid authentication attempt was detected. The user's session has been deleted.",
				{
					sessId,
					userAgent: request.headers.get('User-Agent')
				}
			);
		}
	}

	return await resolve(event);
}) satisfies Handle;
