<script>
	import Message from './Message.svelte';

	import { pb, profile } from '$lib';
	import { scroll, read, bottom, to } from '$lib/stores/messages';
	import { onDestroy, onMount } from 'svelte';

	export let chat;

	let visible = true;
	let unread = chat.sender !== $profile.id && chat.unread > 0;
	$read = false;

	let unsubscribe;
	let loaded = false;

	const handleVisible = () => {
		visible = document.visibilityState === 'visible';
	};
	const handleBottom = () => {
		$bottom = output.scrollTop + output.clientHeight + 1 >= output.scrollHeight;
	};

	onMount(async () => {
		output.scroll({
			top: output.scrollHeight,
			behavior: 'auto'
		});

		console.log('subscribe');
		unsubscribe = await pb
			.collection('user_chats')
			.subscribe(chat.id, async ({ action, record }) => {
				if (action === 'update') {
					if (record.sender !== $profile.id) {
						if (record.unread > 0) {
							unread = true;
						}
					}
					if (record.unread === 0 && chat.unread > 0) {
						$read = true;
					}
					chat.unread = record.unread;
					chat.sender = record.sender;

					if ($bottom) {
						output.scroll({
							top: output.scrollHeight,
							behavior: 'smooth'
						});
					}
				}
			});

		document.addEventListener('visible', handleVisible);
		output.addEventListener('scroll', handleBottom);
		loaded = true;
	});

	onDestroy(() => {
		console.log('unsubscribe');
		document.removeEventListener('visible', handleVisible);
		output.removeEventListener('scroll', handleBottom);
		if (unsubscribe) {
			unsubscribe();
		}
	});

	$: if (visible && unread) {
		unread = false;
		pb.collection('user_chats').update(chat.id, {
			unread: 0
		});
	}

	let output;

	$: if ($scroll !== 0) {
		output.scroll({
			top: output.scrollTop + $scroll,
			behavior: 'auto'
		});
		$scroll = 0;
	}
	$: if ($to && loaded) {
		console.log($to);
		document.getElementById($to).scrollIntoView();
	}
</script>

<ul bind:this={output}>
	{#each chat.messages as message (message.id)}
		<li id={message.id}><Message {message} /></li>
	{/each}
</ul>

<style>
	ul {
		width: 100%;
		flex-grow: 1;
		overflow-y: auto;
	}
</style>
