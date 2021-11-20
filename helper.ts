// Helper functions
type Helper = {
    el: HTMLDivElement,
    active: boolean,
  }

function createHelper (): Helper {
  const el = document.createElement('div')
  document.body.appendChild(el)

  el.style.left = '0'
  el.style.top = '0'

  el.style.color = 'white'
  el.style.padding = '0.2em'
  el.style.borderRadius = '5%'
  el.style.backgroundColor = 'grey'
  el.style.position = 'fixed'
  el.style.zIndex = '10'
  el.style.pointerEvents = 'none'

  return {
    el,
    active: false
  }
}
function activateHelper (helper:Helper): void {
  helper.active = true
}
function changeHelperStatus (helper: Helper, status: PositionVector) {
  helper.el.innerHTML = `${status.x}, ${status.y}`
}
function deleteHelper (helper:Helper) {
  helper.el.remove()
}
