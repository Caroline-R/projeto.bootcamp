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
  if (opcao.src) {

    image.src = opcao.src
  }
  else {
    image.remove()
  }
  return clone
}

document.addEventListener('DOMContentLoaded', () => {
  const template = document.querySelector<HTMLTemplateElement>('#item-da-lista')
  const background = document.querySelector<HTMLImageElement>('#background')
  const ilustracao = document.querySelector<HTMLImageElement>('#ilustracao')
  const cartao = document.querySelector<HTMLDivElement>('#cartao')
  const imprimir = document.querySelector<HTMLDivElement>('#Imprimir')
  console.log(imprimir)
  imprimir.onclick = () => {
    document.body.classList.add('imprimir')
    print()
  }
  const ilustracoes = document.querySelector('#ilustracoes')
  const fundos = document.querySelector('#fundos')

  get('api/ilustracoes.json').then(opcoes => {
    opcoes.forEach(opcao => ilustracoes.appendChild(
      preparaOpcao(opcao, template)
    ))

    const buttons = ilustracoes.querySelectorAll('button')
    buttons.forEach((button) => button.onclick = () => {
      ilustracao.querySelector("img").src = button.value
    })
  })

  get('api/fundos.json').then(opcoes => {
    opcoes.forEach(opcao => fundos.appendChild(
      preparaOpcao(opcao, template)
    ))

    const buttons = fundos.querySelectorAll('button')
    buttons.forEach((button) => button.onclick = () => {
      if (button.value) {
        background.style.display= "block"
        background.src = button.value
      }
      else {
        background.style.display= "none"
      }
    })
  })

})
