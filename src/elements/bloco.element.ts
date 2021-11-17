function fetchTemplate(src: string) {
  const parser = new DOMParser()

  return new Promise<Document>(async (resolve, reject) => {
    try {
      resolve(
        parser.parseFromString(await (await fetch(src)).text(), 'text/html')
      )
    } catch (err) {
      reject(err)
    }
  })
}

export class LetraBlocoElement extends HTMLElement {
  static get observedAttributes() {
    return ['letra', 'tons']
  }

  template: HTMLTemplateElement

  letra = ''

  tons = 'amarelo'

  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    fetchTemplate('templates/bloco.html').then((doc) => {
      const template = doc.querySelector('template').content
      const style = doc.querySelector('style')
      
      template.querySelector('span').textContent = this.letra
      this.classList.add('tons', this.tons)

      this.shadowRoot.appendChild(style)
      this.shadowRoot.appendChild(template)
    })
  }

  attributeChangedCallback(name: string, prev: string, next: string) {
    if (this.template) this.template.textContent = next
    this[name] = next
  }
}
customElements.define('letra-bloco', LetraBlocoElement)
