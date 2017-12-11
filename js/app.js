require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/WebMap",
    "esri/widgets/LayerList",
    "esri/widgets/Search",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",

    "dojo/domReady!"
], function (Map,
    SceneView,
    WebMap,
    LayerList,  
    Search,
    BasemapGallery,
    Expand
) {
        var webmap = new WebMap({
            portalItem: {
                id: "93ecf4c2d8c34766b94d5a5becbf0cff" 
            }
        });

        var view = new SceneView({
            container: "viewDiv",
            map: webmap
        });
        
        var layerList = new LayerList({
            view: view
        });

        var searchWidget = new Search({
            view: view
        });

        var basemapGallery = new BasemapGallery({
            view: view,
            container: document.createElement("div")
        });

        var bgExpand = new Expand({
            view: view,
            content: basemapGallery.container,
            expandIconClass: "esri-icon-basemap"
        });
        
        view.ui.add(searchWidget, {
            position: "top-right",
            index: 0
        });



        view.ui.add(bgExpand, "top-left");
        view.ui.add(layerList, "top-right");


    });
