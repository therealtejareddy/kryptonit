<script>
	export let coin;
</script>

<div class="coin-container">
	<div class="content bg-slate-900" style="margin-top: 1.5rem;">
		<h1 class="text-center m-4 font-bold text-4xl">{coin.name}</h1>
	</div>
	<div class="content bg-slate-900" style="margin-top: 1rem;">
		<div class="rank">
			<span class="rank-btn">Rank # {coin.market_cap_rank}</span>
		</div>
		<div class="info grid">
			<div class="coin-heading flex items-center">
				{#if coin.image}
					<img src={coin.image.small} alt="" />
				{/if}
				<p>{coin.name}</p>
				{#if coin.symbol}
					<p class="font-bold">{coin.symbol.toUpperCase()}/INR</p>
				{/if}
			</div>
			<div class="coin-price flex items-center justify-center">
				{#if coin.market_data?.current_price}
					<h1>₹{coin.market_data.current_price.inr.toLocaleString()}</h1>
				{/if}
			</div>
		</div>
	</div>

	<div class="content mt-4 bg-slate-900" style="margin-top: 1rem;">
		<table>
			<thead>
				<tr>
					<th class="bg-slate-600 text-center p-2">1h</th>
					<th class="bg-slate-600 text-center p-2">24h</th>
					<th class="bg-slate-600 text-center p-2">7d</th>
					<th class="bg-slate-600 text-center p-2">14d</th>
					<th class="bg-slate-600 text-center p-2">30d</th>
					<th class="bg-slate-600 text-center p-2">1yr</th>
				</tr>
			</thead>
			<tbody>
				<tr class="font-bold">
					<td class="text-center p-2"
						>{#if coin.market_data?.price_change_percentage_1h_in_currency}
							<p
								class={parseFloat(
									coin.market_data.price_change_percentage_1h_in_currency.inr.toFixed(1)
								) > 0
									? 'text-green-600'
									: 'text-red-600'}
							>
								{coin.market_data.price_change_percentage_1h_in_currency.inr.toFixed(1)}%
							</p>
						{/if}
					</td>
					<td class="text-center p-2"
						>{#if coin.market_data?.price_change_percentage_24h_in_currency}
							<p
								class={parseFloat(
									coin.market_data.price_change_percentage_24h_in_currency.inr.toFixed(1)
								) > 0
									? 'text-green-600'
									: 'text-red-600'}
							>
								{coin.market_data.price_change_percentage_24h_in_currency.inr.toFixed(1)}%
							</p>
						{/if}
					</td>
					<td class="text-center p-2"
						>{#if coin.market_data?.price_change_percentage_24h_in_currency}
							<p
								class={parseFloat(
									coin.market_data.price_change_percentage_7d_in_currency.inr.toFixed(1)
								) > 0
									? 'text-green-600'
									: 'text-red-600'}
							>
								{coin.market_data.price_change_percentage_7d_in_currency.inr.toFixed(1)}%
							</p>
						{/if}
					</td>
					<td class="text-center p-2"
						>{#if coin.market_data?.price_change_percentage_24h_in_currency}
							<p
								class={parseFloat(
									coin.market_data.price_change_percentage_14d_in_currency.inr.toFixed(1)
								) > 0
									? 'text-green-600'
									: 'text-red-600'}
							>
								{coin.market_data.price_change_percentage_14d_in_currency.inr.toFixed(1)}%
							</p>
						{/if}
					</td>
					<td class="text-center p-2"
						>{#if coin.market_data?.price_change_percentage_24h_in_currency}
							<p
								class={parseFloat(
									coin.market_data.price_change_percentage_30d_in_currency.inr.toFixed(1)
								) > 0
									? 'text-green-600'
									: 'text-red-600'}
							>
								{coin.market_data.price_change_percentage_30d_in_currency.inr.toFixed(1)}%
							</p>
						{/if}
					</td>
					<td class="text-center p-2"
						>{#if coin.market_data?.price_change_percentage_24h_in_currency}
							<p
								class={parseFloat(
									coin.market_data.price_change_percentage_1y_in_currency.inr.toFixed(1)
								) > 0
									? 'text-green-600'
									: 'text-red-600'}
							>
								{coin.market_data.price_change_percentage_1y_in_currency.inr.toFixed(1)}%
							</p>
						{/if}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="content bg-slate-900" style="margin-top: 1rem;">
		<div class="stats">
			<div class="left">
				<div class="row flex justify-between">
					<h4>24 Hour Low</h4>
					{#if coin.market_data?.low_24h}
						<p>₹{coin.market_data.low_24h.inr.toLocaleString()}</p>{/if}
				</div>
				<div class="row flex justify-between">
					<h4>24 Hour High</h4>
					{#if coin.market_data?.high_24h}
						<p>₹{coin.market_data.high_24h.inr.toLocaleString()}</p>{/if}
				</div>
			</div>
			<div class="right">
				<div class="row flex justify-between">
					<h4>Market Cap</h4>
					{#if coin.market_data?.market_cap}
						<p>₹{coin.market_data.market_cap.inr.toLocaleString()}</p>{/if}
				</div>
				<div class="row flex justify-between">
					<h4>Circulating Supply</h4>
					{#if coin.market_data} <p>{coin.market_data.circulating_supply}</p>{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="content bg-slate-900" style="margin-top: 1rem;">
		<div class="about">
			<h3 class="text-2xl font-bold">About</h3>
			<!-- <p
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(coin.description ? coin.description.en : '')
                }}
				/> -->
			<p>{@html coin.description.en}</p>
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&display=swap');
	.coin-container .content {
		max-width: 740px;
		margin-left: auto;
		margin-right: auto;
		padding: 0.7rem 1rem;
		display: flex;
		flex-direction: column;
		box-shadow: 0px 0px 12px #18191b;
		border-radius: 8px;
	}

	.rank {
		margin: 0.5rem 0;
	}

	.rank-btn {
		border: 1px solid #6900ff;
		box-shadow: 0px 0px 8px #6900ff;
		background-color: #6900ff;
		border-radius: 8px;
		padding: 0.2rem;
	}

	.info {
		grid-template-columns: repeat(2, 1fr);
	}

	.info .coin-heading {
		margin: 1rem 0;
	}

	.info p {
		padding-right: 1rem;
	}

	table {
		margin: 0.5rem 0;
	}

	/* th {
		background-color: #333;
	} */

	.stats {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 2rem;
		width: 100%;
	}

	.stats .row {
		border-bottom: 1px solid #808080;
		margin: 0.6rem 0;
		padding-bottom: 0.5rem;
	}

	.stats .row p:first-child {
		color: #d3d3d3;
	}

	.about h3 {
		margin: 1rem 0;
	}

	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
</style>
