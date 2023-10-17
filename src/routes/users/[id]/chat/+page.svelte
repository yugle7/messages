<script>
	import Header from './Header.svelte';
	import Output from '$lib/blocks/Chat/Output.svelte';
	import Input from '$lib/blocks/Chat/Input.svelte';
	import Search from '$lib/blocks/Chat/Search.svelte';

	import { pb, profile, getChat, getUser } from '$lib';
	import { change, read, search } from '$lib/stores/messages';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';

	let unsubscribe;

	let chat, user;
	let loaded = false;

	function expand(message) {
		message.author = user.id === message.author ? user : $profile;
		if (message.reply) {
			message.reply = chat.messages.find((m) => m.id === message.reply);
		}
	}

	async function load() {
		user = await getUser($page.params.id);
		chat = await getChat($profile, user);

		chat.messages.map(expand);

		unsubscribe = await pb
			.collection('user_messages')
			.subscribe('*', async ({ action, record }) => {
				if (record.chat !== chat.id) {
					return;
				}
				if (action === 'create') {
					expand(record);
					if (record.author == $profile) {
						record.unread = true;
					}
					chat.messages = [...chat.messages, record];
				}
				if (action === 'update') {
					const message = chat.messages.find((m) => m.id === record.id);
					message.text = record.text;
					message.react = record.react;

					$change = record.id;
				}
				if (action === 'delete') {
					const message = chat.messages.find((m) => m.id === record.id);
					message.deleted = true;

					$change = record.id;
				}
			});

		loaded = true;
	}
	onMount(() => {
		setTimeout(load, 0);
	});

	onDestroy(() => {
		$read = false;
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

{#if loaded}
	<div>
		<Header {chat} />
		{#if $search}
			<Search {chat} />
		{:else}
			<Output {chat} />
			<Input {chat} />
		{/if}
	</div>
{/if}

<style>
	div {
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100%;
	}
</style>
