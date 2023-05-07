import type { Handle } from '@sveltejs/kit';
import Student from '$lib/server/models/Student';
import '$lib/server/database';

export const handle = (async ({ event, resolve }) => {
	let request = event.request;
	let sessId = event.cookies.get('sessionid');

	if (sessId) {
		let session = await Student.verifySession(sessId);
		if (session) {
			event.locals.user = session;
			console.log(`User authenticated.`, session);
		} else {
			event.cookies.delete('sessionid');
			console.warn(
				"An invalid authentication attempt was detected. The user's session has been deleted."
			);
			console.warn(`Session ID: ${sessId}`);
			console.warn(`User Agent: ${request.headers.get('User-Agent')}`);
			console.warn();
		}
	}

	return await resolve(event);
}) satisfies Handle;
