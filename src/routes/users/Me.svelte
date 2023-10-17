<script>
	import { profile } from '$lib';
</script>

<td>
	{$profile.position}
</td>
<td>
	<a style="color: var(--color-{$profile.color})" href="/users/{$profile.id}">
		{$profile.username}
	</a>
</td>
<td>
	{$profile.rating}
</td>

<style>
	td {
		text-align: left;
	}
	td:last-child {
		text-align: right;
	}
	td:first-child {
		text-align: right;
		width: 40px;
	}
</style>
