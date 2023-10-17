<script>
	import User from './User.svelte';
	import Me from './Me.svelte';

	import { onMount } from 'svelte';
	import { pb, profile } from '$lib';
	import { sort } from '$lib/utils/sort';
	import { params, getFiltered } from '$lib/stores/users';

	let users = [];
	let friends = [];
	
	let u = [];
	let c = $params.category;
	let s = $params.sort;

	onMount(async () => {
		users = await pb.collection('users').getFullList({ sort: s, filter: 'position!=0' });
		if ($profile && $profile.friends) {
			friends = users.filter((user) => $profile.friends.includes(user.id));
		}
		u = getFiltered(users, friends, c);
	});

	$: if ($params.sort !== s) {
			s = $params.sort;
			sort(users, s);
			sort(friends, s)

			sort(u, s);
			u = u;
	}
	$: if ($params.category !== c) {
		c = $params.category;
		u = getFiltered(users, friends, c);
	}
</script>

<table>
	{#each u as user (user.id)}
		<tr>
			{#if user.id === $profile?.id}
				<Me />
			{:else}
				<User {user} />
			{/if}
		</tr>
	{/each}
</table>

<style>
	table {
		width: 100%;
		border-collapse: separate;
		border-spacing: 20px 20px;
	}
</style>
