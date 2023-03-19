<script>
	let expand = false;
	function handleSidebar() {
		if (!expand) {
			expand = true;
		} else {
			expand = false;
		}
	}
</script>

<div
	class="fixed z-50 top-0 left-0 h-screen flex flex-col justify-center items-center bg-gray-700 shadow-lg pt-4 text-gray-100 transition-all {expand ===
	true
		? 'w-48'
		: 'w-16'}"
>
	<button
		class="absolute -right-3 top-16 bg-gray-600 grid rounded-full cursor-pointer hover:bg-blue-600 transition-all"
		on:click={() => handleSidebar()}
	>
		<i class="material-symbols-outlined place-items-center transition-all">
			{#if expand}
				chevron_left
			{:else}
				chevron_right
			{/if}
		</i>
	</button>
	<div>
		<div
			class="mb-6 w-full grid place-items-center hover:bg-gray-600 p-2 rounded-md transition-all"
		>
			<a href="/swap" title="swap" class=" flex justify-center items-center"
				><i class="material-symbols-outlined"> currency_exchange </i>
				<span class="transition-all {expand === true ? 'inline-block pl-2' : 'hidden'}">Swap</span
				></a
			>
		</div>
		<div
			class="mb-6 w-full grid place-items-center hover:bg-gray-600 p-2 rounded-md transition-all"
		>
			<a href="/coins" title="coins" class=" flex justify-center items-center"
				><i class="fa-solid fa-coins fa-xl" /><span
					class="transition-all {expand === true ? 'inline-block pl-2' : 'hidden'}">Coins</span
				></a
			>
		</div>
		<div
			class="mb-6 w-full grid place-items-center hover:bg-gray-600 p-2 rounded-md transition-all"
		>
			<a href="/portfolio" title="Portfolio" class=" flex justify-center items-center">
				<i class="material-symbols-outlined"> insights </i>
				<span class="transition-all {expand === true ? 'inline-block pl-2' : 'hidden'}"
					>Portfolio</span
				>
			</a>
		</div>
		<div
			class="mb-6 w-full grid place-items-center hover:bg-gray-600 p-2 rounded-md transition-all"
		>
			<a href="/buy" title="buy" class=" flex justify-center items-center">
				<i class="material-symbols-outlined"> local_mall </i>
				<span class="transition-all {expand === true ? 'inline-block pl-2' : 'hidden'}">Buy</span>
			</a>
		</div>
		<div
			class="mb-6 w-full grid place-items-center hover:bg-gray-600 p-2 rounded-md transition-all"
		>
			<a href="/transactions" title="transactions" class=" flex justify-center items-center"
				><i class="material-symbols-outlined"> receipt_long </i>
				<span class="transition-all {expand === true ? 'inline-block pl-2' : 'hidden'}"
					>Transactions</span
				></a
			>
		</div>
		<div
			class="mb-6 w-full grid place-items-center hover:bg-gray-600 p-2 rounded-md transition-all"
		>
			<a href="/transfers/ERC20" title="ERC20 Transfers" class=" flex justify-center items-center"
				><i class="material-symbols-outlined"> price_check </i>
				<span class="transition-all {expand === true ? 'inline-block pl-2' : 'hidden'}"
					>ERC20 Transfers</span
				>
			</a>
		</div>
		<div
			class="mb-6 w-full grid place-items-center hover:bg-gray-600 p-2 rounded-md transition-all"
		>
			<a href="/transfers/NFT" title="NFT transfers" class="flex justify-center items-center"
				><i class="material-symbols-outlined"> switch_camera </i>
				<span class="transition-all {expand === true ? 'inline-block pl-2' : 'hidden'}"
					>NFT Transfers</span
				></a
			>
		</div>
	</div>
</div>

<style>
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 48;
	}
</style>
