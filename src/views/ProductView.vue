<template>
  <div class="product-container">
    <!-- 页面标题 -->
    <h1 class="page-title">{{ getTranslation('product.title') }}</h1>

    <!-- 产品筛选和排序区域 -->
    <div class="filter-sort-container">
      <!-- 主分类导航按钮组 -->
      <div class="category-nav">
        <button class="category-btn" :class="{'active': !selectedCategory}" @click="resetFilters">
          {{ getTranslation('product.allProducts') }}
        </button>
        <button v-for="category in categories" :key="category.id" :class="['category-btn', {'active': selectedCategory === category.id}]" @click="selectedCategory = category.id">
          {{ getTranslation(`categories.${category.id}`) }}
        </button>
      </div>

      <!-- 子分类导航按钮组 - 仅在选择主分类时显示 -->
      <div v-if="currentSubcategories.length" class="subcategory-nav">
        <button v-for="sub in currentSubcategories" :key="sub.id" :class="['subcategory-btn', {'active': selectedSubcategory === sub.id}]" @click="selectedSubcategory = sub.id">
          {{ getTranslation(`subcategories.${sub.id}`) }}
        </button>
      </div>

      <!-- 排序下拉选择框 -->
      <div class="sort-options">
        <select v-model="sortBy" class="sort-select">
          <option value="default">{{ getTranslation('sort.default') }}</option>
          <option value="priceAsc">{{ getTranslation('sort.priceAsc') }}</option>
          <option value="priceDesc">{{ getTranslation('sort.priceDesc') }}</option>
          <option value="salesDesc">{{ getTranslation('sort.salesDesc') }}</option>
          <option value="stockDesc">{{ getTranslation('sort.stockDesc') }}</option>
        </select>
      </div>
    </div>

    <!-- 产品网格展示区域 -->
    <div class="products-grid">
      <div v-for="product in sortedProducts" :key="product.id" class="product-card" @click="showProductDetail(product)">
        <div class="product-image">
          <img :src="product.image" :alt="product.name" @error="handleImageError">
          <!-- 仅在库存低于50时显示库存标签 -->
          <span v-if="product.stock <= 50" class="stock-tag" :class="{'low-stock': product.stock < 50}">
            {{ getTranslation('product.stock') }}: {{ product.stock }}
          </span>
          <!-- 旧版本产品预览 -->
          <div v-if="product.oldImage" class="old-version-preview">
            <img :src="product.oldImage" :alt="'旧版 ' + product.name[currentLang]">
            <span class="old-version-label">{{ getTranslation('product.oldLabel') }}</span>
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-name">{{ product.name[currentLang] }}</h3>
          <div class="product-meta">
            <span class="price">RM {{ product.price.toFixed(2) }}</span>
            <span class="sales">{{ getTranslation('product.sales') }}: {{ product.sales }}+</span>
          </div>
          <div class="product-category">
            <span class="category-tag">{{ getCategoryName(product.categoryId) }}</span>
            <span class="subcategory-tag">{{ getSubcategoryName(product.subcategoryId) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 产品详情弹窗 - 点击产品卡片时显示 -->
    <div v-if="selectedProduct" class="product-modal" @click.self="closeProductDetail">
      <div class="modal-content">
        <button class="close-btn" @click="closeProductDetail">&times;</button>
        <div class="modal-inner">
          <!-- 弹窗左侧 - 产品图片 -->
          <div alt="甘文阁辣椒酱 | Kampung Koh Chili Sauce | 马来西亚辣椒酱 | Malaysian Chili Sauce | 脆虾米拌饭酱 | Crispy Shrimp Rice Sauce | 江鱼仔拌饭酱 | Anchovy Rice Sauce | 特制蒜蓉蘸料 | Special Garlic Sauce | 叁巴辣椒酱 | Sambal Chili Sauce" class="modal-image">
            <img :src="currentModalImage" :alt="selectedProduct.alt">
            <!-- 切换图片按钮 -->
            <button v-if="selectedProduct.oldImage" class="switch-image-btn" @click="toggleModalImage">
              <span class="arrow">></span>
            </button>
          </div>
          <!-- 弹窗右侧 - 产品详细信息 -->
          <div class="modal-info">
            <h2>{{ selectedProduct.name[currentLang] }}</h2>
            <p class="modal-price">RM {{ selectedProduct.price.toFixed(2) }}</p>
            <div class="modal-stats">
              <span>{{ getTranslation('product.sales') }}: {{ selectedProduct.sales }}+</span>
              <span>{{ getTranslation('product.stock') }}: {{ selectedProduct.stock }}</span>
            </div>
            <div class="modal-categories">
              <span class="category-tag">{{ getCategoryName(selectedProduct.categoryId) }}</span>
              <span class="subcategory-tag">{{ getSubcategoryName(selectedProduct.subcategoryId) }}</span>
            </div>
            <div class="product-description">
              <h3>产品描述</h3>
              <p>{{ selectedProduct.description || '暂无详细描述' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

// 产品相关的多语言翻译配置
const PRODUCT_TRANSLATIONS = {
  zh: {
    product: {
      title: '我们的产品',
      stock: '库存',
      sales: '销量',
      price: 'RM',
      allProducts: '全部产品',
      description: '产品描述',
      oldLabel: ' 旧版包装'
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
      6: '江鱼仔拌饭酱',
      7: '特制蒜蓉蘸料',
      8: '叁巴辣椒酱'
    }
  },
  en: {
    product: {
      title: 'Our Products',
      stock: 'Stock',
      sales: 'Sales',
      price: 'RM',
      allProducts: 'All Products',
      description: 'Product Description',
      oldLabel: ' Old Packages'
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
      6: 'Anchovy Rice Sauce',
      7: 'Special Garlic Sauce',
      8: 'Sambal Chili Sauce'
    }
  }
}

export default {
  name: 'ProductView',
  data() {
    return {
      // 筛选和排序状态
      selectedCategory: null,
      selectedSubcategory: null,
      sortBy: 'default',
      selectedProduct: null,
      showOldImage: false, // 新增：控制是否显示旧版图片

      // 产品分类数据
      categories: [
        { id: 1, name: '普通辣椒酱' },
        { id: 2, name: '特制辣椒酱' },
        { id: 3, name: '拌饭酱' }
      ],

      // 子分类数据
      subcategories: [
        { id: 1, categoryId: 1, name: '微辣' },
        { id: 2, categoryId: 1, name: '中辣' },
        { id: 3, categoryId: 1, name: '特辣' },
        { id: 4, categoryId: 2, name: '特制指天椒辣椒酱' },
        { id: 5, categoryId: 3, name: '脆虾米拌饭酱' },
        { id: 6, categoryId: 3, name: '江鱼仔拌饭酱' },
        { id: 7, categoryId: 3, name: '特制蒜蓉蘸料' },
        { id: 8, categoryId: 3, name: '叁巴辣椒酱' }
      ],

      // 产品数据
      products: [
        {
          id: 1,
          name: {
            zh: '经典微辣甘文阁辣椒酱 - 绿盖',
            en: 'Classic Mild Kampung Koh Chili Sauce - Green Cap'
          },
          price: 3.2,
          sales: 8000,
          stock: 200,
          image: require('@/assets/Products/chili_sos.jpg'),
          categoryId: 1,
          subcategoryId: 1,
          description: '采用精选辣椒制成，口感温和，适合大众口味。',
          alt: '经典微辣甘文阁辣椒酱 | Kampung Koh Chili Sauce | 马来西亚辣椒酱 | Malaysian Chili Sauce | 脆虾米拌饭酱 | Crispy Shrimp Rice Sauce | 江鱼仔拌饭酱 | Anchovy Rice Sauce | 特制蒜蓉蘸料 | Special Garlic Sauce | 叁巴辣椒酱 | Sambal Chili Sauce'
        },
        {
          id: 2,
          name: {
            zh: '经典中辣甘文阁辣椒酱 - 红盖',
            en: 'Classic Medium Kampung Koh Chili Sauce - Red Cap'
          },
          price: 3.2,
          sales: 8000,
          stock: 150,
          image: require('@/assets/Products/chili_red_new.png'),
          oldImage: require('@/assets/Products/chili_red.jpg'),
          categoryId: 1,
          subcategoryId: 2,
          description: '使用优质辣椒，辣度适中，风味浓郁。',
          alt: '经典中辣甘文阁辣椒酱 | Kampung Koh Chili Sauce | 马来西亚辣椒酱 | Malaysian Chili Sauce | 脆虾米拌饭酱 | Crispy Shrimp Rice Sauce | 江鱼仔拌饭酱 | Anchovy Rice Sauce | 特制蒜蓉蘸料 | Special Garlic Sauce | 叁巴辣椒酱 | Sambal Chili Sauce'
        },
        {
          id: 3,
          name: {
            zh: '经典特辣甘文阁辣椒酱 - 黄盖',
            en: 'Classic Hot Kampung Koh Chili Sauce - Yellow Cap'
          },
          price: 3.2,
          sales: 10000,
          stock: 100,
          image: require('@/assets/Products/chili_yellow.jpg'),
          oldImage: require('@/assets/Products/chili_yellow_old.jpg'),
          categoryId: 1,
          subcategoryId: 3,
          description: '使用优质辣椒，辣度适中，风味浓郁。',
          alt: '经典特辣甘文阁辣椒酱 | Kampung Koh Chili Sauce | 马来西亚辣椒酱 | Malaysian Chili Sauce | 脆虾米拌饭酱 | Crispy Shrimp Rice Sauce | 江鱼仔拌饭酱 | Anchovy Rice Sauce | 特制蒜蓉蘸料 | Special Garlic Sauce | 叁巴辣椒酱 | Sambal Chili Sauce'
        },
        {
          id: 4,
          name: {
            zh: '特制指天椒辣椒酱',
            en: 'Special Bird\'s Eye Chili Sauce'
          },
          price: 7.2,
          sales: 12000,
          stock: 30,
          image: require('@/assets/Products/spe_chili.jpg'),
          categoryId: 2,
          subcategoryId: 4,
          description: '采用新鲜指天椒，辣度十足，口感独特。',
          alt: '特制指天椒辣椒酱 | Special Bird\'s Eye Chili Sauce | 马来西亚辣椒酱 | Malaysian Chili Sauce | 脆虾米拌饭酱 | Crispy Shrimp Rice Sauce | 江鱼仔拌饭酱 | Anchovy Rice Sauce | 特制蒜蓉蘸料 | Special Garlic Sauce | 叁巴辣椒酱 | Sambal Chili Sauce'
        },
        {
          id: 5,
          name: {
            zh: '特制蒜蓉蘸料',
            en: 'Special Garlic Sauce'
          },
          price: 13.5,
          sales: 5000,
          stock: 800,
          image: require('@/assets/Products/suanrong.jpg'),
          categoryId: 3,
          subcategoryId: 7,
          description: '采用新鲜蒜蓉，口感独特。',
          alt: '特制蒜蓉蘸料 | Special Garlic Sauce | 马来西亚辣椒酱 | Malaysian Chili Sauce | 脆虾米拌饭酱 | Crispy Shrimp Rice Sauce | 江鱼仔拌饭酱 | Anchovy Rice Sauce | 特制指天椒辣椒酱 | Special Bird\'s Eye Chili Sauce | 叁巴辣椒酱 | Sambal Chili Sauce'
        },
        {
          id: 6,
          name: {
            zh: '叁巴辣椒酱',
            en: 'Sambal Chili Sauce'
          },
          price: 7.5,
          sales: 8000,
          stock: 1000,
          image: require('@/assets/Products/sambal.jpg'),
          categoryId: 3,
          subcategoryId: 8,
          description: '正宗叁巴辣椒酱，辣度适中，风味独特。',
          alt: '正宗叁巴辣椒酱 | Sambal Chili Sauce | 马来西亚辣椒酱 | Malaysian Chili Sauce | 脆虾米拌饭酱 | Crispy Shrimp Rice Sauce | 江鱼仔拌饭酱 | Anchovy Rice Sauce | 特制指天椒辣椒酱 | Special Bird\'s Eye Chili Sauce | 特制蒜蓉蘸料 | Special Garlic Sauce | 经典微辣甘文阁辣椒酱 | Kampung Koh Chili Sauce | 经典中辣甘文阁辣椒酱 | Kampung Koh Chili Sauce'
        },
        {
          id: 7,
          name: {
            zh: '江鱼仔拌饭酱',
            en: 'Anchovy Rice Sauce'
          },
          price: 9.0,
          sales: 6000,
          stock: 800,
          image: require('@/assets/Products/yinyu.jpg'),
          categoryId: 3,
          subcategoryId: 6,
          description: '采用新鲜江鱼仔特制，口感独特，适合拌饭、炒菜。',
          alt: '江鱼仔拌饭酱 | Anchovy Rice Sauce | 马来西亚辣椒酱 | Malaysian Chili Sauce | 脆虾米拌饭酱 | Crispy Shrimp Rice Sauce | 特制指天椒辣椒酱 | Special Bird\'s Eye Chili Sauce | 特制蒜蓉蘸料 | Special Garlic Sauce | 经典微辣甘文阁辣椒酱 | Kampung Koh Chili Sauce | 经典中辣甘文阁辣椒酱 | Kampung Koh Chili Sauce | 正宗叁巴辣椒酱 | Sambal Chili Sauce'
        },
        {
          id: 8,
          name: {
            zh: '脆虾米拌饭酱',
            en: 'Crispy Shrimp Rice Sauce'
          },
          price: 8.45,
          sales: 20000,
          stock: 8000,
          image: require('@/assets/Products/xiami.jpg'),
          categoryId: 3,
          subcategoryId: 5,
          description: '采用新鲜虾米特制，口感独特，适合拌饭、炒菜。',
          alt: '脆虾米拌饭酱 | Crispy Shrimp Rice Sauce | 马来西亚辣椒酱 | Malaysian Chili Sauce | 江鱼仔拌饭酱 | Anchovy Rice Sauce | 特制指天椒辣椒酱 | Special Bird\'s Eye Chili Sauce | 特制蒜蓉蘸料 | Special Garlic Sauce | 经典微辣甘文阁辣椒酱 | Kampung Koh Chili Sauce | 经典中辣甘文阁辣椒酱 | Kampung Koh Chili Sauce | 正宗叁巴辣椒酱 | Sambal Chili Sauce'
        }
      ]
    }
  },
  computed: {
    // 从Vuex获取当前语言设置
    ...mapState({
      currentLang: state => state.language.currentLang
    }),

    // 根据选中的主分类筛选子分类
    currentSubcategories() {
      return this.subcategories.filter(sub => sub.categoryId === this.selectedCategory)
    },

    // 根据分类筛选产品
    filteredProducts() {
      let result = this.products
      if (this.selectedCategory) {
        result = result.filter(p => p.categoryId === this.selectedCategory)
      }
      if (this.selectedSubcategory) {
        result = result.filter(p => p.subcategoryId === this.selectedSubcategory)
      }
      return result
    },

    // 对筛选后的产品进行排序
    sortedProducts() {
      const products = [...this.filteredProducts]
      switch (this.sortBy) {
        case 'priceAsc':
          return products.sort((a, b) => a.price - b.price)
        case 'priceDesc':
          return products.sort((a, b) => b.price - a.price)
        case 'salesDesc':
          return products.sort((a, b) => b.sales - a.sales)
        case 'stockDesc':
          return products.sort((a, b) => b.stock - a.stock)
        default:
          return products
      }
    },

    // 当前显示的弹窗图片
    currentModalImage() {
      if (!this.selectedProduct) return ''
      return this.showOldImage && this.selectedProduct.oldImage ? this.selectedProduct.oldImage : this.selectedProduct.image
    }
  },
  created() {
    // 处理从首页跳转过来的产品展示
    const productId = parseInt(this.$route.query.productId)
    if (productId) {
      const product = this.products.find(p => p.id === productId)
      if (product) {
        this.showProductDetail(product)
        // 自动选中对应的分类
        this.selectedCategory = product.categoryId
        this.selectedSubcategory = product.subcategoryId
      }
    }
  },
  methods: {
    // 重置所有筛选条件
    resetFilters() {
      this.selectedCategory = null
      this.selectedSubcategory = null
      this.sortBy = 'default'
    },

    // 获取多语言翻译
    getTranslation(key) {
      const keys = key.split('.')
      let result = PRODUCT_TRANSLATIONS[this.currentLang]
      for (const k of keys) {
        if (result) {
          result = result[k]
        }
      }
      return result || key
    },

    // 获取分类名称
    getCategoryName(categoryId) {
      return this.getTranslation(`categories.${categoryId}`)
    },

    // 获取子分类名称
    getSubcategoryName(subcategoryId) {
      return this.getTranslation(`subcategories.${subcategoryId}`)
    },

    // 显示产品详情弹窗
    showProductDetail(product) {
      this.selectedProduct = product
      this.showOldImage = false // 重置图片显示状态
      document.body.style.overflow = 'hidden' // 防止背景滚动
    },

    // 关闭产品详情弹窗
    closeProductDetail() {
      this.selectedProduct = null
      this.showOldImage = false // 重置图片显示状态
      document.body.style.overflow = 'auto' // 恢复背景滚动
    },

    // 切换弹窗中的图片显示
    toggleModalImage() {
      this.showOldImage = !this.showOldImage
    },

    // 处理图片加载失败
    handleImageError(e) {
      e.target.src = require('@/assets/Products/default.jpg')
    }
  }
}
</script>

<style scoped>
/* 主容器样式 */
.product-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 页面标题样式 */
.page-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 2em;
}

/* 筛选和排序区域样式 */
.filter-sort-container {
  margin-bottom: 30px;
}

/* 分类导航样式 */
.category-nav, .subcategory-nav {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

/* 分类按钮样式 */
.category-btn, .subcategory-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background: #f5f5f5;
  cursor: pointer;
  transition: all 0.3s;
}

/* 激活状态的分类按钮样式 */
.category-btn.active, .subcategory-btn.active {
  background: #e74c3c;
  color: white;
}

/* 排序选项样式 */
.sort-options {
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
}

/* 排序下拉框样式 */
.sort-select {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

/* 产品网格布局样式 */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

/* 产品卡片样式 */
.product-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s;
  cursor: pointer;
}

/* 产品卡片悬停效果 */
.product-card:hover {
  transform: translateY(-5px);
}

/* 产品图片容器样式 */
.product-image {
  position: relative;
  padding-top: 100%; /* 1:1 宽高比 */
}

/* 产品图片样式 */
.product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: scale-down;
}

/* 旧版本预览样式 */
.old-version-preview {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 8px;
  padding: 5px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.old-version-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.old-version-label {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.6);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7em;
  white-space: nowrap;
}
/* 切换图片按钮样式 */
.switch-image-btn {
  right: 10px;
  bottom: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.switch-image-btn:hover {
  background: #fff;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.switch-image-btn .arrow {
  font-size: 20px;
  color: #333;
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}

/* 库存标签样式 */
.stock-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 8px;
  background: rgba(0,0,0,0.6);
  color: white;
  border-radius: 4px;
  font-size: 0.8em;
}

/* 低库存标签样式 */
.stock-tag.low-stock {
  background: rgba(231,76,60,0.8);
}

/* 产品信息区域样式 */
.product-info {
  padding: 15px;
}

/* 产品名称样式 */
.product-name {
  margin: 0 0 10px;
  font-size: 1.1em;
  color: #333;
}

/* 产品元信息样式 */
.product-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

/* 价格样式 */
.price {
  color: #e74c3c;
  font-weight: bold;
  font-size: 1.2em;
}

/* 销量样式 */
.sales {
  color: #666;
  font-size: 0.9em;
}

/* 产品分类标签容器样式 */
.product-category {
  display: flex;
  gap: 8px;
}

/* 分类标签样式 */
.category-tag, .subcategory-tag {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8em;
  background: #f0f0f0;
  color: #666;
}

/* 产品详情弹窗样式 */
.product-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 弹窗内容样式 */
.modal-content {
  background: white;
  border-radius: 10px;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 20px;
}

/* 弹窗内部布局样式 */
.modal-inner {
  display: flex;
  gap: 30px;
}

/* 关闭按钮样式 */
.close-btn {
  position: absolute;
  right: 20px;
  top: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 1;
}

/* 弹窗图片区域样式 */
.modal-image {
  flex: 1;
  max-width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 弹窗图片样式 */
.modal-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
  max-height: 500px;
}

/* 弹窗信息区域样式 */
.modal-info {
  flex: 1;
  padding: 0 20px;
}

/* 弹窗价格样式 */
.modal-price {
  color: #e74c3c;
  font-size: 1.5em;
  font-weight: bold;
  margin: 10px 0;
}

/* 弹窗统计信息样式 */
.modal-stats {
  display: flex;
  gap: 20px;
  margin: 10px 0;
  color: #666;
}

/* 产品描述区域样式 */
.product-description {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

/* 响应式设计样式 */
@media (max-width: 768px) {
  /* 移动端弹窗样式调整 */
  .modal-content {
    width: 95%;
    margin: 10px;
    padding: 15px;
  }

  /* 移动端弹窗内容布局调整 */
  .modal-inner {
    flex-direction: column;
    gap: 20px;
  }

  /* 移动端图片区域调整 */
  .modal-image {
    max-width: 100%;
    height: auto;
    max-height: 40vh;
  }

  /* 移动端图片大小调整 */
  .modal-image img {
    max-height: 40vh;
  }

  /* 移动端信息区域调整 */
  .modal-info {
    padding: 0;
  }

  /* 移动端产品网格调整 */
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}
</style>
