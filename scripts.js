const renderPosts = (posts, editable = false) => {
  const dump = document.getElementById("blog-dump");

  for (let post of posts) {
    const postID = posts.indexOf(post);
    const contentEditable = editable ? `contenteditable=true` : "";
    const editAction = editable
      ? `<button onclick="editArticle(${postID})">Editar</button>`
      : "";

    let postEl = `<div class="post" data-id="${postID}">
            <h2 ${contentEditable} class="post__title">${post.title}</h2>
            <h3 class="post__author">Autor/a:
              <span ${contentEditable} class="post__author-name">${post.author}</span></h3>
            <h4 class="post__date">${post.date}</h4>
            <p ${contentEditable} class="post__body">
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

const sortPosts = posts => {
  const sortedPosts = posts.sort((postA, postB) => {
    const dateAParts = postA.date.split("/");
    const dateBParts = postB.date.split("/");
    const dateA = new Date(dateAParts[2], dateAParts[1]-1, dateAParts[0]);
    const dateB = new Date(dateBParts[2], dateBParts[1]-1, dateBParts[0]);
    console.log(dateAParts, dateBParts);
    return dateB-dateA;
  });

  console.log(posts, sortedPosts);

  return sortedPosts;
}

document.addEventListener("DOMContentLoaded", async () => {
  const posts = await loadPosts();
  const sortedPos = sortPosts(posts);
  renderPosts(sortedPos, editable);
});
