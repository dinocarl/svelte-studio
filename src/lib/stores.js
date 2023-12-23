import { writable, derived } from 'svelte/store';
import { assocPath } from './utils.js';
import { data } from '../studioData.js';

export const studioData = writable(data);

let pastStatesArr = [];

// debounce the updates for history
export const pastStates = derived(
  studioData,
  ($studioData, set) => {
    const timeoutId = setTimeout(() => {
      pastStatesArr = [assocPath(['ts'], Date.now(), $studioData)].concat(pastStatesArr);

      return set(
        pastStatesArr
      )}, 700);

    return () => clearTimeout(timeoutId)
  },
  []
);

export const pastStatesLen = derived(
  pastStates,
  ($pastStates) => $pastStates?.length - 1 || 0
);
