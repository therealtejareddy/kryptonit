<script>
	let title = 'Kryptonit | Swapping Protocol';
	import Sidebar from '../../components/Sidebar.svelte';
	import Topbar from '../../components/Topbar.svelte';
	import Web3 from 'web3';
	import { toasts, ToastContainer, FlatToast, BootstrapToast } from 'svelte-toasts';
	import { options } from './../../utils/config';
	import { userAddress } from '../../store';
	import Footer from '../../components/Footer.svelte';
	let tokens;
	let walletTokens;
	let totknDecimals;
	let web3;
	let userAddr;
	userAddress.subscribe((v) => {
		userAddr = v;
		fetch('https://api.1inch.io/v5.0/137/tokens')
			.then((response) => response.json())
			.then((response) => {
				let tokenArray = [];
				for (const token in response.tokens) {
					const tokenObj = {
						address: token,
						name: response.tokens[token].name,
						symbol: response.tokens[token].symbol,
						logo: response.tokens[token].logoURI
					};
					tokenArray.push(tokenObj);
				}
				return [tokenArray];
			})
			.then((resp) => {
				tokens = resp[0];
			})
			.catch((err) => console.error(err));

		fetch(`https://deep-index.moralis.io/api/v2/${userAddr}/erc20?chain=polygon`, options)
			.then((response) => response.json())
			.then((response) => {
				walletTokens = response;
			})
			.catch((err) => console.error(err));
	});

	let inputValue = '';
	let fromSelected;
	let toSelected;
	let toTokenAmt = 0;
	const handleClick = () => {
		web3 = new Web3(window.ethereum);
		let tx;
		let fromTokenAmt = (inputValue * 10 ** fromSelected.decimals).toString();
		console.log(fromTokenAmt);
		fetch(
			// // `https://swap.metaswap.codefi.network/networks/137/trades?sourceAmount=${fromTokenAmt}&sourceToken=${fromSelected.token_address}&destinationToken=${toSelected.address}&slippage=2&walletAddress=0x9f30aa06cd0436b2237cc2e35f86c099ba7e2489&timeout=10000&enableDirectWrapping=true&includeRoute=true`
			`https://api.1inch.io/v5.0/137/swap?fromTokenAddress=${fromSelected.token_address}&toTokenAddress=${toSelected.address}&amount=${fromTokenAmt}&fromAddress=${userAddr}&slippage=1`
		)
			.then(async (response) => response.json())
			.then(async (response) => {
				if (response.statusCode === 400) {
					throw new Error(`Not Allowed Allowances with pair`);
					return;
				}
				if (response.statusCode > 400) {
					throw new Error(`Can't Swap the pair`);
					return;
				}
				tx = response.tx;
				if (tx?.gas != 'undefined') {
					tx.gas = tx.gas.toString();
				}
				let txReceipt = await web3.eth.sendTransaction(tx);
				inputValue = '';
				toTokenAmt = 0;
				if (txReceipt) {
					successToast();
				}
			})
			.catch((err) => {
				failToast(err.message);
			});
	};
	function handleChange() {
		let val = (Number.parseFloat(inputValue) * 10 ** fromSelected.decimals).toString();
		fetch(
			`https://api.1inch.io/v5.0/137/quote?fromTokenAddress=${fromSelected.token_address}&toTokenAddress=${toSelected.address}&amount=${val}`
		)
			.then((response) => response.json())
			.then((res) => {
				totknDecimals = res.toToken?.decimals;
				toTokenAmt = res.toTokenAmount / 10 ** totknDecimals;
			});
	}

	const successToast = () => {
		const toast = toasts.add({
			title: 'Success',
			description: 'Swapped successfully',
			duration: 4000, // 0 or negative to avoid auto-remove
			placement: 'top-right',
			type: 'info',
			theme: 'dark',
			placement: 'top-right',
			showProgress: true,
			type: 'success',
			theme: 'dark',
			onClick: () => {},
			onRemove: () => {}
		});
	};
	const failToast = (desc) => {
		const toast = toasts.add({
			title: 'Failed',
			description: desc,
			duration: 4000,
			placement: 'top-right',
			type: 'info',
			theme: 'dark',
			placement: 'top-right',
			showProgress: true,
			type: 'error',
			theme: 'dark',
			onClick: () => {},
			onRemove: () => {}
		});
	};
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="bg-gray-800 overflow-x-hidden">
	<Sidebar />
	<Topbar />
	<div class="ml-16 px-16">
		<div>
			<div class="flex justify-start items-center mb-8 mt-6">
				<h1 class="text-4xl font-extrabold text-slate-100">Swapping Protocol</h1>
			</div>
		</div>
	</div>
	<ToastContainer placement="bottom-right" let:data>
		<FlatToast {data} />
	</ToastContainer>
	<div class="overflow-x-hidden grid place-items-center h-[75vh] my-auto">
		<div class="ml-16 swap mb-20">
			<div class="relative">
				<label for="swapFrom" class="mb-2 inline-block font-bold text-xl">Swap From</label>
				<input
					type="text"
					name="from"
					id="swapFrom"
					bind:value={inputValue}
					class="ip1 inset-0 m-0 p-4"
					placeholder="0"
					on:input={handleChange}
				/>
				<select bind:value={fromSelected} name="from" id="" class="select-btn">
					{#if walletTokens}
						<option
							value={JSON.parse(
								JSON.stringify({
									token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
									decimals: 18
								})
							)}>Matic</option
						>
						{#each walletTokens as token}
							<option value={token}>
								{token.name}
							</option>
						{/each}
					{/if}
				</select>
			</div>
			<div class="relative">
				<label for="swapTo" class="mb-2 inline-block mt-2 font-bold text-xl">Swap To</label>
				<input
					type="text"
					name="to"
					id="swapTo"
					bind:value={toTokenAmt}
					class="ip1 inset-0 m-0 p-4"
					placeholder="0"
					disabled
				/>
				<select bind:value={toSelected} name="to" id="" class="select-btn">
					{#if tokens}
						{#each tokens as token}
							<option value={token}>
								{token.name}
							</option>
						{/each}
					{/if}
				</select>
			</div>
			<input type="submit" value="Swap" on:click={handleClick} class="swap-btn relative inset-0" />
		</div>
	</div>
	<Footer />
</div>

<style>
	.swap-btn {
		/* Font & Text */
		font-family: 'Inter custom', sans-serif;
		font-size: 20px;
		font-style: normal;
		font-variant: normal;
		font-weight: 600;
		letter-spacing: normal;
		line-height: normal;
		text-decoration: none solid rgb(76, 130, 251);
		text-align: center;
		text-indent: 0px;
		text-transform: none;
		vertical-align: baseline;
		white-space: normal;
		word-spacing: 0px;

		/* Color & Background */
		background-attachment: scroll;
		background-color: rgba(76, 130, 251, 0.24);
		background-image: none;
		background-position: 0% 0%;
		background-repeat: repeat;
		color: rgb(76, 130, 251);

		/* Box */
		height: 58px;
		width: 446px;
		border: 1px solid rgba(0, 0, 0, 0);
		margin: 12px 0px;
		padding: 16px;
		max-height: none;
		min-height: 0px;
		max-width: none;
		min-width: 0px;

		/* Positioning */
		float: none;
		display: flex;
		align-items: center;
		justify-content: center;
		clear: none;
		z-index: 1;

		/* List */
		list-style-image: none;
		list-style-type: disc;
		list-style-position: outside;

		/* Table */
		border-collapse: separate;
		border-spacing: 0px 0px;
		caption-side: top;
		empty-cells: show;
		table-layout: auto;

		/* Miscellaneous */
		overflow: visible;
		cursor: pointer;
		visibility: visible;

		/* Effects */
		transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -1, 0, 0, 0, 1);
		transition: transform 0.45s ease 0s;
		outline-offset: 0px;
		box-sizing: border-box;
		resize: none;
		text-shadow: none;
		text-overflow: clip;
		word-wrap: normal;
		box-shadow: none;
		border-radius: 20px;
	}
	.select-btn {
		/* Font & Text */
		font-family: 'Inter custom', sans-serif;
		font-size: 24px;
		font-style: normal;
		font-variant: normal;
		font-weight: 400;
		letter-spacing: normal;
		line-height: 20px;
		text-decoration: none solid rgb(255, 255, 255);
		text-align: center;
		text-indent: 0px;
		text-transform: none;
		vertical-align: baseline;
		white-space: normal;
		word-spacing: 0px;

		/* Color & Background */
		background-attachment: scroll;
		background-color: rgb(41, 50, 73);
		background-image: none;
		background-position: 0% 0%;
		background-repeat: repeat;
		color: rgb(255, 255, 255);

		/* Box */
		height: 32px;
		width: 110.234px;
		border: 0px none rgb(255, 255, 255);
		margin: 0px 0px 0px 12px;
		padding: 4px 8px 4px 4px;
		max-height: none;
		min-height: auto;
		max-width: none;
		min-width: 0px;

		/* Positioning */
		position: absolute;
		top: 62px;
		/* bottom: 0px; */
		right: 0px;
		/* left: 0px; */
		float: none;
		display: flex;
		clear: none;
		z-index: 1;

		/* List */
		list-style-image: none;
		list-style-type: disc;
		list-style-position: outside;

		/* Table */
		border-collapse: separate;
		border-spacing: 0px 0px;
		caption-side: top;
		empty-cells: show;
		table-layout: auto;

		/* Miscellaneous */
		overflow: visible;
		cursor: pointer;
		visibility: visible;

		/* Effects */
		transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -1, 0, 0, 0, 1);
		transition: transform 0.45s ease 0s;
		outline-offset: 0px;
		box-sizing: border-box;
		resize: none;
		text-shadow: none;
		text-overflow: clip;
		word-wrap: normal;
		box-shadow: none;
		border-radius: 16px;
	}
	.swap {
		/* Font & Text */
		font-family: 'Inter custom', sans-serif;
		font-size: 16px;
		font-style: normal;
		font-variant: none;
		font-weight: 400;
		letter-spacing: normal;
		line-height: normal;
		text-decoration: none solid rgb(255, 255, 255);
		text-align: start;
		text-indent: 0px;
		text-transform: none;
		white-space: normal;
		word-spacing: 0px;

		/* Color & Background */
		background-attachment: scroll;
		background-color: rgb(13, 17, 28);
		background-image: none;
		background-position: 0% 0%;
		background-repeat: repeat;
		color: rgb(255, 255, 255);

		/* Box */
		height: 369px;
		width: 476px;
		border: 1px solid rgb(27, 34, 54);
		padding: 16px;
		max-height: none;
		min-height: 0px;
		max-width: none;
		min-width: 0px;

		/* Positioning */
		position: relative;
		float: none;
		display: block;
		clear: none;
		z-index: 1;

		/* List */
		list-style-image: none;
		list-style-type: disc;
		list-style-position: outside;

		/* Table */
		border-collapse: separate;
		border-spacing: 0px 0px;
		caption-side: top;
		empty-cells: show;
		table-layout: auto;

		/* Miscellaneous */
		overflow: visible;
		cursor: auto;
		visibility: visible;

		/* Effects */
		transform: none;
		transition: all 0s ease 0s;
		outline-offset: 0px;
		box-sizing: border-box;
		resize: none;
		text-shadow: none;
		text-overflow: clip;
		word-wrap: normal;
		box-shadow: none;
		border-radius: 16px;
	}
	.ip1 {
		/* Font & Text */
		font-family: 'Inter custom', sans-serif;
		font-size: 18px;
		font-style: normal;
		font-variant: none;
		font-weight: 700;
		letter-spacing: normal;
		line-height: 20px;
		text-decoration: none solid rgb(152, 161, 192);
		text-align: start;
		text-indent: 0px;
		text-transform: none;
		white-space: normal;
		word-spacing: 0px;

		/* Color & Background */
		background-attachment: scroll;
		background-color: rgb(19, 26, 42);
		background-image: none;
		background-position: 0% 0%;
		background-repeat: repeat;
		color: white;

		/* Box */
		height: 96px;
		width: 446px;
		border: 0px none rgb(152, 161, 192);
		max-height: none;
		min-height: 0px;
		max-width: none;
		min-width: 0px;

		/* Positioning */
		position: relative;
		float: none;
		display: block;
		clear: none;
		z-index: auto;

		/* List */
		list-style-image: none;
		list-style-type: disc;
		list-style-position: outside;

		/* Table */
		border-collapse: separate;
		border-spacing: 0px 0px;
		caption-side: top;
		empty-cells: show;
		table-layout: auto;

		/* Miscellaneous */
		overflow: visible;
		cursor: auto;
		visibility: visible;

		/* Effects */
		transform: none;
		transition: all 0s ease 0s;
		outline-offset: 0px;
		box-sizing: border-box;
		resize: none;
		text-shadow: none;
		text-overflow: clip;
		word-wrap: normal;
		box-shadow: none;
		border-radius: 12px;
	}
</style>
