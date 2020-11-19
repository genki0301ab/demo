"use strict";
(function() {
var object = {}
object.extend = function(self, Object) {
    for(var key in Object) {
        self[key] = Object[key];
    }
};
/*
===================
Stage
===================
*/
function Stage(Object) {
    //extend
    object.extend(this, Object);
    //property
    this.width = this.root.window.width;
    this.height = this.root.window.height;
    this.cameraPosition = {x: 0, y: 0, z: 1};
    this.fogColor = {r: 6, g: 53, b: 59};
    this.clearColor = {r: 4, g: 30, b: 31};
    this.geometries;
    this.camera,
    this.scene,
    this.render;
    //method
    this.init();
    this.event();
}
Stage.prototype.init = function() { //init
    let self = this;
    this.createCamera();
    this.createScene_renderer();
    var loader = new THREE.TextureLoader();
    var texture = loader.load("sites-3-2017-12-hero-1-1201225626-x05.jpg", function(texture) {
        self.createGeometry(texture);
        self.update();
    });
};
Stage.prototype.createCamera = function() { //createCamera
    this.camera = new THREE.PerspectiveCamera(100, this.width / this.height, 0.1 , 500);
    this.camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);
    this.camera.lookAt(this.cameraPosition);
};
Stage.prototype.createScene_renderer = function() { //createScene_renderer
    this.scene = new THREE.Scene();
    //this.scene.fog = new THREE.Fog(new THREE.Color(`rgb(${this.fogColor.r}, ${this.fogColor.g}, ${this.fogColor.b})`), 1, 500);
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setClearColor(new THREE.Color(`rgb(${this.clearColor.r}, ${this.clearColor.g}, ${this.clearColor.b})`), 0.5);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.root.element.$canvasWrapper.append(this.renderer.domElement);
};
Stage.prototype.createGeometry = function(texture) { //createGeometry
    //plain
    var plain = this.root.geometry.createPlane(texture);
    this.scene.add(plain);
};
Stage.prototype.rendering = function(time) { //rendering
    this.renderer.render(this.scene, this.camera);
    /*
    this.scene.children[0].geometry.verticesNeedUpdate = true;
    for(var i = 0; i < this.scene.children[0].geometry.vertices.length; i++) {
        this.scene.children[0].geometry.vertices[i].z += Math.sin(time + this.scene.children[0].geometry.vertices[i].x) / 100;
        this.scene.children[0].geometry.vertices[i].z += Math.sin(time + this.scene.children[0].geometry.vertices[i].y) / 100;
    }
    */
};
Stage.prototype.update = function() { //update
    var self = this;
    var time = 0;
    function update() {
        time += 0.05;
        window.requestAnimationFrame(update);
        self.rendering(time);
    }
    update();
};
Stage.prototype.event = function() { //event
    var self = this;
    this.root.element.$window.resize(function() {
        self.resize();
    });
};
Stage.prototype.resize = function() { //resize
    this.width = this.root.window.width;
    this.height = this.root.window.height;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
};
Stage.prototype.mouseMove = function() { //mouseMove
};

/*
====================
■ Geometry
====================
*/
function Geometry(Object) { //Geometry
    //extend
    object.extend(this, Object);
};
Geometry.prototype.createPlane = function(texture) { //createPlane
    var geometry = new THREE.PlaneGeometry(2, 1, 50, 50);
    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: texture,
        wireframe: false,
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    return mesh;
};

/*
====================
■ Window
====================
*/
function Window(Object) {
    //extend
    object.extend(this, Object);
    //property
    this.scroll = this.root.element.$window.scrollTop();
    this.width = this.root.element.$window.width();
    this.height = this.root.element.$window.height();
    this.brekPoint = {
        first: 769
    };
    //initialize
    this.event();
}
Window.prototype.event = function() { //event
    var self = this;
    this.root.element.$window.resize(function() {
        self.root.element.update();
        self.sizeUpdate();
    });
    this.root.element.$window.scroll(function() {
        self.root.element.update();
        self.windowScroll();
    });
};
Window.prototype.sizeUpdate = function() { //sizeUpdate
    this.width = this.root.element.$window.width();
    this.height = this.root.element.$window.height();
};
Window.prototype.windowScroll = function() { //windowScroll
    this.scroll = this.root.element.$window.scrollTop();
};

/*
====================
■ Loader
====================
*/
function Loader(Object) {
    //extend
    object.extend(this, Object);
    //initialize
    this.init();
}
Loader.prototype.init = function() { //init
    this.loaded();
};
Loader.prototype.loading = function() { //loading
     var self = this;
    this.root.element.$container.fadeOut(function() {
        self.root.element.$loaderWrapper.fadeIn();
    });
};
Loader.prototype.loaded = function() { //loaded
    var self = this;
    this.root.element.$loaderWrapper.fadeOut(function() {
        self.root.element.$container.fadeIn();
    });
}

/*
====================
■ Element
====================
*/
function Element(Object) {
    //extend
    object.extend(this, Object);
    //initialize
    this.init();
}
Element.prototype.init = function() { //init
    this.get();
};
Element.prototype.get = function(Object = null) { //get
    //common
    this.$window = $(window);
    this.$html_$body = $("html, body");
    this.$body = $("body");
    this.$loaderWrapper = $(".loader-wrapper");
    this.$container = $(".container");
    this.$canvasWrapper = $(".canvas-wrapper");
    //extend
    if(Object != null) {
        object.extend(this, Object);
    }
    return this;
};
Element.prototype.update = function() { //update
    this.init();
};

/*
====================
■ Site
====================
*/
var Site = function() {
    var self = {};
    self.init = function() {
        var rootObject = {root: self};
        self.element = new Element(rootObject);
        self.loader = new Loader(rootObject);
        self.window = new Window(rootObject);
        self.geometry = new Geometry(rootObject);
        self.stage = new Stage(rootObject);
    };
    self.init();
    return self;
}
$(window).on("load", function() {
    $(function() {
        Site();
    });
});
})();