import type { IStudent } from '$lib/server/models/Student';
import { writable } from 'svelte/store';

export type UserInfo = {
	id: number;
	first_name: string;
	last_name: string;
	username: string;
	photo_url: string;
	auth_date: number;
	hash: string;
};

export const loggedUser = writable<IStudent | null>(null);
export async function logout() {
	await fetch('/api/logout', {
		method: 'POST',
		credentials: 'same-origin'
	});
	loggedUser.set(null);
}
