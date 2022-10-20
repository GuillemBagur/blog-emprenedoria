const parseWeekDay = (day) => {
  day = day.toLowerCase();
  const days = {
    monday: "Dilluns",
    tuesday: "Dimarts",
    wednesday: "Dimecres",
    thursday: "Dijous",
    friday: "Divendres",
    saturday: "Dissabte",
    sunday: "Diumenge"
  }

  return days[day] ?? day;
}


const renderPosts = posts => {
    const dump = document.getElementById("blog-dump");
    for(let post of posts) {
        let postEl = `<div class="post">
            <h2 class="post__title">${parseWeekDay(post.title)}</h2>
            <h3 class="post__author">${post.author}</h3>
            <h4 class="post__date">${post.date}</h4>
            <p class="post__body">
                ${post.body}
            </p>
        </div>`;

        dump.innerHTML += postEl;
    }
}


const loadPosts = async () => {
  const data = await fetch(
    `https://busy-teal-panther-cape.cyclic.app/get-posts`
  );
  const posts = await data.json();
  
  return posts;
};

document.addEventListener("DOMContentLoaded", async () => {
  const posts = await loadPosts();
  renderPosts(posts);
});