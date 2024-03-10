import onHotbarDrop from '~/hooks/OnHotbarDrop';

export default function onceReady() {
   Hooks.on('hotbarDrop', onHotbarDrop);

   return;
}