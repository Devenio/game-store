export const state = () => ({
  categoryItems: {},
  subCategory: {},
  products: {},
  productsInfo: {},
  order: [],
  authenticated: false,
  userData: {},
  currentTab: ""
});

export const getters = {
  categoryItems: state => {
    return state.categoryItems;
  },
  subCategory: state => {
    return state.subCategory;
  },
  products: state => {
    return state.products;
  },
  productsInfo: state => {
    return state.productsInfo;
  },
  order: state => {
    return state.order;
  },
  authenticated: state => {
    return state.authenticated;
  },
  userData: state => {
    return state.userData;
  },
  currentTab: state => {
    return state.currentTab;
  },
};

export const mutations = {
  SET_CATEGORY_ITEMS: (state, payload) => {
    state.categoryItems = payload;
  },
  SET_SUB_CATEGORY_ITEMS: (state, payload) => {
    state.subCategory = payload;
  },
  SET_PRODUCTS: (state, payload) => {
    state.products = payload;
  },
  SET_PRODUCTS_INFO: (state, payload) => {
    state.productsInfo = payload;
  },
  ADD_ORDER: (state, payload) => {
    state.order.push(payload);
  },
  AUTHENTICATION: (state, payload) => {
    state.authenticated = payload;
  },
  SET_USER_DATA: (state, payload) => {
    state.userData = payload;
  },
  SET_CURRENT_TAB: (state, payload) => {
    state.currentTab = payload;
  },
};

export const actions = {
  setCategoryItems: ({ commit }, data) => {
    commit("SET_CATEGORY_ITEMS", data);
  },
  setSubCategoryItems: ({ commit }, data) => {
    commit("SET_SUB_CATEGORY_ITEMS", data);
  },
  setProducts: ({ commit }, data) => {
    commit("SET_PRODUCTS", data.body);
    commit("SET_PRODUCTS_INFO", data.info[0])
  },
  addOrder: ({ commit }, order) => {
    commit("ADD_ORDER", order);
  },
  authentication: ({ commit }, isAuthenticated) => {
    commit("AUTHENTICATION", isAuthenticated);
  },
  setUserData: ({ commit }, data) => {
    commit("SET_USER_DATA", data);
  },
  setCurrentTab: ({ commit }, tab) => {
    commit("SET_CURRENT_TAB", tab);
  },
};
