<script>
  import RedThing from './RedThing.svelte';
  import GreenThing from './GreenThing.svelte';
  import BlueThing from './BlueThing.svelte';
  import CompX from './ComponentX.svelte';
  import Text from './Text.svelte';
  import Radio from './Radio.svelte';
  import Select from './Select.svelte';
  import { assocPath } from './utils.js';
  import { studioData, studioState } from './stores.js';

  const componentList = {
    BlueThing,
    CompX,
    GreenThing,
    RedThing,
  };

  const studioComponents = {
    Radio,
    Select,
    Text,
  };

  const storeUpdate = (evt) => {
    studioData.update(
      (curr) => assocPath(evt.detail.path, evt.detail.val, curr)
    )
  }

  let selected = null;

  const selectComponent = (comp) => () => {
    selected = comp
  }

</script>

<section class="layout">
  <fieldset class="select-space">
    <legend>Select a component</legend>
    {#each Object.keys(componentList) as option}
      <button class:selected={option === selected} on:click={selectComponent(option)}>{option}</button>
    {/each}
  </fieldset>
  <div class="output {selected ? 'viewing' : 'empty'}">
    {#if selected}
      <h3 class="output-heading">{selected}</h3>
      <div class="render-space">
        <svelte:component this={componentList[selected]} {...$studioState[selected] || {}} />
      </div>
    {/if}
  </div>
  {#if selected}
    <div class="edit-space">
      <div class="edit-space-form">
        {#each $studioData?.[selected]?.inputs || [] as {type, ...rest}, idx}
          <svelte:component this={studioComponents[type]} 
            {...rest}
            path={[selected, 'inputs', idx, 'val']}
            on:inputChange={storeUpdate} />
        {/each}
      </div>
    </div>
  {/if}
</section>

<style>
  .layout {
    min-height: 100%;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-rows: 50% 50%;
    font-size: 1rem;
    color: black;
  }
  .select-space {
    grid-column: 1 ;
    grid-row: 1 / 3;
    background-color: #ddd;
    border: 0;
    border-right: 1px solid #999;
    margin: 0;
    padding: 0;
  }
  .select-space > legend {
    font-size: .85rem;
    font-weight: 600;
    width: 100%;
    padding: .25em .33em 1em;
    float: left;
  }
  .select-space > button {
    display: block;
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    padding: .75em;
    border-bottom: 1px solid #999;
    text-align: left;
    color: black;
  }
  .select-space > button:first-of-type {
    border-top: 1px solid #999
  }
  .select-space > button.selected {
    background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 95%, rgba(153,153,153,1) 95%, rgba(153,153,153,1) 100%);
  }
  .output {
    background-color: #f7f7f7;
  }
  .output.viewing {
    grid-column: 2 / 5 ;
    grid-row: 1 / 2;
    display: flex;
    flex-flow: column nowrap;
  }
  .output.empty {
    grid-column: 2 / 5 ;
    grid-row: 1 / 3;
    display: flex;
    flex-flow: column nowrap;
  }
  .output h3 {
    text-align: center;
    font-weight: normal;
    font-size: 1rem;
    padding: .25em .25em 0;
    margin: 0;
    flex: none;
  }
  .render-space {
    margin: .5em;
    flex: 1 1 auto;
    border: 1px solid silver;
    border-radius: 5px;
  }
  .edit-space {
    grid-column: 2 / 5 ;
    grid-row: 2 / 3;
    background-color: #f7f7f7;
    padding: .25em;
  }
  .edit-space-form {
    display: grid;
    grid-template-columns: 22% 75%;
    row-gap: .5em;
    column-gap: 2%;
  }
</style>
