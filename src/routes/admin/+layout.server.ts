import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async (context) => {
	if (context.locals.user.role !== 'executive') {
		throw error(403, 'Forbidden');
	}
}) satisfies LayoutServerLoad;
