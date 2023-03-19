<script>
	import Chart from 'chart.js/auto';
	export let id;
	let days = 365;
	let data;
	let labels;
	let datasets;
	let myChart;
	let currency = 'inr';
	// Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
	const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=${days}`;
	fetch(url)
		.then((res) => res.json())
		.then((res) => {
			data = res.prices;
			labels = data?.map((coin) => {
				let date = new Date(coin[0]);
				let time =
					date.getHours() > 12
						? `${date.getHours() - 12}:${date.getMinutes()} PM`
						: `${date.getHours()}:${date.getMinutes()} AM`;
				return days === 1 ? time : date.toLocaleDateString();
			});
			datasets = [
				{
					data: data?.map((coin) => coin[1]),
					label: `Price ( Past ${days} Days ) in ${currency}`,
					borderColor: '#EEBC1D'
				}
			];
			myChart = new Chart('myChart', {
				type: 'line',
				data: {
					datasets: datasets,
					labels: labels
				},
				options: {
					elements: {
						point: {
							radius: 1
						}
					}
				}
			});
		});
</script>

<div>
	<!-- `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=${days}` -->
	<canvas id="myChart" style="width:60%; margin:auto;" />
</div>
