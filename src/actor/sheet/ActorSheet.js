import TitanDocumentSheet from '~/documents/DocumentSheet';
import localize from '~/utility-functions/Localize.js';

export default class TitanActorSheet extends TitanDocumentSheet {
   constructor(document, options = {}) {
      super(document, options);
      this.actor = this.document;
   }

   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/Application.html#options
    */
   static get defaultOptions() {
      return foundry.utils.mergeObject(super.defaultOptions, {
         baseApplication: 'ActorSheet',
      });
   }

   // Add the actor sheet class
   _getSheetClasses() {
      const retVal = super._getSheetClasses();
      retVal.push('titan-actor-sheet');

      return retVal;
   }

   _onConfigureToken(event) {
      if (event) {
         event.preventDefault();
      }

      // If this actor is unlinked, use the token confiurator.
      if (this.token) {
         return this.token.sheet.render(true, {
            left: Math.max(this.position.left - 450, 10),
            top: this.position.top,
         });
      }

      // If this actor is linked, used the prototype token configurator.
      return new CONFIG.Token.prototypeSheetClass(this.actor.prototypeToken, {
         left: Math.max(this.position.left - 450, 10),
         top: this.position.top,
      }).render(true);
   }

   get token() {
      return this.options?.token || this.actor.token || null;
   }

   _getHeaderButtons() {
      const buttons = super._getHeaderButtons();

      // Cache whether the user is a GM
      const isGM = game.user.isGM;

      // Token configure button
      if (isGM || (this.actor.isOwner && game.user.can('TOKEN_CONFIGURE'))) {
         buttons.unshift({
            label: this.actor.token ? localize('token') : localize('prototypeToken'),
            class: 'configure-token',
            icon: 'fas fa-user-circle',
            onclick: (ev) => this._onConfigureToken(ev),
         });

         if (isGM) {
            // If no token
            if (!this.actor.token) {
               buttons.unshift({
                  label: "",
                  class: "token-link",
                  icon: this.actor.prototypeToken?.actorLink ? "fas fa-link" : "fas fa-unlink",
                  onclick: (html) => tokenLinkToggle(html, this.actor)
               });
            }

            // If token
            else {
               // If actor linked
               if (this.actor.token.actorLink === true) {
                  buttons.unshift({
                     label: "",
                     class: "token-link-highlight",
                     icon: "fas fa-link",
                     onclick: (html) => tokenUnlinkToken(html, this.actor)
                  });
               }

               // If actor not linked
               else if (this.actor.token.actorLink === false) {
                  buttons.unshift({
                     label: "",
                     class: "token-link-warning",
                     icon: "fas fa-unlink",
                     onclick: () => { }
                  });
               }
            }
         }

         if (this.actor.pack) {
            buttons.unshift({
               class: 'import',
               icon: 'fas fa-download',
               label: localize('import'),
               onclick: (event) => this._onImport(event)
            });
         }
      }

      return buttons;
   }

   _onImport(event) {
      if (event) {
         event.preventDefault();
      }
      return this.actor.collection
         .importFromCompendium(this.actor.compendium, this.actor.id);
   }

}

function tokenLinkToggle(html, actor) {
   const shouldBeLinked = actor.prototypeToken.actorLink;
   const button = $(html.currentTarget);
   if (shouldBeLinked) {
      button.html(button.html().replace('fa-link', 'fa-unlink'));
   }
   else {
      button.html(button.html().replace('fa-unlink', 'fa-link'));
   }
   actor.update({ 'token.actorLink': !(shouldBeLinked) });
}

async function tokenUnlinkToken(html, actor) {
   const button = $(html.target);
   actor.token.update({ actorLink: false });
   button.html(button.html().replace('Linked', 'Unlinked'));
   const newToken = actor.token;
   await actor.close();
   newToken.actor.sheet.render(true);
}