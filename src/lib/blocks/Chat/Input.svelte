<script>
	import { pb, profile } from '$lib';

	import { scroll, reply, read, bottom } from '$lib/stores/messages';
	import { onMount } from 'svelte';
	import Reply from './Reply.svelte';

	let input;
	export let chat;

	let disabled = true;

	const message = { text: '', sent: 0, age: 5000 };

	async function updateMessage() {
		console.log(message);
		if ($reply || Date.now() - message.sent > message.age || chat.sender !== $profile.id) {
			message.id = null;
			message.text = input.innerText;
		} else {
			message.text += '\n' + input.innerText;
		}
		message.sent = Date.now();
	}
	async function sendMessage() {
		if (input && input.innerText !== '') {
			$read = false;

			$bottom = true;
			disabled = true;

			updateMessage();
			if (message.id) {
				await pb.collection('user_messages').update(message.id, {
					text: message.text
				});
				await pb.collection('user_chats').update(chat.id, {
					sender: $profile.id,
					text: message.text
				});
			} else {
				console.log('reply', $reply?.id);
				const res = await pb.collection('user_messages').create({
					text: input.innerText,
					author: $profile.id,
					chat: chat.id,
					reply: $reply?.id
				});
				message.id = res.id;

				await pb.collection('user_chats').update(chat.id, {
					sender: $profile.id,
					text: input.innerText,
					sent: res.updated,
					'unread+': 1
				});
			}
			$reply = null;
			input.innerText = '';
		}
	}

	let scrollHeight = 0;
	function handleResize() {
		if (input && input.innerText !== '') {
			$scroll = input.scrollHeight - scrollHeight;
			scrollHeight = input.scrollHeight;
		}
	}

	function handlePaste(event) {
		const text = event.clipboardData.getData('text/plain');
		let selection = window.getSelection();
		let range = selection.getRangeAt(0);
		range.deleteContents();
		let node = document.createTextNode(text);
		range.insertNode(node);
		selection.collapseToEnd();
	}

	onMount(() => {
		scrollHeight = input.scrollHeight;
		const observer = new ResizeObserver(handleResize);
		observer.observe(input);
	});
</script>

{#if $reply}
	<aside>
		<Reply reply={$reply} />
		<button class="link" on:click={() => ($reply = null)}>
			<img class="icon" src="/actions/cross.svg" alt="close" />
		</button>
	</aside>
{/if}
<form on:submit|preventDefault={sendMessage}>
	<div
		role="textbox"
		tabindex="0"
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				if (e.ctrlKey || e.altKey || e.metaKey) {
					e.preventDefault();
					sendMessage();
					return true;
				}
			}
		}}
		on:keyup={() => {
			disabled = input.innerText === '';
		}}
		on:paste|preventDefault={handlePaste}
		contenteditable="true"
		data-placeholder="Enter your text"
		bind:this={input}
	/>
	<button {disabled} class="icon" type="submit">
		<!-- <img src="/chats/send.svg" alt="send" class="icon" /> -->
		<img src="/owners/tg.svg" alt="send" class="icon" />
	</button>
</form>

<style>
	aside {
		border-top: 1px solid var(--color-1);
		display: flex;
		justify-content: space-between;
	}
	form {
		position: sticky;
		bottom: 0;

		display: flex;
		flex-direction: row;

		border-top: 1px solid var(--color-1);
		background: var(--color-0);

		width: 100%;

		padding: 0;
		margin: 0;
	}
	div {
		width: 100%;
		outline: none;
		padding: 10px;
	}
</style>
