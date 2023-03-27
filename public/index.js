// Threaddit images and their respective descriptions
const postSrcs = [
  {
    url: "../src/assets/post.png",
    description: "View, like, and dislike posts",
  },
  {
    url: "../src/assets/authenticate.png",
    description: "create your own account",
  },
  {
    url: "../src/assets/comments.png",
    description: "Comment on posts that interest you",
  },
  {
    url: "../src/assets/create.png",
    description: "Create your own post and share it with others",
  },
];

// track the index of the image for auto sliding
let imageIndex = 0;
let start;

function detectSwipe() {
  let container = document.getElementById("project-slideshow-container");
  let startX,
    startY,
    dist,
    threshold = 50; // minimum distance required for swipe

  container.addEventListener(
    "touchstart",
    function (e) {
      let touchobj = e.changedTouches[0];
      startX = touchobj.pageX;
      startY = touchobj.pageY;
    },
    false
  );

  container.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault(); // prevent scrolling while swiping
    },
    false
  );

  container.addEventListener(
    "touchend",
    function (e) {
      let touchobj = e.changedTouches[0];
      dist = touchobj.pageX - startX; // calculate swipe distance

      if (Math.abs(dist) >= threshold) {
        // check if swipe distance is greater than threshold
        if (dist > 0 && imageIndex > 0) {
          stopAutoPagination();
          --imageIndex;
          updateImage(imageIndex);
        } else if (dist < 0 && imageIndex < postSrcs.length - 1) {
          stopAutoPagination();
          ++imageIndex;
          updateImage(imageIndex);
        }
      }
    },
    false
  );
}

function updateImage(index) {
  const image = document.getElementById("project-image");
  image.src = postSrcs[index]["url"];
  const description = document.getElementById("project-info");
  description.innerText = postSrcs[index]["description"];
  updatePagination(index);
}

function addPagination() {
  const container = document.getElementById("project-pagination");
  postSrcs.forEach((elm) => {
    let span = document.createElement("span");
    span.classList.add("pag-dot");
    container.appendChild(span);
    container.appendChild(span);
    container.appendChild(span);
  });
  updatePagination(0);
}

function updatePagination(index) {
  const dots = document.querySelectorAll(".pag-dot");
  for (let i = 0; i < dots.length; i++) {
    if (i !== index) {
      dots[i].classList.remove("pag-dot-active");
    } else {
      dots[i].classList.add("pag-dot-active");
    }
  }
}

function startAutoSlide(index) {
  updateImage(0);
  start = setInterval(() => {
    updateImage(index);
    if (index < postSrcs.length - 1) {
      index++;
      imageIndex = index;
    } else {
      index = 0;
      imageIndex = index;
    }
  }, 3000);
}

function stopAutoPagination() {
  clearInterval(start);
}

function toggleMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  btn.addEventListener("click", () => {
    menu.style.display = menu.style.display === "none" ? "flex" : "none";
  });
}

addPagination();
detectSwipe();
startAutoSlide(0);
toggleMobileMenu();
