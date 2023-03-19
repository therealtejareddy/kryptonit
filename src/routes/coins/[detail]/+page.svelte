<script>
	import DOMPurify from 'dompurify';
	import CoinChart from '../../../components/charts/CoinChart.svelte';
	import CoinDetail from '../../../components/CoinDetail.svelte';
	import Footer from '../../../components/Footer.svelte';
	import Sidebar from '../../../components/Sidebar.svelte';
	import Topbar from '../../../components/Topbar.svelte';
	export let data;
	let { coin } = data;
	let title = `Kryptonit | ${coin.name}`;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="main bg-slate-800">
	<Sidebar />
	<Topbar />
	<div class="pb-12">
		<CoinDetail {coin} />
		<CoinChart id={coin.id} />
	</div>
	<Footer />
</div>

<style>
	.main {
		color: #f4f4f4;
	}
</style>
