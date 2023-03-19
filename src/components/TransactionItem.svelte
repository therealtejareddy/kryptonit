<script>
	import { addressParser } from './../utils/config';
	export let block_hash;
	export let block_number;
	export let block_timestamp;
	export let to_address;
	export let value;
</script>

<div class="flex items-center justify-between w-full bg-slate-900 mt-4 py-2 rounded-sm">
	{#if block_hash}
		<p class="basis-1/5 text-center">{addressParser(block_hash)}</p>
	{:else}
		<p class="basis-1/5 text-center">0xeee.....eee</p>
	{/if}
	<p class="basis-1/5 text-center">{block_number}</p>
	<p class="basis-1/5 text-center">
		{new Intl.DateTimeFormat('en-IN').format(new Date(block_timestamp))}
	</p>
	{#if to_address}
		<p class="basis-1/5 text-center">{addressParser(to_address)}</p>
	{:else}
		<p class="basis-1/5 text-center">0xeee.....eee</p>
	{/if}
	<p class="basis-1/5 text-center">{value}</p>
</div>
