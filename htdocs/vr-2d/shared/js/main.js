"use strict";
(function(global) {
var object = {}
object.extend = function(self, Object) {
    for(var key in Object) {
        self[key] = Object[key];
    }
};

/*
====================
■ Controller
====================
*/
function Controller(Object) {
    //extend
    object.extend(this, Object);
    //method
    this.observer();
    this.event();
}
Controller.prototype.observer = function() { //observer
    var self = this;
    function observer() {
        window.requestAnimationFrame(observer);
    }
    observer();
};
Controller.prototype.event = function() { //event
    var self = this;
    //play
    this.vr_2d.element.$controlsPlay.click(function() {
        self.vr_2d.video.play();
        self.vr_2d.element.$controlsPlay.fadeOut();
        self.vr_2d.element.$controlsPause.fadeIn();
    });
    //pause
    this.vr_2d.element.$controlsPause.click(function() {
        self.vr_2d.video.pause();
        self.vr_2d.element.$controlsPause.fadeOut();
        self.vr_2d.element.$controlsPlay.fadeIn();
    });
};

/*
====================
■ Satge
====================
*/
function Stage(Object) {
    //extend
    object.extend(this, Object);
    //property
    this.width = this.vr_2d.element.$vrVideoWrapper.width();
    this.height = this.width / 1.777777777777777777777777777777777777778;
    this.camera,
    this.light,
    this.scene,
    this.effect,
    this.renderer,
    this.geometry,
    this.material,
    this.controls,
    this.mesh;
    //method
    this.init();
    this.event();
}
Stage.prototype.init = function() { //init
    this.createCamera();
    this.createScene_rednerer();
    this.createLight();
    this.createObject();
    this.createEffect();
    this.createControls();
    this.update();
};
Stage.prototype.createCamera = function() { //createCamera
    if(this.vr_2d.device.isSp()) {
        this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 1, 1000);
        this.camera.position.z = 100;
    }
    if(this.vr_2d.device.isPc()) {
        this.camera = new THREE.Camera();
    }
};
Stage.prototype.createLight = function() { //createLight
    this.light = new THREE.AmbientLight(0xffffff);
    this.scene.add(this.light);
};
Stage.prototype.createScene_rednerer = function() { //createScene_rednerer
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.vr_2d.element.$target.append(this.renderer.domElement);
};
Stage.prototype.createObject = function() { //createObject
    if(this.vr_2d.device.isSp()) {
        this.geometry = new THREE.PlaneBufferGeometry(100, 100);
    }
    if(this.vr_2d.device.isPc()) {
        this.geometry = new THREE.PlaneBufferGeometry(2, 2);
    }
    this.material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        color: 0xffffff,
        map: this.vr_2d.video.texture
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
};
Stage.prototype.createEffect = function() { //createEffect
    this.effect = new THREE.StereoEffect(this.renderer);
    this.effect.setSize(this.width, this.height);
};
Stage.prototype.createControls = function() { //createControls
    if(this.vr_2d.device.isSp()) {
        this.controls = new THREE.DeviceOrientationControls(this.camera);
    }
};
Stage.prototype.rendering = function() { //rendering
    this.renderer.render(this.scene, this.camera);
};
Stage.prototype.effecting = function() { //effecting
    this.effect.render(this.scene, this.camera);
};
Stage.prototype.update = function() { //update
    var self = this;
    function rendering() {
        self.renderingAnimation = window.requestAnimationFrame(rendering);
        self.geometry.verticesNeedUpdate = true;
        if(self.vr_2d.device.isSp()) {
            self.effecting();
            self.controls.update();
        }
        if(self.vr_2d.device.isPc()) {
            self.rendering();
        }
    }
    rendering();
};
Stage.prototype.event = function() { //event
    var self = this;
    //resize
    this.vr_2d.element.$window.resize(function() {
        self.resize();
    });
};
Stage.prototype.resize = function() { //resize
    this.width = this.vr_2d.element.$vrVideoWrapper.width();
    this.height = this.width / 2;
    this.camera.aspect = this.width / this.height;
    this.renderer.setSize(this.width , this.height);
};

/*
====================
■ Video
====================
*/
function Video(Object) {
    //extend
    object.extend(this, Object);
    //property
    this.texture = null;
    this.played = 0;
    this.muted = 0;
    //method
    this.init();
}
Video.prototype.init = function() { //init
    var self = this;
    this.texture = new THREE.VideoTexture(this.vr_2d.element.$vrVideo[0]);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.format = THREE.RGBFormat;
};
Video.prototype.play = function() { //play
    this.vr_2d.element.$vrVideo[0].play();
    this.played = 1;
};
Video.prototype.pause = function() { //pause
    this.vr_2d.element.$vrVideo[0].pause();
    this.played = 0;
};
Video.prototype.currentTime = function() { //currentTime
};
Video.prototype.toggleMute = function() { //toggleMute
    this.muted = !this.muted;
    this.vr_2d.element.$vrVideo[0].muted = this.muted;
};
Video.prototype.volumeUp = function() { //volumeUp
    this.vr_2d.element.$vrVideo[0].volume = this.vr_2d.element.$vrVideo[0].volume + 0.25;
};
Video.prototype.volumeDown = function() { //volumeDown
    this.vr_2d.element.$vrVideo[0].volume = this.vr_2d.element.$vrVideo[0].volume - 0.25;
};
Video.prototype.fullScreen = function(event) { //fullScreen
    event.preventDefault();
};

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
    //property
    this.$window = $(window);
    this.$html_$body = $("html, body");
    this.$body = $("body");
    //vr
    this.$vrVideoWrapper = $(".vr2d-video-wrapper");
    this.$vrVideo = $("video");
    this.$target = $(this.vr_2d.target);
    //controls
    this.$controlsWrapper = $(".controls-wrapper");
    this.$controlsProgress = $(".controls-progress");
    //play
    this.$controlsPlay = $(".controls-play");
    this.$controlsPause = $(".controls-pause");
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
■ Device
====================
*/
function Device(Object) {
    //extend
    object.extend(this, Object);
    //property
    this.userAgent = navigator.userAgent;
}
Device.prototype.isSp = function() { //isSp
    if(this.userAgent.indexOf("iPhone") != -1 || this.userAgent.indexOf("Android") != -1) {
        return true;
    } else {
        return false;
    }
};
Device.prototype.isPc = function() { //isPc
    if(this.userAgent.indexOf("iPhone") != -1 || this.userAgent.indexOf("Android") != -1) {
        return false;
    } else {
        return true;
    }
};

/*
====================
■ VR_2D
====================
*/
function VR_2D(element) {
    var self = {};
    self.target = element;
    self.init = function() {
        self.device = new Device({vr_2d: self});
        self.element = new Element({vr_2d: self});
        self.video = new Video({vr_2d: self});
        self.stage = new Stage({vr_2d: self});
        self.controller = new Controller({vr_2d: self});
    };
    self.init();
    return self;
}
$(function() {
    VR_2D(".vr2d-canvas-wrapper");
});
})(this);