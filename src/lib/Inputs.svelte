<script>
  import { createEventDispatcher } from 'svelte';
  import Text from './Text.svelte';
  import Radio from './Radio.svelte';
  import Select from './Select.svelte';

  const dispatch = createEventDispatcher();

  export let inputs = [];
  export let parent = [];
  export let depth = 0;
  export let parentType = null;

  const studioComponents = {
    Radio,
    Select,
    Text,
  };

  const addItem = (parent) => () => {
    dispatch('addToInputs', { path: parent })
  };

  const removeItem = (parent, pos) => () => {
    dispatch('removeFromInputs', { path: parent, val: pos })
  };

</script>

{#each inputs as {type, inputs: nestedInputs, ...rest}, idx}
  {#if nestedInputs && nestedInputs.length > 0}
    <fieldset class="{depth > 0 ? `depth-${depth}` : ''}">
      <legend>
        <span>{rest.name}</span>
      </legend>
      {#if type === 'List'}
        <span class="full-width">
          <button on:click={addItem(parent.concat('inputs', idx, 'inputs'))}>+</button>
        </span>
      {/if}
      <svelte:self
        inputs={nestedInputs}
        parent={parent.concat('inputs', idx)}
        depth={depth + 1}
        parentType={type}
        on:addToInputs
        on:removeFromInputs
        on:inputChange />
    </fieldset>
  {:else}
    <svelte:component this={studioComponents[type]} 
      {...rest}
      path={parent.concat('inputs', idx, 'val')}
      on:addToInputs
      on:removeFromInputs
      on:inputChange />
    {#if parentType === 'List'}
      <button
        disabled={inputs.length === 1}
        on:click={removeItem(parent.concat('inputs'), idx)}>
        x
      </button>
    {/if}
  {/if}
{/each}

<style>
  .full-width {
    grid-column: 1 / span 3;
    justify-self: end;
  }
  fieldset {
    grid-column: 1 / span 3;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 5fr min-content;
    column-gap: 2%;
    row-gap: .5em;
    border: 0;
    margin: 0;
    padding: 1.25em 0 .25em 0;
  }
  legend {
    grid-column: 1 / span 3;
    font-family: Monaco, "Lucida Console", Courier, monospace;
    font-size: .75em;
    margin: 0;
    padding: 0;
    border-style: dotted;
    border-width: 0 0 1px 1px;
    border-color: #282a54;
    border-bottom-left-radius: 5px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
  }
  legend > span {
    background-color: #f7f7f7;
    position: relative;
    display: block;
    left: -1px;
    border-bottom: 1px dotted #282a54;
    padding-left: 3px;
    width: 50px;
  }
  .depth-1 > legend { margin-left: 1em; }
</style>
