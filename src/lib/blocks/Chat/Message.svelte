<script>
	import { parse } from '$lib/utils/text';
	import { change, edit, read, menu } from '$lib/stores/messages';

	import Block from './Block.svelte';
	import Edit from './Edit.svelte';
	import React from './React.svelte';
	import Menu from './Menu.svelte';
	import Reply from './Reply.svelte';

	export let message;

	$: if ($change === message.id) {
		message = message;
		$change = null;
	}
	$: if (message.unread && $read) {
		delete message.unread;
		message = message;
	}
</script>

{#if message.date}
	<h4>{message.date}</h4>
{/if}

<div class:deleted={message.deleted} class:unread={message.unread}>
	<a style="color: var(--color-{message.author.color})" href="/users/{message.author.id}">
		{message.author.username}
	</a>
	<span>{message.created.substring(11, 16)}</span>
	<br />

	{#if message.reply}
		<Reply reply={message.reply} />
	{/if}
	{#if message.deleted}
		{#each parse(message.text) as block}
			<Block {block} />
		{/each}
	{:else if $edit && message.id === $edit}
		<Edit {message} />
	{:else}
		<button class="link" on:click={() => ($menu = $menu === message.id ? null : message.id)}>
			{#each parse(message.text) as block}
				<Block {block} />
			{/each}
		</button>
		{#if $menu === message.id}
			<Menu {message} />
		{:else if message.react > 0}
			<React react={message.react} />
		{/if}
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
	.deleted {
		opacity: 50%;
	}
	.unread {
		background-color: var(--color-1);
	}
	h4 {
		font-size: var(--font-1);
		color: var(--color-5);
		text-align: center;
		padding: 10px 0 0 0;
		margin: 0;
		font-weight: 400;
	}
</style>
