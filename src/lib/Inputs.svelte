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
    <div class="nested-group">
      <div class="group-indicator depth-{depth}"></div>
      <span
        class="{depth > 0 ? `depth-${depth}` : ''} legend">
        {rest.name}
      </span>
      <svelte:self
        inputs={nestedInputs}
        parent={parent.concat('inputs', idx)}
        depth={depth + 1}
        on:inputChange />
    </div>
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
  .legend {
    grid-column: 1 / span 2;
    font-family: Monaco, "Lucida Console", Courier, monospace;
    font-size: .75em;
    background-color: lightblue;
    z-index: 1;
  }
  .depth-1.legend {margin-left: 1em;}
  .nested-group {
    grid-column: 1 / span 2;
    position: relative;
    display: grid;
    grid-template-columns: 23% 75%;
    column-gap: 2%;
    row-gap: .5em;
    padding-bottom: .5em;
  }
  .group-indicator {
    grid-column: 1 / span 2;
    position: absolute;
    border-width: 0 0 1px 1px;
    border-color: #282a54;
    border-style: dotted;
    border-bottom-left-radius: 5px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .depth-0 { left: .25em; }
  .depth-1 { left: 1em; }
</style>
