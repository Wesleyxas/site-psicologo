// Menu Hambúrguer
const botaoMenu = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
botaoMenu.addEventListener("click", function () {
  menu.classList.toggle("active");
  botaoMenu.textContent = menu.classList.contains("active") ? "✖" : "☰";
});

// Validação do Formulário de Contato
const formularioContato = document.getElementById("form-contato");
formularioContato.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  if (nome === "" || email === "") {
    alert("Por favor, preencha todos os campos!");
    return;
  }
  alert("Mensagem enviada com sucesso!");
  formularioContato.reset();
});

// Edição do Perfil
const botaoEditar = document.getElementById("editar-perfil");
const formularioEditar = document.getElementById("form-editar-perfil");
const botaoCancel = document.getElementById("cancelar-editar");
const inputFoto = document.getElementById("edit-foto");
const previewFoto = document.getElementById("preview-foto");

botaoEditar.addEventListener("click", function () {
  formularioEditar.classList.add("active");
  document.getElementById("edit-nome").value =
    document.getElementById("nome").textContent;
  document.getElementById("edit-crp").value =
    document.getElementById("crp").textContent;
  document.getElementById("edit-bio").value =
    document.getElementById("bio").textContent;
  document.getElementById("edit-frase").value =
    document.getElementById("frase").textContent;
  previewFoto.src = document.getElementById("foto").src;
  previewFoto.classList.add("active");
});

inputFoto.addEventListener("change", function (evento) {
  const file = evento.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewFoto.src = e.target.result;
      previewFoto.classList.add("active");
    };
    reader.readAsDataURL(file);
  }
});

botaoCancel.addEventListener("click", function () {
  formularioEditar.classList.remove("active");
  previewFoto.classList.remove("active");
});

formularioEditar.addEventListener("submit", function (evento) {
  evento.preventDefault();
  document.getElementById("nome").textContent =
    document.getElementById("edit-nome").value;
  document.getElementById("crp").textContent =
    document.getElementById("edit-crp").value;
  document.getElementById("bio").textContent =
    document.getElementById("edit-bio").value;
  document.getElementById("frase").textContent =
    document.getElementById("edit-frase").value;
  document.getElementById("foto").src = previewFoto.src;
  localStorage.setItem(
    "perfil",
    JSON.stringify({
      nome: document.getElementById("nome").textContent,
      crp: document.getElementById("crp").textContent,
      bio: document.getElementById("bio").textContent,
      frase: document.getElementById("frase").textContent,
      foto: document.getElementById("foto").src,
    })
  );
  formularioEditar.classList.remove("active");
  previewFoto.classList.remove("active");
  alert("Perfil atualizado com sucesso!");
});

// Carregar perfil do localStorage
const perfilSalvo = localStorage.getItem("perfil");
if (perfilSalvo) {
  const perfil = JSON.parse(perfilSalvo);
  document.getElementById("nome").textContent = perfil.nome;
  document.getElementById("crp").textContent = perfil.crp;
  document.getElementById("bio").textContent = perfil.bio;
  document.getElementById("frase").textContent = perfil.frase;
  document.getElementById("foto").src = perfil.foto;
}

// Formulário de Comentários
const formularioComentario = document.getElementById("form-comentario");
const containerDepoimentos = document.querySelector(".container-depoimentos");
formularioComentario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const nome = document.getElementById("nome-comentario").value;
  const texto = document.getElementById("texto-comentario").value;
  if (nome === "" || texto === "") {
    alert("Por favor, preencha todos os campos!");
    return;
  }
  const novoDepoimento = document.createElement("div");
  novoDepoimento.classList.add("card-depoimento");
  novoDepoimento.innerHTML = `<p>"${texto}"</p><p class="autor">— ${nome}</p>`;
  containerDepoimentos.appendChild(novoDepoimento);
  const comentarios = JSON.parse(localStorage.getItem("comentarios") || "[]");
  comentarios.push({ nome, texto });
  localStorage.setItem("comentarios", JSON.stringify(comentarios));
  formularioComentario.reset();
  alert("Comentário adicionado com sucesso!");
});

// Carregar comentários do localStorage
const comentariosSalvos = JSON.parse(
  localStorage.getItem("comentarios") || "[]"
);
comentariosSalvos.forEach(({ nome, texto }) => {
  const depoimento = document.createElement("div");
  depoimento.classList.add("card-depoimento");
  depoimento.innerHTML = `<p>"${texto}"</p><p class="autor">— ${nome}</p>`;
  containerDepoimentos.appendChild(depoimento);
});

// Alternar tema claro/escuro
const botaoTema = document.getElementById("theme-toggle");
botaoTema.addEventListener("click", function () {
  const temaAtual = document.documentElement.dataset.theme;
  document.documentElement.dataset.theme =
    temaAtual === "dark" ? "light" : "dark";
  localStorage.setItem("theme", document.documentElement.dataset.theme);
  botaoTema.textContent = temaAtual === "dark" ? "🌓" : "🌙";
});
window.onload = function () {
  const temaSalvo = localStorage.getItem("theme") || "light";
  document.documentElement.dataset.theme = temaSalvo;
  botaoTema.textContent = temaSalvo === "dark" ? "🌙" : "🌓";
};
