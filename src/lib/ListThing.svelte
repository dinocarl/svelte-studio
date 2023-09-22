<script>
  export let items = []
</script>

<ul>
  {#each items as item}
    <li>{item.itemName}</li>
  {/each}
</ul>
