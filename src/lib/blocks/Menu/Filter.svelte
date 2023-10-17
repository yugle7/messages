<script>
	import { filter } from '$lib/stores/menu';
</script>

<button class="link" on:click={() => ($filter = true)}>
	<img class="icon" src="/actions/filter.svg" alt="filter" />
</button>
