<script>
	import { menu } from '$lib/stores/menu';
	import { pb, profile } from '$lib';
	import { onDestroy, onMount } from 'svelte';
	import { sort } from '$lib/utils/sort';

	import Close from '$lib/blocks/Menu/Close.svelte';
	import Chat from '$lib/blocks/Chat/Chat.svelte';

	let chats = [];
	let unsubscribe;
	let loaded = false;

	function expand(chat) {
		const i = chat.users[0] === $profile.id ? 1 : 0;
		chat.title = chat.title[i];
		chat.user = chat.users[i];
	}

	onMount(async () => {
		const res = await pb.collection('users').getOne($profile.id, {
			expand: 'chats'
		});
		chats = res.expand.chats;

		chats.map(expand);
		sort(chats, '-sent');

		unsubscribe = await pb.collection('user_chats').subscribe('*', async ({ action, record }) => {
			if (!record.users.includes($profile.id)) {
				return;
			}
			if (action === 'update') {
				chats = chats.filter((c) => c.id !== record.id);
			}
			if (action === 'create' || action === 'update') {
				expand(record);
				chats = [record, ...chats];
			}
		});

		loaded = true;
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<Close action={() => ($menu = null)} />

{#if loaded}
	<div class="main menu">
		{#each chats as chat (chat.id)}
			<Chat {chat} />
		{/each}
	</div>
{/if}
