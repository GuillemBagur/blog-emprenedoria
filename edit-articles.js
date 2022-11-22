let keyInput = document.getElementById("key");

const getToday = () => {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = d.getFullYear();

  const today = dd + "/" + mm + "/" + yyyy;
  return today;
};

const editArticle = async (postID) => {
  const el = document.querySelector(`[data-id="${postID}"`);
  const article = {
    title: el.querySelector(".post__title").innerHTML,
    author: el.querySelector(".post__author-name").innerHTML,
    date: el.querySelector(".post__date").innerHTML,
    body: el.querySelector(".post__body").innerHTML,
  };

  await newArticle(article);
};

const newArticle = async (article = {}) => {
  if (JSON.stringify(article) === "{}") article.date = getToday();
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
    alert("done");
    location.reload();
    return;
  }

  alert("La contrasenya no és correcta.");
};

document.addEventListener("DOMContentLoaded", () => {
  const pw = localStorage.getItem("pw");
  document.getElementById("key").value = pw;
});

const saveNewValue = (el) => {
  localStorage.setItem("pw", el.value);
};
