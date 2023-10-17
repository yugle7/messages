<script>
	import { menu } from '$lib/stores/menu';
</script>

<button class="link" on:click={() => ($menu = 'menu')}>
	<img class="icon" src="/actions/menu.svg" alt="menu" />
</button>
