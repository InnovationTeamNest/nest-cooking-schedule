import type { PageServerLoad } from './$types';

export const load = (async ({ params, cookies, locals }) => {
	return {
		user: locals.user,
		shifts: [
			{
				group: {
					number: 1,
					members: ['Demetrio Battaglia', 'Riccardo Lussana', 'Benedetta Freddi', 'Antonio Simon'],
					color: '#DE4C8A'
				},
				punishment: false,
				date: new Date(),
				when: 'lunch'
			},
			{
				group: {
					number: 2,
					members: ['Demetrio Battaglia', 'Riccardo Lussana', 'Benedetta Freddi', 'Antonio Simon'],
					color: '#D6AE01'
				},
				punishment: false,
				date: new Date(),
				when: 'dinner'
			}
		]
	};
}) satisfies PageServerLoad;
