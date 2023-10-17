<script>
	import { profile } from '$lib';
	import { menu, auth } from '$lib/stores/menu';
	import { theme } from '$lib/stores/theme';

	import Close from '$lib/blocks/Menu/Close.svelte';

	function changeTheme() {
		$theme = $theme === 'dark' ? 'light' : 'dark';
		localStorage.setItem('theme', $theme);
		document.documentElement.dataset.theme = $theme;
	}
</script>

<Close action={() => ($menu = null)} />

<div class="main menu">
	<a href="/users" on:click={() => ($menu = null)}>Пользователи</a>
	{#if $profile}
		<a href="/users/{$profile.id}" on:click={() => ($menu = false)}>Профиль</a>
	{:else}
		<button class="link" on:click={() => ($auth = 1)}>Вход</button>
	{/if}
	<button class="link" on:click|preventDefault={changeTheme}>
		{$theme === 'light' ? 'Тьма' : 'Свет'}
	</button>
</div>

<style>
	div {
		gap: 20px;
	}
	a {
		text-align: center;
	}
</style>
