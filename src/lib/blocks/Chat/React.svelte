<script>
	export let react;
</script>

{#if react === 1}
	<button class="link">
		<img src="/statuses/like.svg" alt="like" class="icon" />
	</button>
{:else if react === 2}
	<button class="link">
		<img src="/statuses/dislike.svg" alt="dislike" class="icon" />
	</button>
{/if}

<style>
	img {
		padding: 0;
	}
</style>
