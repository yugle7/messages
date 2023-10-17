<script>
	import { pb, profile } from '$lib';

	let emailVisibility = $profile.emailVisibility;

	async function triggerEmailVisibility() {
		await pb.collection('users').update($profile.id, { emailVisibility: !emailVisibility });
		emailVisibility = !emailVisibility;
	}
</script>

<button class="link" on:click={triggerEmailVisibility}>
	{emailVisibility ? 'Скрыть почту для всех?' : 'Сделать почту видимой всем?'}
</button>

<style>
	button {
		font-size: var(--font-0);
	}
</style>