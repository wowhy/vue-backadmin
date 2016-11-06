<template>
	<aside class="app-sidebar animated-width">
		<div class="menu-container">
			<ul class="app-menus">
				<li>
					<router-link :to="{ name: 'home' }" exact>
						<span class="icon is-small"><i class="fa fa-home"></i></span>
						<span>首页</span>
					</router-link>
				</li>
				<li v-for="menu in menus">
					<router-link v-if="menu.url" :to="menu.url">
						<span class="icon is-small"><i :class="'fa fa-' + menu.icon"></i></span>
						<span>{{menu.name}}</span>
					</router-link>
					<div v-else>
						<a href="javascript:void(0)" :aria-expanded="isExpanded(menu)" @click="toggle(menu)">
							<span class="icon is-small"><i :class="'fa fa-' + menu.icon"></i></span>
							<span>{{menu.name}}</span>
							<span class="icon is-small is-angle" v-if="menu.children && menu.children.length">
                <i class="fa fa-angle-down"></i>
              </span>
						</a>
						<expanding>
							<ul v-show="isExpanded(menu)">
								<li v-for="subMenu in menu.children">
									<router-link :to="subMenu.url">
										{{subMenu.name}}
									</router-link>
								</li>
							</ul>
						</expanding>
					</div>
				</li>
			</ul>
		</div>
	</aside>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Expanding from '../Expanding'

  export default {
    components: {
      Expanding
    },
    computed: {
      ...mapGetters([
        'menus'
      ])
    },
    methods: {
      isExpanded(menu) {
        return menu.expanded
      },
      toggle(menu) {
        menu.expanded = !menu.expanded
        this.$forceUpdate()
      },
      shouldExpandMatchMenu(route) {
        this.menus.forEach(function(parentMenu) {
          if (parentMenu.children && parentMenu.children.length) {
            parentMenu.children.forEach(function(menu) {
              if (menu && menu.url && menu.url.toLowerCase() === route.path) {
                parentMenu.expanded = true
              }
            })
          }
        })
        this.$forceUpdate()
      }
    },
    mounted() {
      let route = this.$route
      if (route) {
        this.shouldExpandMatchMenu(route)
      }
    }
  }

</script>

<style lang="scss">
	@import '../variables';
	.app-sidebar {
		position: fixed;
		top: $header-height;
		left: 0;
		bottom: 0;
		width: $sidebar-width;
		min-width: 45px;
		max-height: 100vh;
		height: calc(100% - $header-height);
		z-index: 1024 - 1;
		overflow-y: auto;
		overflow-x: hidden;

		.icon {
			vertical-align: baseline;
			&.is-angle {
				position: absolute;
				right: 10px;
				transition: transform .377s ease;
			}
		}
		a {
			color: inherit;
			text-decoration: none;
		}
		.app-menus {
			li a {
				&[aria-expanded="true"] {
					.is-angle {
						transform: rotate(180deg);
					}
				}
			}
			li a+ul {
				margin: 0 10px 0 15px;
			}
		}
	}

	.sidebar-mini .app-sidebar {
		width: $mini-sidebar-width;
	}
	
	.app-theme-default {
		.app-sidebar {
			background: #fff;
		}
	}
</style>