<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let name = '';
  export let val = '';
  export let path = [];
  export let values = [];

  const inputChange = () => {
    dispatch('inputChange', {path, val, msg: `mod: ${path[1]}.${name}`, type: 'valChange'});
  }
</script>

<label for={name}>{name}</label>
<select bind:value={val} {name} on:change={inputChange}>
  {#each values as option}
    <option value={option}>{option}</option>
  {/each}
</select>

 <style>
  label {
    grid-column: 1;
    text-align: right;
    font-size: .75rem;
    font-family: Monaco, "Lucida Console", Courier, monospace;
  }
  select {
    grid-column: 2;
    padding: .2em .5em;
    font-size: .9rem;
  }
 </style>
