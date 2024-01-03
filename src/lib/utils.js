export const assocPath = ([head, ...rest], value, obj) => Array.isArray(obj)
  ? [].concat(
    obj.slice(0, head),
    [rest.length
      ? assocPath(rest, value, obj[head])
      : value],
    obj.slice(head + 1))
  : Object.assign({},
    obj,
    {[head]: rest.length
      ? assocPath(rest, value, obj[head])
      : value
    });

export const path = ([hed, ...rest], obj) => typeof obj === 'undefined'
  ? void 0
  : rest.length < 1
    ? obj[hed]
    : path(rest, obj[hed]);

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

export const inputsToState = (inputs) => inputs.reduce( createKV, {} );

export const assocPaths = (pathArr, initialState) => pathArr.reduce(
  (acc, [updatePath, newVal]) => assocPath(updatePath, newVal, acc),
  initialState
);

export const formatTime = (dateObj) => `${
  dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
}.${
  `${dateObj.getMilliseconds()}`.padStart(3, '0')
}`;
