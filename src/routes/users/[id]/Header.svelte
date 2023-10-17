<script>
	import { profile } from '$lib';

	import Header from '$lib/blocks/Menu/Header.svelte';
	import Back from '$lib/blocks/Menu/Back.svelte';
	import Logout from '$lib/blocks/Menu/Logout.svelte';
	import Login from '$lib/blocks/Menu/Login.svelte';
	import Me from '$lib/blocks/Menu/Me.svelte';

	export let user;
	$: me = $profile?.id === user.id;
</script>

<Header>
	<Back items="users" />
	<div class="title">{user.role}</div>
	{#if me}
		<Logout />
	{:else if $profile}
		<Me />
	{:else}
		<Login />
	{/if}
</Header>
