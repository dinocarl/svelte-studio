<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let name = '';
  export let val = '';
  export let path = [];
  export let depth = 0;
  export let coverLine = false;

  const inputChange = () => {
    dispatch('inputChange', {path, val});
  }
</script>

<label
  for={name}
  class={depth > 0 ? `depth-${depth}` : ''}
  class:cover-line={coverLine}>
  <span>{name}</span>
</label>
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
  label > span {
    background-color: #f7f7f7;
    position: absolute;
    right: 0;
    z-index: 1;
    padding-left: 1.5em;
  }
  input {
    border-radius: 5px;
    border: 1px solid #999;
    padding: .2em .5em;
    font-size: .9rem;
  }
 </style>
