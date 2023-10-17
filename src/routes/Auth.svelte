<script>
	import { auth } from '$lib/stores/menu';

	import Login from '$lib/blocks/Auth/Login.svelte';
	import SignUp from '$lib/blocks/Auth/SignUp.svelte';
	import Reset from '$lib/blocks/Auth/Reset.svelte';
	import Names from '$lib/blocks/Auth/Names.svelte';
	import Contacts from '$lib/blocks/Auth/Contacts.svelte';
	import Close from '$lib/blocks/Menu/Close.svelte';
</script>

<Close action={() => ($auth = 0)} />

{#if $auth === 1}
	<Login />
{:else if $auth === 2}
	<SignUp />
{:else if $auth === 3}
	<Reset />
{:else if $auth === 4}
	<Names />
{:else if $auth === 5}
	<Contacts />
{/if}
