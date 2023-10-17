<script>
	export let user;
</script>

<td>
	{user.position}
</td>
<td>
	<a href="/users/{user.id}">{user.username}</a>
</td>
<td>
	{user.rating}
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
