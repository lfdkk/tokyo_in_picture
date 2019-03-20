// const	{EventEmitter}= require('events');

const	_= require('underscore');
		// EXIF= require('exif-js');

const	Loader= (src, className)=>{

	return new Promise((resolve, reject)=>{

		const img= new Image();

		img.onload= ()=>{

			// console.log('success', src);
			if(typeof className==='string'){
				img.classList.add(className);
			}
			resolve(img);
		};

		img.onerror= (err)=>{
			reject(err);
		};

		img.src= src;
	});
};

module.exports= class {

	constructor(model, stg, parent){
		// super();

		this._model= model;
		this._images= [];

		// this._src= src;
		//
		// // this._el= document.querySelector('.pictures');//el;
		//
		this._stg= stg;
		this._parent= parent;
		// this._el= el;
		// this._frame= frame;
		// this._img= img;
		// this._loaded= false;
		// this._visible= false;
		// this._orientation= 1;
		//
		// this._renderedW= 0;
		// this._renderedH= 0;
		//
		// window.addEventListener(
		// 	'resize',
		// 	_.debounce(this._resizeHandler.bind(this), 250));

	}

	load(){

		return new Promise((resolve, reject)=>{

			const	model= this._model,
					loaders= model.images.map((img)=>{
						return Loader(img.src, img.className);
					});

			Promise
				.all(loaders)
				.then((images)=>{

					this._images= images;
					this._calcDimensions(images[0], model.type);
					resolve();

				}, (err)=>{
					reject(err);
				});
		});

	}

	get borderWidth(){
		return this._borderWidth;
	}

	get width(){
		return this._width;
	}

	get height(){
		return this._height;
	}

	_calcDimensions(image, type){

		const	stg= (type==='fullscreen') ? document.body : this._stg,
				el= this._el,
				frame= this._frame;

		const	viewportW= stg.clientWidth,
				viewportH= stg.clientHeight;

		const 	naturalW= image.naturalWidth,
				naturalH= image.naturalHeight;

		const	borderWidth= (type==='fullscreen') ?
					0 :
					((viewportW/naturalW+viewportH/naturalH)/2) * ((naturalW+naturalH)/2) * 0.1;

		const	sx= (viewportW-borderWidth*2) / naturalW,
				sy= (viewportH-borderWidth*2) / naturalH,
				s= sx<sy ? sx : sy;

		this._borderWidth= borderWidth;
		this._width= naturalW*s,
		this._height= naturalH*s;

		// console.log(this._stg);
	}

	//
	// _resizeHandler(){
	//
	// 	if(!this._loaded){
	// 		return;
	// 	}
	//
	// 	this._calcDimensions();
	//
	// 	this.emit('resize', this._renderedW, this._renderedH);
	// }
	//
	// load(model){
	//
	// 	return new Promise((resolve, reject)=>{
	//
	// 		const	img= this._img;
	//
	// 		img.onload= ()=>{
	//
	// 			this._el.appendChild(img);
	// 			this._loaded= true;
	//
	// 			EXIF.getData(img, ()=>{
	//
	// 				// console.log(img.src);
	// 				this._orientation= img.exifdata.Orientation;
	//
	// 				// this._resizeHandler();
	// 				this._calcDimensions();
	// 				this.emit('load', this._renderedW, this._renderedH);
	//
	// 				resolve(model);
	// 			});
	// 		};
	//
	// 		img.onerror= (err)=>{
	// 			reject(err);
	// 		};
	//
	// 		img.src= model.src;
	// 	});
	//
	// }

	show(){

		this._stg.style.top= this._model.type==='frame' ? '45%' : '';
		
		this._images.forEach((image)=>{
			this._parent.appendChild(image);
		});
	}

	hide(){

		this._images.forEach((image)=>{
			image.parentNode.removeChild(image);
			// this._stg.appendChild(image);
		});
	}

	dotify(){
		this._images.forEach((image)=>{
			const classList= image.classList;
			if(classList.contains('dotified')){
				classList.add('visible');
			}
		});
	}

	undotify(){
		this._images.forEach((image)=>{
			const classList= image.classList;
			if(classList.contains('dotified')){
				classList.remove('visible');
			}
		});
	}
};
