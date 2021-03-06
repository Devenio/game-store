export const state = () => ({
  categoryItems: {},
  subCategory: {},
  products: {},
  productsInfo: {},
  order: [],
  authenticated: false,
  userData: {},
  currentTab: "",
  locale: "fa",
  token: "",
  agent_id: 0,
  total_price: 0
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
  locale: state => {
    return state.locale;
  },
  token: state => {
    return state.token;
  },
  agent_id: state => {
    return state.agent_id;
  },
  total_price: state => {
    return state.total_price;
  }
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
  SET_LOCALE: (state, payload) => {
    state.locale = payload;
  },
  SET_TOKEN: (state, payload) => {
    state.token = payload;
  },
  SET_AGENT_ID: (state, payload) => {
    state.agent_id = payload;
  },
  SET_TOTAL_PRICE: (state, payload) => {
    state.total_price = payload;
  }
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
    commit("SET_PRODUCTS_INFO", data.info[0]);
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
  setLocale: ({ commit }, locale) => {
    commit("SET_LOCALE", locale);
  },
  setToken: ({ commit }, token) => {
    commit("SET_TOKEN", token);
  }
};
