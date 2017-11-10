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
});
