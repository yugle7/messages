<script>
	import { parse } from '$lib/utils/text';
	import { search, to } from '$lib/stores/messages';

	import Block from './Block.svelte';
	import React from './React.svelte';
	import Reply from './Reply.svelte';

	export let message;
</script>

<div>
	<a style="color: var(--color-{message.author.color})" href="/users/{message.author.id}">
		{message.author.username}
	</a>
	<span>{message.created.substring(11, 16)}</span>
	<br />

	{#if message.reply}
		<Reply reply={message.reply} />
	{/if}

	<button
		class="link"
		on:click={() => {
			$to = message.id;
			$search = null;
		}}
	>
		{#each parse(message.text) as block}
			<Block {block} />
		{/each}
	</button>
	{#if message.react > 0}
		<React react={message.react} />
	{/if}
</div>

<style>
	div {
		padding: 10px;
	}
	span {
		font-size: var(--font-1);
		opacity: 60%;
	}
	button {
		display: block;
		text-align: start;
		line-height: 1.4em;
	}
</style>
