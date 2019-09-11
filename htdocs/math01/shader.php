<script class="vertex-shader" type="shader">
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
<script class="fragment-shader" type="shader">
varying mat3 vNormalMatrix;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float time;

void main() {
    vec2 position = vUv;

    //ligth
    vec3 ligth = vec3(0.0, 0.0, 100.0);
    ligth =  normalize(ligth) * vNormalMatrix;
    float parallelLigth = dot(vNormal, ligth) * 0.5 + 0.5;

    //background
    vec4 distColor = vec4(0.0, 0.0, 0.0, 1.0);
    float color = floor(sin(length(position.y * 50.0) - time * 7.5) * 1.5);
    distColor = vec4(color, 0.0, color / 1.5, 1.0);
    gl_FragColor = distColor * parallelLigth;
}
</script>