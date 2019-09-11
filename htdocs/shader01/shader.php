<script class="fragment-shader" type="shader">
void main() {
    gl_Position = vec4(position, 1.0);
}
</script>
<script class="vertex-shader" type="shader">
uniform float audio;
uniform float time;
uniform int scroll;
uniform vec2 resolution;
uniform vec2 mouse;
uniform sampler2D texture_perlin;

const float pi = 3.1415926535;

void main() {
    vec2 position = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
    vec4 distColor;
    position.x += time;
    position.y += sin(position.x * 10.0);
    float color = 0.05 / length(position.y);
    distColor = vec4(vec3(color), 1.0);
    gl_FragColor = distColor;
}
</script>