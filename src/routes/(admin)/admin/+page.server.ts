import type { Actions } from './$types';
import Student from '$lib/server/models/Student';

export const actions = {
	generateGroups: async ({ cookies, request }) => {
		const data = await request.formData();
		const howMany = data.get('howMany');
		Student.verifySession(cookies.get('sessionid')!);
	}
} satisfies Actions;
