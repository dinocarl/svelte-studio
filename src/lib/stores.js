import { writable, derived } from 'svelte/store';
import { data } from '../studioData.js';

export const studioData = writable(data);

const inputsToState = (inputs) => inputs.reduce(
  (inputAcc, {name, val, type, inputs: nestedInputs}) => Object.assign(
    inputAcc,
    {
      [name]: type === 'List' && nestedInputs && nestedInputs.length > 0
      ? nestedInputs.map(({ name: inpName, val: inpVal }) => ({ [inpName]: inpVal }))
      : nestedInputs
      ? inputsToState(nestedInputs)
      : val
    }
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
