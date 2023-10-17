import { writable } from "svelte/store";

export const params = writable({
    sort: 'position', // created
    category: 'Все'
});

export function getFiltered(users, friends, c) {
    if (c === 'Все') return users;
    if (c === 'Пользователи') {
        return users.filter(u => u.role === 2 || u.role === 3);
    }
    if (c === 'Модераторы') {
        return users.filter(u => u.role === 4 || u.role === 5);
    }
    if (c === 'Aдмины') {
        return users.filter(u => u.role === 5 || u.role === 6);
    }
    if (c === 'Друзья') {
        return friends;
    }
    return [];
}
