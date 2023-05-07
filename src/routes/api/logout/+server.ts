import type { RequestHandler } from './$types';
import config from '../config';

export const POST = (async ({ request, cookies }) => {
	// Must be the same as the one in the sign-in endpoint
	// especially path & secure
	cookies.delete('sessionid', {
		path: config.cookies.path,
		httpOnly: config.cookies.httpOnly,
		secure: config.cookies.secure
	});

	let res = new Response(null, {
		status: 200
	});
	return res;
}) satisfies RequestHandler;
