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

   // Getter for the token
   get token() {
      return this.options?.token || this.actor.token || null;
   }

   _getHeaderButtons() {
      const buttons = super._getHeaderButtons();

      console.log(this);
      // If the active user can edit this actor's tokens...
      const canEditToken = game.user.isGM || (this.actor.isOwner && game.user.can('TOKEN_CONFIGURE'));
      if (canEditToken) {
         const token = this.token;
         console.log(token);

         // Configure token button
         buttons.unshift({
            label: token ? localize('token') : localize('prototypeToken'),
            class: 'configure-token',
            icon: 'fas fa-user-circle',
            onclick: (event) => this._onConfigureToken(event),
         });

         // Toggle token link for actors still in the directory
         if (token === null) {
            buttons.unshift({
               label: "",
               class: "token-link",
               icon: this.actor.prototypeToken?.actorLink ? "fas fa-link" : "fas fa-unlink",
               onclick: (event) => this._toggleTokenLink(event)
            });
         }

         // For actors not in the directory (on the canvas)
         else {
            // Unlink button for linked tokens
            if (token.actorLink === true) {
               buttons.unshift({
                  label: "",
                  class: "token-link-highlight",
                  icon: "fas fa-link",
                  onclick: (event) => this._unlinkToken(event)
               });
            }

            // Warning icon for unlinked tokens
            else {
               buttons.unshift({
                  label: "",
                  class: "token-link-warning",
                  icon: "fas fa-unlink",
                  onclick: () => { }
               });
            }
         }
      }

      // Import button for actors that can be imported
      if (game.user.isGM && this.actor.pack) {
         buttons.unshift({
            class: 'import',
            icon: 'fas fa-download',
            label: localize('import'),
            onclick: (event) => this._onImport(event)
         });
      }
      return buttons;
   }

   // Configure token function
   async _onConfigureToken(event) {
      if (event) {
         event.preventDefault();
      }

      // If this actor is unlinked, use the token sheet.
      if (this.token) {
         return this.token.sheet.render(true, this._getDialogOffset());
      }

      // If this actor is linked, used the prototype token sheet.
      return new CONFIG.Token.prototypeSheetClass(this.actor.prototypeToken).render(true, this._getDialogOffset());
   }

   // Toggle token link
   async _toggleTokenLink(event) {
      if (event) {
         event.preventDefault();
      }

      const isLinked = this.actor.prototypeToken.actorLink;
      const button = $(event.currentTarget);

      // If linked, replace the linked icon with the unlinked icon
      if (isLinked) {
         button.html(button.html().replace('fa-link', 'fa-unlink'));
      }

      // If not linked, replaced the unlinked icon with the linked icon
      else {
         button.html(button.html().replace('fa-unlink', 'fa-link'));
      }

      // Update the actor
      return this.actor.update({ 'token.actorLink': !(isLinked) });
   }

   // Unlinking the token
   async _unlinkToken(event) {
      if (event) {
         event.preventDefault();
      }

      const button = $(event.target);

      // Unlink the actor
      await this.actor.token.update({ actorLink: false });

      // Update the text of the button 
      button.html(button.html().replace('Linked', 'Unlinked'));

      // Close thise actor sheet and open the new actor sheet
      const newToken = this.actor.token;
      await this.actor.close();
      return await newToken.actor.sheet.render(true);
   }

   // Import function
   _onImport(event) {
      if (event) {
         event.preventDefault();
      }
      return this.actor.collection.importFromCompendium(this.actor.compendium, this.actor.id);
   }

}