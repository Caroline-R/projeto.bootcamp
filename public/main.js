(() => {
  // src/elements/bloco.element.ts
  function fetchTemplate(src) {
    const parser = new DOMParser();
    return new Promise(async (resolve, reject) => {
      try {
        resolve(parser.parseFromString(await (await fetch(src)).text(), "text/html"));
      } catch (err) {
        reject(err);
      }
    });
  }
  var LetraBlocoElement = class extends HTMLElement {
    constructor() {
      super(...arguments);
      this.letra = "";
      this.tons = "amarelo";
    }
    static get observedAttributes() {
      return ["letra", "tons"];
    }
    connectedCallback() {
      this.attachShadow({mode: "open"});
      fetchTemplate("templates/bloco.html").then((doc) => {
        const template = doc.querySelector("template").content;
        const style = doc.querySelector("style");
        template.querySelector("span").textContent = this.letra;
        this.classList.add("tons", this.tons);
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(template);
      });
    }
    attributeChangedCallback(name, prev, next) {
      if (this.template)
        this.template.textContent = next;
      this[name] = next;
    }
  };
  customElements.define("letra-bloco", LetraBlocoElement);

  // src/main.ts
  var get = async (src) => {
    return fetch(src).then((response) => response.json());
  };
  function preparaOpcao(opcao, template) {
    const clone = template.content.cloneNode(true);
    const caption = clone.querySelector("figcaption");
    const button = clone.querySelector("button");
    const image = clone.querySelector("img");
    caption.textContent = opcao.label;
    button.value = opcao.src;
    image.alt = opcao.label;
    image.src = opcao.src;
    return clone;
  }
  document.addEventListener("DOMContentLoaded", () => {
    const template = document.querySelector("#item-da-lista");
    const background = document.querySelector("#background");
    const cartao = document.querySelector("#cartao");
    const ilustracoes = document.querySelector("#ilustracoes");
    const fundos = document.querySelector("#fundos");
    get("api/ilustracoes.json").then((opcoes) => {
      opcoes.forEach((opcao) => ilustracoes.appendChild(preparaOpcao(opcao, template)));
      const buttons = ilustracoes.querySelectorAll("button");
      buttons.forEach((button) => button.onclick = () => {
        cartao.querySelector("img").src = button.value;
      });
    });
    get("api/fundos.json").then((opcoes) => {
      opcoes.forEach((opcao) => fundos.appendChild(preparaOpcao(opcao, template)));
      const buttons = fundos.querySelectorAll("button");
      buttons.forEach((button) => button.onclick = () => {
        background.style.backgroundImage = "url(" + button.value + ")";
      });
    });
  });
})();
//# sourceMappingURL=main.js.map
