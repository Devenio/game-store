export const state = () => ({
  categoryItems: {},
  subCategory: {}
});

export const getters = {
  categoryItems: state => {
    return state.categoryItems;
  },
  subCategory: state => {
    return state.subCategory;
  }
};

export const mutations = {
  SET_CATEGORY_ITEMS: (state, payload) => {
    state.categoryItems = payload;
  },
  SET_SUB_CATEGORY_ITEMS: (state, payload) => {
    state.subCategory = payload;
  }
};

export const actions = {
  setCategoryItems: ({ commit }, data) => {
    commit("SET_CATEGORY_ITEMS", data);
  },
  setSubCategoryItems: ({ commit }, data) => {
    commit("SET_SUB_CATEGORY_ITEMS", data);
  }
};
