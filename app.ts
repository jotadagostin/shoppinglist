// / Interface for the itens:
interface Item {
  id: string;
  nome: string;
}

// Selecting elements from DOM
const formularioItem = document.getElementById(
  "formularioItem"
) as HTMLFormElement;
const listaItens = document.getElementById("listaItens") as HTMLUListElement;
const inputItem = document.getElementById("item") as HTMLInputElement;

// Carrying itens from localStorage
const carregarItens = (): Item[] => {
  const itens = localStorage.getItem("itens");
  return itens ? JSON.parse(itens) : [];
};

// Saving itens at localStorage
const salvarItens = (itens: Item[]) => {
  localStorage.setItem("itens", JSON.stringify(itens));
};

// Adding a new item
const adicionarItem = (nome: string) => {
  const itens = carregarItens();
  const novoItem: Item = {
    id: new Date().toISOString(),
    nome,
  };
  itens.push(novoItem);
  salvarItens(itens);
};

// Removing item with the ID
const removerItem = (id: string) => {
  const itens = carregarItens();
  const itensAtualizados = itens.filter((item) => item.id !== id);
  salvarItens(itensAtualizados);
};

// Editing an item with the ID
const editarItem = (id: string, novoNome: string) => {
  const itens = carregarItens();
  const item = itens.find((item) => item.id === id);
  if (item) {
    item.nome = novoNome;
    salvarItens(itens);
  }
};

// rerendering the itens list
const renderizarItens = () => {
  const itens = carregarItens();
  listaItens.innerHTML = "";
  itens.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = item.nome;
    listaItens.appendChild(listItem);

    // Adicionando eventos para editar e remover o item
    listItem.addEventListener("dblclick", () => {
      const novoNome = prompt("Editar item:", item.nome);
      if (novoNome !== null) editarItem(item.id, novoNome);
      renderizarItens();
    });
  });
};

// Starting the aplication
formularioItem.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = inputItem.value.trim();
  if (nome) {
    adicionarItem(nome);
    inputItem.value = "";
    renderizarItens();
  }
});

// rerendering itens when buffering the page
renderizarItens();
