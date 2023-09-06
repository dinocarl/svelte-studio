import { writable, derived } from 'svelte/store';

export const studioData = writable({
  BlueThing:  { inputs: [ {name: 'text',  type: 'Text', val: 'Other text still'}, {name: 'variant',  type: 'Radio', val: 'md', values: ['sm', 'md', 'lg']}, ] },
  CompX:      { inputs: [{name: 'title', type: 'Text', val: 'Just Some Title'}] },
  GreenThing: { inputs: [{name: 'text',  type: 'Text', val: 'Some other text'}] },
  RedThing:   { inputs: [ {name: 'text',  type: 'Text', val: 'Just some text'}, {name: 'variant',  type: 'Select', val: 'sm', values: ['sm', 'md', 'lg'] }, ] },
});

export const studioState = derived(
  studioData,
  ($studioData) => Object.entries($studioData)
  .reduce(
    (acc, [key, {inputs = []}]) => Object.assign(
      acc,
      { [key]: inputs.reduce(
        (inputAcc, {name, val}) => Object.assign(
          inputAcc,
          { [name]: val }
        ),
        {}
      ) }
    ),
    {}
  )
);
