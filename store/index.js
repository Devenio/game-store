export const state = () => ({
  categoryItems: {},
  subCategory: {},
  products: {}
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
  }
};
