import { writable, derived } from 'svelte/store';
import { data } from '../studioData.js';

export const studioData = writable(data);

const createKV = (inputAcc, {name, val, type, inputs}) => Object.assign(
  inputAcc,
  {
    [name]: type === 'List' && inputs && inputs?.length > 0
    ? inputs.map( (inputItem) => createKV( {}, inputItem ) )
    : type === 'Nested' && inputs && inputs?.length > 0
      ? inputsToState(inputs)
      : val
  }
);

const inputsToState = (inputs) => inputs.reduce( createKV, {} );

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
