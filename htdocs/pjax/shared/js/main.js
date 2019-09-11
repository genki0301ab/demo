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
■ Pjax
====================
*/
function Pjax(Object) {
    //extend
    object.extend(this, Object);
    //method
    this.init();
    this.event();
}
Pjax.prototype.init = function() { //init
    var self = this;
    //Barba.Pjax.Cache = false;
    Barba.Pjax.init();
    Barba.Prefetch.init();
    /*
    var FadeTransition = Barba.BaseTransition.extend({
        start: function() {
            Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.fadeIn.bind(this));
        },
        fadeOut: function() {
            var jumpActive = self.root.element.$jumpLayer.velocity(
                {width: "100vw"},
                {duration: 1000})
                .promise();
            return jumpActive;
        },
        fadeIn: function() {
            var _this = this;
            var $newBarbaContainer = $(this.newContainer);
            $(this.oldContainer).hide();
            $newBarbaContainer.css({
                visibility: "visible",
                opacity: 1
            });
            self.root.element.$jumpLayer.velocity(
            {translateX: "100%"},
            {
                duration: 1000,
                complete: function() {
                    self.root.element.$jumpLayer.css("width", "0vw");
                    self.root.element.$jumpLayer.velocity({translateX: "0%"});
                    _this.done();
                }
            });
        }
    });
    Barba.Pjax.getTransition = function() {
      return FadeTransition;
    };
    */
};
Pjax.prototype.event = function() { //event
    var self = this;
    Barba.Dispatcher.on("linkClicked", function(event) {
        //console.log("linkClicked");
        console.log(event);
        self.animationStart();
    });
    Barba.Dispatcher.on("initStateChange", function() {
        //console.log("initStateChange");
    });
    Barba.Dispatcher.on("newPageReady", function() {
        //console.log("newPageReady");
    });
    Barba.Dispatcher.on("transitionCompleted", function() {
        //console.log("transitionCompleted");
        self.animationEnd();
    });
    console.log(Barba);
};
Pjax.prototype.animationStart = function() { //animationStart
    this.root.element.$jumpLayer.velocity(
        {
            width: "100vw"
        },
        {
            duration: 1000
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
            duration: 1000,
            complete: function() {
                self.root.element.$jumpLayer.css("width", "0vw");
                self.root.element.$jumpLayer.velocity({translateX: "0%"});
            }
        }
    );
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
    //common
    this.$window = $(window);
    this.$html_$body = $("html, body");
    this.$body = $("body");
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
        self.pjax = new Pjax(rootObject);
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