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
