require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/WebMap",
    "esri/widgets/LayerList",

    "dojo/domReady!"
], function (Map,
    SceneView,
    WebMap,
    LayerList
) {

        var webmap = new WebMap({
            portalItem: {
                id: "93ecf4c2d8c34766b94d5a5becbf0cff" // This was created in the "Style a web map" and "Configure pop-ups" design labs
            }
        });

        var view = new SceneView({
            container: "viewDiv",
            map: webmap
        });


        var layerList = new LayerList({
            view: view
        });

        // Add widget to the top right corner of the view
        view.ui.add(layerList, "top-right");

    });
