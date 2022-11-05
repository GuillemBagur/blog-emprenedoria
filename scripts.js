const renderPosts = (posts, editable = false) => {
  console.log(editable);
  const dump = document.getElementById("blog-dump");
  
  for (let post of posts) {
    const postID = posts.indexOf(post);
    const editAction = editable ? 
    `<button onclick="editArticle(${postID})">Editar</button>`
    : "";

    let postEl = `<div class="post" data-id="${postID}">
            <h2 class="post__title">${post.title}</h2>
            <h3 class="post__author">Autor/a:
              <span class="post__author-name">${post.author}</span></h3>
            <h4 class="post__date">${post.date}</h4>
            <p contenteditable="true" class="post__body">
                ${post.body}
            </p>
            ${editAction}
        </div>`;

    dump.innerHTML += postEl;
  }
};

const loadPosts = async () => {
  const loader = document.getElementById("posts-loader");
  loader.classList.add("show");
  const data = await fetch(
    `https://busy-teal-panther-cape.cyclic.app/get-posts`
  );
  loader.classList.remove("show");
  const posts = await data.json();

  return posts;
};

document.addEventListener("DOMContentLoaded", async () => {
  const posts = await loadPosts();
  const sortedPosts = posts.reverse();
  renderPosts(sortedPosts, editable);
});
