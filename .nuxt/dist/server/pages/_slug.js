exports.ids = [2];
exports.modules = {

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/_slug.vue?vue&type=template&id=769252e8&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',{staticClass:"m-12"},[_vm._ssrNode("<div><a href>↵ Back</a> <p class=\"font-thin float-right\">"+_vm._ssrEscape("Published "+_vm._s(_vm.formatDate(_vm.article.createdAt))+", last updated "+_vm._s(_vm.formatDate(_vm.article.updatedAt)))+"</p></div> <header"+(_vm._ssrClass("p-12 py-40 text-center text-white my-3 space-y-20",_vm.article.bg))+"><h1 class=\"text-5xl font-thin\">"+_vm._ssrEscape(_vm._s(_vm.article.title))+"</h1></header> "+((_vm.article.archived)?("<div role=\"alert\" class=\"border-t-4 rounded-b px-4 py-3 shadow-md my-3\"><div class=\"flex\"><div class=\"py-1\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" class=\"fill-current h-6 w-6 mr-4\"><path d=\"M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z\"></path></svg></div> <div><p class=\"font-bold\">This article was published a really long time ago.</p> <p class=\"text-sm\">Its value then was likely questionable. Its value now is certainly pure nostalgia.</p></div></div></div>"):"<!---->")+" "),_c('nuxt-content',{staticClass:"container mx-auto space-y-6",attrs:{"document":_vm.article}})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/_slug.vue?vue&type=template&id=769252e8&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/_slug.vue?vue&type=script&lang=js&
/* harmony default export */ var _slugvue_type_script_lang_js_ = ({
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
// CONCATENATED MODULE: ./pages/_slug.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_slugvue_type_script_lang_js_ = (_slugvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(2);

// CONCATENATED MODULE: ./pages/_slug.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_slugvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "18417528"
  
)

/* harmony default export */ var _slug = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=_slug.js.map