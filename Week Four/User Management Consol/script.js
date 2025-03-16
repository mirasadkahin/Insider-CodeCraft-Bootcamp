const appendLocation = ".ins-api-users"; 
const API_URL = "https://jsonplaceholder.typicode.com/users";
const STORAGE_KEY = "users_data";
const EXPIRATION_TIME = 24 * 60 * 60 * 1000;
const SESSION_KEY = "restore_clicked";

function injectStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
        .user-card {
            background: #f8f9fa;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
        }
        .delete-btn {
            background: #dc3545;
            color: white;
            border: none;
            padding: 5px 10px;
            margin-top: 10px;
            cursor: pointer;
            border-radius: 5px;
        }
        .delete-btn:hover {
            background: #c82333;
        }
        .refresh-btn {
            background: #28a745;
            color: white;
            border: none;
            padding: 10px 15px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            display: none; 
            margin: 20px auto;
            text-align: center;
            width: 100%;
        }
        .refresh-btn:hover {
            background: #218838;
        }
        .error-msg {
            color: red;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
}

function fetchUsers() {
    fetch(API_URL)
        .then(response => response.json())
        .then(users => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ data: users, timestamp: Date.now() }));
            renderUsers(users);
        })
        .catch(() => {
            document.querySelector(appendLocation).innerHTML = "<p class='error-msg'>Veri alınırken hata oluştu!</p>";
        });
}

function loadUsers() {
    const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (storedData && Date.now() - storedData.timestamp < EXPIRATION_TIME) {
        renderUsers(storedData.data);
    } else {
        fetchUsers();
    }
}

function renderUsers(users) {
    const container = document.querySelector(appendLocation);
    container.innerHTML = "";

    users.forEach(user => {
        const userDiv = document.createElement("div");
        userDiv.classList.add("user-card");
        userDiv.innerHTML = `
            <p><strong>${user.name}</strong></p>
            <p>Email: ${user.email}</p>
            <p>Adres: ${user.address.street}, ${user.address.city}</p>
            <button class="delete-btn" onclick="deleteUser(${user.id})">Sil</button>
        `;
        container.appendChild(userDiv);
    });

    toggleRefreshButton(users.length === 0);
}

function deleteUser(userId) {
    let users = JSON.parse(localStorage.getItem(STORAGE_KEY))?.data || [];
    users = users.filter(user => user.id !== userId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ data: users, timestamp: Date.now() }));
    renderUsers(users);
}

function createRefreshButton() {
    let container = document.querySelector(appendLocation);
    let refreshBtn = document.createElement("button");
    refreshBtn.id = "refreshBtn";
    refreshBtn.innerText = "Yenile";
    refreshBtn.classList.add("refresh-btn");
    refreshBtn.style.display = "none"; 
    refreshBtn.onclick = restoreUsers;
    container.appendChild(refreshBtn);
}

function toggleRefreshButton(show) {
    const refreshBtn = document.querySelector("#refreshBtn");
    if (refreshBtn) {
        refreshBtn.style.display = show ? "block" : "none";
    }
}

function restoreUsers() {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.setItem(SESSION_KEY, "true");
    fetchUsers();
}

const observer = new MutationObserver(() => {
    if (!document.querySelector(".user-card")) {
        toggleRefreshButton(true);
    }
});
observer.observe(document.querySelector(appendLocation), { childList: true });

injectStyles();
createRefreshButton();
loadUsers();
