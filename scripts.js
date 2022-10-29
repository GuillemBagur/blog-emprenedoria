


const renderPosts = posts => {
    const dump = document.getElementById("blog-dump");
    for(let post of posts) {
        let postEl = `<div class="post">
            <h2 class="post__title">${post.title}</h2>
            <h3 class="post__author">Autor/a: ${post.author}</h3>
            <h4 class="post__date">${post.date}</h4>
            <p class="post__body">
                ${post.body}
            </p>
        </div>`;

        dump.innerHTML += postEl;
    }
}


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
  renderPosts(sortedPosts);
});