const Home = {
  async render() {
    return `
        <div class="content-post" id="resto-content"></div>
    `;
  },

  async afterRender() {
    fetch('https://restaurant-api.dicoding.dev/list')
      .then((response) => response.json())
      .then((data) => {
        const restoContent = document.getElementById('resto-content');
        let restos = '';
        data.restaurants.forEach((restaurants) => {
          restos += `
        <article class="post">
          <img tabindex="0" class="post-img lazyload"
          data-src="https://restaurant-api.dicoding.dev/images/medium/${restaurants.pictureId}"
               alt="Gambar Restoran ${restaurants.name}">
          <div class="post-content">
          <h1 tabindex="0" class="post-content-title"><a href="/#/detail/${restaurants.id}">${restaurants.name}</a></h1>
            <h2 tabindex="0" class="post-content-city">${restaurants.city}</h2>
            <h2 tabindex="0" class="post-content-rating">Rating: ${restaurants.rating}</h2>
            <p tabindex="0" class="post-content-desc">${restaurants.description}</p>
          </div>
        </article>`;
        });

        restoContent.innerHTML = restos;
      })
      .catch((error) => console.error(error));
  },
};

export default Home;
