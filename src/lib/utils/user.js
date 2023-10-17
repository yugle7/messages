function color(position) {
    if (position === 0) {
        return '7';
    }
    if (position <= 10) {
        return 'green';
    }
    if (position <= 100) {
        return 'blue';
    }
    if (position <= 1000) {
        return 'red';
    }
    return '5';
}

export const user_roles = [
    'Новичок',
    'Забанен',
    'Пользователь',
    'Спонсор',
    'Модератор',
    'Админ',
    'Создатель'
];

export const user_categories = [
    'Все',
    'Друзья',
    'Пользователи',
    'Модераторы',
    'Aдмины'
];

export const providers = [
    'email/password',
    'google',
    'yandex'
];

export function expand(user) {
    if (user) {
        user.color = color(user.position);
        user.role = user_roles[user.role];
        user.provider = providers[user.provider];
    }
    return user;
}
