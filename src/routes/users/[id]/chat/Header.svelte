<script>
	import Header from '$lib/blocks/Menu/Fixed.svelte';
	import { page } from '$app/stores';
	import { menu } from '$lib/stores/menu';
	import { search } from '$lib/stores/messages';

	export let chat;
	let text = null;
</script>

<Header>
	{#if text !== null}
		<button
			class="link"
			on:click={() => {
				text = null;
				$search = null;
			}}
		>
			<img src="/actions/cross.svg" alt="close" class="icon" />
		</button>
		<form>
			<input type="text" bind:value={text} />
			<button class="link" type="submit" on:click={() => ($search = text.toLowerCase())}>
				<img src="/actions/search.svg" alt="search" class="icon" />
			</button>
		</form>
	{:else}
		<button class="link" on:click={() => ($menu = 'chats')}>
			<img src="/actions/arrow-left.svg" alt="back" class="icon" />
		</button>
		<a href="/users/{$page.params.id}" class="title">{chat.title}</a>
		<button class="link" on:click={() => (text = '')}>
			<img src="/actions/search.svg" alt="search" class="icon" />
		</button>
	{/if}
</Header>

<style>
	input {
		border: none;
		width: 100%;
	}
	form {
		display: flex;
		flex-direction: row;
		width: 100%;
	}
</style>
