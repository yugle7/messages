<script>
	import { pb, profile } from '$lib';
	export let user;

	let friend = $profile.friends?.includes(user.id);

	async function triggerFriend() {
		const data = friend ? { 'friends-': user.id } : { 'friends+': user.id };
		await pb.collection('users').update($profile.id, data);
		friend = !friend;
	}
</script>

<button class="link" on:click={triggerFriend}>
	{friend ? 'Убрать из друзей?' : 'Добавить в друзья?'}
</button>

<style>
	button {
		font-size: var(--font-0);
	}
</style>
