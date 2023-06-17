import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';

let favoriteRestaurant = [];

const FavoriteRestaurantArray = {

  getRestaurant(id) {
    if (!id) {
      return;
    }

    return favoriteRestaurant.find((restaurant) => restaurant.id === id);
  },

  getAllRestaurant() {
    return favoriteRestaurant;
  },

  putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    // pastikan id ini belum ada dalam daftar favoriteRestaurant
    if (this.getRestaurant(restaurant.id)) {
      return;
    }

    favoriteRestaurant.push(restaurant);
  },

  deleteRestaurant(id) {
    // cara boros menghapus restaurant dengan meng-copy restayrant yang ada
    // kecuali restaurant dengan id == id
    favoriteRestaurant = favoriteRestaurant.filter((restaurant) => restaurant.id !== id);
  },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => favoriteRestaurant = []);

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});
