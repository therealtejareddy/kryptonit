<script>
	let title = 'Kryptonit | Buy';
	import transakSDK from '@transak/transak-sdk';
	import { onMount } from 'svelte';
	import { userAddress } from '../../store';
	import Sidebar from '../../components/Sidebar.svelte';
	import Topbar from '../../components/Topbar.svelte';
	import Footer from '../../components/Footer.svelte';
	const handleBuy = () => {
		let userAddr;
		userAddress.subscribe((v) => {
			userAddr = v;
			let transak = new transakSDK({
				// apiKey: '4ad5495c-4b66-4360-aec3-f229b63e4aca', // (Required)
				apiKey: '0f4beee9-e541-442c-b6bc-bc41a442dfc3', // (Required)
				environment: 'PRODUCTION', // (Required)
				// .....
				// For the full list of customisation options check the link above
				defaultCryptoCurrency: 'MATIC',
				defaultNetwork: 'polygon,',
				countryCode: 'IN',
				fiatCurrency: 'INR',
				// defaultFiatAmount: 2000,
				// fiatAmount: 2000,
				themeColor: '1f2937',
				widgetHeight: '625px',
				widgetWidth: '500px',
				walletAddress: userAddr,
				disableWalletAddressForm: true
				// redirectURL:''
			});

			transak.init();

			// This will trigger when the user closed the widget
			transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, (orderData) => {
				transak.close();
			});

			// This will trigger when the user marks payment is made
			transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
				transak.close();
			});
		});
	};
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="bg-gray-800 h-screen overflow-y-hidden">
	<Sidebar />
	<Topbar />
	<div class="ml-16 pt-16 overflow-hidden flex justify-center">
		<div class="py-12 px-4 bg-gray-900 rounded-md flex flex-col items-center shadow-xl">
			<h1 class="mt-6 mb-4 text-gray-100 font-bold text-3xl text-center">Buy the native coin</h1>
			<img
				class="w-1/3"
				src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/polygon/polygon-original.svg"
				alt="polygon"
			/>
			<button
				class="mt-6 mb-4 py-3 w-full rounded-md text-md text-gray-100 font-bold bg-blue-700 hover:bg-blue-800 hover:shadow-sm hover:shadow-blue-500 transition-all"
				on:click={handleBuy}>Buy crypto</button
			>
		</div>
	</div>
	<Footer />
</div>
