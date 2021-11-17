export * from './elements/bloco.element'

class Opcao {
  src: string;
  label: string;
}

const get = async (src: string): Promise<Opcao[]> => {
  return fetch(src).then(response => response.json())
}

function preparaOpcao(opcao: Opcao, template: HTMLTemplateElement) {
  const clone = template.content.cloneNode(true) as HTMLElement

  const caption = clone.querySelector('figcaption')
  const button = clone.querySelector('button')
  const image = clone.querySelector('img')

  caption.textContent = opcao.label
  button.value = opcao.src
  image.alt = opcao.label
  image.src = opcao.src

  return clone
}

document.addEventListener('DOMContentLoaded', () => {
  const template = document.querySelector<HTMLTemplateElement>('#item-da-lista')
  const background = document.querySelector<HTMLElement>('#background')
  const cartao = document.querySelector<HTMLDivElement>('#cartao')

  const ilustracoes = document.querySelector('#ilustracoes')
  const fundos = document.querySelector('#fundos')

  get('api/ilustracoes.json').then(opcoes => {
    opcoes.forEach(opcao => ilustracoes.appendChild(
      preparaOpcao(opcao, template)
    ))

    const buttons = ilustracoes.querySelectorAll('button')
    buttons.forEach((button) => button.onclick = () => {
      cartao.querySelector('img').src = button.value
    })
  })

  get('api/fundos.json').then(opcoes => {
    opcoes.forEach(opcao => fundos.appendChild(
      preparaOpcao(opcao, template)
    ))

    const buttons = fundos.querySelectorAll('button')
    buttons.forEach((button) => button.onclick = () => {
      background.style.backgroundImage = 'url(' + button.value + ')'
    })
  })

})
