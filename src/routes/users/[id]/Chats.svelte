<script>
	import { menu } from '$lib/stores/menu';
</script>

<button class="link" on:click={() => ($menu = 'chats')}>Пообщаться?</button>

<style>
	button {
		font-size: var(--font-0);
	}
</style>
