<script>
	import { onMount } from 'svelte';
	import { userAddress } from '../store.js';
	let addr;
	onMount(() => {
		addr = localStorage.getItem('userAddr');
	});
	let account = null;
	// userAddress.subscribe((v) => {
	// 	addr = v;
	// });
	async function connectMetaMask() {
		if (window.ethereum) {
			account = await window.ethereum.request({ method: 'eth_requestAccounts' });
			account = account[0];
			localStorage.setItem('userAddr', account);
			userAddress.set(account);
			// window.location = `${window.origin}/portfolio`;
			// goto(`${window.origin}/portfolio`);
			window.location.reload();
		}
	}
	const disconnectMetaMask = () => {
		localStorage.removeItem('userAddr');
		account = null;
		userAddress.set(account);
		console.log('disconnected');
		window.location = `${window.origin}`;
		goto(307, '/');
	};
</script>

<div class="z-40 relative">
	<div class="ml-16 flex items-center justify-between px-20 h-16 bg-gray-900">
		<h1 class="text-2xl font-bold text-gray-100">
			<a href="/"><span class="text-sky-500">K</span>ryptonit</a>
		</h1>
		<div class="text-white font-medium ">
			{#if addr === null}
				<button on:click={() => connectMetaMask()} class="bg-green-500 px-4 py-2 rounded-md"
					>Connect metamask</button
				>
			{:else if addr}
				<button on:click={() => disconnectMetaMask()} class="bg-red-500 px-4 py-2 rounded-md"
					>Log out</button
				>
			{/if}
		</div>
	</div>
</div>
