$(function() {

class ThreeCanvas {
	constructor(property) {
		this.$wrap = $(property.wrap);
		this.width = this.$wrap.width();
		this.height = this.$wrap.height();
		this.src = this.$wrap.attr('data-src');
		this.camera = null;
    	this.scene = null;
    	this.renderer = null;
    	this.uniforms = {
    		time: {
    			type: 'f',
    			value: 0.0
    		},
    		mouse: {
    			type: 'v2',
    			value: new THREE.Vector2(0.0, 0.0)
    		},
    		wrapResolution: {
    			type: 'v2',
    			value: new THREE.Vector2(this.width, this.height)
    		},
    		imageResolution: {
    			type: 'v2',
    			value: null
    		},
    		texture: {
    			type: "t",
    			value: null
    		}
    	};
		this.init();
		this.event();
	}
	init() {
		let self = this;
		this.initShader();
		this.initCamera();
		this.initSceneRender();
		this.initTexture(function() {
		    function update() {
		        window.requestAnimationFrame(update);
		        self.uniforms.time.value += 0.05;
		        self.renderer.render(self.scene, self.camera);
		    }
		    update();
		});
	}
	initShader() {
		this.$wrap.append(`
    		<script class="fragment-shader" type="shader">
    		uniform float time;

    		varying vec2 vUv;
			void main() {
				vUv = uv;
				gl_Position = vec4(position, 1.0);
			}
			</script>
			<script class="vertex-shader" type="shader">
			uniform vec2 mouse;
			uniform vec2 wrapResolution;
			uniform vec2 imageResolution;
			uniform sampler2D texture;

			varying vec2 vUv;

			void main() {
				vec2 ratio = vec2(
			      min((wrapResolution.x / wrapResolution.y) / (imageResolution.x / imageResolution.y), 1.0),
			      min((wrapResolution.y / wrapResolution.x) / (imageResolution.y / imageResolution.x), 1.0)
			    );
			    vec2 uv = vec2(
			      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
			      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
			    );
			    vec2 normalizeResolution = (gl_FragCoord.xy * 2.0 - wrapResolution.xy) / min(wrapResolution.x, wrapResolution.y);
				vec4 destColor = vec4(0.0);
				destColor = texture2D(texture, uv);
				gl_FragColor = destColor;
			}
			</script>
    	`);
	}
	initTexture(callback) {
		let self = this;
		let canvas = document.createElement('canvas');
		let context = canvas.getContext("2d");
		let image = new Image();
		image.src = this.src;
		image.onload = function() {
			canvas.width = THREE.Math.nearestPowerOfTwo(self.$wrap.width());
			canvas.height = THREE.Math.nearestPowerOfTwo(self.$wrap.height());
			context.drawImage(image, 0, 0, canvas.width, canvas.height);
			let texture = new THREE.CanvasTexture(canvas);
			self.initPlane(image.width, image.height, texture);
			callback();
		};
	}
	initCamera() {
		let self = this;
		this.camera = new THREE.Camera();
    	this.camera.position.z = 1;
	}
	initSceneRender() {
		let self = this;
		this.scene = new THREE.Scene();
		this.renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		this.renderer.setClearColor(0x000000);
	    this.renderer.setPixelRatio($(window)[0].devicePixelRatio);
	    this.renderer.setSize(this.width, this.height);
	    this.$wrap.append(this.renderer.domElement);
	}
	initPlane(width, height, texture) {
		this.uniforms.imageResolution.value = new THREE.Vector2(width, height);
		this.uniforms.texture.value = texture;
		let geometry = new THREE.PlaneBufferGeometry(2, 2, 100, 100);
	    let material = new THREE.ShaderMaterial({
	       	uniforms: this.uniforms,
	       	vertexShader: this.$wrap.find('.fragment-shader').html(),
        	fragmentShader: this.$wrap.find('.vertex-shader').html(),
	      	//wireframe: true,
	      	transparent: true
	    });
	    let mesh = new THREE.Mesh(geometry, material);
	    mesh.position.set(0, 0, 0);
	    this.scene.add(mesh);
	}
	event = function() {
	    var self = this;
	    $(window).resize(function() {
	        self.eventResize();
	    });
	    this.$wrap.mousemove(function(event) {
	    	self.eventMouse(event);
	    });
	};
	eventResize() {
		this.width = this.$wrap.width();
	    this.height = this.$wrap.height();
	    this.uniforms.wrapResolution.value.x = this.width;
	    this.uniforms.wrapResolution.value.y = this.height;
	    this.camera.aspect = this.width / this.height;
	    this.renderer.setSize(this.width, this.height);
	}
	eventMouse(event) {
		this.uniforms.mouse.value.x = event.offsetX;
	    this.uniforms.mouse.value.y = event.offsetY;
	}
}
let threeCanvas = new ThreeCanvas({
	wrap: '.three'
});

});