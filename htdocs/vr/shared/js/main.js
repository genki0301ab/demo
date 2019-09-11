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
■ Satge
====================
*/
function Stage(Object) {
    //extend
    object.extend(this, Object);
    //property
    this.width = this.vr.element.$vrVideoWrapper.width();
    this.height = this.width / 2;
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
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 1000);
    this.camera.target = new THREE.Vector3(0, 0, 0);
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
    this.vr.element.$target.append(this.renderer.domElement);
};
Stage.prototype.createObject = function() { //createObject
    this.geometry = new THREE.SphereGeometry(100, 100, 100);
    this.material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        color: 0xffffff,
        map: this.vr.video.texture
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
};
Stage.prototype.createEffect = function() { //createEffect
    this.effect = new THREE.StereoEffect(this.renderer);
    this.effect.setSize(this.width, this.height);
};
Stage.prototype.createControls = function() { //createControls
    if(this.vr.device.isSp()) {
        this.controls = new THREE.DeviceOrientationControls(this.camera);
        this.controls.update();
    }
    if(this.vr.device.isPc()) {
        var domElement = this.vr.element.$vrVideoWrapper[0];
        this.controls = new THREE.OrbitControls(this.camera, domElement);
        this.controls.enableZoom = false;
        this.controls.target.set(0, 0, -1);
        this.controls.update();
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
        self.controls.update();
        if(self.vr.device.isSp()) {
            self.effecting();
        }
        if(self.vr.device.isPc()) {
            self.rendering();
        }
    }
    rendering();
};
Stage.prototype.event = function() { //event
    var self = this;
    this.vr.element.$window.resize(function() {
        self.resize();
    });
};
Stage.prototype.resize = function() { //resize
    this.width = this.vr.element.$vrVideoWrapper.width();
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
    //method
    this.init();
    this.event();
}
Video.prototype.init = function() { //init
    var self = this;
    this.texture = new THREE.VideoTexture(this.vr.element.$vrVideo[0]);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.format = THREE.RGBFormat;
    this.vr.element.$vrVideo[0].addEventListener("loadedmetadata", function() {
        self.setTime();
    });
};
Video.prototype.event = function() { //event
    var self = this;
    //fullScreen
    this.vr.element.$controlsFullScreen.click(function(event) {
        self.fullScreen(event);
    });
    //play
    this.vr.element.$controlsPlay.click(function() {
        self.play();
    });
    //pause
    this.vr.element.$controlsPause.click(function() {
        self.pause();
    });
};
Video.prototype.play = function() { //play
    this.vr.element.$vrVideo[0].play();
};
Video.prototype.pause = function() { //pause
    this.vr.element.$vrVideo[0].pause();
};
Video.prototype.setTime = function() { //setTime
    this.vr.element.$currentTime.html(this.vr.element.$vrVideo[0].currentTime);
    this.vr.element.$durationTime.html(Math.floor(this.vr.element.$vrVideo[0].duration));
};
Video.prototype.currentTime = function() { //currentTime
};
Video.prototype.mute = function() { //mute
};
Video.prototype.volumeUp = function() { //volumeUp
};
Video.prototype.volumeDown = function() { //volumeDown
};
Video.prototype.fullScreen = function(event) { //fullScreen
    event.preventDefault();
    this.vr.element.$vrVideoWrapper.fullScreen();
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
    this.$vrVideoWrapper = $(".vr-video-wrapper");
    this.$vrVideo = $(".vr-video");
    this.$target = $(this.vr.target);
    //controls
    this.$controlsWrapper = $(".controls-wrapper");
    this.$controlsProgress = $(".controls-progress");
    this.$controlsPlay = $(".controls-play");
    this.$controlsPause = $(".controls-pause");
    this.$currentTime = $(".current-time");
    this.$durationTime = $(".duration-time");
    this.$controlsVolume = $(".controls-volume");
    this.$controlsFullScreen = $(".controls-fullScreen");
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
■ VR
====================
*/
function VR(element) {
    var self = {};
    self.target = element;
    self.init = function() {
        self.device = new Device({vr: self});
        self.element = new Element({vr: self});
        self.video = new Video({vr: self});
        self.stage = new Stage({vr: self});
    };
    self.init();
    return self;
}
$(function() {
    VR(".vr-canvas-wrapper");
});
})(this);