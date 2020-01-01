import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Category from "../components/Category";
import FileUpload from '../components/commons/FileUpload'
import fileDownload from '../components/commons/FileDownload'
import Items from "../components/commons/Items";
import Mymd from "../components/Mymd";
import AddGoods from "../components/AddGoods";
import Cascader from "../components/commons/Cascader";
import GoodsInfo from "../components/GoodsInfo";
import Search from "../components/Search";


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/category/:cid',
      name: 'Category',
      component: Category
    },
    {
      path: '/fileupload',
      name: 'FileUpload',
      component: FileUpload
    },
    {
      path: '/filedownload',
      name: 'FileDownload',
      component: fileDownload
    },{
      path: '/item',
      name: 'Items',
      component: Items
    },
    {
      path: '/mymd',
      name: 'Mymd',
      component: Mymd
    },
    {
      path: '/addgoods',
      name: 'AddGoods',
      component: AddGoods
    },

    {
      path: '/goods/:goodsid',
      name: 'GoodsInfo',
      component:GoodsInfo
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
  ]
})
