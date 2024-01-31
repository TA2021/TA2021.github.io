// Please note: This code is meant to be run in a browser environment, not in Node.js

let postsData = [];
const postsContainer = document.querySelector(".posts-container");

fetch(
    //this to be replaced with the actual website link in later stage.
    "file:///C:/Users/timad/OneDrive%20-%20Royal%20Holloway%20University%20of%20London/FYP/Code/Tim-Adams-2018-ZFAC125-100900214-FINAL-YEAR-PROJECT/men.html"
)
    .then(response => response.json())
    .then(data => {
        postsData = data;
        postsData.map(post => createPost(post));
    });

const createPost = postData => {
    const { title, link, image, categories } = postData;
    const post = document.createElement("div");
    post.className = "post";
    post.innerHTML = `
        <a class="post-preview" href="${link}" target="_blank">
            <img class="post-image" src="${image}" alt="Post Image"></img>
        </a>
        <div class="post-content">
            <p class="post-title">${title}</p>
            <div class="post-tags">
                ${categories.map(category => `<span class="post-tag">${category}</span>`).join("")}
            </div>
        </div>
    `;
    postsContainer.append(post);
};

const search = document.getElementById("search-input");

let timer;
const debounce = (callback, time) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(callback, time);
};

search.addEventListener(
    'input',
    event => {
        const query = event.target.value;
        debounce(() => handleSearchPosts(query), 500);
    },
    false
);

const handleSearchPosts = query => {
    const searchQuery = query.trim().toLowerCase();
    let searchResults = postsData.filter(
        post =>
            post.categories.some(category => category.toLowerCase().includes(searchQuery)) ||
            post.title.toLowerCase().includes(searchQuery)
    );

    const searchDisplay = document.querySelector('.search-display');
    if (searchResults.length === 0) {
        searchDisplay.innerHTML = "No results found";
    } else if (searchResults.length === 1) {
        searchDisplay.innerHTML = `1 result found for your query: ${query}`;
    } else {
        searchDisplay.innerHTML = `${searchResults.length} results found for your query: ${query}`;
    }

    postsContainer.innerHTML = "";
    searchResults.map(post => createPost(post));
};

const resetPosts = () => {
    const searchDisplay = document.querySelector('.search-display');
    searchDisplay.innerHTML = "";
    postsContainer.innerHTML = "";
    postsData.map(post => createPost(post));
};
