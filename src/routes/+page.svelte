<script>
	let title = 'Kryptonit | Home';
	import { onMount } from 'svelte';
	import Footer from '../components/Footer.svelte';
	import Sidebar from '../components/Sidebar.svelte';
	import Topbar from '../components/Topbar.svelte';
	onMount(() => {
		let allImgs = document.querySelectorAll('.dispos');
		let imgCont = document.querySelectorAll('.imgcont');
		setInterval(() => {
			allImgs.forEach((eachImg) => {
				eachImg.style.opacity = Math.floor(Math.random() * 6) / 10;
				eachImg.style.transition = 'all 600ms';
			});
		}, 1500);
		imgCont.forEach((eachCont) => {
			eachCont.addEventListener('mouseenter', (e) => {
				e.target.style.scale = 0.8;
			});
			eachCont.addEventListener('mouseleave', (e) => {
				e.target.style.scale = 1;
			});
			eachCont.addEventListener('mousemove', (e) => {
				e.target.style.rotate = '360deg';
			});
		});
	});
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="overflow-x-hidden">
	<Sidebar />
	<Topbar />
	<div class="imgdiv z-20">
		<div class="imgcont">
			<img src="btc.svg" alt="" class="dispos" />
		</div>
		<div class="imgcont">
			<img src="ada.svg" alt="" class="dispos" />
		</div>
		<div class="imgcont">
			<img src="eth.svg" alt="" class="dispos" />
		</div>
		<div class="imgcont">
			<img src="matic.svg" alt="" class="dispos" />
		</div>
		<div class="imgcont">
			<img src="usdt.svg" alt="" class="dispos" />
		</div>
		<div class="imgcont">
			<img src="shib.svg" alt="" id="shib" class="dispos" />
		</div>
	</div>
	<div class="h-screen -mt-16 pt-16 ml-16 px-16 bg-slate-800 z-10">
		<img src="bayc.avif" alt="" class="w-100 absolute right-16 bottom-16 z-30 opacity-60" />
		<h1 class="text-8xl font-black mt-24 text-white z-40 relative">
			All your Web3 At One Place for <span style="color:#8247E5;">Polygon</span>
		</h1>
		<!-- <p class="mt-8 w-1/2 text-slate-200 font-bold z-40 relative">
			Track user assets portfolio, swap your cryptocurrencies,Personalize your assets, Buy tokens
			via bank, NFT Transfers, Transaction Overview.
		</p> -->
		<p class="mt-8 w-1/2 leading-8 text-slate-300 font-medium z-40 relative">
			Worlds first web3 decentralised application introduced portfolio tracking includes both tokens
			and NFT, swapping protocol to swap assets, fait onramp, transaction history viewer and
			transfers history viewer built on Polygon.
		</p>
	</div>
	<Footer />
</div>

<style>
	.imgdiv {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		position: absolute;
		bottom: 0;
	}
	.imgdiv div {
		position: absolute;
		transform: scale(1);
		transform-origin: center;
		transition: all 300ms;
	}
	.imgdiv div:nth-child(1) {
		width: 9rem;
		bottom: 7rem;
		left: 35rem;
	}
	.imgdiv div:nth-child(2) {
		width: 8rem;
		bottom: 0.9rem;
		right: 0;
	}
	.imgdiv div:nth-child(3) {
		width: 6rem;
		right: 10rem;
		top: 3rem;
	}
	.imgdiv div:nth-child(4) {
		width: 8rem;
		top: 6rem;
		left: 12rem;
	}
	.imgdiv div:nth-child(5) {
		width: 7rem;
		top: 11rem;
		right: 34rem;
	}
	.imgdiv div:nth-child(6) {
		width: 8rem;
		top: 18rem;
		left: 5rem;
	}
	.imgdiv img {
		width: 100%;
		transition-duration: 100ms;
	}
</style>
