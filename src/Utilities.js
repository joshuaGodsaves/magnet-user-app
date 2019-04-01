import axios from "axios";

let STORE_API_URL = "localhost:5000/api/store/storeid";

axios.create({
  headers: {
    "X-store-auth": undefined,
    "X-user-ath": undefined
  }
});

export function getStoreDetails() {
  axios.get(STORE_API_URL).then(v => {});
}

export function updateStoreDetails(data) {
  axios.put(STORE_API_URL, data);
}

export function addProduct(product) {
  axios.post(STORE_API_URL + "/product", {});
}

export function updateProduct(productId, data) {
  axios.put(STORE_API_URL + "/product", data);
}

export function loginUser(userName, userPassword) {}

export function getPosts() {
  axios.get(STORE_API_URL + "/blog");
}

export function addPost(data) {
  axios.post(STORE_API_URL + "/blog", data);
}

export function updatePost(data) {
  axios.put(STORE_API_URL + "/blog", data);
}

export function getOrders() {
  axios.get(STORE_API_URL + "/order");
}

export function getServices() {}
export function addServices(service) {}

export function updateService(service) {}

export function Login() {}
