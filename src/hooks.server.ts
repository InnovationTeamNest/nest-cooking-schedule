import Student from '$lib/server/models/Student';
import '$lib/server/database';
import config from './routes/api/config';
import AuthLogger from '$lib/server/loggers/logger.auth';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	let request = event.request;
	let sessId = event.cookies.get('sessionid');

	if (sessId) {
		let session = await Student.verifySession(sessId);
		if (session) {
			// Protect /admin routes
			if (event.url.pathname.startsWith('/admin')) {
				if (session.role !== 'executive') {
					AuthLogger.warn(
						`An unauthorized attempt to access an administrative route was detected.`,
						{
							userInfo: session,
							userAgent: request.headers.get('User-Agent')
						}
					);

					return new Response('Unauthorized', {
						status: 401
					});
				}
			}
			event.locals.user = session;
			AuthLogger.info(`User authenticated.`, { userInfo: session });

			// This does not work:
			// => hovering will redirect
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
