import Vue from 'vue'
import Router from 'vue-router'
import ContentsList from '@/components/ContentsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'contentsList',
      component: ContentsList
    }
  ]
})
