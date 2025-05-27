document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("postForm");
  const usernameInput = document.getElementById("username");
  const messageInput = document.getElementById("message");
  const postsContainer = document.getElementById("postsContainer");

  const loadPosts = () => {
    postsContainer.innerHTML = "";
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.forEach((post) => {
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `<strong>${post.username}</strong><p>${post.message}</p>`;
      postsContainer.appendChild(div);
    });
  };

  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newPost = {
      username: usernameInput.value,
      message: messageInput.value,
    };
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
    postForm.reset();
  });

  loadPosts();
});
