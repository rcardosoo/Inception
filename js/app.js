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
        //====== Atributos globais
        var webmap = createWidget("webMap");
        var view = createWidget("sceneView");
        var basemapGallery = createWidget("basemapGallery");

        //====== Componentes
        addLayerList();
        addSearch();
        addBGExpand();
        addLegend();
        
        //======= Definição de funções
        function addLayerList() {
            //instancia o objeto layerlist
            var layerList = createWidget("layerList");
            //adiciona na página
            view.ui.add(layerList, "top-right");
        }

        function addSearch() {
            var searchWidget = createWidget("search");
            view.ui.add(searchWidget, {
                position: "top-right",
                index: 0
            });
        }

        function addBGExpand() {  
            var bgExpand = createWidget("expand");
            view.ui.add(bgExpand, "top-left");
        }

        function addLegend() {
            view.then(function() {
                var legend = createWidget("legend");
                legend.startup();
                view.ui.add(legend, "bottom-left");
            });
        }

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
