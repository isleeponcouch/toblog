exports.ids = [2];
exports.modules = {

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/_slug.vue?vue&type=template&id=708a9538
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('article', {
    staticClass: "m-4 md:m-12"
  }, [_vm._ssrNode("<div class=\"grid md:grid-cols-2 gap-4\"><div class=\"text-left font-medium text-white\"><a href=\"https://umount.dev\"><span" + _vm._ssrClass("inline-block py-1 px-3 rounded align-middle text-center", _vm.article.bg) + ">↵</span> umount.dev</a></div> <div class=\"text-center md:text-right\"></div></div> <header class=\"p-4 py-16 md:p-12 md:py-40 text-center text-white my-10 space-y-20\"><div class=\"max-w-4xl mx-auto\"><h1 class=\"text-xl md:text-4xl font-thin mb-4\">" + _vm._ssrEscape(_vm._s(_vm.article.title)) + "</h1> " + (_vm.article.createdAt == _vm.article.updatedAt ? "<p" + _vm._ssrClass("md:font-medium text-sm md:text-base rounded inline-block p-1 px-4", _vm.article.bg) + ">" + _vm._ssrEscape("Published " + _vm._s(_vm.formatDate(_vm.article.createdAt))) + "</p>" : "<!---->") + " " + (_vm.article.createdAt != _vm.article.updatedAt ? "<p" + _vm._ssrClass("md:font-medium text-sm md:text-base rounded inline-block p-1 px-4", _vm.article.bg) + ">" + _vm._ssrEscape("First published " + _vm._s(_vm.formatDate(_vm.article.createdAt)) + ". Updated " + _vm._s(_vm.formatDate(_vm.article.updatedAt))) + "</p>" : "<!---->") + "</div></header> " + (_vm.article.archived ? "<div role=\"alert\" class=\"max-w-2xl mx-auto space-y-6 border-t-4 rounded-b px-4 py-3 shadow-md my-3 bg-gray-600\"><div class=\"flex\"><div class=\"py-1\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" class=\"fill-current h-6 w-6 mr-4\"><path d=\"M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z\"></path></svg></div> <div><p class=\"font-bold\">This article was published a really long time ago.</p> <p class=\"text-sm\">Its value then was likely questionable. Its value now is certainly pure nostalgia.</p></div></div></div>" : "<!---->") + " "), _c('nuxt-content', {
    staticClass: "max-w-2xl mx-auto space-y-6",
    attrs: {
      "document": _vm.article
    }
  })], 2);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./pages/_slug.vue?vue&type=template&id=708a9538

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/_slug.vue?vue&type=script&lang=js
/* harmony default export */ var _slugvue_type_script_lang_js = ({
  async asyncData({
    $content,
    params
  }) {
    const article = await $content('articles', params.slug).fetch();
    return {
      article
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
// CONCATENATED MODULE: ./pages/_slug.vue?vue&type=script&lang=js
 /* harmony default export */ var pages_slugvue_type_script_lang_js = (_slugvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(2);

// CONCATENATED MODULE: ./pages/_slug.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_slugvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "d361cb22"
  
)

/* harmony default export */ var _slug = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=_slug.js.map