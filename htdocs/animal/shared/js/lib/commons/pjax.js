'use strict';
let object = {}
object.extend = function(self, Object) {
    for(let key in Object) {
        self[key] = Object[key];
    }
};

export class Pjax {
    constructor(Object) {
        //extend
        object.extend(this, Object);
        //initialize
        this.event();
    }
    init(href) { //init
        $.pjax({
            url: href,
            container: '.container',
            fragment: '.container',
            scrollTop: 1,
            timeout: 30000
        });
    }
    event() {
        let self = this;
        $(document).on({
            'pjax:start': function() {
                //console.log("start");
            },
            'pjax:end': function() {
                //console.log("end");
                self.animationEnd();
            },
            'pjax:complate': function() {
                //console.log("complete");
                this.pageUpdate();
            },
            'pjax:popstate': function() {
                //console.log("popstate");
            },
            'pjax:timeout': function() {
                //console.log("timeout");
            }
        });
        $(document).on('click', 'a:not([target="_blank"])', function(event) {
            let href = $(this).attr('href');
            event.preventDefault();
            self.animationStart(href);
        });
    }
    pageUpdate() { //pageUpdate
        //element
        this.root.element.update();
        //window
        this.root.window.init();
        this.root.window.event();
    }
    animationStart(href) { //animationStart
        let self = this;
        (async function() {
            await self.root.loader.loading();
            self.init(href);
        })();
    }
    animationEnd() { //animationEnd
        this.root.loader.loaded();
    }
}