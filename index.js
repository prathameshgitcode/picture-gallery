const accessKey = "Enter_Your_Unsplash_Access_key_Here";
const gallery = document.getElementById("gallery");

function searchPhotos() {
  const category = document.getElementById("category").value;

  // Clear previous results
  gallery.innerHTML = "";

  // Fetch images from Unsplash API based on the category
  fetch(
    `https://api.unsplash.com/search/photos?query=${category}&client_id=${accessKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((photo) => {
        const imageElement = document.createElement("div");
        imageElement.classList.add("image");

        const img = document.createElement("img");
        img.src = photo.urls.regular;
        img.alt = photo.alt_description;
        img.addEventListener("click", () => openImage(photo.links.html));

        const overlay = document.createElement("div");
        overlay.classList.add("image-overlay");

        const author = document.createElement("h2");
        author.classList.add("author");
        author.textContent = `By ${photo.user.name}`;

        const description = document.createElement("h2");
        description.classList.add("description");
        description.textContent = photo.alt_description || "";

        const link = document.createElement("a");
        link.classList.add("link");
        link.textContent = "View on Unsplash";
        link.href = photo.links.html;
        link.target = "_blank";

        overlay.appendChild(author);
        overlay.appendChild(description);
        overlay.appendChild(link);

        imageElement.appendChild(img);
        imageElement.appendChild(overlay);

        gallery.appendChild(imageElement);
      });
    })
    .catch((error) => console.log(error));
}

// Open image link in a new tab
function openImage(url) {
  window.open(url, "_blank");
}
