// API Docs (jikan.moe)

// Reference:
// https://jikan.docs.apiary.io/#introduction/user-anime/manga-lists-are-being-removed-from-1st-may,-2022
// https://docs.api.jikan.moe/#tag/anime/operation/getAnimeReviews
// https://www.youtube.com/watch?v=AI5lsNeVyO8
// global scope

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
  const inputKeyword = document.querySelector('.input-keyword');
  const animes = await getAnime(inputKeyword.value);
  updateUI(animes);
});

// .then((response) => console.log(response.data[0].mal_id)) //change here

function getAnime(keyword) {
  return fetch('https://api.jikan.moe/v4/anime?q=' + keyword)
    .then((response) => response.json())
    .then(function (data) {
      // console.log(data.data);
      return data.data; //IMPORTANT!
    })
    .catch((err) => console.warn(err.message));
}

function updateUI(animes) {
  let cards = '';
  animes?.forEach((e) => {
    // console.log(e.title);
    cards += showAnime(e);
    const animeContainer = document.querySelector('.anime-container');
    animeContainer.innerHTML = cards;
  });
}

function showAnime(e) {
  return `<div id = "cardAnime" class="col-md-3 my-4">
  <div class="card" style="width: 100%">
    <div class="embed-responsive embed-responsive-4by3">
      <img src="${e.images.jpg.image_url}" class="card-img-top h-75">
    </div>
      <div class="card-body">
      <h5 class="card-title">${e.title_english ? e.title_english : e.title}</h5>
      <h6 class="card-subtitle">Source: ${e.source}</h6>
      <p class="card-text">Total episodes: ${e.episodes}</p>
      <a href="${e.url}" class="btn btn-primary mt-auto modal-detail-button" target = "_blank">Details</a>
      </div>
      </div>
      </div>`;
}
// kalau dia ada title english, maka tampilkan title english, kalau tidak ada maka tampilkan title japanese

function darkMode() {
  let card = document.querySelectorAll('#cardAnime .card');
  let dark = document.body;
  let whiteTitle = document.querySelector('.title-animeDB');
  dark.classList.toggle('dark-mode');

  card.forEach((e) => {
    e.classList.toggle('border-0');
    e.classList.toggle('shadow');
  });

  // toggle for card dark mode
  let darkAnime = document.querySelectorAll('.card-body');
  darkAnime.forEach((e) => {
    e.classList.toggle('dark-mode');
    e.classList.toggle('white-text');
    e.classList.toggle('border-light');
  });

  // if there is dark class in body then add class white-text inside class title-animeDB
  if (dark.classList.contains('dark-mode')) {
    whiteTitle.classList.toggle('white-text');
  } else {
    whiteTitle.classList.remove('white-text');
  }
}

// Planned for card dark mode
