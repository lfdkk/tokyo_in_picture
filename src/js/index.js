const	_= require('underscore');

const	Body= require('./body'),
		Pictures= require('./pictures'),
		Canvas= require('./canvas');

const	models= [
	{
		picture: {
			type: 'frame',
			images: [
				{
					src: '/images/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_Repaired.jpg'
				},
				{
					src: '/images/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_Repaired-dotified.jpg',
					className: 'dotified'
				}
			],
		},
		canvas: {
			areas: [
				{
					x: -0.055,
					y: -0.2675,
					scaleX: 0.22,
					scaleY: 0.045,
					rotation: 0,
					skewX: 0,
					skewY: 0
				}
			]
		},
		text: {
			name: 'モナ・リザ',
			data: 'レオナルド・ダ・ヴィンチ / 1503年 - 1519年頃'
		}
	},
	{
		picture: {
			type: 'frame',
			images: [
				{
					src: '/images/Johannes_Vermeer_(1632-1675)_-_The_Girl_With_The_Pearl_Earring_(1665).jpg'
				},
				{
					src: '/images/Johannes_Vermeer_(1632-1675)_-_The_Girl_With_The_Pearl_Earring_(1665)-dotified.jpg',
					className: 'dotified'
				}
			],
		},
		canvas: {
			areas: [
				{
					x: -0.125,
					y: -0.1,
					scaleX: 0.315,
					scaleY: 0.08,
					rotation: 0,
					skewX: 0,
					skewY: 0.2
				}
			]
		},
		text: {
			name: '真珠の耳飾りの少女',
			data: 'ヨハネス・フェルメール / 1665年頃'
		}
	},
	{
		picture: {
			type: 'frame',
			images: [
				{
					src: '/images/Kitagawa_Utamaro_-_Toji_san_bijin_(Three_Beauties_of_the_Present_Day)From_Bijin-ga_(Pictures_of_Beautiful_Women),_published_by_Tsutaya_Juzaburo_-_Google_Art_Project.jpg',
				},
				{
					src: '/images/Kitagawa_Utamaro_-_Toji_san_bijin_(Three_Beauties_of_the_Present_Day)From_Bijin-ga_(Pictures_of_Beautiful_Women),_published_by_Tsutaya_Juzaburo_-_Google_Art_Project-dotified.jpg',
					className: 'dotified'
				}
			],
		},
		canvas: {
			areas: [
				{
					x: -0.145,
					y: -0.215,
					scaleX: 0.1625,
					scaleY: 0.0375,
					rotation: -0.285,
					skewX: 0,
					skewY: 0
				},
				{
					x: 0.11,
					y: 0.035,
					scaleX: 0.165,
					scaleY: 0.0375,
					rotation: 0,
					skewX: 0,
					skewY: 0
				},
				{
					x: -0.115,
					y: 0.085,
					scaleX: 0.165,
					scaleY: 0.041,
					rotation: 0,
					skewX: 0,
					skewY: -0.075
				}
			]
		},
		text: {
			name: '寛政三美人',
			data: '喜多川歌麿 / 1793年頃'
		}
	},
	{
		picture: {
			type: 'frame',
			images: [
				{
					src: '/images/Edouard_Manet_040.jpg',
				},
				{
					src: '/images/Edouard_Manet_040-dotified.jpg',
					className: 'dotified'
				}
			],
		},
		canvas: {
			areas: [
				{
					x: -0.0875,
					y: -0.125,
					scaleX: 0.28,
					scaleY: 0.0575,
					rotation: -0.05,
					skewX: 0,
					skewY: 0
				}
			]
		},
		text: {
			name: 'すみれの花束をつけたベルト・モリゾ',
			data: 'エドゥアール・マネ / 1872年'
		}
	},
	{
		picture: {
			type: 'frame',
			images: [
				{
					src: '/images/Mlle_Irene_Cahen_d\'Anvers.jpg',
				},
				{
					src: '/images/Mlle_Irene_Cahen_d\'Anvers-dotified.jpg',
					className: 'dotified'
				}
			],
		},
		canvas: {
			areas: [
				{
					x: -0.115,
					y: -0.245,
					scaleX: 0.125,
					scaleY: 0.045,
					rotation: 0,
					skewX: 0.05,
					skewY: 0.15
				}
			]
		},
		text: {
			name: 'イレーヌ・カーン・ダンヴェール嬢',
			data: 'ピエール＝オーギュスト・ルノワール / 1880年'
		}
	},
	{
		picture: {
			type: 'frame',
			images: [
				{
					src: '/images/2017-12-28_DSHMRhKVoAAIxsi.jpg'
				}
			],
		},
		canvas: {
			areas: [
				{
					x: -0.085,
					y: -0.275,
					scaleX: 0.19,
					scaleY: 0.0375,
					rotation: -0.05,
					skewX: 0,
					skewY: 0
				}
			]
		},
		text: {
			name: '・（・・・・・・・・・）',
			data: '東京 / 2016年-'
		}
	},
	{
		picture: {
			type: 'frame',
			images: [
				{
					src: '/images/2018-01-14_DTfQhXMVAAAs2FL.jpg'
				}
			],
		},
		canvas: {
			areas: [
				{
					x: 0.155,
					y: -0.225,
					scaleX: 0.285,
					scaleY: 0.045,
					rotation: 0.075,
					skewX: 0,
					skewY: 0
				}
			]
		},
		text: {
			name: '・（・・・・・・・・・）',
			data: '東京 / 2016年-'
		}
	},
	{
		picture: {
			type: 'frame',
			images: [
				{
					src: '/images/2018-01-31_DU3ySAcVoAADjGO.jpg'
				}
			],
		},
		canvas: {
			areas: [
				{
					x: -0.175,
					y: -0.09,
					scaleX: 0.425,
					scaleY: 0.065,
					rotation: 0.135,
					skewX: 0,
					skewY: 0
				}
			]
		},
		text: {
			name: '・（・・・・・・・・・）',
			data: '東京 / 2016年-'
		}
	},
	{
		picture: {
			type: 'frame',
			images: [
				{
					src: '/images/2017-12-27_DSBO7SKUIAAwPRo.png'
				}
			],
		},
		canvas: {
			areas: [
				{
					x: 0.035,
					y: -0.19,
					scaleX: 0.16,
					scaleY: 0.0375,
					rotation: 0.1,
					skewX: -0.15,
					skewY: -0.15
				}
			]
		},
		text: {
			name: '・（・・・・・・・・・）',
			data: '東京 / 2016年-'
		}
	},
	{
		picture: {
			type: 'frame',
			images: [
				{
					src: '/images/2017-12-14_DQsUG8AVAAIxZan.jpg'
				}
			],
		},
		canvas: {
			areas: [
				{
					x: -0.015,
					y: -0.18,
					scaleX: 0.225,
					scaleY: 0.05,
					rotation: 0.1,
					skewX: 0.1,
					skewY: 0.1
				}
			]
		},
		text: {
			name: '・（・・・・・・・・・）',
			data: '東京 / 2016年-'
		}
	},
	{
		picture: {
			type: 'frame',
			images: [
				{
					src: '/images/_DSC4791.jpg'
				}
			],
		},
		canvas: {
			areas: [
				{
					x: 0.07,
					y: -0.21,
					scaleX: 0.14,
					scaleY: 0.05,
					rotation: 3,
					skewX: 0.1,
					skewY: 0
				},
				{
					x: 0.29,
					y: -0.115,
					scaleX: 0.14,
					scaleY: 0.05,
					rotation: 3.65,
					skewX: 0.1,
					skewY: 0
				},
				{
					x: -0.125,
					y: -0.175,
					scaleX: 0.07,
					scaleY: 0.05,
					rotation: 2.5,
					skewX: 0.25,
					skewY: 0
				},
				{
					x: 0.09,
					y: 0.31,
					scaleX: 0.15,
					scaleY: 0.058,
					rotation: -1.375,
					skewX: 0,
					skewY: 0
				},
				{
					x: -0.18,
					y: 0.125,
					scaleX: 0.14,
					scaleY: 0.055,
					rotation: 1.375,
					skewX: 0,
					skewY: 0
				}
			]
		},
		text: {
			name: '・・・・・・・・・',
			data: '東京 / 2016年-'
		}
	},
	{
		picture: {
			type: 'fullscreen',
			images: [
				{
					src: '/images/title.png'
				},
				{
					src: '/images/title-dotified.png',
					className: 'dotified'
				}
			],
		},
		canvas: {
			areas: [
				{
					x: -0.4,
					y:  -0.325,
					scaleX: 0.02,
					scaleY: 0.02,
					rotation: 0,
					skewX: 0,
					skewY: 0
				},
				{
					x: -0.3,
					y:  -0.325,
					scaleX: 0.02,
					scaleY: 0.02,
					rotation: 0,
					skewX: 0,
					skewY: 0
				},
				{
					x: -0.2,
					y:  -0.325,
					scaleX: 0.02,
					scaleY: 0.02,
					rotation: 0,
					skewX: 0,
					skewY: 0
				},
				{
					x: -0.1,
					y:  -0.325,
					scaleX: 0.02,
					scaleY: 0.02,
					rotation: 0,
					skewX: 0,
					skewY: 0
				},
				{
					x: 0.0,
					y:  -0.325,
					scaleX: 0.02,
					scaleY: 0.02,
					rotation: 0,
					skewX: 0,
					skewY: 0
				},
				{
					x: 0.1,
					y:  -0.325,
					scaleX: 0.02,
					scaleY: 0.02,
					rotation: 0,
					skewX: 0,
					skewY: 0
				},
				{
					x: 0.2,
					y:  -0.325,
					scaleX: 0.02,
					scaleY: 0.02,
					rotation: 0,
					skewX: 0,
					skewY: 0
				},
				{
					x: 0.3,
					y:  -0.325,
					scaleX: 0.02,
					scaleY: 0.02,
					rotation: 0,
					skewX: 0,
					skewY: 0
				},
				{
					x: 0.4,
					y:  -0.325,
					scaleX: 0.02,
					scaleY: 0.02,
					rotation: 0,
					skewX: 0,
					skewY: 0
				}
			]
		},
		text: {
			name: '',
			data: ''
		}
	}
];

