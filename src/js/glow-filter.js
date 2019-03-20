const	PIXI= require('pixi.js');

module.exports= class extends PIXI.Filter {

	constructor(distance, outerStrength, innerStrength, color, quality) {

		const fragmentSrc = `
			precision mediump float;
			varying vec2 vTextureCoord;
			uniform sampler2D texture;
			uniform float distance;
			uniform float outerStrength;
			uniform float innerStrength;
			uniform vec4 glowColor;
			uniform vec4 filterArea;
			void main(void) {

				const float PI = 3.14159265358979323846264;
				const float MAX_ITERATIONS = 100.0;

				vec4 ownColor = texture2D(texture, vTextureCoord);
				vec4 curColor;
				vec2 px = vec2(1./filterArea.x, 1./filterArea.y);

				float totalAlpha = 0.;
				float maxTotalAlpha = 0.;
				float angle= 0.;
				float dAngle= 1./${quality.toFixed(7)}/distance;
				float cosAngle;
				float sinAngle;

				for(float i=0.; i<MAX_ITERATIONS; i++){

					angle+= dAngle;
					if(angle>PI*2.){
						break;
					}

					cosAngle = cos(angle);
					sinAngle = sin(angle);

					for(float curDistance=1.; curDistance<MAX_ITERATIONS; curDistance++) {
						if(curDistance>distance){
							break;
						}
						curColor = texture2D(texture, vec2(vTextureCoord.x + cosAngle * curDistance * px.x, vTextureCoord.y + sinAngle * curDistance * px.y));
						totalAlpha += (distance - curDistance) * curColor.a;
						maxTotalAlpha += (distance - curDistance);
					}
				}
				maxTotalAlpha = max(maxTotalAlpha, 0.0001);

				ownColor.a = max(ownColor.a, 0.0001);
				ownColor.rgb = ownColor.rgb / ownColor.a;
				float outerGlowAlpha = (totalAlpha / maxTotalAlpha)  * outerStrength * (1. - ownColor.a);
				float innerGlowAlpha = ((maxTotalAlpha - totalAlpha) / maxTotalAlpha) * innerStrength * ownColor.a;
				float resultAlpha = (ownColor.a + outerGlowAlpha);
				ownColor.rgb= ownColor.rgb * ownColor.a;
				gl_FragColor = vec4(mix(mix(ownColor.rgb, glowColor.rgb, innerGlowAlpha / ownColor.a), glowColor.rgb, outerGlowAlpha / resultAlpha) * resultAlpha, resultAlpha);
			}
		`;

		var r = ((color & 0xFF0000) >> 16) / 255,
			g = ((color & 0x00FF00) >> 8) / 255,
			b = (color & 0x0000FF) / 255;

		super(
			null,
			fragmentSrc,
			{
				distance: {type: '1f', value: distance},
				outerStrength: {type: '1f', value: outerStrength},
				innerStrength: {type: '1f', value: innerStrength},
				glowColor: {type: '4f', value: [r, g, b, 1]}
			});
	}
};
