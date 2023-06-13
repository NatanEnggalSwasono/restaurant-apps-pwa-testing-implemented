import API_ENDPOINT from '../globals/api-endpoint';

class TheRestaurantDbSource {
  static async listRestaurants() {
    const response = await fetch(API_ENDPOINT.HOME);
    const responseJson = await response.json();
    return responseJson.results;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }
}

export default TheRestaurantDbSource;
