require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/WebMap",
    "esri/widgets/LayerList",
    "esri/widgets/Search",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",
    "esri/widgets/Legend",

    "dojo/domReady!"
], function (Map,
    SceneView,
    WebMap,
    LayerList,
    Search,
    BasemapGallery,
    Expand,
    Legend
) {
        var webmap = createWidget("webMap");
        var view = createWidget("sceneView");
        var layerList = createWidget("layerList");
        var searchWidget = createWidget("search");
        var basemapGallery = createWidget("basemapGallery");
        var bgExpand = createWidget("expand");
        
        view.then(function() {
            var legend = createWidget("legend");
            legend.startup();
            view.ui.add(legend, "bottom-left");
        });
        view.ui.add(searchWidget, {
            position: "top-right",
            index: 0
        });
        view.ui.add(bgExpand, "top-left");
        view.ui.add(layerList, "top-right");


        function createWidget(name) {
            if (name == 'webMap') {
                return new WebMap({
                    portalItem: {
                        id: "93ecf4c2d8c34766b94d5a5becbf0cff"
                    }
                });

            } else if (name == 'sceneView') {
                return new SceneView ({
                    container: "viewDiv",
                    map: webmap
                });

            } else if (name == 'layerList') {
                return new LayerList({
                    view: view
                });

            } else if (name == 'search') {
                return new Search({
                    view: view
                });

            } else if (name == 'basemapGallery') {
                return new BasemapGallery({
                    view: view,
                    container: document.createElement("div")
                });

            } else if (name == 'expand') {
                return new Expand({
                    view: view,
                    content: basemapGallery.container,
                    expandIconClass: "esri-icon-basemap"
                });

            } else if (name == 'legend') {
                var i=0;
                var layers = Array();
                while (typeof webmap.layers.getItemAt(i) != 'undefined') {
                    layers[i] = {
                        layer: webmap.layers.getItemAt(i),
                        title: webmap.layers.title
                    };
                    i++;
                }
                return new Legend({
                    view: view, layerInfos: layers
                });
            }
        }

    });
