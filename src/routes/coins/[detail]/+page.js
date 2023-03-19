// import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const fetchData = async (coinId) => {
		const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
		let res = await fetch(url);
		let coin = await res.json();
		return coin;
	};
	return {
		coin: fetchData(params.detail)
	};

	// throw error(404, 'Not found');
}
