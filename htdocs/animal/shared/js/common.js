'use strict';
import {Element} from './lib/commons/element.js';
import {Window} from './lib/commons/window.js';
import {Loader} from './lib/commons/loader.js';
import {Pjax} from './lib/commons/pjax.js';

let object = {}
object.extend = function(self, Object) {
    for(let key in Object) {
        self[key] = Object[key];
    }
};

let SiteName = function() {
    let self = {};
    self.init = function() {
        let rootObject = {root: self};
        self.element = new Element(rootObject);
        self.loader = new Loader(rootObject);
        self.window = new Window(rootObject);
        self.pjax = new Pjax(rootObject);
    };
    self.init();
    return self;
}
$(function() {
    window.sitename = SiteName();
});