<?php
    $siteSetting = Array(
        "type" => "top",
        "title" => "トップ",
        "css" => Array("./style.css"),
        "js" => Array("./shared/js/main.js")
    );
?>

<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/shader-plane.php');
?>

<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/shader-bg.php');
?>

<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/shader.php');
?>

<?php
	require_once($_SERVER['DOCUMENT_ROOT'] . '/shared/inc/header.php');
?>

<div class="main-wrapper">
    <main class="main">
        <div class="canvas-wrapper">
            <canvas id="canvas"></canvas>
        </div>
    </main>
</div>

<?php
	require_once($_SERVER['DOCUMENT_ROOT'] . '/shared/inc/footer.php');
?>