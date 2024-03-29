<svelte:options accessors={true} />

<script>
   import clamp from '~/helpers/utility-functions/Clamp.js';
   import localize from '~/helpers/utility-functions/Localize.js';
   import AttributeSelect from '~/helpers/svelte-components/select/AttributeSelect.svelte';
   import SkillSelect from '~/helpers/svelte-components/select/SkillSelect.svelte';
   import CheckDifficultySelect from '~/helpers/svelte-components/select/CheckDifficultySelect.svelte';
   import IntegerInput from '~/helpers/svelte-components/input/IntegerInput.svelte';
   import Button from '~/helpers/svelte-components/button/Button.svelte';
   import CheckboxInput from '~/helpers/svelte-components/input/CheckboxInput.svelte';
   import getApplication from '~/helpers/utility-functions/GetApplication';

   // The actor document making this check
   export let actor = void 0;

   // Initial check options
   export let options = void 0;

   // Initialize check parameters
   const checkParameters = {
      attribute: options.attribute ?? 'body',
      complexity: options.complexity ? Math.max(options.complexity, 0) : 0,
      diceMod: options.diceMod ?? 0,
      difficulty: options.difficulty ? clamp(options.difficulty, 2, 6) : 4,
      doubleExpertise: options.doubleExpertise ?? false,
      doubleTraining: options.doubleTraining ?? false,
      expertiseMod: options.expertiseMod ?? 0,
      skill: options.skill ?? 'none',
      trainingMod: options.trainingMod ?? 0,
   };

   const application = getApplication();

   async function onRoll() {
      actor.typeComponent.rollAttributeCheck(checkParameters, true);
      application.close();
      return;
   }

   async function onCancel() {
      application.close();
      return;
   }

   // Calculates the total dice
   function getTotalDice(checkParameters, actor) {
      // Get the attribute dice
      let retVal =
         actor.system.attribute[checkParameters.attribute].value +
         checkParameters.diceMod;

      // If there is a skill set
      if (checkParameters.skill !== 'none') {
         // Get the training dice
         let trainingDice =
            actor.system.skill[checkParameters.skill].training.value;
         trainingDice += checkParameters.trainingMod;

         // Double training if appropriate
         if (checkParameters.doubleTraining === true) {
            trainingDice *= 2;
         }
         retVal += trainingDice;
      }

      return retVal;
   }

   // Calculates the total expertise
   function getTotalExpertise(checkParameters, actor) {
      let retVal = 0;

      // If there is a skill set
      if (checkParameters.skill !== 'none') {
         // Get the training expertise
         retVal += actor.system.skill[checkParameters.skill].expertise.value;
         retVal += checkParameters.expertiseMod;

         // Double training if appropriate
         if (checkParameters.doubleExpertise === true) {
            retVal *= 2;
         }
      }

      return retVal;
   }

   $: totalDice = getTotalDice(checkParameters, actor);
   $: totalExpertise = getTotalExpertise(checkParameters, actor);
</script>

<div class="check-dialog">
   <!--Attribute-->
   <div class="row">
      <div class="label">
         {localize('attribute')}
      </div>
      <div class="input">
         <AttributeSelect bind:value={checkParameters.attribute} />
      </div>
   </div>

   <!--Skill-->
   <div class="row">
      <div class="label">
         {localize('skill')}
      </div>
      <div class="input">
         <SkillSelect bind:value={checkParameters.skill} allowNone={true} />
      </div>
   </div>

   <!--Difficulty-->
   <div class="row">
      <div class="label">
         {localize('difficulty')}
      </div>
      <div class="input">
         <CheckDifficultySelect bind:value={checkParameters.difficulty} />
      </div>
   </div>

   <!--Complexity-->
   <div class="row">
      <div class="label">
         {localize('complexity')}
      </div>
      <div class="input">
         <IntegerInput bind:value={checkParameters.complexity} min={0} />
      </div>
   </div>

   <!--Dice Mod-->
   <div class="row">
      <div class="label">
         {localize('bonusPenaltyDice')}
      </div>
      <div class="input">
         <IntegerInput bind:value={checkParameters.diceMod} />
      </div>
   </div>

   <!--Training Mod-->
   <div class="row">
      <div class="label">
         {localize('trainingMod')}
      </div>
      <div class="input">
         <IntegerInput bind:value={checkParameters.trainingMod} />
      </div>
   </div>

   <!--Expertise Mod-->
   <div class="row">
      <div class="label">
         {localize('expertiseMod')}
      </div>
      <div class="input">
         <IntegerInput bind:value={checkParameters.expertiseMod} />
      </div>
   </div>

   <!--Double Training-->
   <div class="row">
      <div class="label">
         {localize('doubleTraining')}
      </div>
      <div class="input">
         <CheckboxInput bind:value={checkParameters.doubleTraining} />
      </div>
   </div>

   <!--Double Expertise-->
   <div class="row">
      <div class="label">
         {localize('doubleExpertise')}
      </div>
      <div class="input">
         <CheckboxInput bind:value={checkParameters.doubleExpertise} />
      </div>
   </div>

   <!--Summary-->
   <div class="row">
      <!--Total Dice-->
      <div class="summary">
         {localize('totalDice') + ': '}
         {totalDice}
      </div>

      <!--Total Expertise-->
      <div class="summary">
         {localize('totalExpertise') + ': '}
         {totalExpertise}
      </div>
   </div>

   <!--Buttons-->
   <div class="row">
      <div class="button">
         <Button on:click={onRoll}>{localize('roll')}</Button>
      </div>

      <div class="button">
         <Button on:click={onCancel}>{localize('cancel')}</Button>
      </div>
   </div>
</div>

<style lang="scss">
   .check-dialog {
      @include flex-column;
      justify-items: flex-end;
      @include font-size-normal;

      .row {
         @include flex-row;
         @include flex-group-center;
         height: 100%;
         width: 100%;

         &:not(:first-child) {
            border-top: solid;
            padding-top: var(--padding-standard);
            margin-top: var(--padding-standard);
            border-width: var(--border-width);
         }

         .label {
            @include flex-group-right;
            font-weight: bold;
            height: 100%;
            width: 100%;
            margin-right: var(--padding-large);
         }

         .input {
            @include flex-group-center;
            margin-left: var(--padding-large);
            height: 100%;
            width: 100%;
            --input-height: 1.8rem;
            --input-width: 100%;
         }

         .summary {
            @include flex-group-center;
            margin-top: var(--padding-large);
            font-weight: bold;
            @include font-size-normal;
            height: 100%;
            width: 100%;
            margin-right: var(--padding-large);
         }

         .button {
            @include flex-row;
            width: 100%;
            margin-top: var(--padding-large);

            &:not(:first-child) {
               margin-left: var(--padding-standard);
            }
         }
      }
   }
</style>
