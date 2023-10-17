<script>
	import { profile } from '$lib';
	import { params } from '$lib/stores/users';
	import { filter } from '$lib/stores/menu';
	import { user_categories } from '$lib/utils/user';

	import Close from '$lib/blocks/Menu/Close.svelte';

	let { sort, category } = $params;

	const sorts = Object.entries({
		'По рейтингу': 'position',
		'Самые новые': '-created',
		'Самые старые': 'created'
	});
</script>

<Close action={() => ($filter = false)} />

<div class="main menu">
	{#each user_categories as c (c)}
		{#if $profile?.friends?.length || c !== 'Друзья'}
			<label>
				<input type="radio" name="roles" value={c} bind:group={category} />
				{c}
			</label>
		{/if}
	{/each}
	<br />
	{#each sorts as [label, s] (s)}
		<label>
			<input type="radio" name="sort" value={s} bind:group={sort} />
			{label}
		</label>
	{/each}
	<br />
	<button
		on:click|preventDefault={() => {
			$params = { sort, category };
			$filter = false;
		}}
	>
		Показать
	</button>
</div>

<style>
	label {
		display: flex;
		flex-direction: row;
		line-height: 40px;
	}
	input {
		width: 20px;
		padding: 10px;
		margin: 10px;
	}
	input:checked {
		accent-color: var(--color-4);
	}
	button {
		width: fit-content;
		align-self: flex-end;
	}
</style>
