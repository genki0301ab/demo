<script class="vertex-shader-plane" type="shader">
varying mat3 vNormalMatrix;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPosition;

uniform float time;

void main() {
    vNormalMatrix = normalMatrix;
    vNormal = normal;
    vUv = uv;

    vec3 newPosition = position;
    float swing = 2.0;
    newPosition.z += (sin(time + length(newPosition)) * cos(time + length(newPosition) / 2.0)) * swing;
    vPosition = newPosition;

    gl_Position += projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
</script>
<script class="fragment-shader-plane" type="shader">
varying mat3 vNormalMatrix;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
    //ligth
    vec3 ligth = vec3(0.0, 1.0, -1.0);
    ligth =  normalize(ligth) * vNormalMatrix;
    float parallelLigth = dot(vNormal, ligth) * 0.5 + 0.5;

    //outColor
    gl_FragColor = vec4(vec3(1.0), vPosition.z) * parallelLigth;
}
</script>