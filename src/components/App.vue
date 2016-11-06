<template>
	<div id="app">
		<div class="wrapper app-theme-default" :class="{'sidebar-mini': !config.sidebar}" v-if="authed">
			<app-header></app-header>
			<app-sidebar></app-sidebar>
			<section class="app-body">
				<app-tabbar></app-tabbar>
				<div class="app-content">
					<transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
						<router-view class="animated"></router-view>
					</transition>
				</div>
			</section>
			<app-footer></app-footer>
		</div>
		<div class="wrapper" v-else>
			<login></login>
		</div>
	</div>
</template>

<script>
  import store from '../store'

  import {
    mapGetters
  } from 'vuex'

  import AppHeader from 'components/layout/Header'
  import AppTabbar from 'components/layout/Tabbar'
  import AppFooter from 'components/layout/Footer'
  import AppSidebar from 'components/layout/Sidebar'
  import Login from 'components/page/Login'

  export default {
    name: 'App',
    store,
    components: {
      AppHeader,
      AppTabbar,
      AppFooter,
      AppSidebar,
      Login
    },
    computed: {
      ...mapGetters([
        'authed',
        'config'
      ])
    },
    beforeMount() {
      const config = this.config
      const {
        body
      } = document
      const WIDTH = 768
      const RATIO = 3

      const handler = () => {
        if (!document.hidden) {
          let rect = body.getBoundingClientRect()
          config.mobile = rect.width - RATIO < WIDTH
          config.sidebar = !config.mobile
        }
      }

      document.addEventListener('visibilitychange', handler)
      window.addEventListener('DOMContentLoaded', handler)
      window.addEventListener('resize', handler)
    }
  }

</script>

<style lang="scss">
	@import './variables';
	@import '~animate.css';
	@import '~font-awesome/scss/font-awesome';
	@import '~element-ui/lib/theme-default/index.css';
	@import './core';
	html,
	body {
		font-family: $family-primary;
	}
	
	.animated {
		animation-duration: .377s;
	}
	
	html,
	body {
		margin: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	
	#app,
	#app .wrapper {
		height: 100%;
	}
	
	.app-body {
		padding-top: 50px;
		margin-left: $sidebar-width;
		transform: translate3d(0, 0, 0);
	}
	
	.app-content {
		padding: 20px;
	}
</style>