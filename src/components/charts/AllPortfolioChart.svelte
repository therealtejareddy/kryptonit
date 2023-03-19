<script>
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	export let coingeckoIds;
	export let tknCount;
	export let portfolioValue;
	export let usdValue;
	// onMount(() => {
	let days = 365;
	let myChart;
	async function dataFetcher() {
		let allRes = await Promise.all(
			coingeckoIds.map(async (data) => {
				let eachResp = await fetch(
					`https://api.coingecko.com/api/v3/coins/${data}/market_chart?vs_currency=inr&days=${days}`
				);
				let res = eachResp.json();
				return res;
			})
		);
		let res = allRes.map((item) => {
			return item.prices;
		});
		let portFolioArr = [];
		for (let i = 0; i < res[0].length; i++) {
			let total = 0;
			for (let j = 0; j < res.length; j++) {
				if (typeof res[j][i] != 'undefined') {
					total += res[j][i][1] * tknCount[j];
				} else {
					continue;
				}
			}
			portFolioArr.push([res[0][i][0], total]);
		}
		// console.log(portFolioArr);
		// return allRes;
		return portFolioArr;
	}
	let labels;
	let datasets;
	dataFetcher().then((res) => {
		// console.log(res);
		labels = res.map((data) => {
			let date = new Date(data[0]);
			return date;
		});
		datasets = [
			{
				data: res.map((data) => data[1])
			}
		];
		myChart = new Chart('myChart1', {
			type: 'line',
			data: {
				datasets: datasets,
				labels: labels
			},
			options: {
				plugins: {
					legend: {
						display: false
					}
				},
				elements: {
					point: {
						radius: 1
					}
				},
				scales: {
					x: {
						display: false
					},
					y: {
						display: false
					}
				}
			}
		});
		console.log('chart mounted');
	});
	// });
</script>

<div class="basis-1/2 bg-slate-900 flex items-center flex-col h-96 w-96 rounded-3xl p-4 mr-2">
	<div class="basis-1/3 font-extrabold text-4xl flex items-center">
		<h1 class="text-start text-slate-100">₹{(portfolioValue * usdValue).toFixed(2)}</h1>
	</div>
	<canvas id="myChart1" class="w-full basis-2/3" />
</div>
<!-- `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=${days}` -->
<!-- showing -> only prices -->
<!-- res -> portfolio value -->
