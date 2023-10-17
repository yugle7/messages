<script>
	import { page } from '$app/stores';
	import { profile, getUser } from '$lib';

	import User from './User.svelte';
	import Me from './Me.svelte';
	import Header from './Header.svelte';

	let user;
	$: me = $profile?.id === $page.params.id;

	async function loadUser() {
		if (me) {
			user = $profile;
		} else {
			user = await getUser($page.params.id);
		}
	}

	$: if (user?.id !== $page.params.id) {
		loadUser();
	}
</script>

{#if user}
	<Header {user} />
	{#if me}
		<Me />
	{:else}
		<User {user} />
	{/if}
{/if}
