require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/WebMap",
    "dojo/domReady!"
], function (Map, SceneView, WebMap) {

    var webmap = new WebMap({
        portalItem: {
          id: "93ecf4c2d8c34766b94d5a5becbf0cff" // This was created in the "Style a web map" and "Configure pop-ups" design labs
        }
      });

    var view = new SceneView({
        container: "viewDiv",
        map: webmap
    });
});
