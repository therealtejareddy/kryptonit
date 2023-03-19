<script>
	let title = 'Kryptonit | Top Coins list';
	import CoinItem from '../../components/CoinItem.svelte';
	import Footer from '../../components/Footer.svelte';
	import Sidebar from '../../components/Sidebar.svelte';
	import Topbar from '../../components/Topbar.svelte';

	let coins;
	const url =
		'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false';
	fetch(url)
		.then((res) => res.json())
		.then((res) => {
			coins = res;
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
				<h1 class="text-4xl font-extrabold text-slate-100">Top Crypto Coins</h1>
			</div>
		</div>
	</div>
	<div class="container pt-8 pb-12">
		{#if coins?.length}
			<div>
				<div class="heading text-gray-100 bg-gray-900 flex items-center justify-between">
					<p>#</p>
					<p class="coin-name">Coin</p>
					<p>Price</p>
					<p>24h</p>
					<p class="hide-mobile">Volume</p>
					<p class="hide-mobile">Mkt Cap</p>
				</div>
			</div>
			{#each coins as coin}
				<a href="/coins/{coin.id}">
					<CoinItem
						market_cap_rank={coin.market_cap_rank}
						image={coin.image}
						symbol={coin.symbol}
						current_price={coin.current_price}
						price_change_percentage_24h={coin.price_change_percentage_24h}
						total_volume={coin.total_volume}
						market_cap={coin.market_cap}
					/>
				</a>
			{/each}
		{/if}
	</div>
	<Footer />
</div>

<style>
	.container {
		max-width: 1140px;
		margin: auto;
	}
	.heading {
		/* background-color: #26272b; */
		box-shadow: 0px 0px 12px #18191b;
		border-radius: 8px;
		margin: 0 1rem 0 1rem;
		padding: 0.7rem 1rem;
		font-weight: 700;
	}

	.coin-name {
		margin-left: -4rem;
	}
	a {
		text-decoration: none;
		color: #f4f4f4;
	}
</style>
