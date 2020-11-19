'use strict';
let object = {}
object.extend = function(self, Object) {
    for(let key in Object) {
        self[key] = Object[key];
    }
};

export class Loader {
    constructor(Object) {
        //extend
        object.extend(this, Object);
        //initialize
        this.init();
    }
    init() { //init
        let self = this;
        this.root.element.$window.on('load', function() {
            self.loaded();
        });
    }
    loading() { //loading
        let self = this;
        return new Promise(function(resolve) {
            self.root.element.$container.fadeOut(function() {
                self.root.element.$loaderWrapper.fadeIn(function() {
                    resolve();
                });
            });
        });
    }
    loaded() { //loaded
        let self = this;
        this.root.element.$loaderWrapper.fadeOut(function() {
            self.root.element.$container.fadeIn();
        });
    }
}