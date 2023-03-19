<script>
	import { addressParser } from './../utils/config';
	export let block_hash;
	export let block_number;
	export let to_address;
	export let value;
	export let contract_type;
	export let block_timestamp;
</script>

<div class="bg-slate-900 mt-4 py-2 rounded-sm flex items-center justify-between">
	<p class="basis-1/5 text-center">{addressParser(block_hash)}</p>
	<p class="basis-1/5 text-center">{block_number}</p>
	<p class="basis-1/5 text-center">
		{new Intl.DateTimeFormat('en-IN').format(new Date(block_timestamp))}
	</p>
	<p class="basis-1/5 text-center">{addressParser(to_address)}</p>
	<p class="basis-1/5 text-center">{value}</p>
	<p class="basis-1/5 text-center">{contract_type}</p>
</div>
