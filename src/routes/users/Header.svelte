<script>
	import Header from '$lib/blocks/Menu/Header.svelte';
	import Menu from '$lib/blocks/Menu/Menu.svelte';
	import Filter from '$lib/blocks/Menu/Filter.svelte';

	import { params } from '$lib/stores/users';

</script>

<Header>
	<Menu />
	<div class="title">{$params.category}</div>
	<Filter />
</Header>
