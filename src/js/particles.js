const	_= require('underscore'),
		PIXI= require('pixi.js');
		require('pixi-tween');

const	Particle= require('./particle'),
		GlowFilter= require('./glow-filter');

const	GLOW_DISTANCE_MAX= 25,
		GLOW_DISTANCE_MIN= 0,
		GLOW_OUTER_STRENGTH= 2,
		GLOW_INNER_STRENGTH= 0,
		GLOW_COLOR= 0xffff99,
		GLOW_QUALITY= 0.1;

module.exports= class {

	constructor(stg){

		const	wrapper= new PIXI.Container(),
				container= new PIXI.particles.ParticleContainer(10000, {
					vertices: true
				}),
		// const	container= new PIXI.Container(),
				texture= new PIXI.Texture.fromImage('./images/particle.png'),
				glowFilter= new GlowFilter(
					GLOW_DISTANCE_MAX,
					GLOW_OUTER_STRENGTH,
					GLOW_INNER_STRENGTH,
					GLOW_COLOR,
					GLOW_QUALITY),
				// blurFilter= new PIXI.filters.BlurFilter();
				array= [];

		// blurFilter.blur= 2;

		container.blendMode= PIXI.BLEND_MODES.ADD;
		// container.alpha= 0;
		// wrapper.blendMode= PIXI.BLEND_MODES.ADD;
		// wrapper.filterArea= new PIXI.Rectangle(0, 0, 1024, 1024);
		wrapper.filters= [glowFilter];
		// wrapper.filters= [blurFilter];
		wrapper.addChild(container);
		stg.addChild(wrapper);

		for(let i=0; i<500; i++){

			const particle= new Particle(texture);
			container.addChild(particle.view);

			array.push(particle);
		}

		this._wrapper= wrapper;
		this._glowFilter= glowFilter;
		this._array= array;
	}

	animate(areas, size, delay){

		this._glowFilter.uniforms.distance= GLOW_DISTANCE_MAX;
		PIXI.tweenManager.createTween(this._glowFilter.uniforms, {
			time: 200,
			delay: 2300,
			to: {
				distance: GLOW_DISTANCE_MIN
			}
		}).start();

		// this._glowFilter.uniforms.distance= 0;

		this._array.forEach((particle, i)=>{
			const area= _.sample(areas);
			particle.animate(area, i, size, delay);
		});
	}

	setViewport(x, y, w, h){
		this._wrapper.filterArea= new PIXI.Rectangle(x, y, w, h);
	}
};
