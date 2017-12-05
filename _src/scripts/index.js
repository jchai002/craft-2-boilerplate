import "bootstrap";
// import all components and save in components object
var components = {};
importAll(require.context("./components/", true, /\.js$/), components);

$(function() {
  const app = new components["app"]();
  app.cleanAnchorHref();
  console.log(app.getSiteName());
  const pageClass = $("body").data("scope");
  if (pageClass) {
    new components[pageClass]().init();
  }
});

// utility function to import all files in certain directory
function importAll(r, store) {
  r.keys().forEach(key => {
    var keyString = Object.keys(r(key))[0];
    store[keyString] = r(key)[keyString];
  });
}
