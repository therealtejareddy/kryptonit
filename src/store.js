import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const userAddress = writable((browser && localStorage.getItem('userAddr')) || null);
