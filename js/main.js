require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/WebMap",
    "esri/widgets/LayerList",
    "esri/widgets/Search",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",
    "esri/widgets/Legend",
    // Bootstrap
    "bootstrap/Collapse",
    "bootstrap/Dropdown",

    // Calcite Maps
    "calcite-maps/calcitemaps-v0.5",
    // Calcite Maps ArcGIS Support
    "calcite-maps/calcitemaps-arcgis-support-v0.5",

    "dojo/domReady!"
], function (
    Map,
    SceneView,
    WebMap,
    LayerList,
    Search,
    BasemapGallery,
    Expand,
    Legend,
    Collapse, 
    Dropdown, 
    CalciteMaps, 
    CalciteMapArcGISSupport
) {

    //====== Atributos globais
    var webmap = createWidget("webMap");
    var view = createWidget("sceneView");
    var basemapGallery = createWidget("basemapGallery");
  

    //====== Componentes
    addLayerList();
    addSearch();
    addLegend();
    addBgExpand();
    
    //======= Adicionando widgets ao mapa
    function addLayerList() {
        var LayerList = createWidget("layerList");
        view.ui.add(LayerList, "bottom-left");
    }

    function addSearch() {
        var searchWidget = createWidget("search");
        CalciteMapArcGISSupport.setSearchExpandEvents(searchWidget);
    }

    function addBgExpand() {
        var bgExpand = createWidget("bgExpand");
        view.ui.add(bgExpand, "top-right");
    }

    function addLegend() {
        var legend = createWidget("legend");
        view.then(function () {
            legend.startup();
        });
        view.ui.add(legend, "bottom-right");
    }

    //===== Funções para criação de widgets
    function createWidget(name) {
        if (name == 'webMap') {
            return new WebMap({
                portalItem: {
                    id: "93ecf4c2d8c34766b94d5a5becbf0cff"
                }
            });

        } else if (name == 'sceneView') {
            return new SceneView({
                container: "viewDiv",
                map: webmap
            });
        } else if (name == 'layerList') {
            return new LayerList({
                container: "layersDiv",
                view: view
            });

        } else if (name == 'search') {
            return new Search({
                view: view
            }, "searchWidgetDiv");

        } else if (name == 'basemapGallery') {
            return new BasemapGallery ({
                view: view,
                container: document.createElement("div")
            });

        } else if (name == 'bgExpand') {
            return new Expand ({
                view: view,
                content: basemapGallery.container,
                expandIconClass: "esri-icon-basemap"
            });
        } else if (name == 'legend') {
            var i = 0;
            var layers = Array();
            while (typeof webmap.layers.getItemAt(i) != 'undefined') {
                layers[i] = {
                    layer: webmap.layers.getItemAt(i),
                    title: webmap.layers.title
                };
                i++;
            }
            return new Legend({
                view: view,
                container: "legendDiv",
                layerInfos: layers
            });
        }
    }
});




