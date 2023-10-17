<script>
	import { auth } from '$lib/stores/menu';
</script>

<button class="link" on:click={() => ($auth = 1)}>
	<img class="icon" src="/users/login.svg" alt="login" />
</button>
