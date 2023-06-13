import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import CONFIG from '../../globals/config';
import LikeButtonPresenter from '../../utils/like-button-presenter';

const Detail = {
  async render() {
    return `
        <div class="detail-content">
            <div id="detailRestaurant" class="detailRestaurant"></div>
            <div id="likeButtonContainer"></div>
        </div>
    `;
  },

  async afterRender() {
    const url = window.location.hash.slice(1).toLowerCase();
    const urlParams = url.split('/');
    const pictureId = urlParams[2];

    const restaurantDetailContainer = document.querySelector('#detailRestaurant');
    restaurantDetailContainer.innerHTML = '';

    try {
      const response = await fetch(`https://restaurant-api.dicoding.dev/detail/${pictureId}`);
      const responseJson = await response.json();
      const { restaurant } = responseJson;

      const Menu = (menus) => {
        let menuList = '';

        menus.forEach((menu) => {
          menuList += `<li tabindex="0">${menu.name}</li>`;
        });
        return menuList;
      };

      const Review = (reviews) => {
        let reviewList = '';

        reviews.forEach((review) => {
          reviewList += `
            <div class="customer-review">
              <p tabindex="0"><span>Name :</span> ${review.name}</p>
              <p class="customer-review-date" tabindex="0"><span>Date :</span> ${review.date}</p>
              <p tabindex="0"><span>Review :</span> ${review.review}</p>
            </div>
            `;
        });
        return reviewList;
      };

      if (restaurant) {
        // Menampilkan elemen detail-item
        restaurantDetailContainer.innerHTML = `
                <h1 class="resto-name">${restaurant.name}</h2>
                <img class="resto-image" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
                <div class="resto-info">
                  <h2>Information</h2>
                  <h4>Address</h4>
                  <p>${restaurant.address}</p>
                  <h4>City</h4>
                  <p>${restaurant.city}</p>
                  <h4>Rating</h4>
                  <p>${restaurant.rating}</p>
                </div>
                <div class="resto-description">
                  <h3>Description</h3>
                  <p>${restaurant.description}</p>
                </div>
                <div class="restaurant-menu">
                    <div class="menu-foods">
                        <h3 tabindex="0">Foods :</h3>
                        <ul>${Menu(restaurant.menus.foods)}</ul>
                    </div>
                    <div class="menu-drinks">
                        <h3 tabindex="0">Drinks :</h3>
                        <ul>${Menu(restaurant.menus.drinks)}</ul>
                    </div>
                </div>
                
                <div class="customer-review">
                    <h3 tabindex="0">Customer Reviews</h3>
                    <div class="-customer-review-item">
                        ${Review(restaurant.customerReviews)}
                    </div>
                </div>
            `;
      } else {
        restaurantDetailContainer.innerHTML = '<p>Restaurant tidak ditemukan.</p>';
      }
    } catch (error) {
      console.log('Error:', error);
      restaurantDetailContainer.innerHTML = '<p>Terjadi kesalahan saat memuat data.</p>';
    }

    const likeButtonContainer = document.querySelector('#likeButtonContainer');
    likeButtonContainer.innerHTML = '';

    try {
      const response = await fetch(`https://restaurant-api.dicoding.dev/detail/${pictureId}`);
      const responseJson = await response.json();
      const { restaurant } = responseJson;

      if (restaurant) {
        likeButtonContainer.innerHTML = `
                <button aria-label="like this movie" id="likeButton" class="like">
                    <i class="fa fa-heart-o" aria-hidden="true"></i>
                </button>
            `;
      } else {
        likeButtonContainer.innerHTML = '<p>Restaurant tidak ditemukan.</p>';
      }
      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurant: FavoriteRestaurantIdb,
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          pictureId: restaurant.pictureId,
          rating: restaurant.rating,
        },
      });
    } catch (error) {
      console.log('Error:', error);
      likeButtonContainer.innerHTML = '<p>Terjadi kesalahan saat memuat data.</p>';
    }
  },
};

export default Detail;
