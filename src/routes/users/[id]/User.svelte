<script>
	import { getLink } from '$lib/utils/link';
	import Friend from './Friend.svelte';
	import { profile } from '$lib';
	import Chat from './Chat.svelte';

	export let user;
</script>

<div class="main menu">
	<h1 style="color: var(--color-{user.color})">{user.username}</h1>
	{#if user.fullname}
		<h2>{user.fullname}</h2>
	{/if}

	{#if user.position > 0}
		<span>{user.position} место &mdash; {user.rating}</span>
	{:else}
		Не в рейтинге
	{/if}

	{#if user.email}
		<span>{user.email}</span>
	{/if}
	{#if $profile}
		<Friend {user} />
		<Chat {user} />
	{/if}

	{#if user.contacts}
		{#each Object.entries(user.contacts) as [owner, login] (owner)}
			<a href="https://{getLink(owner, login)}" target="_blank">{getLink(owner, login)}</a>
		{/each}
	{/if}
</div>

<style>
	div {
		align-items: center;
	}
</style>
