
import { writable } from "svelte/store";

export const menu = writable(null);
export const auth = writable(0); // 1 - login, 2 - register, 4 - reset, 6 - change
export const filter = writable(false);
