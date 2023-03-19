import { redirect } from '@sveltejs/kit';
import { userAddress } from '../../../store.js';

let userAddr;
userAddress.subscribe((v) => {
	userAddr = v;
});

export async function load() {
	if (!userAddr) {
		throw redirect(307, '/');
	}
}
