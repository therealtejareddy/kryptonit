<script>
	export let id;
	export let image;
	export let title;
	export let address;
	export let attributes;
	export let description;
	export let format;
</script>

<div class="w-1/4 mr-3 mb-4 bg-slate-900 rounded-md text-white">
	{#if format == 'mp4'}
		<video class="w-full rounded-t-md" key={id} src={image} autoplay loop />
	{:else}
		<img class="w-full rounded-t-md" key={id} src={image} alt="nft" />
	{/if}
	<div class="p-3">
		<div class="flex mb-3">
			<div class="flex-grow">
				<h3 class="text-xl font-bold">{title}</h3>
				<p>{`${id.slice(0, 4)}...${id.slice(id.length - 4)}`}</p>
			</div>
			<div class="flex mr-3">
				<a
					target="_blank"
					class="text-blue-700"
					href={`https://etherscan.io/token/${address}`}
					rel="noreferrer">{`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}</a
				>
			</div>
		</div>
		<p>{description ? description.slice(0, 200) : 'No Description'}</p>
	</div>
	<div class="flex flex-wrap justify-center items-center p-3 ">
		{#if attributes?.length > 0}
			{#each attributes as attribute}
				<div class="w-1/2 mb-2 flex justify-start flex-col">
					<p class="mr-2 font-bold">{attribute.trait_type}:</p>
					<p class="text-sm">{attribute.value}</p>
				</div>
			{/each}
		{/if}
	</div>
</div>
