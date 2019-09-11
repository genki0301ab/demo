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
■ Tab
====================
*/
function Tab(Object) {
    //extend
    object.extend(this, Object);
    //property
    this.current = 0;
    //method
    this.event();
}
Tab.prototype.event = function() { //event
    var self = this;
    this.root.element.$tabList.click(function() {
        self.current = self.root.element.$tabList.index($(this));
        self.toggleTab();
        self.toggleContent();
    });
};
Tab.prototype.toggleTab = function() { //toggleTab
    this.root.element.$tabList.removeClass("active");
    this.root.element.$tabList.eq(this.current).addClass("active");
};
Tab.prototype.toggleContent = function() { //toggleContent
    this.root.element.$tabContent.removeClass("active");
    this.root.element.$tabContent.eq(this.current).addClass("active");
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
    //method
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
    //method
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
    //method
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
    this.$tabList = $(".tab li");
    this.$tabContent = $(".tab-content");
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
        self.tab = new Tab(rootObject);
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