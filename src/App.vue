<template>
  <div id="linker">
    <div class="header">
      <div class="header-container">
        <router-link to="/"><img alt="logo" src="./assets/logo.png" class="logo-img"></router-link>
        <div class="hidden-menu-button" @click="toggleMenu">
          &#9776;
        </div>
      </div>
      <div class="menu-container" :class="{'menu-open': isMenuOpen}">
        <ul class="menu">
          <li class="menu-item">
            <router-link to="/" :class="{'no-active': isHomePage}">Home</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/product">Products</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/">Our Stories</router-link>
          </li>
        </ul>
        <ul class="menu secondary-menu">
          <li class="menu-item secondary-menu-item">
            <router-link to="/about">About Us</router-link>
          </li>
          <li class="menu-item secondary-menu-item">
            <router-link to="/">Ask Us</router-link>
          </li>
          <li class="menu-item secondary-menu-item">
            <router-link to="/">Contacts</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="view">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false
    }
  },
  computed: {
    isHomePage() {
      return this.$route.path === '/'
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
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
  width:  100vw;
  height: 100vw;
}
</style>
