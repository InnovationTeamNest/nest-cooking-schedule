import Group from '$lib/server/models/Group';
import Shift from '$lib/server/models/Shift';
import type IGroup from '../../../models/Group';
import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async (context) => {
  const groups = await Group.getPojoGroups();

  return {
    groups
  };
}) satisfies LayoutServerLoad;
