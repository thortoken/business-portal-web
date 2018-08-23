export const traverseRecursively = (
  subtree,
  { childKey, path = [], nodeCallback, leafCallback }
) => {
  if (
    typeof nodeCallback !== 'function' ||
    typeof leafCallback !== 'function'
  ) {
    throw new Error('Invalid callbacks provided')
  }

  return Object.entries(subtree).reduce((acc, [name, options]) => {
    const newPath = [...path, name]
    let newValue
    if (options[childKey]) {
      const newSubtree = traverseRecursively(options[childKey], {
        childKey,
        path: newPath,
        nodeCallback,
        leafCallback,
      })
      newValue = nodeCallback({
        key: name,
        value: options,
        path: newPath,
        newSubtree,
      })
    } else {
      newValue = leafCallback({ key: name, value: options, path: newPath })
    }
    return { ...acc, [name]: newValue }
  }, {})
}
