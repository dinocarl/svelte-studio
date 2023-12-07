<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let name = '';
  export let val = '';
  export let path = [];
  export let objPathStr = '';
  export let values = [];

  const inputChange = () => {
    dispatch('inputChange', {path, val, msg: `mod: ${objPathStr}`});
  }
</script>

<label for={name}>{name}</label>
<span class="input-container">
  {#each values as loneVal}
    <input
      {name}
      type="radio"
      value={loneVal}
      bind:group={val}
      on:change={inputChange} />
    <span>{loneVal}</span>
  {/each}
</span>

 <style>
  label {
    grid-column: 1;
    text-align: right;
    font-size: .75rem;
    font-family: Monaco, "Lucida Console", Courier, monospace;
  }
  .input-container {
    grid-column: 2;
    padding: .2em .5em;
    font-size: .9rem;
    display: grid;
    grid-template-columns: min-content min-content;
    column-gap: .5em;
  }
 </style>
