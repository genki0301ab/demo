<script class="vertex-shader-bg" type="shader">
varying mat3 vNormalMatrix;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float time;

void main() {
    vNormalMatrix = normalMatrix;

    vUv = uv;
    vNormal = normal;

    vec3 newPosition = position;

    vPosition = newPosition;

    gl_Position += projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
</script>
<script class="fragment-shader-bg" type="shader">
varying mat3 vNormalMatrix;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float time;
uniform vec2 resolution;

void main() {
    vec2 position = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

    //sp
    if(resolution.x <= resolution.y) {
        position = (gl_FragCoord.xy * 2.0 - resolution.xy) / max(resolution.x, resolution.y);
    }

    //background
    vec4 distColor = vec4(0.0, 0.0, 1.0, 1.0);

    float sunny = 0.25 / length(vec2(position.x, position.y - 1.0));
    float color = smoothstep(1.0, -1.0, sin(position.y));
    distColor += vec4(color, 0.55, color, 1.0);

    //outColor
    gl_FragColor = distColor + sunny;
}
</script>