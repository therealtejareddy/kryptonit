<script>
	export let market_cap_rank;
	export let image;
	export let symbol;
	export let current_price;
	export let price_change_percentage_24h;
	export let total_volume;
	export let market_cap;
</script>

<div class="coin-row flex items-center justify-between bg-gray-900">
	<p>{market_cap_rank}</p>
	<div class="img-symbol">
		<img src={image} alt="" />
		<p>{symbol.toUpperCase()}</p>
	</div>
	<p>₹{current_price.toLocaleString()}</p>
	<p
		class={parseFloat(price_change_percentage_24h.toString().substr(0, 5)) > 0
			? 'text-green-600'
			: 'text-red-600'}
	>
		{price_change_percentage_24h.toFixed(2)}%
	</p>
	<p class="hide-mobile">₹{total_volume.toLocaleString()}</p>
	<p class="hide-mobile">₹{market_cap.toLocaleString()}</p>
</div>

<style>
	.coin-row {
		/* background-color: #26272b; */
		/* box-shadow: 0px 0px 12px #18191b; */
		border-radius: 8px;
		margin: 2rem 1rem;
		padding: 0.7rem 1rem;
	}

	.coin-row:hover {
		transform: scale(1.04);
		transition: 0.3s ease-in-out;
		cursor: pointer;
	}
	img {
		height: 40px;
		margin-right: 8px;
		width: auto;
	}

	.img-symbol {
		display: flex;
		align-items: center;
	}
</style>
