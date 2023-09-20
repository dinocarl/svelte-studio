import { writable, derived } from 'svelte/store';
import { data } from '../studioData.js';

export const studioData = writable(data);

const inputsToState = (inputs) => inputs.reduce(
  (inputAcc, {name, val, inputs: nestedInputs}) => Object.assign(
    inputAcc,
    { [name]: nestedInputs ? inputsToState(nestedInputs) : val }
  ),
  {}
);

export const studioState = derived(
  studioData,
  ($studioData) => Object.entries($studioData)
  .reduce(
    (acc, [key, {inputs = []}]) => Object.assign(
      acc,
      { [key]: inputsToState(inputs) }
    ),
    {}
  )
);
