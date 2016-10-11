varying vec2  vUv;

uniform vec2  dimensions;

uniform float DETAIL_LEVEL;
uniform float DEFORMATION_LEVEL;
uniform float DEPTH_LEVEL;
uniform float TIME;

// const float TIME = 10000000.0;
// const float TIME = 5000000.0;
// const float TIME = 50000.0;

const float PI = 3.14159265359;


// Utils
// -----

vec3  mod289( vec3 x ) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2  mod289( vec2 x ) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3  permute( vec3 x ) { return mod289( ( ( x * 34.0 ) + 1.0 ) * x ); }
float rand( vec2 co ) { return fract( sin( dot( co.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 ); }
float snoise( vec2 v ) {

    const vec4 C = vec4( 0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439 );
    vec2 i = floor( v + dot( v, C.yy ) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 100.0 * dot(m, g);
}


// Helpers
// -------

float deform( vec2 p, vec2 v ) {

    return snoise( p + v ) * DEPTH_LEVEL + DEPTH_LEVEL;
}


// Main
// ----

void main() {

    vec2  screenPos = gl_FragCoord.xy / dimensions.xy;
    vec2  offsetPos = screenPos * 2.0 - 1.0;

    vec2  velocity = vec2( 0.0 );
    float deformation = 0.0;
    float point = 0.0;

    // Add first deformation
    velocity = vec2( TIME * vUv.x * DETAIL_LEVEL, TIME * vUv.y * DETAIL_LEVEL / ( dimensions.x / dimensions.y ) );
    deformation += deform( offsetPos, velocity );

    // Add second deformation
    point = snoise( offsetPos * vec2( cos( TIME * 0.3 ) * sin( TIME * 1.5 ), sin( TIME * 0.5 ) * cos( TIME * 1.5 ) ) * DEFORMATION_LEVEL ) * PI;
    velocity = vec2( cos( point ), sin( point ) + TIME );
    deformation += deform( offsetPos, velocity );

    // Clip and apply deformation
    vec3 color = vec3( smoothstep( 0.49, 0.51, fract( deformation ) ) );

    // Dilute colour strength
    // color = min( ( color + ( 0.75 ) ), 1.0 );

    // Add grit
    // color += min( rand( offsetPos + deformation * 0.00005 ) * 0.35, 1.0 );

    gl_FragColor = vec4( color, 1.0 );
}
