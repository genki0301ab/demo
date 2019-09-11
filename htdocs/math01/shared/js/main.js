"use strict";
(function() {
var object = {}
object.extend = function(self, Object) {
    for(var key in Object) {
        self[key] = Object[key];
    }
};
/*
====================
■ Observer
====================
*/
function Observer(Object) {
    //extend
    object.extend(this, Object);
    //property
    this.currentAnimation = null;
    this.angle = [];
    this.random = [];
    this.redSphere = [];
    //mesh
    this.init();
}
Observer.prototype.init = function() { //init
    this.redSphere.push(this.root.originalSphere.create(60, 32, 32, 0, 0, 0));
    this.redSphere.push(this.root.originalSphere.createBackground(5000, 0, 0, 0, 0, 0));
    for(var i = 0; i < 50; i++) {
        this.angle.push(this.root.originalMath.random(-360, 360));
        this.random.push(this.root.originalMath.random(-275, 275));
        this.redSphere.push(this.root.originalSphere.create(5, 3, 1, 0, this.root.originalMath.random(-275, 275), 0));
    }
    this.planeGeometry = new THREE.PlaneGeometry(5000, 2000, 150, 150);
    this.planeMaterial = new THREE.ShaderMaterial({
        uniforms: this.root.uniform.uniforms,
        vertexShader: this.root.element.$vsPlane[0].innerHTML,
        fragmentShader: this.root.element.$fsPlane[0].innerHTML,
        transparent: true,
        //wireframe: true
    });
    this.planeMesh = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
    this.planeMesh.rotation.x = Math.PI * 1.5;
    this.planeMesh.position.y = -150;
    this.root.canvas.scene.add(this.planeMesh);
    this.animation();
};
Observer.prototype.animation = function() { //animation
    var self = this;
    function animation() {
        window.requestAnimationFrame(animation);
        for(var i = 0; i < 50; i++) {
            var index = i + 2;
            self.angle[index] += 1;
            self.redSphere[index].position.x = Math.cos(self.root.originalMath.radian(self.angle[index])) * 150;
            self.redSphere[index].position.y = Math.sin(self.root.originalMath.radian(self.angle[index])) * self.random[i] / 3;
            self.redSphere[index].position.z = Math.sin(self.root.originalMath.radian(self.angle[index])) * 150;
            self.redSphere[index].rotation.x += 0.05;
            self.redSphere[index].rotation.y += 0.05;
        }
        self.redSphere[0].rotation.x += 0.0075;
        self.redSphere[0].rotation.y += 0.0075;
        self.root.canvas.rendering();
        self.root.canvas.sendShader();
    }
    animation();
};

/*
====================
■ OriginalSphere
====================
*/
function OriginalSphere(Object) {
    //extend
    object.extend(this, Object);
    //property
    this.geometry = null;
    this.material = null;
    this.mesh = null;
}
OriginalSphere.prototype.create = function(radius, widthSegments, heightSegments, x, y, z) { //create
    this.geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    this.material = new THREE.ShaderMaterial({
        uniforms: this.root.uniform.uniforms,
        vertexShader: this.root.element.$vs[0].innerHTML,
        fragmentShader: this.root.element.$fs[0].innerHTML,
        transparent: true,
        //wireframe: true
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(x, y, z);
    this.root.canvas.scene.add(this.mesh);
    return this.mesh;
};
OriginalSphere.prototype.createBackground = function(radius, widthSegments, heightSegments, x, y, z) { //create
    this.geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    this.material = new THREE.ShaderMaterial({
        uniforms: this.root.uniform.uniforms,
        vertexShader: this.root.element.$vsBg[0].innerHTML,
        fragmentShader: this.root.element.$fsBg[0].innerHTML,
        side: THREE.DoubleSide,
        //wireframe: true
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(x, y, z);
    this.root.canvas.scene.add(this.mesh);
    return this.mesh;
};

/*
====================
■ Canvas
====================
*/
function Canvas(Object) {
    //extend
    object.extend(this, Object);
    //property
    this.width = this.root.window.width;
    this.height = this.root.window.height;
    this.cameraPosition = new THREE.Vector3(0, 0, 200);
    this.renderer = new THREE.WebGLRenderer({
        canvas: this.root.element.$canvas[0],
    });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 1, 10000);
    //meshod
    this.init();
    this.event();
}
Canvas.prototype.init = function() { //init
    this.renderer.setClearColor(new THREE.Color("rgb(0, 0, 0)"));
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);
};
Canvas.prototype.event = function() { //event
    var self = this;
    this.root.element.$window.resize(function() {
        self.resize();
    });
};
Canvas.prototype.resize = function() { //resize
    this.camera.aspect = this.root.window.width / this.root.window.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.root.window.width, this.root.window.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
};
Canvas.prototype.rendering = function() { //rendering
    this.renderer.render(this.scene, this.camera);
};
Canvas.prototype.sendShader = function() { //sendShader
    this.root.uniform.uniforms.time.value += 0.025;
    this.root.uniform.uniforms.resolution.value.x = this.renderer.domElement.width;
    this.root.uniform.uniforms.resolution.value.y = this.renderer.domElement.height;
};

/*
====================
■ OriginalMath
====================
*/
function OriginalMath(Object) {
    //extend
    object.extend(this, Object);
}
OriginalMath.prototype.radian = function(degree) { //radian
    var result = degree / 180 * Math.PI;
    return result;
};
OriginalMath.prototype.random = function(min, max) { //random
    var result = Math.floor((Math.random() * max) + (Math.random() * min));
    return result;
};

/*
====================
■ Uniform
====================
*/
function Uniform(Object) {
    //extend
    object.extend(this, Object);
    //property
    this.uniforms = {
        time: {
            type: "f" ,
            value: 0.0
        },
        resolution: {
            type: "v2",
            value: new THREE.Vector2()
        }
    }
}

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
    this.$fs = $(".fragment-shader");
    this.$vs = $(".vertex-shader");
    this.$fsBg = $(".fragment-shader-bg");
    this.$vsBg = $(".vertex-shader-bg");
    this.$fsPlane = $(".fragment-shader-plane");
    this.$vsPlane = $(".vertex-shader-plane");
    this.$loaderWrapper = $(".loader-wrapper");
    this.$container = $(".container");
    this.$canvas = $("#canvas");
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
■ Math01
====================
*/
var Math01 = function() {
    var self = {};
    self.init = function() {
        var rootObject = {root: self};
        self.element = new Element(rootObject);
        self.loader = new Loader(rootObject);
        self.window = new Window(rootObject);
        self.uniform = new Uniform(rootObject);
        self.originalMath = new OriginalMath(rootObject);
        self.canvas = new Canvas(rootObject);
        self.originalSphere = new OriginalSphere(rootObject);
        self.observer = new Observer(rootObject);
    };
    self.init();
    return self;
}
$(window).on("load", function() {
    $(function() {
        Math01();
    });
});
})();