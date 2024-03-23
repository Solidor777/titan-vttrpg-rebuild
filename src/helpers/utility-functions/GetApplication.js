import { getContext } from 'svelte';

export default function getApplication() {
   return getContext('#external').application;
}