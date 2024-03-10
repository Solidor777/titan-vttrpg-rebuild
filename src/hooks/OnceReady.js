import onHotbarDrop from '~/hooks/OnHotbarDrop';

export default function onceReady() {
   // Register sub-hooks
   Hooks.on('hotbarDrop', onHotbarDrop);

   return;
}