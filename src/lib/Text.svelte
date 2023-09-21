<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let name = '';
  export let val = '';
  export let path = [];

  const inputChange = () => {
    dispatch('inputChange', {path, val});
  }
</script>

<label for={name}>{name}</label>
<input
  {name}
  type="text"
  bind:value={val}
  on:keyup={inputChange} />

 <style>
  label {
    text-align: right;
    font-size: .75rem;
    font-family: Monaco, "Lucida Console", Courier, monospace;
    position: relative;
  }
  input {
    border-radius: 5px;
    border: 1px solid #999;
    padding: .2em .5em;
    font-size: .9rem;
  }
 </style>
