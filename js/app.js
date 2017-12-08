require([
    "esri/Map",
    "esri/views/MapView",
    "dojo/domReady!"
], function (WebMap, MapView) {


    var webmap = new WebMap({
        portalItem: {
          id: "41281c51f9de45edaf1c8ed44bb10e30" // This was created in the "Style a web map" and "Configure pop-ups" design labs
        }
      });

    var view = new MapView({
        container: "viewDiv",
        map: webmap
    });
});