class Text {

	constructor(models, el){
		this._models= models;
		this._el= el;
		this._name= el.querySelector('.text-name .text-inner');
		this._data= el.querySelector('.text-data .text-inner');
	}

	show(index){

		const	model= this._models[index];

		this._name.textContent= model.name;
		this._data.textContent= model.data;

		this._el.classList.add('visible');
	}

	hide(index){

		const	el= this._el;

		el.classList.add('hidden');

		setTimeout(()=>{
			this._name.textContent= '';
			this._data.textContent= '';

			el.classList.remove('visible', 'hidden');
		}, 1000);
	}
}

class App {

	constructor(){

		const	body= new Body(
					document.body),
				pictures= new Pictures(
					_.pluck(models, 'picture'),
					document.querySelector('.picture_wrapper')),
				text= new Text(
					_.pluck(models, 'text'),
					document.querySelector('.text_wrapper'))
				canvas= new Canvas(
					_.pluck(models, 'canvas'),
					document.querySelector('.canvas'),
					pictures);

		const	currentIndex= 0;

		this._currentIndex= currentIndex;
		this._body= body;
		this._pictures= pictures;
		this._text= text,
		this._canvas= canvas;

		this._show();
	}

	_show(){

		const	currentIndex= this._currentIndex,
				pictures= this._pictures,
				text= this._text,
				canvas= this._canvas;

		setTimeout(()=>{
			this._next();
		}, 5000);

		Promise.resolve(currentIndex)
			.then(pictures.preload.bind(pictures))
			.then(()=>{

				return new Promise((resolve, reject)=>{

					Promise.all([
						new Promise((resolve, reject)=>{
							Promise.resolve(currentIndex)
								.then(canvas.move.bind(canvas))
								.then(()=>{
									pictures.dotify(currentIndex);
									text.show(currentIndex);
									resolve();
								}, reject);
						}),
						new Promise((resolve, reject)=>{
							Promise.resolve(currentIndex)
								.then(pictures.show.bind(pictures))
								.then(resolve, reject);
						})
					])
					.then(resolve, reject);
				});

			}, (err)=>{
				console.log(err);
			});
	}

