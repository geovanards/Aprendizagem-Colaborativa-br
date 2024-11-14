// Adicionando interatividade e funções da plataforma
const form = document.getElementById("content-form");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const contributionList = document.getElementById("contribution-list");
const commentsSection = document.getElementById("comments");

let contributions = [];
let comments = [];

// Função para adicionar contribuição
form.addEventListener("submit", function(event) {
  event.preventDefault();

  const title = titleInput.value;
  const content = contentInput.value;

  // Criação de um objeto de contribuição
  const contribution = {
    id: contributions.length + 1,
    title,
    content,
    likes: 0
  };

  contributions.push(contribution);
  renderContributions();
  form.reset();
});

// Função para renderizar contribuições
function renderContributions() {
  contributionList.innerHTML = "";
  contributions.forEach(contribution => {
    const div = document.createElement("div");
    div.classList.add("contribution");
    div.innerHTML = `
      <h3>${contribution.title}</h3>
      <p>${contribution.content}</p>
      <button class="like-button" onclick="likeContribution(${contribution.id})">Curtir (${contribution.likes})</button>
      <div class="comment-box">
        <textarea class="comment-input" placeholder="Adicionar comentário..."></textarea>
        <button class="comment-button" onclick="addComment(${contribution.id})">Comentar</button>
        <div id="comments-for-${contribution.id}"></div>
      </div>
    `;
    contributionList.appendChild(div);
  });
}

// Função para curtir contribuição
function likeContribution(id) {
  const contribution = contributions.find(contrib => contrib.id === id);
  contribution.likes++;
  renderContributions();
}

// Função para adicionar comentário
function addComment(contributionId) {
  const commentInput = document.querySelector(`#comments-for-${contributionId} .comment-input`);
  const commentText = commentInput.value;

  if (commentText) {
    const comment = {
      contributionId,
      text: commentText
    };
    comments.push(comment);
    commentInput.value = "";
    renderComments();
  }
}

// Função para renderizar comentários
function renderComments() {
  commentsSection.innerHTML = "";
  comments.forEach(comment => {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment-box");
    const contribution = contributions.find(contrib => contrib.id === comment.contributionId);
    commentDiv.innerHTML = `<p><strong>Comentário na contribuição "${contribution.title}":</strong> ${comment.text}</p>`;
    commentsSection.appendChild(commentDiv);
  });
}
