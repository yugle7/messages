import PocketBase from 'pocketbase'
import { expand, providers } from './utils/user';
import { writable } from "svelte/store";

export const pb = new PocketBase("http://127.0.0.1:8090");

export const profile = writable(expand(pb.authStore.model));

pb.authStore.onChange((auth) => {
    profile.set(expand(pb.authStore.model));
});

export function logout() {
    pb.authStore.clear();
}

export async function getUser(id) {
    const user = await pb.collection('users').getOne(id);
    return expand(user);
}

function getCode(s, i) {
    const n = s.charCodeAt(i);
    return n < 58 ? n - 48 : n - 87;
}
function getChar(n) {
    if (n >= 36) {
        n -= 36;
    }
    return String.fromCharCode(n < 10 ? n + 48 : n + 87);
}
export function addId(a, b) {
    let s = '';
    for (let i = 0; i < 15; i++) {
        s += getChar(getCode(a, i) + getCode(b, i));
    }
    return s;
}
export function subId(a, b) {
    let s = '';
    for (let i = 0; i < 15; i++) {
        s += getChar(getCode(a, i) + 36 - getCode(b, i));
    }
    return s;
}

async function getMessages(chat) {
    chat.messages = await pb.collection('user_messages').getFullList({
        sort: 'created',
        filter: `chat="${chat.id}"`
    });
    const l = chat.messages.length;
    for (let i = l - chat.unread; i < l; i++) {
        chat.messages[i].unread = true;
    }
    if (l > 0) {
        chat.messages[0].date = chat.messages[0].created.substring(0, 10);
    }
    for (let i = 1; i < l; i++) {
        if (chat.messages[i].created.substring(0, 10) != chat.messages[i - 1].created.substring(0, 10)) {
            chat.messages[i].date = chat.messages[i].created.substring(0, 10);
        }
    }
}

export async function getChat(a, b) {
    let chat = { id: addId(a.id, b.id) };
    try {
        chat = await pb.collection('user_chats').getOne(chat.id);
        await getMessages(chat);

    } catch (err) {
        chat = await pb.collection('user_chats').create({
            id: chat.id,
            users: [a.id, b.id],
            title: [a.username, b.username]
        });
        chat.messages = [];

        await pb.collection('users').update(a.id, {
            'chats+': chat.id
        })
        await pb.collection('users').update(b.id, {
            'chats+': chat.id
        })
    }
    const i = chat.users[0] === a.id ? 1 : 0;
	chat.title = chat.title[i];
	chat.user = chat.users[i];
    return chat;
}

async function getUsername() {
    const res = await pb.collection('username').getOne(0);
    return res.which + res.who;
}

async function updateUsername(user) {
    for (let i = 0; i < 8; i++) {
        try {
            await pb.collection('users').update(user.id, {
                username: await getUsername()
            });
            break;
        } catch (err) {
            console.log(err);
        }
    }
}

export async function authWithProvider(id) {
    const res = await pb.collection('users').authWithOAuth2({ provider: providers[id] });

    if (res.meta.isNew) {
        await pb.collection('users').update(res.record.id, {
            fullname: res.meta.name,
            provider: id
        });
        updateUsername(res.record);
    }
    return res;
}