	_next(){

		const	body= this._body,
				pictures= this._pictures,
				text= this._text,
				canvas= this._canvas;

		const	currentIndex= this._currentIndex,
				nextIndex= (currentIndex+1 >= models.length) ? 0 : currentIndex+1;

		if(nextIndex<models.length-1){
			setTimeout(()=>{
				this._next();
			}, 5000);
		}


		text.hide(currentIndex);

		Promise.all([
			new Promise((resolve, reject)=>{
				Promise.resolve(nextIndex)
					.then(canvas.move.bind(canvas))
					.then(()=>{
						pictures.dotify(nextIndex);
						text.show(nextIndex);
						resolve();
					}, reject);
			}),
			new Promise((resolve, reject)=>{
				Promise.resolve(currentIndex)
					.then(body.fadeOut.bind(body))
					.then(pictures.hide.bind(pictures))
					.then(()=>{
						return new Promise((resolve, reject)=>{
							resolve(nextIndex);
						});
					})
					.then(pictures.show.bind(pictures))
					.then(body.fadeIn.bind(body))
					.then(()=>{
						this._currentIndex= nextIndex;
						resolve();
					}, (err)=>{
						reject(err);
					});
			})
		])
		.then(()=>{
			// console.log('OK');
		}, (err)=>{
			console.log(err);
		});
	}
}

document.addEventListener('DOMContentLoaded', ()=>{
	new App();
});
