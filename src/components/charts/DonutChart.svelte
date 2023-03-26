<script>
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	let myChart;
	export let labels;
	export let dataSets;
	export let usdValue;
	onMount(() => {
		myChart = new Chart('myChart', {
			type: 'doughnut',
			data: {
				labels: labels,
				datasets: [
					{
						data: dataSets.map(dataset=>dataset*usdValue),
						hoverOffset: 4
					}
				]
			}
			// options: {
			// 	title: {
			// 		display: true,
			// 		text: 'World Wide Wine Production'
			// 	}
			// }
		});
	});
</script>

<div class="basis-1/2 h-96 w-96 bg-slate-900 flex items-center justify-center rounded-3xl p-4 ml-2">
	<canvas id="myChart" class="w-full h-full" />
</div>

<style>
</style>
