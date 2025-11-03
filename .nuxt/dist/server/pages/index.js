exports.ids = [4];
exports.modules = {

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/index.vue?vue&type=template&id=1286a9d5
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "m-1 md:m-12"
  }, [_vm._ssrNode("<div class=\"text-center\"><p class=\"my-2 text-lg text-gray-300 font-medium\">👋 Hi, I'm Toby and this is my blog where I write mostly about programming.</p> <p class=\"my-2 text-lg text-gray-300 font-medium\">🤷‍♂️ This is really just a place for me to think out loud, though I try to write in a way that others might find useful.</p> <p class=\"my-2 text-lg text-gray-300 font-medium\">🇦🇺 I'm based in Brisbane, Australia.</p> <p class=\"my-2 text-lg text-gray-300 font-medium\">📱 See my portfolio of apps built as an indie dev at <a href=\"https://sensortree.au\">sensortree.au</a></p></div> "), _vm._ssrNode("<ul class=\"my-10\">", "</ul>", _vm._l(_vm.articles, function (article) {
    return _vm._ssrNode("<li class=\"p-4 md:p-12 text-white font-thin my-1 md:my-3\">", "</li>", [_c('NuxtLink', {
      attrs: {
        "to": {
          name: 'slug',
          params: {
            slug: article.slug
          }
        }
      }
    }, [_c('div', {
      staticClass: "text-center"
    }, [_c('h4', {
      staticClass: "max-w-4xl mx-auto text-lg md:text-2xl text-thin inline-block p-2 mb-2 rounded underline",
      class: article.decoration
    }, [_vm._v(_vm._s(article.title))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.formatDate(article.createdAt)))])])])], 1);
  }), 0)], 2);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./pages/index.vue?vue&type=template&id=1286a9d5

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/index.vue?vue&type=script&lang=js
/* harmony default export */ var lib_vue_loader_options_pagesvue_type_script_lang_js = ({
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
// CONCATENATED MODULE: ./pages/index.vue?vue&type=script&lang=js
 /* harmony default export */ var pagesvue_type_script_lang_js = (lib_vue_loader_options_pagesvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(2);

// CONCATENATED MODULE: ./pages/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pagesvue_type_script_lang_js,
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