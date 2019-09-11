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
■ Page
====================
*/
function Page(Object) {
    //extend
    object.extend(this, Object);
    //method
    this.event();
}
Page.prototype.init = function() { //init
    this.root.element.update();
    //window
    this.root.window.init();
    this.root.window.event();
    //gnavi
    this.root.gnavi.init();
    this.root.gnavi.event();
};
Page.prototype.event = function() { //event
    var self = this;
    $(document).on("click", "a:not([target='_blank'])", function(event) {
        var href = $(this).attr("href");
        event.preventDefault();
        self.root.pjax.animationStart(href);
    });
};

/*
====================
■ Pjax
====================
*/
function Pjax(Object) {
    //extend
    object.extend(this, Object);
    //method
    this.event();
}
Pjax.prototype.init = function(href) { //init
    $.pjax({
        url: href,
        container: ".container",
        fragment: ".container",
        scrollTo: 1,
        timeout: 30000
    });
}
Pjax.prototype.event = function() { //event
    var self = this;
    $(document).on({
        "pjax:start":function() {
            //console.log("start");
        },
        "pjax:end": function() {
            self.animationEnd();
            //console.log("end");
        },
        "pjax:complete": function() {
            self.root.page.init();
            //console.log("complete");
        },
        "pjax:popstate": function() {
            //console.log("popstate");
        },
        "pjax:timeout": function() {
            //console.log("timeout");
        }
    });
};
Pjax.prototype.animationStart = function(href) { //animationStart
    var self = this;
    this.root.element.$jumpLayer.velocity(
        {
            width: "100vw"
        },
        {
            duration: 800,
            complete: function() {
                self.root.pjax.init(href);
            }
        }
    );
};
Pjax.prototype.animationEnd = function() { //animationEnd
    var self = this;
    this.root.element.$jumpLayer.velocity(
        {
            translateX: "100%"
        },
        {
            duration: 800,
            begin: function() {
                self.root.element.$a.css("pointer-events", "none");
            },
            complete: function() {
                self.root.element.$jumpLayer.css("width", "0vw");
                self.root.element.$jumpLayer.velocity({translateX: "0%"});
                self.root.element.$a.css("pointer-events", "auto");
            }
        }
    );
};

/*
====================
■ GNavi
====================
*/
function GNavi(Object) {
    //extend
    object.extend(this, Object);
    //method
    this.init();
    this.event();
}
GNavi.prototype.init = function() { //init
    this.defer = $.Deferred();
    this.promise = this.defer.promise();
    this.current = 0;
    this.listLength = this.root.element.$gnavi.children("li").length;
};
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
    //method
    this.init();
    this.event();
}
Window.prototype.init = function() { //init
    this.scroll = this.root.element.$window.scrollTop();
    this.width = this.root.element.$window.width();
    this.height = this.root.element.$window.height();
    this.brekPoint = {
        first: 769
    };
};
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
    this.$a = $("a");
    this.$loaderWrapper = $(".loader-wrapper");
    this.$jumpLayer = $(".jump-layer");
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
    self.init = function() {
        var rootObject = {root: self};
        self.element = new Element(rootObject);
        self.loader = new Loader(rootObject);
        self.window = new Window(rootObject);
        self.gnavi = new GNavi(rootObject);
        self.pjax = new Pjax(rootObject);
        self.page = new Page(rootObject);
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