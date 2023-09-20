<script>
  import Text from './Text.svelte';
  import Radio from './Radio.svelte';
  import Select from './Select.svelte';

  export let inputs = [];
  export let parent = [];
  export let depth = 0;

  const studioComponents = {
    Radio,
    Select,
    Text,
  };

</script>

{#each inputs as {type, inputs: nestedInputs, ...rest}, idx}
  {#if nestedInputs && nestedInputs.length > 0}
    <fieldset class="nested" class:branches={idx + 1 === inputs.length && depth > 0}>
      <legend>{rest.name}</legend>
      <svelte:self
        inputs={nestedInputs}
        parent={parent.concat('inputs', idx)}
        depth={depth + 1}
        on:inputChange />
    </fieldset>
  {:else}
    <svelte:component this={studioComponents[type]} 
      {...rest}
      {depth}
      coverLine={idx + 1 === inputs.length && depth > 0}
      path={parent.concat('inputs', idx, 'val')}
      on:inputChange />
  {/if}
{/each}

<style>
  fieldset {
    grid-column: 1 / span 2;
    justify-self: end;
    font-family: Monaco, "Lucida Console", Courier, monospace;
    position: relative;
    display: grid;
    width: 98%;
    grid-template-columns: 22% 76%;
    row-gap: .5em;
    column-gap: 2%;
    margin: 1em 0 0 .5em;
    padding: 0;
    border-width: 0 0 0 1px;
    border-color: #282a54;
    border-style: dotted;
  }
  .branches::after {
    content: '';
    display: block;
    position: absolute;
    border-left: 1px dotted #282a54;
    border-bottom: 1px dotted #282a54;
    min-height: 5px;
    width: .5em;
    border-bottom-left-radius: 5px;
    left: -2.3%;
    top: -.75em;
  }
  .branches::before {
    content: '';
    display: block;
    position: absolute;
    border-left: 3px solid #f7f7f7;
    left: -2.4%;
    top: -.75em;
    bottom: 0;
  }
  legend {
    position: absolute;
    margin: 0;
    padding: 0;
    left: -.9em;
    top: -1.5em;
    font-size: .75rem;
  }
</style>
