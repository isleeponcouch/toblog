exports.ids = [4];
exports.modules = {

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/index.vue?vue&type=template&id=757613cb&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"m-12 space-y-8"},[_vm._ssrNode("<div class=\"space-y-2 text-center\"><h1 class=\"text-2xl font-thin\">Sometimes I code. Other times I make croissants and things like that.</h1> <p class=\"text-1xl font-medium\">Here things are written. The value of the things is questionable.</p></div> "),_vm._ssrNode("<ul>","</ul>",_vm._l((_vm.articles),function(article){return _vm._ssrNode("<li"+(_vm._ssrClass("p-12 text-5xl text-white font-thin my-3",article.bg))+">","</li>",[_c('NuxtLink',{attrs:{"to":{ name: 'slug', params: { slug: article.slug } }}},[_c('div',[_c('h4',{staticClass:"max-w-4xl mx-auto text-4xl text-thin text-center"},[_vm._v(_vm._s(article.title))])])])],1)}),0)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/index.vue?vue&type=template&id=757613cb&

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
/* harmony default export */ var lib_vue_loader_options_pagesvue_type_script_lang_js_ = ({
  async asyncData({
    $content,
    params
  }) {
    const articles = await $content('articles').only(['title', 'slug', 'bg']).sortBy('createdAt', 'desc').fetch();
    return {
      articles
    };
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