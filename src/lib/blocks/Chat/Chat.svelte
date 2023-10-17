<script>
	import { profile } from '$lib';
	import { menu } from '$lib/stores/menu';
	export let chat;
</script>

<a href="/users/{chat.user}/chat" on:click={() => ($menu = null)}>
	<div>
		<h3>{chat.title}</h3>
		<span>{chat.sent.substring(11, 16)}</span>
	</div>
	{#if !chat.text}
		<span>Начать переписку?</span>
	{:else if chat.sender === $profile.id}
		<span>Я: </span>{chat.text}
	{:else if chat.unread === 0}
		{chat.text}
	{:else}
		<div>
			{chat.text}
			<i class="number">{chat.unread}</i>
		</div>
	{/if}
</a>

<style>
	a {
		color: var(--color-7);
	}
	span {
		font-size: var(--font-1);
		opacity: 70%;
		align-self: center;
	}
	i {
		font-size: var(--font-0);
		font-style: normal;

		background-color: var(--color-4);
		color: var(--color-0);

		border-radius: 12px;
		padding: 0 6px;
		height: fit-content;
	}

	div {
		display: flex;
		justify-content: space-between;
	}
</style>
