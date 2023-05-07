import type { LayoutServerLoad } from './$types';

export const load = (async ({ params, cookies, locals }) => {
	return {
		user: locals.user
	};
}) satisfies LayoutServerLoad;
