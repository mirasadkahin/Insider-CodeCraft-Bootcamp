const appendLocation = document.querySelector(".ins-api-users");

const API_URL = "https://jsonplaceholder.typicode.com/users";
const STORAGE_KEY = "users_data";
const EXPIRATION_KEY = "users_expiration";
const EXPIRATION_TIME = 24 * 60 * 60 * 1000;

function fetchUsers() {
    fetch(API_URL)
        .then(response => response.json())
        .then(users => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
            localStorage.setItem(EXPIRATION_KEY, Date.now() + EXPIRATION_TIME);
            renderUsers(users);
        })
        .catch(() => {
            appendLocation.innerHTML = "<p>Veri alınırken hata oluştu!</p>";
        });
}

function loadUsers() {
    const storedUsers = localStorage.getItem(STORAGE_KEY);
    const storedExpiration = localStorage.getItem(EXPIRATION_KEY);

    if (storedUsers && storedExpiration && Date.now() < storedExpiration) {
        renderUsers(JSON.parse(storedUsers));
    } else {
        fetchUsers();
    }
}

function renderUsers(users) {
    appendLocation.innerHTML = "";
    
    users.forEach(user => {
        const userDiv = document.createElement("div");
        userDiv.classList.add("user-card");
        userDiv.innerHTML = `
            <p><strong>${user.name}</strong></p>
            <p>Email: ${user.email}</p>
            <p>Adres: ${user.address.street}, ${user.address.city}</p>
            <button onclick="deleteUser(${user.id})">Sil</button>
        `;
        appendLocation.appendChild(userDiv);
    });

    if (users.length === 0) {
        showRefreshButton();
    }
}

function deleteUser(userId) {
    let users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    users = users.filter(user => user.id !== userId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    renderUsers(users);
}

function showRefreshButton() {
    let refreshBtn = document.querySelector("#refreshBtn");
    if (!refreshBtn) {
        refreshBtn = document.createElement("button");
        refreshBtn.id = "refreshBtn";
        refreshBtn.innerText = "Yenile";
        refreshBtn.onclick = restoreUsers;
        document.body.appendChild(refreshBtn);
    }
}

function restoreUsers() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(EXPIRATION_KEY);
    document.querySelector("#refreshBtn").remove();
    fetchUsers();
}

const styles = document.createElement("style");
styles.innerHTML = `
    .user-card {
        border: 1px solid #ddd;
        padding: 10px;
        margin: 5px;
        border-radius: 5px;
        background: #f9f9f9;
    }
    button {
        background: red;
        color: white;
        border: none;
        padding: 5px;
        cursor: pointer;
        margin-top: 5px;
    }
    #refreshBtn {
        display: block;
        margin: 20px auto;
        padding: 10px;
        background: green;
        color: white;
        border: none;
        cursor: pointer;
    }
`;
document.head.appendChild(styles);

loadUsers();
