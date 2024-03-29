import { TJSDialog } from '@typhonjs-fvtt/runtime/svelte/application';
import localize from '~/helpers/utility-functions/Localize.js';
import getSetting from '~/helpers/utility-functions/GetSetting.js';
import AttributeCheckDialogShell from '~/check/types/attribute-check/AttributeCheckDialogShell.svelte';
export default class AttributeCheckDialog extends TJSDialog {
   constructor(actor, options) {
      super(
         {
            title: `${localize('attributeCheck')} (${actor.name})`,
            content: {
               class: AttributeCheckDialogShell,
               props: {
                  actor: actor,
                  options: options,
               },
            },
            zIndex: null,
            id: `attribute-check-dialog-${actor._id}`,
         },
         {
            width: 350,
            height: 490,
            classes: getSetting('darkModeSheets') === true ? ['titan', 'titan-dark-mode'] : ['titan']
         },
      );
   }
}
