<script>
  import RedThing from './RedThing.svelte';
  import GreenThing from './GreenThing.svelte';
  import BlueThing from './BlueThing.svelte';
  import NestedThing from './NestedThing.svelte';
  import ListThing from './ListThing.svelte';
  import CompX from './ComponentX.svelte';
  import Inputs from './Inputs.svelte';
  import { assocPath, formatTime, inputsToState, path } from './utils.js';
  import { studioData, pastStates, pastStatesLen } from './stores.js';
  import { data } from '../studioData.js';
  import editIcon from '../assets/pen-square-svgrepo-com.svg';
  import historyIcon from '../assets/book-open-svgrepo-com.svg';

  const componentList = {
    BlueThing,
    CompX,
    GreenThing,
    ListThing,
    NestedThing,
    RedThing,
  };

  let leftCol = 'components';
  let selected = null;
  let selectedComponent = null;
  let selectedInputState = [];
  let selectedRenderState = {};

  const selectComponent = (comp) => () => {
    selected = comp;
    studioData.update(
      (curr) => assocPath(
        ['selected'],
        comp,
        curr,
      )
    );
    selectedComponent = comp;
    selectedInputState = $studioData?.components?.[selectedComponent]?.inputs || [];
    selectedRenderState = inputsToState(selectedInputState);
  };

  const reloadPastState = (idx) => () => {
    selected = idx;
    const selectedState = $pastStates[idx];
    selectedComponent = selectedState.selected;
    selectedInputState = selectedState?.components?.[selectedComponent]?.inputs || [];
    selectedRenderState = inputsToState(selectedInputState);
  };

  const storeUpdate = (evt) => {
    studioData.update(
      (curr) => assocPath(
        evt.detail.path,
        evt.detail.val,
        curr
      )
    );
    selectedInputState = $studioData?.components?.[selectedComponent]?.inputs || [];
    selectedRenderState = inputsToState(selectedInputState);
  };

  const addInput = (evt) => {
    studioData.update(
      (curr) => {
        const staticArr = path(evt.detail.path, data);
        const newItem = path(evt.detail.path.slice(0, -1).concat('sample'), data) || staticArr[staticArr.length - 1];

        return assocPath(
          evt.detail.path,
          [...path(evt.detail.path, curr), newItem],
          curr
        );
      }
    );
    selectedInputState = $studioData?.components?.[selectedComponent]?.inputs || [];
    selectedRenderState = inputsToState(selectedInputState);
  };

  const removeInput = (evt) => {
    studioData.update(
      (curr) => assocPath(
        evt.detail.path,
        [...path(evt.detail.path, curr).slice(0, evt.detail.val), ...path(evt.detail.path, curr).slice(evt.detail.val + 1)],
        curr
      )
    );
    selectedInputState = $studioData?.components?.[selectedComponent]?.inputs || [];
    selectedRenderState = inputsToState(selectedInputState);
  };

  const updateLeftCol = (selectedNav) =>  () => {
    leftCol = selectedNav;
    selected = selectedNav === 'history'
      ? $pastStatesLen
      : selectedComponent;
  }

</script>

<section class="layout">
  <div class="left-col">
    <h2>Component Studio</h2>
    <nav>
      <button on:click={updateLeftCol('components')} disabled={leftCol === 'components'}>
        <img src={editIcon} width="20" alt="Edit Icon" />
      </button>
      <button on:click={updateLeftCol('history')} disabled={leftCol === 'history'}>
        <img src={historyIcon} width="20" alt="History Icon" />
      </button>
    </nav>
    <fieldset class="select-space">
      {#if leftCol === 'components'}
        <legend>View a component</legend>
        {#each Object.keys(componentList) as option}
          <button class:selected={option === selectedComponent} on:click={selectComponent(option)}>{option}</button>
        {/each}
      {:else}
        <legend>View history</legend>
        {#each $pastStates as state, idx}
          <button class:selected={idx === selected} on:click={reloadPastState(idx)}>{formatTime(new Date(state.ts))}</button>
        {/each}
      {/if}
    </fieldset>
  </div>
  <div class="output {selectedComponent ? 'viewing' : 'empty'}">
    {#if selectedComponent}
      <h3 class="output-heading">{selectedComponent}</h3>
      <div class="render-space">
        <svelte:component this={componentList[selectedComponent]} {...selectedRenderState} />
      </div>
    {/if}
  </div>
  {#if selectedComponent}
    <div class="edit-space">
      <div class="edit-space-form">
        <Inputs
          inputs={selectedInputState}
          parent={['components', selected]}
          on:addToInputs={addInput}
          on:removeFromInputs={removeInput}
          on:inputChange={storeUpdate} />
      </div>
    </div>
  {/if}
</section>

<style>
  .layout {
    min-height: 100%;
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    grid-template-rows: 50% 50%;
    font-size: 1rem;
    color: black;
  }
  .left-col {
    grid-column: 1 ;
    grid-row: 1 / 3;
    background-color: #384c8a;
    color: #fff;
    display: flex;
    flex-flow: column nowrap;
    align-items: end;
    position: relative;
  }
  .left-col h2 { width: 100%; padding-left: 1rem; font-style: italic; }
  nav {
    width: 100%;
    text-align: center;
  }
  nav > button {
    background: rgba(0,0,0, .3);
    padding: .25em;
    border-radius: 6px;
    border: none;
    outline: none;
    color: white;
    width: 30%;
    text-align: center;
    cursor: pointer;
  }
  nav > button:disabled {
    background: rgba(255,255,255, .2);
    cursor: not-allowed;
  }
  .select-space {
    border: 0;
    margin: 0;
    padding: 0;
    width: 90%;
  }
  .select-space > legend {
    font-size: .95rem;
    font-weight: 600;
    width: 100%;
    padding: .25em 0;
    float: left;
  }
  .select-space > button {
    display: block;
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    padding: .75em 1em;
    text-align: left;
    color: #fff;
    border-radius: 4px 0 0 4px;
  }
  .select-space > button.selected {
    background-color: #282a54;
  }
  .output {
    background-color: #f7f7f7;
  }
  .output.viewing {
    grid-column: 2 / 6 ;
    grid-row: 1 / 2;
    display: flex;
    flex-flow: column nowrap;
  }
  .output.empty {
    grid-column: 2 / 6 ;
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
    grid-column: 2 / 6 ;
    grid-row: 2 / 3;
    background-color: #f7f7f7;
    padding: .5em;
    overflow-x: scroll;
  }
  .edit-space-form {
    display: grid;
    grid-template-columns: 1fr 3fr min-content;
    row-gap: .5em;
    column-gap: 2%;
  }
</style>
