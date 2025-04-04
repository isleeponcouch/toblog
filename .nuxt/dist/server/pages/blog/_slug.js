exports.ids = [3];
exports.modules = {

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/blog/_slug.vue?vue&type=template&id=733729b0
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_vm._ssrNode("<pre>" + _vm._ssrEscape(" " + _vm._s(_vm.article) + " ") + "</pre>")]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./pages/blog/_slug.vue?vue&type=template&id=733729b0

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/blog/_slug.vue?vue&type=script&lang=js
/* harmony default export */ var _slugvue_type_script_lang_js = ({
  async asyncData({
    $content,
    params
  }) {
    const article = await $content('articles', params.slug).fetch();
    return {
      article
    };
  }
});
// CONCATENATED MODULE: ./pages/blog/_slug.vue?vue&type=script&lang=js
 /* harmony default export */ var blog_slugvue_type_script_lang_js = (_slugvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(2);

// CONCATENATED MODULE: ./pages/blog/_slug.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  blog_slugvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "2f6f01c8"
  
)

/* harmony default export */ var _slug = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=_slug.js.map