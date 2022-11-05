const editArticle = async (postID) => {
  const el = document.querySelector(`[data-id="${postID}"`);
  const article = {
    title: el.querySelector(".post__title").innerHTML,
    author: el.querySelector(".post__author-name").innerHTML,
    date: el.querySelector(".post__date").innerHTML,
    body: el.querySelector(".post__body").innerHTML,
  };

  console.log(article);
  const key = document.getElementById("key").value;
  const req = await fetch(
    `https://busy-teal-panther-cape.cyclic.app/create-post?key=${key}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(article),
    }
  );

  const res = await req.json();
  if (res.done) {
    alert("Editat correctament!");
    return;
  }

  alert("Alguna cosa ha fallat.");
};
