// return current mouse position relative to reference element in listener
function getMouseOverVector (event: MouseEvent) {
  const position = getCursorPosition(event, event.currentTarget)
  const dimension = getRefSize(event.currentTarget)

  return {
    x: (Math.round((position.x / dimension.x) * 100) / 100),
    y: (Math.round((position.y / dimension.y) * 100) / 100)
  }
}

function getRefSize (el) {
  if (el instanceof Window) {
    return {
      x: el.innerWidth,
      y: el.innerHeight
    }
  }
  return {
    x: el.offsetWidth,
    y: el.offsetHeight
  }
}
function getCursorPosition (ev: MouseEvent, el) {
  if (el instanceof Window) {
    return {
      x: ev.clientX,
      y: ev.clientY
    }
  }
  const rect = el.getBoundingClientRect()
  return {
    x: ((ev.clientX - rect.left)),
    y: ((ev.clientY - rect.top))
  }
}

export {
  getMouseOverVector
}
