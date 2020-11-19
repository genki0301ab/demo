'use strict';
let object = {}
object.extend = function(self, Object) {
    for(let key in Object) {
        self[key] = Object[key];
    }
};

export class Window {
    constructor(Object) {
        //extend
        object.extend(this, Object);
        //initialize
        this.init();
        this.event();
    }
    init() {
        this.scroll = this.root.element.$window.scrollTop();
        this.width = this.root.element.$window.width();
        this.height = this.root.element.$window.height();
        this.brekPoint = {
            first: 769
        };
    }
    event() { //event
        let self = this;
        this.root.element.$window.resize(function() {
            self.root.element.update();
            self.sizeUpdate();
        });
        this.root.element.$window.scroll(function() {
            self.root.element.update();
            self.windowScroll();
        });
    }
    sizeUpdate() { //sizeUpdate
        this.width = this.root.element.$window.width();
        this.height = this.root.element.$window.height();
    }
    windowScroll() { //windowScroll
        this.scroll = this.root.element.$window.scrollTop();
    }
}