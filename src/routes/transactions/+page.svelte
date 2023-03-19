<script>
	let title = 'Kryptonit | Transaction History';
	import Footer from '../../components/Footer.svelte';
	import Sidebar from '../../components/Sidebar.svelte';
	import Topbar from '../../components/Topbar.svelte';
	import TransactionItem from '../../components/TransactionItem.svelte';
	import { userAddress } from '../../store';
	let data;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			'X-API-Key': '5T3vKjcNCw7HotC0EAtFDWqA03vmTtGAcyQv61niygzOxydGJdjlPL2jQYCv8HXu'
		}
	};
	let userAddr;
	userAddress.subscribe((v) => {
		userAddr = v;
		fetch(`https://deep-index.moralis.io/api/v2/${userAddr}?chain=polygon`, options)
			.then((response) => response.json())
			.then((response) => {
				data = response.result;
			})
			.catch((err) => console.error(err));
	});
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<main class="bg-gray-800">
	<Sidebar />
	<Topbar />
	<div class="ml-16 px-16">
		<div>
			<div class="flex justify-start items-center mb-8 mt-6">
				<h1 class="text-4xl font-extrabold text-slate-100">Transactions</h1>
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
				<a target="_blank" rel="noreferrer" href={`https://polygonscan.com/tx/${item?.hash}`}>
					<TransactionItem
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
</main>
