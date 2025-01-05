<template>
  <div id="linker">
    <!-- 顶部导航区域 -->
    <div class="header">
      <!-- Logo和导航容器 -->
      <div class="header-container">
        <!-- Logo区域 -->
        <router-link class="header-logo-container" to="/">
          <img alt="logo" src="./assets/logo-3-topic.png" class="logo-img">
        </router-link>

        <!-- 移动端菜单按钮 - 仅在小屏幕显示 -->
        <button class="hidden-menu-button" @click="toggleMenu" aria-label="Toggle menu">
          <span class="menu-icon">&#9776;</span>
        </button>

        <!-- 导航菜单容器 - 响应式布局 -->
        <nav class="menu-container" :class="{'menu-open': isMenuOpen}" aria-label="Main navigation">
          <!-- 主导航菜单列表 -->
          <ul class="menu">
            <li class="menu-item">
              <router-link to="/" class="nav-link" :class="{'active': $route.path === '/'}">首页</router-link>
            </li>
            <li class="menu-item">
              <router-link to="/product" class="nav-link" :class="{'active': $route.path === '/product'}">产品</router-link>
            </li>
            <li class="menu-item">
              <router-link to="/stories" class="nav-link" :class="{'active': $route.path === '/stories'}">品牌故事</router-link>
            </li>
            <li class="menu-item">
              <router-link to="/about" class="nav-link" :class="{'active': $route.path === '/about'}">关于我们</router-link>
            </li>
            <li class="menu-item">
              <router-link to="/faq" class="nav-link" :class="{'active': $route.path === '/faq'}">常见问题</router-link>
            </li>
            <li class="menu-item">
              <router-link to="/contact" class="nav-link" :class="{'active': $route.path === '/contact'}">联系我们</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="view">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
  },
  // 监听路由变化,关闭移动端菜单
  watch: {
    $route() {
      this.isMenuOpen = false
    }
  }
}
</script>

<style>
@import 'AppStyle.scss';

#linker {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  overflow-x: hidden;
}

/* 头部导航样式 */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #F9EBC7;
  z-index: 1000;
  padding: 10px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 主要内容区域样式 */
.view {
  padding-top: 120px;
  min-height: calc(100vh - 120px);
  width: 100%;
  position: relative;
}

/* Logo和导航容器样式 */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
}

/* Logo样式 */
.header-logo-container {
  flex-shrink: 0;
  margin-right: 20px;
}

.logo-img {
  height: 80px;
  width: auto;
  transition: transform 0.3s ease;
}

.logo-img:hover {
  transform: scale(1.05);
}

/* 导航菜单样式 */
.menu-container {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.menu {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: nowrap; /* 防止换行 */
}

/* 导航链接样式 */
.nav-link {
  color: #666;
  text-decoration: none;
  font-size: 16px;
  padding: 8px 0;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #a49a82;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #2c3e50;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

/* 移动端菜单按钮样式 */
.hidden-menu-button {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 8px;
  transition: color 0.3s ease;
}

.hidden-menu-button:hover {
  color: #2c3e50;
}

/* 响应式布局 - 768px以下直接切换到移动端样式 */
@media (max-width: 768px) {
  .header-container {
    min-width: auto;
    padding: 0 15px;
  }

  .header {
    padding: 10px 0;
  }

  .view {
    padding-top: 70px;
  }

  .logo-img {
    height: 50px;
  }

  /* 移动端菜单按钮显示 */
  .hidden-menu-button {
    display: block;
    z-index: 1001;
  }

  /* 移动端导航菜单样式 */
  .menu-container {
    display: none;
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: calc(100vh - 70px);
    background-color: #F9EBC7;
    margin: 0;
    padding: 20px;
    overflow-y: auto;
    z-index: 1000;
  }

  .menu-container.menu-open {
    display: block;
  }

  .menu {
    flex-direction: column;
    gap: 0;
    width: 100%;
  }

  .menu-item {
    width: 100%;
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }

  .menu-item:last-child {
    border-bottom: none;
  }

  .nav-link {
    display: block;
    padding: 15px 0;
    font-size: 16px;
    text-align: center;
    width: 100%;
  }
}

/* 更小屏幕的适配 */
@media (max-width: 300px) {
  .view {
    padding-top: 60px;
  }

  .logo-img {
    height: 40px;
  }
}
</style>
