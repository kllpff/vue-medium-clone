<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'globalFeed'}">
        MediumClone
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            :to="{name: 'globalFeed'}"
            exact
          >
            Home
          </router-link>
        </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{name: 'createArticle'}"
            >
              <i class="ion-compose"></i>&nbsp;New article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{name: 'settings'}"
            >
              <i class="ion-gear-a"></i>&nbsp;Settings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{name: 'userProfile', params: {slug: currentUser.username}}"
            >
              <img :src="currentUser.image" class="user-pic" />
              &nbsp;
              {{ currentUser.username }}
            </router-link>
          </li>
        </template>
        <template v-if="isAnonymous">
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{name: 'login'}"
            >
              Sign in
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{name: 'register'}"
            >
              Sign up
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import {getterTypes} from '@/store/modules/auth'
import {mapGetters} from 'vuex'

export default {
  name: 'McvTopbar',

  computed: {
    // TODO: используем геттеры, если мы получаем из стейта один и тот же код, либо хотим как-то фильтровать/нормализировать данные
    ...mapGetters({
      currentUser: getterTypes.currentUser,
      isLoggedIn: getterTypes.isLoggedIn,
      isAnonymous: getterTypes.isAnonymous,
    }),

    // ...mapState({
    //   // currentUser: (state) => state.auth.currentUser,
    //   // isLoggedIn: (state) => state.auth.isLoggedIn,
    // }),
    // currentUser() {
    //   return this.$store.getters[getterTypes.currentUser]
    // },
    // isLoggedIn() {
    //   return this.$store.getters[getterTypes.isLoggedIn]
    // },
    // isAnonymous() {
    //   return this.$store.getters[getterTypes.isAnonymous]
    // },
  },
}
</script>
