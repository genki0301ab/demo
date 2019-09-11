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
■ Card
====================
*/
function Card(Object) {
    //extend
    object.extend(this, Object);
    //method
    this.event();
}
Card.prototype.event = function() { //event
    var self = this;
    this.root.element.$photo.on("mouseover", function() {
        $(this).parent().prev(".card__text").removeClass("passive-sprite").addClass("active-sprite");
    });
    this.root.element.$photo.on("mousemove", function(event) {
        var x = -($(this).width() - event.offsetX * 2) / 30;
        var y = ($(this).height() - event.offsetY * 2) / 25;
        $(this).css({
            "transform": `rotateX(${y}deg) rotateY(${x}deg)`
        });
    });
    this.root.element.$photo.on("mouseout", function(event) {
        $(this).parent().prev(".card__text").removeClass("active-sprite").addClass("passive-sprite");
        $(this).css({
            "transform": "rotateX(0deg) rotateY(0deg)"
        });
    });
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
    //other
    this.$photo = $(".photo");
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
■ Image3d
====================
*/
var Image3d = function() {
    var self = {};
    self.init = function() {
        var rootObject = {root: self};
        self.element = new Element(rootObject);
        self.loader = new Loader(rootObject);
        self.window = new Window(rootObject);
        self.card = new Card(rootObject);
    };
    self.init();
    return self;
}
$(window).on("load", function() {
    $(function() {
        Image3d();
    });
});
})();