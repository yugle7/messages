<script>
	import { filter } from '$lib/stores/menu';

	import Users from './Users.svelte';
	import Filter from './Filter.svelte';
	import Header from './Header.svelte';
</script>

{#if $filter}
	<Filter />
{:else}
	<Header />
	<Users />
{/if}
