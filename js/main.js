require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/WebMap",
    "esri/widgets/LayerList",
    "esri/widgets/Search",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",
    "esri/widgets/Legend",
    "esri/widgets/BasemapToggle",
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
    BasemapToggle,
    Collapse, 
    Dropdown, 
    CalciteMaps, 
    CalciteMapArcGISSupport
) {

    //====== Atributos globais
    var webmap = createWidget("webMap");
    var view = createWidget("sceneView");
    var basemapGallery = createWidget("basemapGallery");
    var basemapToggle = createWidget("basemapToggle");
    // Popup and panel sync
    view.then(function(){
        CalciteMapArcGISSupport.setPopupPanelSync(view);
    });

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
    function addBaseMapToggle() {
        view.ui.add(basemapToggle, "bottom-right"); 
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
            return new BasemapGallery({
                view: view,
                container: "basemapGalleryDiv"
            });

        } else if (name == 'basemapToggle') {
            return new BasemapToggle({
                view: view,
                secondBasemap: "satellite"
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




