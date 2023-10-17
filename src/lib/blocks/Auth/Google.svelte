<script>
	import { authWithProvider } from '$lib';
	import { auth } from '$lib/stores/menu';
	import { goto } from '$app/navigation';

	let authError;
</script>

<button
	on:click|preventDefault={async () => {
		try {
			const res = await authWithProvider(1);
			if (res) {
				if (res.meta.isNew) {
					console.log(res.record.id);
					goto('/users/' + res.record.id);
				}
			} else {
				authError = 'не удалось авторизоваться';
			}
		} catch (err) {
			authError = 'не удалось авторизоваться';
		}
		$auth = 0;
	}}
>
	Google
</button>
{#if authError}
	<span class="failed">{authError}</span>
{/if}
