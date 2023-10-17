<script>
	import { auth } from '$lib/stores/menu';
	import { profile } from '$lib';
	import { getLink } from '$lib/utils/link';
	import Email from './Email.svelte';
	import Chats from './Chats.svelte';
</script>

<div class="main menu">
	<button class="link" on:click={() => ($auth = 4)}>
		<h1 style="color: var(--color-{$profile.color});">
			{$profile.username}
		</h1>
	</button>

	{#if $profile.fullname}
		<button class="link" on:click={() => ($auth = 4)}>
			<h2>{$profile.fullname}</h2>
		</button>
	{/if}

	{#if $profile.position > 0}
		<span>{$profile.position} место &mdash; {$profile.rating}</span>
	{:else}
		Не в рейтинге
	{/if}

	<button class="link" on:click={() => ($auth = 5)}>
		{$profile.email}
	</button>
	<Email />
	<Chats />
	<br />
	{#if $profile.contacts}
		{#each Object.entries($profile.contacts) as [owner, login] (owner)}
			<a href="https://{getLink(owner, login)}" target="_blank">{getLink(owner, login)}</a>
		{/each}
	{/if}
</div>

<style>
	div {
		display: flex;
		align-items: center;
	}
</style>
