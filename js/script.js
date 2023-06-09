import {fullPostURL,fetchAllProducts, renderSingleProductHTML} from "./constants.js";

const container = document.querySelector(".container_blog-posts");

// render all products/posts
async function renderProducts() {
    const products = await fetchAllProducts()

    products.forEach(product => {
     // renderSingeProduct. from function renderSingleProductHTML(product)
        const domItem = renderSingleProductHTML(product)
        container.append(domItem)
    });
}
renderProducts()


// Load more pages/posts
const loadMoreBtn = document.querySelector("#per_pageBtn");
const postContainer = document.querySelector(".container_blog-posts");;
let page = 2; // Initial page number
const postsPerPage = 10; // Number of posts to load per page
let totalPosts = 10; // Total number of posts fetched so far

// Hide the loader initially
const loader = document.querySelector(".loader");
loader.style.display = "none";

//load more pages/posts
loadMoreBtn.addEventListener('click', loadMorePosts);


async function loadMorePosts() {
    loader.style.display = "block";

    const response = await fetch(`${fullPostURL}?page=${page}&per_page=${postsPerPage}`);
    const data = await response.json();
  
    // Process the fetched data
    data.forEach(post => {
        
    const postElement = document.createElement('a');
    postElement.href = `blog-specific.html?id=${post.id}`;
    postElement.classList.add("posts");

    const image = document.createElement("img")
    image.src = post.better_featured_image.source_url;
    image.classList.add("post-img");
    postElement.append(image);
    
    const detailsWrapper = document.createElement("div")
    detailsWrapper.classList.add("post-content")
    postElement.append(detailsWrapper)
    
    const heading = document.createElement("h2");
    heading.innerText = post.title.rendered;
    heading.classList.add("post-content")
    detailsWrapper.append(heading)

    const body = document.createElement("p");
    body.innerText = post.excerpt.rendered;
    body.classList.add("post-content")
    body.innerText = post.excerpt.rendered.replace('<p>', '').replace('</p>', '');
    detailsWrapper.append(body)

    postContainer.append(postElement);
       
    
    totalPosts++; // Increment the total number of posts
    });
  
    page++; // Increment the page number for the next load
    
    //Check if the total number of posts reaches 15
    if (totalPosts >= 2) {
        loadMoreBtn.style.display = 'none';
    }
    loader.style.display = "none";
}


const backToTopButton = document.querySelector('#backToTopButton');

backToTopButton.addEventListener('click', function (event) {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}); 