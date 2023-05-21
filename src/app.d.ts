// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type IShift from './models/Shift';
import type { IStudent } from '$lib/server/models/Student';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: IStudent;
			shifts: IShift[];
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
