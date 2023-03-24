<script>
	export let tokens;
	export let portfolioValue;
	export let usdValue;
</script>

<div class="w-10/12 bg-slate-900 mx-auto p-[30px] rounded-3xl mt-12">
	<div class="zeroo flex items-center justify-between text-sky-400 font-medium">
		<h4 class="basis-1/4 text-center">Token</h4>
		<h4 class="basis-1/4 text-center">portfolio</h4>
		<h4 class="basis-1/4 text-center">Price</h4>
		<h4 class="basis-1/4 text-center">Balance</h4>
	</div>
	<br />
	<div class="zero my-2 mx-auto">
		{#each tokens as token}
			<div class="text-white flex items-center justify-between">
				<div class="py-2.5 px-0 basis-1/4 flex">
					<img class="w-12 mr-4 rounded-full" src={token.iconUrl} alt="" />
					<div>
						<p class="font-extrabold">{token.symbol}</p>
						<p class="font-medium text-slate-300">{token.name}</p>
					</div>
				</div>
				<div class="font-extrabold basis-1/4 text-center">
					<p class="text-center">
						{((token.value.marketValue / portfolioValue) * 100).toFixed(2)}%
					</p>
				</div>

				<div class="text-center font-extrabold basis-1/4">
					<p>{(token.value.price * usdValue).toFixed(2)}</p>
					<p
						class="{parseFloat(token.value.pricePercentChange1d.toString().substr(0, 5)) > 0
							? 'text-green-600'
							: 'text-red-600'} font-extrabold"
					>
						{token.value.pricePercentChange1d.toFixed(2)}%
					</p>
				</div>

				<div class="five basis-1/4 text-center">
					<p class="font-extrabold">
						₹{(token.value.marketValue * usdValue).toFixed(2)}
					</p>
					<p class="font-medium text-slate-300">
						{token.balance.toFixed(3)}
						{token.symbol}
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	/* .table-wrapper {
		width: 90%;
	} */
</style>
