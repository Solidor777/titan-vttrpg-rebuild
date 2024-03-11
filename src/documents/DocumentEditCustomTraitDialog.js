import { TJSDialog } from '@typhonjs-fvtt/runtime/svelte/application';
import getSetting from '~/utility-functions/GetSetting.js';
import DocumentEditCustomTraitDialogShell from '~/documents/DocumentEditCustomTraitDialogShell.svelte';
export default class DocumenEditCustomTraitDialog extends TJSDialog {
   constructor(document, traitIdx) {
      super(
         {
            title: `${document.name}`,
            content: {
               class: DocumentEditCustomTraitDialogShell,
               props: {
                  document: document,
                  traitIdx: traitIdx
               },
            },
            zIndex: null,
            id: `edit-custom-trait-dialog-${document._id}`,
         },
         {
            width: 300,
            height: 300,
            classes: getSetting('darkModeSheets') === true ? ['titan', 'titan-dark-mode'] : ['titan']
         },
      );
   }
}
