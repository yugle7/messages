<script>
	import { pb } from '$lib';
	import { edit } from '$lib/stores/messages';

	import Reply from './Reply.svelte';
	import { onMount } from 'svelte';

	let input;
	export let message;

	let disabled = false;

	async function editMessage() {
		if (input && input.innerText !== '' && input.innerText !== message.text) {
			const res = await pb.collection('user_messages').update(message.id, {
				reply: message.reply?.id,
				text: input.innerText
			});
		}
		$edit = null;
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
		input.innerText = message.text;
	});
</script>

{#if message.reply}
	<aside>
		<Reply reply={message.reply} />
		<button class="link" on:click={() => delete message.reply}>
			<img class="icon" src="/actions/cross.svg" alt="close" />
		</button>
	</aside>
{/if}
<form on:submit|preventDefault={editMessage}>
	<div
		role="textbox"
		tabindex="0"
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				if (e.ctrlKey || e.altKey || e.metaKey) {
					e.preventDefault();
					editMessage();
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
	<button class="link" on:click={() => ($edit = false)}>
		<img src="/actions/cross.svg" alt="close" class="icon" />
	</button>
	<button {disabled} class="link" type="submit">
		<img src="/actions/check.svg" alt="edit" class="icon" />
	</button>
</form>

<style>
	aside {
		display: flex;
		justify-content: space-between;
	}
	form {
		display: flex;
		flex-direction: row;

		background: var(--color-0);
		width: 100%;

		padding: 0;
		margin: 0;
	}
	div {
		width: 100%;
		outline: none;
		padding: 0;
	}
</style>
