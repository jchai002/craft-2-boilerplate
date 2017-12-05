// define global functions here
export class app {
  getSiteName() {
    return $("head title").text();
  }

  cleanAnchorHref() {
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
  }
}
