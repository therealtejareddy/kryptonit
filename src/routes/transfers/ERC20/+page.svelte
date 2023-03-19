<script>
	let title = 'Kryptonit | ERC20 transfers';
	import ERC20Transfer from '../../../components/ERC20Transfer.svelte';
	import Sidebar from '../../../components/Sidebar.svelte';
	import { options } from './../../../utils/config.js';
	let data;
	import { userAddress } from '../../../store';
	import Topbar from '../../../components/Topbar.svelte';
	import Footer from '../../../components/Footer.svelte';
	let userAddr;
	userAddress.subscribe((v) => {
		userAddr = v;
		fetch(
			`https://deep-index.moralis.io/api/v2/${userAddr}/erc20/transfers?chain=polygon&format=decimal&direction=both`,
			options
		)
			.then((response) => response.json())
			.then((response) => (data = response.result))
			.catch((err) => console.error(err));
	});
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="bg-gray-800">
	<Sidebar />
	<Topbar />
	<div class="ml-16 px-16">
		<div>
			<div class="flex justify-start items-center mb-8 mt-6">
				<h1 class="text-4xl font-extrabold text-slate-100">ERC20 Transfers</h1>
			</div>
		</div>
	</div>
	<div class="ml-16 px-16 text-white pt-8 pb-12">
		{#if data?.length}
			<div class="flex items-center justify-between font-bold w-full bg-slate-900 py-3 rounded-sm">
				<span class="basis-1/5 text-center">Block Hash</span>
				<span class="basis-1/5 text-center">Block Number</span>
				<span class="basis-1/5 text-center">Date</span>
				<span class="basis-1/5 text-center">To Address</span>
				<span class="basis-1/5 text-center">Value</span>
			</div>
			{#each data as item}
				<a
					target="_blank"
					rel="noreferrer"
					href={`https://polygonscan.com/tx/${item?.transaction_hash}`}
				>
					<ERC20Transfer
						block_hash={item?.block_hash}
						block_number={item?.block_number}
						block_timestamp={item?.block_timestamp}
						to_address={item?.to_address}
						value={item?.value}
					/>
				</a>
			{/each}
		{/if}
	</div>
	<Footer />
</div>
