import "bootstrap";

// utility function to import all files in certain directory
function importAll(r, store) {
  r.keys().forEach(key => {
    var keyString = Object.keys(r(key))[0];
    store[keyString] = r(key)[keyString];
  });
}
// import all components and save in components object
var components = {};
importAll(require.context("./components/", true, /\.js$/), components);

$(function() {
  var pageScope = $("body").data("scope");
  if (pageScope) {
    components[pageScope].init();
  }

  // HACK: sometimes craft inexplicably add index.php?p= to all links, even when the 'omitScriptNameInUrls' general config is set to true. see: https://craftcms.com/support/remove-index.php
  // this code removes the unwanted url modification from all links on the frontend.

  $("a").each(function() {
    var $a = $(this);
    var hrefMod = $a.attr("href");
    if (hrefMod) {
      hrefMod = hrefMod.replace("index.php?p=", "");
    }
    $a.attr("href", hrefMod);
  });
});
