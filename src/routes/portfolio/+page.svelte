<script>
	let title = 'Kryptonit | Portfolio';
	import { onMount } from 'svelte';
	import { redirect } from '@sveltejs/kit';
	import AllPortfolioChart from '../../components/charts/AllPortfolioChart.svelte';
	import DonutChart from '../../components/charts/DonutChart.svelte';
	import PortfolioTokenTable from '../../components/PortfolioTokenTable.svelte';
	import Sidebar from '../../components/Sidebar.svelte';
	import Topbar from '../../components/Topbar.svelte';
	import { userAddress } from '../../store.js';
	import { options } from '../../utils/config.js';
	import Footer from '../../components/Footer.svelte';
	let userAddr;
	let tokenPortfolio;
	let datas;
	let usdValue;
	userAddress.subscribe((v) => {
		userAddr = v;
		tokenPortfolio = fetchPortfolio();
		async function fetchPortfolio() {
			let response = await fetch(
				`https://deep-index.moralis.io/api/v2/${userAddr}/erc20?chain=polygon`,
				options
			);
			datas = await response.json();
			let coinResponse = await fetch(
				`https://account.metafi.codefi.network/accounts/${userAddr}?chainId=137&includePrices=true`
			);

			let coinres = await coinResponse.json();
			let usdRes = await fetch(
				'https://min-api.cryptocompare.com/data/price?fsym=USDT&tsyms=INR&api_key=b8e3706ffe847a27b8a0a4060a6df2e2df496fdf63575aadced16daca5dd48ec'
			);
			let usdJson = await usdRes.json();
			usdValue = usdJson.INR;
			let labels = [];
			let dataSets = [];
			let tokenPortfolio = [];
			let coingeckoIds = [];
			let tknCount = [];
			let portfolioValue = 0;
			let maticObj = {
				iconUrl: coinres.nativeBalance.iconUrl,
				name: coinres.nativeBalance.name,
				symbol: coinres.nativeBalance.symbol,
				balance: coinres.nativeBalance.balance,
				value: {
					price: coinres.nativeBalance.value.price,
					marketValue: coinres.nativeBalance.value.marketValue,
					currency: 'usd',
					pricePercentChange1d: coinres.nativeBalance.value.pricePercentChange1d
				}
			};

			tokenPortfolio.push(maticObj);
			for (let res of coinres.tokenBalances) {
				if (res.value) {
					if (res.hasOwnProperty('coingeckoId')) {
						tokenPortfolio.push(res);
						tknCount.push(res.balance);
						portfolioValue += res.value.marketValue;
						coingeckoIds.push(res.coingeckoId);
						labels.push(res.name);
						dataSets.push(res.value.marketValue);
					}
				}
			}

			tknCount.push(coinres.nativeBalance.balance);
			portfolioValue += coinres.nativeBalance.value.marketValue; //
			coingeckoIds.push(coinres.nativeBalance.coingeckoId); //
			labels.push(coinres.nativeBalance.name); //
			dataSets.push(coinres.nativeBalance.value.marketValue); //
			return [tokenPortfolio, labels, dataSets, coingeckoIds, tknCount, portfolioValue, usdValue];
		}
	});
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="bg-gray-800 pb-20">
	<Topbar />
	<Sidebar />
	<div class="ml-16 px-16">
		<div>
			<div class="flex justify-between items-center mb-8 mt-6">
				<h1 class="text-4xl font-extrabold text-slate-100">Portfolio</h1>
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
		{#await tokenPortfolio}
			<div class="h-[74vh] flex justify-center items-center">
				<p class="text-4xl font-bold mb-40 text-slate-100 animate-pulse">Loading...</p>
			</div>
		{:then tokenPortfolio}
			{#if tokenPortfolio?.length}
				<div class="flex w-10/12 max-w-screen mx-auto">
					<AllPortfolioChart
						coingeckoIds={tokenPortfolio[3]}
						tknCount={tokenPortfolio[4]}
						portfolioValue={tokenPortfolio[5]}
						usdValue={tokenPortfolio[6]}
					/>
					<DonutChart labels={tokenPortfolio[1]} dataSets={tokenPortfolio[2]} />
				</div>
				<PortfolioTokenTable
					tokens={tokenPortfolio[0]}
					portfolioValue={tokenPortfolio[5]}
					usdValue={tokenPortfolio[6]}
				/>
			{/if}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</div>
	<Footer />
</div>
