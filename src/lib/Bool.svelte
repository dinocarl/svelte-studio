<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let name = '';
  export let val = false;
  export let path = [];

  const inputChange = (evt) => {
    dispatch('inputChange', {path, val: evt.target.checked});
  }
</script>

<label for={name}>{name}</label>
<input
  {name}
  type="checkbox"
  checked={val}
  on:change={inputChange} />

<style>
  label {
    grid-column: 1;
    text-align: right;
    font-size: .75rem;
    font-family: Monaco, "Lucida Console", Courier, monospace;
  }
  input {
    grid-column: 2;
  }
</style>
