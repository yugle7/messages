<script>
	import { to } from '$lib/stores/messages';

	export let reply;
</script>

<button class="link" on:click={() => ($to = reply.id)}>
	{reply.author.username}
	<p>
		{reply.text}
	</p>
</button>

<style>
	button {
		display: flex;
		flex-direction: column;
		padding: 10px;
		opacity: 50%;
		border-radius: 0;
		border-left: 1px solid var(--color-3);
		text-align: left;
	}
	p {
		padding: 0;
		margin: 0;
	}
</style>
