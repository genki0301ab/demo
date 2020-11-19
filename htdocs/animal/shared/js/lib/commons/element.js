'use strict';
let object = {}
object.extend = function(self, Object) {
    for(let key in Object) {
        self[key] = Object[key];
    }
};

export class Element {
    constructor(Object) {
        //extend
        object.extend(this, Object);
        //initialize
        this.init();
    }
    init() { //init
        this.get();
    }
    get() { //get
        //common
        this.$window = $(window);
        this.$html_$body = $('html, body');
        this.$body = $('body');
        this.$loaderWrapper = $('.loader-wrapper');
        this.$container = $('.container');
        return this;
    }
    update() { //update
        this.init();
    }
}