<script>
	import { pb, profile } from '$lib';
	import { reply, edit, menu } from '$lib/stores/messages';

	export let message;

	async function trigger(react) {
		if (message.react === react) {
			react = 0;
		}
		message.react = react;
		$menu = false;
		await pb.collection('user_messages').update(message.id, { react });
	}

	async function triggerLike() {
		await trigger(1);
	}
	async function triggerDislike() {
		await trigger(2);
	}

	async function handleDelete() {
		await pb.collection('user_messages').delete(message.id);
		$menu = false;
	}
</script>

<button class="link" on:click={() => {
	$reply = message;
	$menu = false;
}}>
	<img src="/chats/reply.svg" alt="reply" class="icon" />
</button>

{#if message.author === $profile}
	<button class="link" on:click={handleDelete}>
		<img src="/actions/trash.svg" alt="delete" class="icon" />
	</button>
	<button class="link" on:click={() => {
		$edit = message.id;
		$menu = false;
	}}>
		<img src="/actions/edit.svg" alt="edit" class="icon" />
	</button>
{:else}
	<button class="link" class:selected={message.react === 1} on:click={triggerLike}>
		<img src="/statuses/like.svg" alt="like" class="icon" />
	</button>
	<button class="link" class:selected={message.react === 2} on:click={triggerDislike}>
		<img src="/statuses/dislike.svg" alt="dislike" class="icon" />
	</button>
{/if}

<style>
	.link {
		opacity: 30%;
	}
	.selected {
		opacity: 100%;
	}
	img {
		width: 24px;
	}
</style>