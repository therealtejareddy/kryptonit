<script>
	let title = 'Kryptonit | NFT Portfolio';
	import { userAddress } from '../../../store.js';
	import Sidebar from '../../../components/Sidebar.svelte';
	import Topbar from '../../../components/Topbar.svelte';
	import NftCard from '../../../components/NFTCard.svelte';
	import Footer from '../../../components/Footer.svelte';
	const endpoint = 'https://polygon-mainnet.g.alchemy.com/v2/Asy6lnTopOGZGozcBsEO1cmj4XdewlDw';
	let userAddr;
	let NFTs;
	userAddress.subscribe((v) => {
		userAddr = v;
		const fetchNFTs = async (owner, retryAttempt) => {
			if (retryAttempt === 5) {
				return;
			}
			if (owner) {
				let data;
				try {
					data = await fetch(`${endpoint}/getNFTs?owner=${owner}`).then((data) => data.json());
				} catch (e) {
					fetchNFTs(endpoint, owner, retryAttempt + 1);
				}

				NFTs = data.ownedNfts;
				return data;
			}
		};
		fetchNFTs(userAddr, 0);
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
			<div class="flex justify-between items-center mb-8 mt-6">
				<h1 class="text-4xl font-extrabold text-slate-100">NFT Portfolio</h1>
				<div class="inline-block rounded-full border-2 border-slate-400 py-3 px-1">
					<a
						class="hover:bg-slate-600 font-medium text-slate-100 py-2 px-4 mx-2 rounded-full transition-all"
						href="/portfolio">Token</a
					>
					<a
						class="hover:bg-slate-600 font-medium text-slate-100 py-2 px-4 mx-2 rounded-full transition-all"
						href="/portfolio/nft">NFT</a
					>
				</div>
			</div>
		</div>
		<section class="flex flex-wrap justify-center">
			{#if NFTs?.length > 0}
				{#each NFTs as NFT}
					<NftCard
						image={NFT.media[0].gateway}
						format={NFT.media[0].format}
						id={NFT.id.tokenId}
						title={NFT.title}
						address={NFT.contract.address}
						description={NFT.description}
						attributes={NFT.metadata.attributes}
					/>
				{/each}
			{:else}
				<div class="h-[74vh] flex justify-center items-center">
					<h1 class="text-4xl font-bold mb-40 text-slate-100">No NFTs to Display.</h1>
				</div>
			{/if}
		</section>
	</div>
	<Footer />
</div>
