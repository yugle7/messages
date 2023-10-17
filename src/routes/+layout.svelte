<script>
	import '../styles.css';

	import { menu, auth } from '$lib/stores/menu';
	import { theme } from '$lib/stores/theme';

	import Auth from './Auth.svelte';
	import Routes from './Routes.svelte';
	import Chats from './Chats.svelte';

	import { onMount } from 'svelte';

	onMount(() => {
		$theme = localStorage.getItem('theme') || 'light';
		document.documentElement.dataset.theme = $theme;
	});
</script>

<main>
	{#if $auth}
		<Auth />
	{:else if $menu === 'routes'}
		<Routes />
	{:else if $menu === 'chats'}
		<Chats />
	{:else}
		<slot />
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
