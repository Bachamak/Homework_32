const titleElement = document.querySelector('.box-content_title');
const textElement = document.querySelector('.box-content_text');
const form = document.getElementById("box-form");
const contentBtn = document.getElementById("box-content_btm");
const commentBox = document.querySelector(".box-comment");

const API_URL = "https://jsonplaceholder.typicode.com";

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Ошибка:', error);
    }
};

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const postId = document.getElementById('postId').value;
    try {
        const postData = await fetchData(`${API_URL}/posts/${postId}`);
        titleElement.textContent = postData.title;
        textElement.textContent = postData.body;
        contentBtn.style.display = 'block';
        commentBox.style.display = 'none';
    } catch (error) {
        console.error(error);
    }
});

contentBtn.addEventListener("click", async () => {
    try {
        const postId = document.getElementById("postId").value;
        const commentsData = await fetchData(`${API_URL}/comments?postId=${postId}`);
        let commentsHtml = "";
        commentsData.slice(0, 3).forEach(comment => {
            commentsHtml += `
        <h3>ID: ${comment.id}</h3>
        <p>Name: ${comment.name}</p>
        <p>Email: ${comment.email}</p>
        <p>Body: ${comment.body}</p>`;
        });
        commentBox.innerHTML = commentsHtml;
        contentBtn.style.display = "none";
        commentBox.style.display = "flex";
    } catch (error) {
        console.error(error);
    }
});