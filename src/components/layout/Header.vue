<template>
	<section class="app-header">
		<a href="./" class="logo animated-width">
			<span class="logo-lg">
        Vue-BackAdmin
      </span>
			<span class="logo-mini">
        Vue
      </span>
		</a>
		<nav class="top-navbar animated-marginleft">
			<a class="sidebar-toggle" @click="toggleSidebar">
			</a>
		</nav>
	</section>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import auth from '../../utils/auth'

  export default {
    computed: {
      ...mapGetters([
        'config'
      ])
    },
    methods: {
      ...mapActions([
        'toggleSidebar'
      ]),
      logout() {
        auth.logout().then(() => {
          this.$store.commit('authed', false)
        })
      }
    }
  }

</script>

<style lang="scss">
	@import '../variables';
	.app-header {
		position: fixed;
		min-width: 100%;
		height: $header-height;
		top: 0;
		left: 0;
		z-index: 1024;
		.logo {
			display: block;
			height: $header-height;
			line-height: $header-height;
			font-weight: 300;
			font-size: 20px;
			padding: 0 15px;
			width: $sidebar-width;
			float: left;
			overflow: hidden;
			.logo-mini {
				display: none;
			}
		}
		.top-navbar {
			display: block;
			margin-left: $sidebar-width;
			min-height: $header-height;
			transition: margin-left .3s ease-in-out;
		}
		.sidebar-toggle {
			float: left;
			padding: 15px 15px;
			font-family: fontAwesome;
			height: $header-height;
			&:before {
				content: "\f0c9";
			}
		}
	}
	
	.sidebar-mini .app-header {
		.logo {
			width: $mini-sidebar-width;
      .logo-lg {
        display: none;
      }
      .logo-mini {
        display: block;
        margin-left: -10px;
      }
		}
    .top-navbar {
      margin-left: $mini-sidebar-width;
    }
	}
	
	.app-theme-default .app-header {
		.logo {
			color: #fff;
			background: #367fa9;
		}
		.top-navbar {
			background: #3c8dbc;
		}
		.sidebar-toggle {
			color: #fff;
			&:hover {
				background: #367fa9;
			}
		}
	}
</style>