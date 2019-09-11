/*
====================
====================
■ Control
====================
====================
*/
function Control(object) {
	//class
	this.userAgent = object.userAgent;
	this.flag = object.flag;
	this.element = object.element;
	this.originalMath = object.originalMath;
	this.audio = object.audio;
	this.model = object.model;
	this.uniform = object.uniform;
	this.shader = object.shader;
	this.particle = object.particle;
	this.canvas = object.canvas;
	this.animation = object.animation;
	//property
	this.type = object.type;
	//method
	this.init();
	this.observer();
	this.event();
}
Control.prototype.init = function() { //init
};
Control.prototype.playStyle = function() { //playStyle
	this.element.$pause.css("background-image" , "url(img/common/play.png)").css("background-position" , "14.25px center");
	this.element.$pause.attr("data" , "play");
	this.clickNoneStyle();
};
Control.prototype.pauseStyle = function() { //pauseStyle
	this.element.$pause.css("background-image" , "url(img/common/pause.png)").css("background-position" , "center center");
	this.element.$pause.attr("data" , "pause");
	this.clickAutoStyle();
};
Control.prototype.clickNoneStyle = function() { //clickNoneStyle
	this.element.$back.css("opacity" , "0.0").css("pointer-events" , "none");
	this.element.$next.css("opacity" , "0.0").css("pointer-events" , "none");
};
Control.prototype.clickAutoStyle = function() { //clickAutoStyle
	this.element.$back.css("opacity" , "1.0").css("pointer-events" , "auto");
	this.element.$next.css("opacity" , "1.0").css("pointer-events" , "auto");
};
Control.prototype.clickFirst = function() { //clickFirst
	var self = this;
	this.flag.firstMusic = true;
	this.element.$firstMusicButtonWrapper.fadeOut(function() {
		self.audio.play();
		self.pauseStyle();
		self.element.$musicButtonWrapper.fadeIn();
		self.animation.cameraMove();
		self.animation.modelDance();
	});
};
Control.prototype.observer = function() { //observer
	var self = this;
	function observer() {
		window.requestAnimationFrame(observer);
		if(self.audio.musicCurrentTime > self.audio.musicDuration) {
			self.pauseStyle();
			self.animation.cameraStop();
			self.animation.cameraRestart();
			//self.animation.modelStop();
			self.animation.modelRestart();
		} else if(self.audio.musicCurrentTime <= self.audio.musicDuration) {
			return;
		}
	}
	observer();
};
Control.prototype.event = function() { //event
	var self = this;
	this.element.$firstMusicButton.click(function() {
		self.clickFirst();
	});
	this.element.$back.click(function() {
		self.audio.back();
		self.pauseStyle();
		//self.animation.cameraRestart();
	});
	this.element.$pause.click(function() {
		if($(this).attr("data") == "pause") {
			self.audio.pause();
			self.playStyle();
			self.animation.cameraPause();
			self.animation.modelStop();
		} else if($(this).attr("data") == "play") {
			self.audio.play();
			self.pauseStyle();
			self.animation.cameraPlay();
			self.animation.modelRestart();
		}
	});
	this.element.$next.click(function() {
		self.audio.next();
		self.pauseStyle();
		self.pauseStyle();
		//self.animation.cameraRestart();
	});
	this.element.$window.resize(function() {
		self.resize();
	});
	this.element.$window.scroll(function() {
		self.scroll();
	});
};
Control.prototype.resize = function() { //resize
	if(this.element.window.width >= this.element.window.minWidth) {
		if(this.flag.firstMusic == true) {
			if(this.flag.scroll == true) {
				this.element.$musicButtonWrapper.css("display" , "none");
			} else if(this.flag.scroll == false) {
				this.element.$musicButtonWrapper.fadeIn();
			}
		} else if(this.flag.firstMusic == false) {
			if(this.flag.scroll == true) {
				this.element.$firstMusicButtonWrapper.css("display" , "none");
			} else if(this.flag.scroll == false) {
				this.element.$firstMusicButtonWrapper.fadeIn();
			}
		}
	} else if(this.element.window.width <= this.element.window.maxWidth) {
		if(this.flag.firstMusic == true) {
			if(this.flag.scroll == true) {
				this.element.$musicButtonWrapper.css("display" , "none");
			} else if(this.flag.scroll == false) {
				this.element.$musicButtonWrapper.fadeOut();
			}
		} else if(this.flag.firstMusic == false) {
				this.element.$firstMusicButtonWrapper.css("display" , "none");
			if(this.flag.scroll == true) {
			} else if(this.flag.scroll == false) {
				this.element.$firstMusicButtonWrapper.css("display" , "block");
			}
		}
	}
};
Control.prototype.scroll = function() { //scroll
	if(this.element.scrollValue >= this.element.window.scroll) {
		this.flag.scroll = true;
		if(this.flag.firstMusic == true) {
			this.element.$musicButtonWrapper.fadeOut();
			if(this.element.$pause.attr("data") == "pause") {
				this.audio.fadeOut();
				this.audio.pause();
				this.animation.cameraStop();
				//this.animation.modelStop();
			} else if(this.element.$pause.attr("data") == "play") {
			}
		} else if(this.flag.firstMusic == false) {
			this.element.$firstMusicButtonWrapper.fadeOut();
		}
		this.type == "top" ? this.animation.cameraBack() : null;
	} else if(this.element.scrollValue < this.element.window.scroll) {
		this.flag.scroll = false;
		if(this.flag.firstMusic == true) {
			this.element.$musicButtonWrapper.fadeIn();
			if(this.element.$pause.attr("data") == "pause") {
				this.audio.fadeIn();
				this.audio.play();
				this.animation.cameraRestart();
				//this.animation.modelRestart(0);
			} else if(this.element.$pause.attr("data") == "play") {
			}
		} else if(this.flag.firstMusic == false) {
			this.element.$firstMusicButtonWrapper.fadeIn();
		}
		this.animation.cameraRelative();
	}
};
/*
====================
====================
■ Animation
====================
====================
*/
function Animation(object) {
	//class
	this.userAgent = object.userAgent;
	this.flag = object.flag;
	this.element = object.element;
	this.originalMath = object.originalMath;
	this.audio = object.audio;
	this.model = object.model;
	this.uniform = object.uniform;
	this.shader = object.shader;
	this.particle = object.particle;
	this.canvas = object.canvas;
	this.type = object.type;
	//property
	this.audioScale = {
		axis: null ,
		axisMin: 0.0 ,
		axisMax: 60.0 ,
		size: null ,
		sizeMin: 1.0 ,
		sizeMax: 1.5
	};
	this.degree = this.originalMath.radian(4);
	this.radian = 0;
	this.relativePosition = new THREE.Vector3(0 , 50 , 175);
	this.setDuration = 1.5;
	this.purlWait = 10;
	this.danceWait = 5;
	this.cameraPattern = {
		p1: new THREE.Vector3(-100 , -80 , 150) ,
		p2: new THREE.Vector3(50 , -150 , -170) ,
		p3: new THREE.Vector3(70 , -60 , 180) ,
		p4: this.relativePosition ,
		du1: 1.5 ,
		du2: 1.5 ,
		du3: 1.5 ,
		du4: 1.5 ,
		de1: 20 ,
		de2: 5 ,
		de3: 20 ,
		de4: 20 ,
	};
	this.standardTime = 10;
	this.particlePosition = [];
	this.cameraTimeLine , this.modeltimeLine , this.flagTimeLine;
	self.dataset;
	//method
	this.init();
	this.event();
}
Animation.prototype.init = function() { //init
	var self = this;
	this.resize();
	this.scroll();
	if(this.type == "top") {
		this.model.load((function(modelData) {
			self.dataset = modelData.getAttribute("position").array;
			if(self.userAgent.device == "Sp") {
				for(var i = 0; i < self.dataset.length; i++) {
					self.particlePosition[i] = {
						x: self.dataset[i * 3] / 50 ,
						y: self.dataset[i * 3 + 2] / 50 ,
						z: self.dataset[i * 3 + 1] / -50 + 50
					};
				}
			} else if(self.userAgent.device == "Other" || self.userAgent.device == "Tab") {
				var degree = self.degree += 0.0000000125; //追加
				var radian = self.originalMath.radian(self.degree);　//追加
				for(var i = 0; i < self.dataset.length; i++) {　
					var perlin = 50 + 300 * noise.perlin3(i / 20 + degree / 5 , i / 70 , degree);　//追加
					self.particlePosition[i] = {
						/*
						x: Math.random() * 50000 - 25000 ,
						y: Math.random() * 50000 - 25000 ,
						z: Math.random() * 50000 - 25000
						*/
						x: self.particle.radius.x * Math.cos((i + perlin) * i * radian) ,
						y: self.particle.radius.y * Math.sin((i + perlin) * i * radian) ,
						z: 25
					};
				}
			}
			self.canvas.createObjects();
			self.purl();
		}));
	} else if(this.type == "side") {
		this.spPurl();
	}
};
Animation.prototype.cameraMove = function() { //cameraMove
	this.cameraTimeLine = new TimelineMax();
	this.cameraTimeLine.to(this.canvas.camera.object.position , this.cameraPattern.du1 , {
		delay: this.cameraPattern.de1 ,
		x: this.cameraPattern.p1.x ,
		y: this.cameraPattern.p1.y ,
		z: this.cameraPattern.p1.z
	})
	.to(this.canvas.camera.object.position , this.cameraPattern.du2 , {
		delay: this.cameraPattern.de2 ,
		x: this.cameraPattern.p2.x ,
		y: this.cameraPattern.p2.y ,
		z: this.cameraPattern.p2.z ,
	})
	.to(this.canvas.camera.object.position , this.cameraPattern.du3 , {
		delay: this.cameraPattern.de3 ,
		x: this.cameraPattern.p3.x ,
		y: this.cameraPattern.p3.y ,
		z: this.cameraPattern.p3.z ,
	})
	.to(this.canvas.camera.object.position , this.cameraPattern.du4 , {
		delay: this.cameraPattern.de4 ,
		x: this.cameraPattern.p4.x ,
		y: this.cameraPattern.p4.y ,
		z: this.cameraPattern.p4.z ,
	}).repeat(this.cameraTimeLine);
};
Animation.prototype.cameraPlay = function() { //cameraPlay
	this.cameraTimeLine.play();
}
Animation.prototype.cameraPause = function() { //cameraPause
	this.cameraTimeLine.pause();
	this.cameraTimeLine.kill();
};
Animation.prototype.cameraStop = function() { //cameraStop
	this.cameraTimeLine.kill();
	this.cameraRelative();
};
Animation.prototype.cameraRestart = function() { //cameraRestart
	this.cameraTimeLine.restart();
};
Animation.prototype.cameraRelative = function() { //cameraRelative
	var relativePosition = new TweenMax(this.canvas.camera.object.position , 0.3 , {
		x: this.cameraPattern.p4.x ,
		y: this.cameraPattern.p4.y ,
		z: this.cameraPattern.p4.z
	});
};
Animation.prototype.cameraBack = function() { //cameraBack
	var backPosition = new TweenMax(this.canvas.camera.object.position , 0.3 , {
		z: this.cameraPattern.p4.z / 1.5
	});
};
Animation.prototype.purl = function() { //purl
	var self = this;
	function purl() {
		window.requestAnimationFrame(purl);
		self.degree += 0.0000000125;
		self.radian = self.originalMath.radian(self.degree);
		//self.audio.analyser.getFloatFrequencyData(self.audio.flotFrequencyData);
		//self.audio.analyser.getFloatTimeDomainData(self.audio.floatTimeDomainData);
		self.audio.analyser.getByteFrequencyData(self.audio.frequencyData);
		//self.audio.analyser.getByteTimeDomainData(self.audio.timeDomainData);
		self.audioScale.axis = d3.scaleLinear().domain([d3.min(self.audio.frequencyData) , d3.max(self.audio.frequencyData)]).range([self.audioScale.axisMin  , self.audioScale.axisMax , self.audioScale.axisMax]);
		for(var i = 0; i < self.particle.positionArray.length; i++) {
			//perlin
			var perlin = 50 + 300 * noise.perlin3(i / 20 + self.degree / 5 , i / 70 , self.degree);
			//0
			self.canvas.objects[0].children[0].geometry.attributes.position.needsUpdate = true;
			self.canvas.objects[0].children[0].geometry.attributes.position.array[i * 3] = self.flag.model == true ? self.particlePosition[i].x : self.userAgent.device == "Sp" ? self.particlePosition[i].x : self.particle.radius.x * Math.cos((i + perlin) * i * self.radian);
			self.canvas.objects[0].children[0].geometry.attributes.position.array[i * 3 + 1] = self.flag.model == true ? self.particlePosition[i].y : self.userAgent.device == "Sp"? self.particlePosition[i].y : self.particle.radius.y * Math.sin((i + perlin) * i * self.radian);
			self.canvas.objects[0].children[0].geometry.attributes.position.array[i * 3 + 2] = self.flag.model == true ? self.particlePosition[i].z : self.userAgent.device == "Sp"? self.particlePosition[i].z : 25;
			//1
			self.canvas.objects[1].children[0].geometry.attributes.position.needsUpdate = true;
			self.canvas.objects[1].children[0].geometry.attributes.position.array[i * 3] = self.audio.frequencyData[i] > 0 ? self.particle.radius.x * Math.cos(i * self.radian * 2) : self.particle.radius.x * Math.cos((i + perlin) * i * self.radian);
			self.canvas.objects[1].children[0].geometry.attributes.position.array[i * 3 + 1] = self.audio.frequencyData[i] > 0 ? self.particle.radius.y * Math.sin(i * self.radian * 2) : self.particle.radius.y * Math.sin((i + perlin) * i * self.radian);
			//self.canvas.objects[1].children[0].geometry.attributes.position.array[i * 3 + 2] = self.audio.frequencyData[i] > 0 ? -self.audioScale.axis(self.audio.floatTimeDomainData[i] * 150) : perlin / 20;
			self.canvas.objects[1].children[0].geometry.attributes.position.array[i * 3 + 2] = self.audio.frequencyData[i] > 0 ? -self.audioScale.axis(self.audio.frequencyData[i] - 60) : perlin / 20;
			//2
			self.canvas.objects[2].children[0].geometry.attributes.position.needsUpdate = true;
			self.canvas.objects[2].children[0].geometry.attributes.position.array[i * 3] = self.audio.frequencyData[i] > 0 ? self.particle.radius.x * Math.cos(i * self.radian * 2) : self.particle.radius.x * Math.cos((i + perlin) * i * self.radian);
			self.canvas.objects[2].children[0].geometry.attributes.position.array[i * 3 + 1] = self.audio.frequencyData[i] > 0 ? self.particle.radius.y * Math.sin(i * self.radian * 2) : self.particle.radius.y * Math.sin((i + perlin) * i * self.radian);
			//self.canvas.objects[2].children[0].geometry.attributes.position.array[i * 3 + 2] = self.audio.frequencyData[i] > 0 ? -self.audioScale.axis(self.audio.floatTimeDomainData[i] * 150) : perlin / 20;
			self.canvas.objects[2].children[0].geometry.attributes.position.array[i * 3 + 2] = self.audio.frequencyData[i] > 0 ? -self.audioScale.axis(self.audio.frequencyData[i]) : perlin / 20;
		}
		////////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//console.log(self.audio.musicCurrentTime + "/" + self.audio.musicDuration);
		if(self.audio.musicCurrentTime >= self.audio.musicDuration / self.standardTime && self.audio.musicCurrentTime <= self.audio.musicDuration - (self.audio.musicDuration / self.standardTime)) {
			//console.log("animation");
			self.flag.model = true;
		} else if(self.audio.musicCurrentTime < self.audio.musicDuration / self.standardTime || self.audio.musicCurrentTime > self.audio.musicDuration - (self.audio.musicDuration / self.standardTime)) {
			//console.log("no animation");
			self.flag.model = false;
		}
		////////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////
		self.sendUniforms();
	}
	purl();
};
Animation.prototype.modelDance = function() { //modelDance
	var self = this;
	this.modelTimeLine = TweenMax.to(this.particlePosition , 1 , {
		x: function(index) {
			return self.dataset[index * 3] / 50;
		} ,
		y: function(index) {
			return (self.originalMath.calcNormal(0.001 , 1) * 2.5 * self.dataset[index * 3 + 2]) / 50;
		} ,
		z: function(index) {
			return self.dataset[index * 3 + 1] / -50 + 50;
		} ,
		repeat: -1 ,
		repeatDelay: 10 ,
		yoyo: true ,
		ease: Expo.easeOut
	});
	this.modelAlpha = TweenMax.to(this.uniform.uniforms.alpha , 1 , {
		value: 1.0 ,
		repeat: -1 ,
		repeatDelay: 10 ,
		yoyo: true ,
		ease: Expo.easeOut
	});
};
Animation.prototype.modelPlay = function() { //modelPlay
	this.modelTimeLine.play();
	this.modelAlpha.pla();
}
Animation.prototype.modelPause = function() { //modelPause
	this.modelTimeLine.pause();
	this.modelTimeLine.kill();
	this.modelAlpha.pause();
	this.modelAlpha.kill();
};
Animation.prototype.modelStop = function() { //modelStop
	this.modelTimeLine.kill();
	this.modelRelative(1.5 , "In");
	this.modelAlpha.kill();
};
Animation.prototype.modelRestart = function() { //modelRestart
	this.modelTimeLine.restart();
	this.modelAlpha.restart();
};
Animation.prototype.modelSet = function() { //modelSet
	var self = this;
	var relativePosition = new TweenMax(this.particlePosition , this.setDuration , {
		ease: Circ.easeIn ,
		x: function(index) {
			return self.dataset[index * 3] / 50;
		} ,
		y: function(index) {
			return self.dataset[index * 3 + 2] / 50;
		} ,
		z: function(index) {
			return self.dataset[index * 3 + 1] / -50 + 50;
		}
	});
};
Animation.prototype.modelRelative = function(time ,  type) { //modelRelative
	var relativePosition = new TweenMax(this.particlePosition , time , {
		ease: Circ.ease + type ,
		x: function(index) {
			return Math.random() * 50000 - 25000;
		} ,
		y: function(index) {
			return Math.random() * 50000 - 25000;
		} ,
		z: function(index) {
			return Math.random() * 50000 - 25000;
		}
	});
};
Animation.prototype.spPurl = function() { //spPurl
	var self = this;
	function spPurl() {
		window.requestAnimationFrame(spPurl);
		self.degree += 0.0000000075;
		self.radian = self.originalMath.radian(self.degree);
		for(var i = 0; i < self.particle.positionArray.length; i++) {
			var perlin = 50 + 300 * noise.perlin3(i / 20 + self.degree / 5 , i / 70 , self.degree);
			//0
			self.canvas.objects[0].children[0].geometry.attributes.position.needsUpdate = true;
			self.canvas.objects[0].children[0].geometry.attributes.position.array[i * 3] = self.particle.radius.x * Math.cos((i + perlin) * i * self.radian);
			self.canvas.objects[0].children[0].geometry.attributes.position.array[i * 3 + 1] = self.particle.radius.y * Math.sin((i + perlin) * i * self.radian);
			self.canvas.objects[0].children[0].geometry.attributes.position.array[i * 3 + 2] = perlin / 20;
			//1
			self.canvas.objects[1].children[0].geometry.attributes.position.needsUpdate = true;
			self.canvas.objects[1].children[0].geometry.attributes.position.array[i * 3] = self.particle.radius.x * Math.cos((i + perlin) * i * self.radian);
			self.canvas.objects[1].children[0].geometry.attributes.position.array[i * 3 + 1] = self.particle.radius.y * Math.sin((i + perlin) * i * self.radian);
			self.canvas.objects[1].children[0].geometry.attributes.position.array[i * 3 + 2] = perlin / 20;
		}
	}
	spPurl();
};
Animation.prototype.sendUniforms = function() { //sendUniforms
	this.uniform.uniforms.time.value += 0.1;
	this.audioScale.size = d3.scaleLinear().domain([d3.min(this.audio.frequencyData) , d3.max(this.audio.frequencyData)]).range([this.audioScale.sizeMin  , this.audioScale.sizeMax , this.audioScale.sizeMax]);
	this.uniform.uniforms.audio.value = this.audioScale.size(this.audio.frequencyData[0]);
	if(this.flag.sp == true) this.uniform.uniforms.sp.value = 1;
	if(this.flag.sp == false) this.uniform.uniforms.sp.value = 0;
	if(this.flag.dance == true) this.uniform.uniforms.dance.value = 1;
	if(this.flag.dance == false) this.uniform.uniforms.dance.value = 0;
	if(this.flag.model == true) {
		this.uniform.uniforms.danceNow.value = 1;
		this.uniform.uniforms.dance.value = 1;
	}
	if(this.flag.model == false) {
		this.uniform.uniforms.danceNow.value = 0;
		this.uniform.uniforms.dance.value = 0;
	}
	if(this.userAgent.device == "Sp") this.uniform.uniforms.deviceSp.value = 1;
	if(this.userAgent.device != "Sp") this.uniform.uniforms.deviceSp.value = 0;
	if(this.flag.scroll == true) this.uniform.uniforms.scroll.value = 1;
	if(this.flag.scroll == false) this.uniform.uniforms.scroll.value = 0;
};
Animation.prototype.event = function() { //event
	var self = this;
	this.element.$window.resize(function() {
		self.resize();
	});
	this.element.$window.scroll(function() {
		self.scroll();
	});
};
Animation.prototype.resize = function() { //resize
	if(this.element.window.width >= this.element.window.minWidth) {
		this.flag.sp = false;
	} else if(this.element.window.width <= this.element.window.maxWidth) {
		this.flag.sp = true;
	}
}
Animation.prototype.scroll = function() { //scroll
	if(this.userAgent.device == "Sp") {
		if(this.element.scrollValue >= this.element.window.scroll) {
			this.modelRelative(0.1 , "Out");
		}  else if(this.element.scrollValue < this.element.window.scroll) {
			this.modelSet();
		}
	} else if(this.userAgent.device == "Other" || self.userAgent.device == "Tab") {
		return;
	}
};
/*
====================
====================
■ Canvas
====================
====================
*/
function Canvas(object) {
	//class
	this.userAgent = object.userAgent;
	this.flag = object.flag;
	this.element = object.element;
	this.originalMath = object.originalMath;
	this.audio = object.audio;
	this.model = object.model;
	this.uniform = object.uniform;
	this.shader = object.shader;
	this.particle = object.particle;
	//property
	this.type = object.type;
	this.width = this.element.window.width;
	this.height = this.element.window.height;
	this.scrollValue = 0;
	this.scene , this.rednerer;
	this.scene_renderer = {
		clearColor: "rgb(0 , 0 , 0)"
	};
	this.light = {
		position: new THREE.Vector3(1 , 1 , 1) ,
		color: "rgb(244 , 244 , 244)"
	};
	this.camera = {
		perspective: {
			flag: true ,
			position: new THREE.Vector3(0 , 50 , 175) , //175
			rotation: new THREE.Vector3(this.originalMath.radian(0) , this.originalMath.radian(0) , this.originalMath.radian(0)) ,
			fov: 50 ,
			far: 3000
		} ,
		orthographic: {
			flag: false ,
			left: -1 ,
			right: 1 ,
			top: 1 ,
			bottom: -1 ,
			near: 0 ,
			far: 1000
		}
	};
	this.modelGroup = {
		position:  new THREE.Vector3(-10 , 30 , 0) ,
		rotation: new THREE.Vector3(this.originalMath.radian(90) , this.originalMath.radian(15) , this.originalMath.radian(0)) ,
		scale: new THREE.Vector3(1.0 , 1.0 , 1.0)
	};
	this.particleGroup1 = {
		position:  new THREE.Vector3(-10 , 25 , 0) ,
		rotation: new THREE.Vector3(this.originalMath.radian(100) , this.originalMath.radian(15) , this.originalMath.radian(0)) ,
		scale: new THREE.Vector3(1.0 , 1.0 , 1.0)
	};
	this.particleGroup2 = {
		position:  new THREE.Vector3(-10 , 12.5 , 0) ,
		rotation: new THREE.Vector3(this.originalMath.radian(100) , this.originalMath.radian(15) , this.originalMath.radian(0)) ,
		scale: new THREE.Vector3(1.0 , 1.0 , 1.0)
	};
	this.objects = [];
	this.composer , this.ssaa , this.copyPass;
	this.mainAnimation;
	//method
	this.init();
	this.event();
}
Canvas.prototype.init = function() { //init
	this.createScene_rednerer();
	this.createLight();
	this.createCamera();
	if(this.type == "side") {
		this.createSideObjects();
	}
	this.setPostprocessing();
	this.rendering();
};
Canvas.prototype.createScene_rednerer = function() { //createScene_rednerer
	this.scene = new THREE.Scene();
	this.renderer = new THREE.WebGLRenderer({alpha: true});
	this.renderer.setClearColor(this.clearColor , 0);
	this.renderer.setPixelRatio(window.devicePixelRatio);
	this.renderer.setSize(this.width , this.height);
	this.element.$canvasWrapper.append(this.renderer.domElement);
};
Canvas.prototype.createLight = function() { //createLight
	//this.scene.add(new THREE.AmbientLight(0xffffff));
	this.light.directional = new THREE.DirectionalLight(new THREE.Color(this.light.color));
	this.light.directional.position.set(this.light.position.x , this.light.position.y , this.light.position.z).normalize();
	this.scene.add(this.light.directional);
};
Canvas.prototype.createCamera = function() { //createCamera
	if(this.camera.perspective.flag == true) {
		this.camera.object = new THREE.PerspectiveCamera(this.camera.fov , this.width / this.height , 0.1 , this.camera.far);
		this.camera.object.position.set(this.camera.perspective.position.x , this.camera.perspective.position.y , this.camera.perspective.position.z);
		this.camera.object.rotation.set(this.camera.perspective.rotation.x , this.camera.perspective.rotation.y , this.camera.perspective.rotation.z);
		this.scene.add(this.camera.object);
	}
	if(this.camera.orthographic.flag == true) {
		this.camera.object = new THREE.OrthographicCamera(this.camera.orthographic.left , this.camera.orthographic.right , this.camera.orthographic.top , this.camera.orthographic.bottom , this.camera.orthographic.near , this.camera.orthographic.far);
		this.scene.add(this.camera.object);
	}
};
Canvas.prototype.createObjects = function() { //createObjects
	//0
	this.objects[0] = new THREE.Group();
	this.objects[0].position.set(this.modelGroup.position.x , this.modelGroup.position.y , this.modelGroup.position.z);
	this.objects[0].rotation.set(this.modelGroup.rotation.x , this.modelGroup.rotation.y , this.modelGroup.rotation.z);
	this.objects[0].scale.set(this.modelGroup.scale.x , this.modelGroup.scale.y , this.modelGroup.scale.z);
	this.objects[0].add(this.particle.create("model" , 1.75 , true));
	this.scene.add(this.objects[0]);
	//1
	this.objects[1] = new THREE.Group();
	this.objects[1].position.set(this.particleGroup1.position.x , this.particleGroup1.position.y , this.particleGroup1.position.z);
	this.objects[1].rotation.set(this.particleGroup1.rotation.x , this.particleGroup1.rotation.y , this.particleGroup1.rotation.z);
	this.objects[1].scale.set(this.particleGroup1.scale.x , this.particleGroup1.scale.y , this.particleGroup1.scale.z);
	this.objects[1].add(this.particle.create("particle" , 1 , false));
	this.scene.add(this.objects[1]);
	//2
	this.objects[2] = new THREE.Group();
	this.objects[2].position.set(this.particleGroup2.position.x , this.particleGroup2.position.y , this.particleGroup2.position.z);
	this.objects[2].rotation.set(this.particleGroup2.rotation.x , this.particleGroup2.rotation.y , this.particleGroup2.rotation.z);
	this.objects[2].scale.set(this.particleGroup2.scale.x , this.particleGroup2.scale.y , this.particleGroup2.scale.z);
	this.objects[2].add(this.particle.create("particle" , 2 , false));
	this.scene.add(this.objects[2]);
};
Canvas.prototype.createSideObjects = function() { //createSideObjects
	//0
	this.objects[0] = new THREE.Group();
	this.objects[0].position.set(-90 , this.userAgent.device == "Sp" ? 70 : 130 , -100);
	this.objects[0].rotation.set(this.originalMath.radian(90) , this.originalMath.radian(10) , this.originalMath.radian(10));
	this.objects[0].scale.set(this.particleGroup1.scale.x , this.particleGroup1.scale.y , this.particleGroup1.scale.z);
	this.objects[0].add(this.particle.create("particle" , 1.5 , false));
	this.scene.add(this.objects[0]);
	//1
	this.objects[1] = new THREE.Group();
	this.objects[1].position.set(-90 , this.userAgent.device == "Sp" ? -70 : -80 , -50);
	this.objects[1].rotation.set(this.originalMath.radian(70) , this.originalMath.radian(10) , this.originalMath.radian(10));
	this.objects[1].scale.set(this.particleGroup2.scale.x , this.particleGroup2.scale.y , this.particleGroup2.scale.z);
	this.objects[1].add(this.particle.create("particle" , 1.5 , false));
	this.scene.add(this.objects[1]);
};
Canvas.prototype.setPostprocessing = function() { //setPostprocessing
	this.composer = new THREE.EffectComposer(this.renderer);
	this.ssaa = new THREE.SSAARenderPass(this.scene , this.camera.object);
	this.ssaa.clearAlpha = 0.0;
	this.ssaa.unbiased = false;
	this.composer.addPass(this.ssaa);
	this.copyPass = new THREE.ShaderPass(THREE.CopyShader);
	this.copyPass.renderToScreen = true;
	this.composer.addPass(this.copyPass);
};
Canvas.prototype.rendering = function() { //rendering
	var self = this;
	function rendering() {
		self.mainAnimation = window.requestAnimationFrame(rendering);
		self.update();
	}
	rendering();
};
Canvas.prototype.update = function() { //update
	if(this.userAgent.device == "Sp") this.ssaa.sampleLevel = 3;
	if(this.userAgent.device == "Other") this.ssaa.sampleLevel = 2;
	this.composer.render();
	this.camera.object.lookAt(this.scene.position);
};
Canvas.prototype.event = function() { //event
	var self = this;
	this.element.$window.resize(function() {
		self.resize();
	});
};
Canvas.prototype.resize = function() { //resize
	this.width = this.element.window.width;
	this.height = this.element.window.height;
	this.camera.object.aspect = this.width / this.height;
	this.camera.object.updateProjectionMatrix();
	this.renderer.setSize(this.width , this.height);
	this.composer.setSize(this.width , this.height);
};
/*
====================
====================
■ Particle
====================
====================
*/
function Particle(object) {
	//class
	this.userAgent = object.userAgent;
	this.flag = object.flag;
	this.element = object.element;
	this.originalMath = object.originalMath;
	this.audio = object.audio;
	this.model = object.model;
	this.uniform = object.uniform;
	this.shader = object.shader;
	//property
	this.type = object.type;
	this.positionArray;
	this.color = {
		r: [47 , 228] ,
		g: [67 , 0] ,
		b: [153 , 127]
	};
	this.scale = 100;
	this.radius = {
		x: 200 ,
		y: 100
	};
}
Particle.prototype.create = function(geometryType , size , alpha) { //create
	var point = [];
	for(var i = 0; i < 1100; i++) {
		var x = this.radius.x * Math.cos(i * Math.PI / 180);
		var y = this.radius.y * Math.sin(i * Math.PI / 180);
		var z = 0;
		point.push(new THREE.Vector3(x , y , z));
	}
	var path = new THREE.CatmullRomCurve3(point);
	var tube = new THREE.TubeGeometry(path , 800 , 10);
	var count = tube.vertices.length;
	this.positionArray = new Float32Array(count);
	var colorArray = new Float32Array(count);
	var scaleArray = new Float32Array(count);
	for(var i = 0; i < tube.vertices.length;  i++) {
		this.positionArray[i * 3] = Math.random() * (tube.vertices[i].x - tube.vertices[i].x - tube.vertices[i].x / 12) + tube.vertices[i].x;
		this.positionArray[i * 3 + 1] = Math.random() * (tube.vertices[i].y - tube.vertices[i].y - tube.vertices[i].y / 12) + tube.vertices[i].y;
		this.positionArray[i * 3 + 2] = Math.random() * (tube.vertices[i].z - tube.vertices[i].z - tube.vertices[i].z * 2.5) + tube.vertices[i].z;
		var color = Math.floor(Math.random() * 2);
		var colorIndex = color;
		var red = this.color.r[color];
		var green = this.color.g[color];
		var blue = this.color.b[color];
		colorArray[i  * 3] = red / 255;
		colorArray[i * 3 + 1] = green / 255;
		colorArray[i * 3 + 2] = blue / 255;
		scaleArray[i * 3] = (this.originalMath.random(1 , this.scale) / 2) * size;
	}
	var buffer = new THREE.BufferGeometry();
	var material = new THREE.ShaderMaterial({
		uniforms: this.uniform.uniforms ,
		vertexShader: this.shader[geometryType].vertex ,
		fragmentShader: this.shader[geometryType].fragument ,
		transparent: alpha ,
	});
	buffer.addAttribute("position" , new THREE.BufferAttribute(this.positionArray , 3 , 1).setDynamic(true));
	buffer.addAttribute("color" , new THREE.BufferAttribute(colorArray , 3 , 1).setDynamic(true));
	buffer.addAttribute("scale" , new THREE.BufferAttribute(scaleArray , 3 , 1).setDynamic(true));
	var mesh = new THREE.Points(buffer , material);
	mesh.sortParticles = true;
	return mesh;
};
/*
====================
====================
■ Shader
====================
====================
*/
function Shader(object) {
	//class
	this.userAgent = object.userAgent;
	this.flag = object.flag;
	this.element = object.element;
	this.originalMath = object.originalMath;
	this.audio = object.audio;
	this.model = object.model;
	this.uniform = object.uniform;
	//property
	this.type = object.type;
	this.model = {
		vertex: [
			"uniform float time;" ,
			"uniform float audio;" ,
			"uniform int dance;" ,
			"uniform int sp;" ,
			"attribute float scale;" ,
			"attribute vec3 color;" ,
			"varying vec3 vColor;" ,
			"vec3 dancing(vec3 position) {" ,
				"vec3 originalPosition = position;" ,
				"if(dance == 1) {" ,
					"position.x = position.x;" ,
					"position.y = position.y;" ,
					"position.z = position.z * audio / 1.25;" ,
					"return vec3(position.x , position.y , position.z);" ,
				"} else if(dance == 0) {" ,
					"return originalPosition;" ,
				"}" ,
			"}" ,
			"float revisionScale(float scale) {" ,
				"if(sp == 0) {" ,
					"if(dance == 1) {" ,
						"return scale * audio;" ,
					"} else if(dance == 0) {" ,
						"return scale;" ,
					"}" ,
				"} else if(sp == 1) {" ,
					"if(dance == 1) {" ,
						"return (scale * audio) / 1.75;" ,
					"} else if(dance == 0) {" ,
						"return scale / 1.75;" ,
					"}" ,
				"}" ,
			"}" ,
			"void main() {" ,
				"vec4 mvPosition = modelViewMatrix * vec4(dancing(position) , 1.0);" ,
				" gl_PointSize = revisionScale(scale) * (150.0 / length(mvPosition.xyz));" ,
				"gl_Position = projectionMatrix * mvPosition;" ,
				"vColor = color;" ,
			"}"
		].join("\n") ,
		fragument: [
			"uniform float time;" ,
			"uniform float audio;" ,
			"uniform int dance;" ,
			"uniform int scroll;" ,
			"uniform int sp;" ,
			"uniform int danceNow;" ,
			"uniform int deviceSp;" ,
			"uniform float alpha;" ,
			"varying vec3 vColor;" ,
			"float alphaFlag() {" ,
				"if(deviceSp == 1) {" ,
					"return 1.0;" ,
				"} else if(deviceSp == 0) {" ,
					"if(danceNow == 1) {" ,
						"if(scroll == 1) {" ,
							"return 0.0;" ,
						"} else if(scroll == 0) {" ,
							"return alpha;" ,
						"}" ,
					"} else if(danceNow == 0) {" ,
						"return 0.0;" ,
					"}" ,
				"}" ,
			"}" ,
			"void main() {" ,
				"float dot = length(gl_PointCoord - vec2(0.5, 0.5));" ,
				"if (dot > 0.1) discard;" ,
				"float r = vColor.x;" ,
				"float g = vColor.y;" ,
				"float b = vColor.z;" ,
				"gl_FragColor = vec4(r , g , b , alphaFlag());" ,
			"}"
		].join("\n")
	};
	this.particle = {
		vertex: [
			"uniform float time;" ,
			"uniform float audio;" ,
			"attribute float scale;" ,
			"attribute vec3 color;" ,
			"varying vec3 vColor;" ,
			"const float pi = 3.14;" ,
			"void main() {" ,
				"vec4 mvPosition = modelViewMatrix * vec4(position , 1.0);" ,
				"gl_PointSize = scale * (150.0 / length(mvPosition.xyz));" ,
				"gl_Position = projectionMatrix * mvPosition;" ,
				"vColor = color;" ,
			"}"
		].join("\n") ,
		fragument: [
			"uniform float time;" ,
			"uniform float audio;" ,
			"varying vec3 vColor;" ,
			"void main() {" ,
				"float dot = length(gl_PointCoord - vec2(0.5, 0.5));" ,
				"if (dot > 0.1) discard;" ,
				"gl_FragColor = vec4(vColor ,  1.0);" ,
			"}"
		].join("\n")
	};
}
/*
====================
====================
■ Uniform
====================
====================
*/
function Uniform(object) {
	//class
	this.userAgent = object.userAgent;
	this.flag = object.flag;
	this.element = object.element;
	this.originalMath = object.originalMath;
	this.audio = object.audio;
	this.model = object.model;
	//property
	this.type = object.type;
	this.uniforms = {
		time: {
			type: "f" ,
			value: 0.0
		} ,
		audio: {
			type: "f" ,
			value: 1.0
		} ,
		dance: {
			type: "i" ,
			value: 0
		} ,
		sp: {
			type: "i" ,
			value: 0
		} ,
		danceNow: {
			type: "i" ,
			value: 0
		} ,
		alpha: {
			type: "f" ,
			value: 0.0
		} ,
		deviceSp: {
			type: "i" ,
			value: 0
		}  ,
		scroll: {
			type: "i" ,
			value: 0
		}
	};
}
/*
====================
====================
■ Model
====================
====================
*/
function Model(object) {
	//class
	this.userAgent = object.userAgent;
	this.flag = object.flag;
	this.element = object.element;
	this.originalMath = object.originalMath;
	this.audio = object.audio;
	//property
	this.type = object.type;
	this.modelPath = "model/";
	this.modelFile = [this.modelPath + "model.obj"];
	this.modelIndex = 0;
	this.loader = new THREE.OBJLoader();
}
Model.prototype.load = function(callback) { //load
	var self = this;
	this.loader.load(this.modelFile[this.modelIndex] ,function(model) {
		callback(model.children[0].geometry);
	});
};
/*
====================
====================
■ Audio
====================
====================
*/
function Audio(object) {
	//class
	this.userAgent = object.userAgent;
	this.flag = object.flag;
	this.element = object.element;
	this.originalMath = object.originalMath;
	//property
	this.type = object.type;
	if(this.type == "top") this.audioFile = ["audio/audio01.mp3", "audio/audio02.mp3"];
	this.nowMusic = 0;
	this.fftSize = 4096;
	this.flotFrequencyData = new Float32Array(this.fftSize);
	this.floatTimeDomainData = new Float32Array(this.fftSize);
	this.frequencyData = new Uint8Array(this.fftSize);
	this.timeDomainData = new Uint8Array(this.fftSize);
	this.musicDuration , this.musicCurrentTime , this.audioContext , this.audioSrc , this.gain , this.analyser , this.oscillator;
	//method
	this.init();
}
Audio.prototype.init = function() { //init
	if(this.type == "top") {
		this.element.$audio.attr("src" , this.audioFile[this.nowMusic]);　//結合処理をしていた部分( + ".mp3")
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		this.audioContext = new AudioContext || new webkitAudioContext || new mozAudioContext;
		this.audioSrc = this.audioContext.createMediaElementSource(this.element.$audio.get(0));
		this.analyser = this.audioContext.createAnalyser();
		this.safari();
		this.end();
	} else if(this.type == "side") {
		return;
	}
};
Audio.prototype.safari = function() { //safari
	if(this.userAgent.browser == "Chrome") this.analyser.fftSize = this.fftSize;
	if(this.userAgent.browser == "Firefox") this.analyser.fftSize = this.fftSize;
    if(this.userAgent.browser == "IE") this.analyser.fftSize = this.fftSize;
	if(this.userAgent.browser == "Safari") this.analyser.fftSize = 2048;
	this.audioSrc.connect(this.analyser);
	this.audioSrc.connect(this.audioContext.destination);
};
Audio.prototype.analysisBPM = function(data) { //analysisBPM
	console.log(data);
};
Audio.prototype.play = function() { //play
	this.element.$audio[0].play();
};
Audio.prototype.pause = function() { //pause
	this.element.$audio[0].pause();
};
Audio.prototype.stop = function() { //stop
	this.pause();
	this.element.$audio[0].currentTime = 0;
};
Audio.prototype.back = function() { //back
	if(this.nowMusic >= 0) {
		this.nowMusic -= 1;
		if(this.nowMusic < 0) {
			this.nowMusic = this.audioFile.length - 1;
		}
		this.element.$audio.attr("src" , this.audioFile[this.nowMusic]);　//結合処理をしていた部分( + ".mp3")
		this.play();
	}
};
Audio.prototype.next = function() { //next
	var self = this;
	if(this.nowMusic <= this.audioFile.length) {
		this.nowMusic += 1;
		if(this.nowMusic > this.audioFile.length - 1) {
			this.reset();
			return;
		}
		this.element.$audio.attr("src" , this.audioFile[this.nowMusic]);　//結合処理をしていた部分( + ".mp3")
		this.play();
	}
};
Audio.prototype.reset = function() { //reset
	this.nowMusic = 0;
	this.element.$audio.attr("src" , this.audioFile[this.nowMusic]);　//結合処理をしていた部分( + ".mp3")
	this.play();
};
Audio.prototype.end = function() { //end
	var self = this;
	function end() {
		window.requestAnimationFrame(end);
		self.musicCurrentTime = self.element.$audio[0].currentTime;
		self.musicDuration = Math.floor(self.element.$audio[0].duration);
		if(self.musicCurrentTime > self.musicDuration) {
			self.next();
		} else if(self.musicCurrentTime <= self.musicDuration) {
			self.flag.musicEnd = false;
		}
	}
	end();
};
Audio.prototype.fadeIn = function(duration) { //fadeIn
	var self = this;
	var duration = 300 || duration;
	var volume = this.element.$audio[0].volume;
	if(volume < 1) {
		window.setInterval(function() {
			volume += 0.1;
			if(volume >= 1) {
				return;
			}
			self.element.$audio[0].volume = volume;
		} , duration / 10);
	}
};
Audio.prototype.fadeOut = function(duration) { //fadeOut
	var self = this;
	var duration = 300 || duration;
	var volume = this.element.$audio[0].volume;
	if(volume > 0) {
		window.setInterval(function() {
			volume -= 0.1;
			if(volume <= 0) {
				return;
			}
			self.element.$audio[0].volume = volume;
		} , duration / 10);
	}
};
/*
====================
====================
■ OriginalMath
====================
====================
*/
function OriginalMath(object) {
	//class
	this.userAgent = object.userAgent;
	this.flag = object.flag;
	this.element = object.element;
	//property
	this.type = object.type;
}
OriginalMath.prototype.init = function() { //init
};
OriginalMath.prototype.radian = function(degree) { //radian
	return degree * Math.PI / 180;
};
OriginalMath.prototype.random = function(min , max) { //random
	return Math.floor(Math.random() * max - min) + min;
};
OriginalMath.prototype.randomInverted = function(min , max) { //randomInverted
	return result = 1 - (this.random(min , max) * this.random(min , max));
};
OriginalMath.prototype.calcNormal = function(min , max) { //calcNormal
	var r1 = this.random(min , max);
	var r2 = this.random(min , max);
	var result = Math.sqrt(-2.0 * Math.log(r1)) * Math.sin(2.0 * Math.PI * r2);
	result = (result + 3) / 6;
    return result;
};
/*
====================
====================
■ Element
====================
====================
*/
function Element(object) {
	//class
	this.userAgent = object.userAgent;
	this.flag = object.flag;
	//property
	this.type = object.type;
	this.$canvasWrapper =  $("#canvas-wrapper");
	this.$audio = $("#step-audio");
	this.$musicButton = $(".music-button");
	this.$firstMusicButtonWrapper = $(".first-music-button-wrapper");
	this.$firstMusicButton = $(".first-music-button");
	this.$musicButtonWrapper = $(".music-button-wrapper");
	this.$play = $(".music-play");
	this.$pause = $(".music-pause");
	this.$next = $(".music-next");
	this.$back = $(".music-back");
	this.$mute = $(".music-mute");
	this.$window = $(window);
	this.width = this.$window.width();
	this.height = this.$window.height();
	this.window = {
		scroll: 500 ,
		minWidth: 769 ,
		maxWidth: 768 ,
		width: this.width ,
		height: this.height
	};
	this.scrollValue = 1;
	//method
	this.event();
}
Element.prototype.event = function() { //event
	var self = this;
	this.$window.resize(function() {
		self.resize($(this).width() , $(this).height());
	});
	this.$window.scroll(function() {
		self.scroll($(this).scrollTop());
	});
};
Element.prototype.resize = function(width , height) { //resize
	this.window.width = width;
	this.window.height = height;
};
Element.prototype.scroll = function(scroll) { //scroll
	this.scrollValue = scroll;
};
/*
====================
====================
■ Flag
====================
====================
*/
function Flag(object) {
	//class
	this.userAgent = object.userAgent;
	//property
	this.type = object.type;
	this.firstMusic = false;
	this.scroll = false;
	this.dance = true;
	this.sp = false;
	this.model = false;
}
/*
====================
====================
■ UserAgent
====================
====================
*/
function UserAgent(object) {
	//class
	this.type = object.type;
	//property
	this.user = navigator.userAgent;
	this.device , this.browser;
	//method
	this.getDevice();
	this.getBrowser();
	this.userDebug();
}
UserAgent.prototype.getDevice = function() { //getDevice
	if(this.user.indexOf("iPhone") != -1  || this.user.indexOf("iPod") != -1 || this.user.indexOf("Android") != -1 && this.user.indexOf("Mobile") != -1) {
		this.device = "Sp";
	} else if(this.user.indexOf("iPad") != -1 || this.user.indexOf("Android") != -1) {
		this.device = "Tab";
	} else {
		this.device = "Other";
	}
};
UserAgent.prototype.getBrowser = function() { //getBrowser
	if(this.user.indexOf("Chrome") != -1) {
		this.browser = "Chrome";
	} else if(this.user.indexOf("MSIE")) {
        this.browser = "IE";
    } else if(this.user.indexOf("Firefox") != -1) {
		this.browser = "Firefox";
	} else if(this.user.indexOf("Safari") != -1) {
		this.browser = "Safari";
	}
};
UserAgent.prototype.userDebug = function() { //userDebug
	console.log(this.user);
    console.log(this.browser);
};
/*
====================
====================
■ Design
====================
====================
*/
function Design(type) {
	//class
	this.userAgent ,
	this.flag ,
	this.element ,
	this.originalMath ,
	this.audio ,
	this.model ,
	this.uniform ,
	this.shader ,
	this.particle ,
	this.canvs ,
	this.animation ,
	this.control;
	//property
	this.type = type;
	//method
	this.init();
}
Design.prototype.init = function() { //init
	//userAgent
	this.userAgent = new UserAgent({
		type: this.type
	});
	//flag
	this.flag = new Flag({
		userAgent: this.userAgent ,
		type: this.type ,
	});
	//element
	this.element = new Element({
		userAgent: this.userAgent ,
		flag: this.flag ,
		type: this.type
	});
	this.originalMath = new OriginalMath({
		userAgent: this.userAgent ,
		flag: this.flag ,
		element: this.element ,
		type: this.type
	});
	//audio
	this.audio = new Audio({
		userAgent: this.userAgent ,
		flag: this.flag ,
		element: this.element ,
		originalMath: this.originalMath ,
		type: this.type
	});
	//model
	this.model = new Model({
		userAgent: this.userAgent ,
		flag: this.flag ,
		element: this.element ,
		originalMath: this.originalMath ,
		audio: this.audio ,
		type: this.type
	});
	//uniform
	this.uniform = new Uniform({
		userAgent: this.userAgent ,
		flag: this.flag ,
		element: this.element ,
		originalMath: this.originalMath ,
		audio: this.audio ,
		model: this.model ,
		type: this.type
	});
	//shader
	this.shader = new Shader({
		userAgent: this.userAgent ,
		flag: this.flag ,
		element: this.element ,
		originalMath: this.originalMath ,
		audio: this.audio ,
		model: this.model ,
		uniform: this.uniform ,
		type: this.type
	});
	//particle
	this.particle = new Particle({
		userAgent: this.userAgent ,
		flag: this.flag ,
		element: this.element ,
		originalMath: this.originalMath ,
		audio: this.audio ,
		model: this.model ,
		uniform: this.uniform ,
		shader: this.shader ,
		type: this.type
	});
	//canvas
	this.canvas = new Canvas({
		userAgent: this.userAgent ,
		flag: this.flag ,
		element: this.element ,
		originalMath: this.originalMath ,
		audio: this.audio ,
		model: this.model ,
		uniform: this.uniform ,
		shader: this.shader ,
		particle: this.particle ,
		type: this.type
	});
	//animation
	this.animation = new Animation({
		userAgent: this.userAgent ,
		flag: this.flag ,
		element: this.element ,
		originalMath: this.originalMath ,
		audio: this.audio ,
		model: this.model ,
		uniform: this.uniform ,
		shader: this.shader ,
		particle: this.particle ,
		canvas: this.canvas ,
		type: this.type
	});
	//contorl
	this.control = new Control({
		userAgent: this.userAgent ,
		flag: this.flag ,
		element: this.element ,
		originalMath: this.originalMath ,
		audio: this.audio ,
		control: this.control ,
		model: this.model ,
		uniform: this.uniform ,
		shader: this.shader ,
		particle: this.particle ,
		canvas: this.canvas ,
		animation: this.animation ,
		type: this.type
	});
}