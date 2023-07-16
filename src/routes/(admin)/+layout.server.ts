import type { LayoutServerLoad } from './$types';

export const load = (async ({ params, cookies, locals, parent }) => {
  return {
    ...(await parent())
  };
}) satisfies LayoutServerLoad;
