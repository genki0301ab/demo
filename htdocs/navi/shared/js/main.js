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
■ GNavi
====================
*/
function GNavi(Object) {
    //extend
    object.extend(this, Object);
    //property
    this.defer = $.Deferred();
    this.promise = this.defer.promise();
    this.current = 0;
    this.listLength = this.root.element.$gnavi.children("li").length;
    //method
    this.event();
}
GNavi.prototype.event = function() { //event
    var self = this;
    this.root.element.$toggleButtonWrapper.click(function() {
        self.current = !self.current;
        self.promise
        .then((function() {
            self.toggleButton();
            self.toggleNavi();
        })())
        .then(self.listFade());
    });
};
GNavi.prototype.toggleButton = function() { //toggleButton
    this.root.element.$toggleButtonWrapper.toggleClass("toggle-button-wrapper__active");
    this.root.element.$toggleButton.children("div").toggleClass("bar__active");
};
GNavi.prototype.toggleNavi = function() { //toggleNavi
    if(this.current) {
        this.root.element.$gnaviWrapper.removeClass("gnavi-wrapper__passive");
        this.root.element.$gnaviWrapper.addClass("gnavi-wrapper__active");
    }
    if(!this.current) {
        this.root.element.$gnaviWrapper.removeClass("gnavi-wrapper__active");
        this.root.element.$gnaviWrapper.addClass("gnavi-wrapper__passive");
    }
};
GNavi.prototype.listFade = function() { //listFade
    if(this.current) {
        this.listFadeIn();
    }
    if(!this.current) {
        this.listFadeOut();
    }
};
GNavi.prototype.listFadeIn = function() { //listFadeIn
    var self = this;
    var listCurrent = 0;
    this.root.element.$gnavi.children("li").eq(0).addClass("list__active");
    var timer = window.setInterval(function() {
        listCurrent += 1;
        self.root.element.$gnavi.children("li").eq(listCurrent).addClass("list__active");
        if(listCurrent == self.listLength - 1) {
            window.clearInterval(timer);
        }
    }, 100);
};
GNavi.prototype.listFadeOut = function() { //listFadeOut
    this.root.element.$gnavi.children("li").removeClass("list__active");
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
    this.$img = $("img");
    this.$loaderWrapper = $(".loader-wrapper");
    this.$container = $(".container");
    //g-navi
    this.$toggleButtonWrapper = $(".toggle-button-wrapper");
    this.$toggleButton = $(".toggle-button");
    this.$gnaviWrapper = $(".gnavi-wrapper");
    this.$gnavi = $(".gnavi");
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
    var rootObject = {root: self};
    self.init = function() {
        self.element = new Element(rootObject);
        self.loader = new Loader(rootObject);
        self.window = new Window(rootObject);
        self.gnavi = new GNavi(rootObject);
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