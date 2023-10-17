<script>
	import Link from './Link.svelte';

	import { search } from '$lib/stores/messages';
	import { onMount } from 'svelte';

	export let chat;
	let messages = [];

	onMount(async () => {
		output.scroll({
			top: output.scrollHeight,
			behavior: 'auto'
		});
	});

	$: messages = chat.messages.filter((m) => m.text.toLowerCase().includes($search));

	let output;
</script>

<ul bind:this={output}>
	{#each messages as message (message.id)}
		<li><Link {message} /></li>
	{/each}
</ul>

<style>
	ul {
		width: 100%;
		flex-grow: 1;
		overflow-y: auto;
	}
</style>
