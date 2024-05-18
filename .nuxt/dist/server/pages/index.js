exports.ids = [4];
exports.modules = {

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/index.vue?vue&type=template&id=303a5be7&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"m-1 md:m-12"},[_vm._ssrNode("<div class=\"text-center\"><p class=\"my-2 text-lg text-gray-300 font-medium\">👋 Hi, I'm Tobias and this is my blog where I write mostly about software development.</p> <p class=\"my-2 text-lg text-gray-300 font-medium\">🇦🇺 I'm based in Brisbane Australia</p> <p class=\"my-2 text-lg text-gray-300 font-medium\">✉️ If you would like to talk to me about anything I've written here, please email tobias at sensortree dot au</p></div> "),_vm._ssrNode("<ul class=\"my-10\">","</ul>",_vm._l((_vm.articles),function(article){return _vm._ssrNode("<li class=\"p-4 md:p-12 text-white font-thin my-1 md:my-3\">","</li>",[_c('NuxtLink',{attrs:{"to":{ name: 'slug', params: { slug: article.slug } }}},[_c('div',{staticClass:"text-center"},[_c('h4',{staticClass:"max-w-4xl mx-auto text-lg md:text-2xl text-thin inline-block p-2 mb-2 rounded underline",class:article.decoration},[_vm._v(_vm._s(article.title))]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.formatDate(article.createdAt)))])])])],1)}),0)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/index.vue?vue&type=template&id=303a5be7&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var lib_vue_loader_options_pagesvue_type_script_lang_js_ = ({
  async asyncData({
    $content,
    params
  }) {
    const articles = await $content('articles').only(['title', 'slug', 'bg', 'decoration', 'createdAt']).sortBy('createdAt', 'desc').fetch();
    return {
      articles
    };
  },

  methods: {
    formatDate(date) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      return new Date(date).toLocaleDateString('en', options);
    }

  }
});
// CONCATENATED MODULE: ./pages/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var pagesvue_type_script_lang_js_ = (lib_vue_loader_options_pagesvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(2);

// CONCATENATED MODULE: ./pages/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pagesvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "cff48892"
  
)

/* harmony default export */ var pages = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=index.js.map