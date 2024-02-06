/* // Please note: This code is meant to be run in a browser environment, not in Node.js

let postsData = [];
const postsContainer = document.querySelector(".posts-container");

fetch(
    //this to be replaced with the actual website link in later stage.
    "http://localhost:5000/products"
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
 */
document.addEventListener("DOMContentLoaded", function() {


    let postsData = [];
    const postsContainer = document.querySelector(".posts-container");
    const searchInput = document.getElementById("search-input");
    const searchDisplay = document.querySelector('.search-display');
    let debounceTimer;

    // Fetch posts data from the server
    const fetchPosts = async () => {
        try {
            const response = await fetch("http://localhost:5000/products");
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            if (!Array.isArray(data)) {
                throw new Error('Data is not an array');
            }
            postsData = data;
            displayPosts(postsData);
        } catch (error) {
            console.log('Error fetching data:', error.message);
        }
    };

    // Display posts in the UI
    const displayPosts = (data) => {
        postsContainer.innerHTML = "";
        data.forEach(post => {
            const postElement = createPostElement(post);
            postsContainer.appendChild(postElement);
        });
    };

    // Create HTML element for a single post
    const createPostElement = (postData) => {
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
        return post;
    };

    // Handle search input
    const handleSearchInput = () => {
        const query = searchInput.value.trim().toLowerCase();
        const searchResults = postsData.filter(post =>
            post.categories.some(category => category.toLowerCase().includes(query)) ||
            post.title.toLowerCase().includes(query)
        );
        displaySearchResults(searchResults, query);
    };

    // Display search results in the UI
    const displaySearchResults = (results, query) => {
        if (results.length === 0) {
            searchDisplay.textContent = "No results found";
        } else if (results.length === 1) {
            searchDisplay.textContent = `1 result found for your query: ${query}`;
        } else {
            searchDisplay.textContent = `${results.length} results found for your query: ${query}`;
        }
        displayPosts(results);
    };

    // Debounce search input to reduce function calls
    //let debounceTimer;
    const debounceSearch = () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(handleSearchInput, 500);
    };

    // Event listener for search input
    searchInput.addEventListener('input', debounceSearch);

    // Reset posts to initial state
    const resetPosts = () => {
        searchDisplay.textContent = "";
        searchInput.value = "";
        displayPosts(postsData);
    };
    // Initial fetch of posts data
    fetchPosts();
});

