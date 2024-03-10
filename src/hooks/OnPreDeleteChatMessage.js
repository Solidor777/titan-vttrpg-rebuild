export default function onPreDeleteChatMessage(message) {
   // Check if this chat message was sent by the titan system and has a svelte component
   if (message?.flags.titan && message._svelteComponent?.$destroy === 'function') {
      // If so, delete the svelte component
      message._svelteComponent.$destroy();
   }

   return;
}