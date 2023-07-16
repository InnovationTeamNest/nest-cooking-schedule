import Shift from '$lib/server/models/Shift';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, cookies, locals }) => {
  const shifts = await Shift.getPojoShifts();
  return {
    shifts
  };
}) satisfies PageServerLoad;
