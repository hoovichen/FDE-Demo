
export const PRODUCT_TRANSLATIONS = {
  zh: {
    product: {
      title: '我们的产品',
      stock: '库存',
      sales: '销量',
      price: 'RM',
      allProducts: '全部产品',
      description: '产品描述'
    },
    sort: {
      default: '默认排序',
      priceAsc: '价格从低到高',
      priceDesc: '价格从高到低',
      salesDesc: '销量优先',
      stockDesc: '库存优先'
    },
    categories: {
      1: '普通辣椒酱',
      2: '特制辣椒酱',
      3: '拌饭酱'
    },
    subcategories: {
      1: '微辣',
      2: '中辣',
      3: '特辣',
      4: '特制指天椒辣椒酱',
      5: '脆虾米拌饭酱',
      6: '江鱼仔拌饭酱'
    }
  },
  en: {
    product: {
      title: 'Our Products',
      stock: 'Stock',
      sales: 'Sales',
      price: 'RM',
      allProducts: 'All Products',
      description: 'Product Description'
    },
    sort: {
      default: 'Default Sort',
      priceAsc: 'Price Low to High',
      priceDesc: 'Price High to Low',
      salesDesc: 'Best Selling',
      stockDesc: 'Stock Priority'
    },
    categories: {
      1: 'Regular Chili Sauce',
      2: 'Special Chili Sauce',
      3: 'Rice Sauce'
    },
    subcategories: {
      1: 'Mild',
      2: 'Medium',
      3: 'Hot',
      4: 'Special Bird\'s Eye Chili Sauce',
      5: 'Crispy Shrimp Rice Sauce',
      6: 'Anchovy Rice Sauce'
    }
  }
}

export default {
  state: {
    currentLang: localStorage.getItem('lang') || 'zh'
  },
  mutations: {
    SET_LANGUAGE(state, lang) {
      state.currentLang = lang
      localStorage.setItem('lang', lang)
    }
  },
  actions: {
    switchLanguage({ commit }, lang) {
      commit('SET_LANGUAGE', lang)
    }
  },
  getters: {
    currentLang: state => state.currentLang
  },
  methods: {
    getTranslation(key) {
      const keys = key.split('.')
      let result = this.currentLang === 'zh'
        ? PRODUCT_TRANSLATIONS.zh
        : PRODUCT_TRANSLATIONS.en
      for (const k of keys) {
        if (result) {
          result = result[k]
        }
      }
      return result || key
    }
  }
}