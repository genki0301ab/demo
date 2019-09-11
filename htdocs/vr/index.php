<?
    $siteSetting = Array(
        "type" => "top",
        "title" => "トップ",
        "css" => Array("./style.css"),
        "js" => Array("./shared/js/main.js")
    );
?>

<?php
	require_once($_SERVER['DOCUMENT_ROOT'] . '/shared/inc/header.php');
?>

<div class="main-wrapper">
    <main class="main">
        <div class="vr-video-wrapper">
            <video class="vr-video" src="./shared/video/video01.mp4" playsinline="" preload=""></video>
            <div class="vr-canvas-wrapper"></div>
            <!-- end vr-canvas-wrapper -->
        </div>
        <!-- end vr-video-wrapper  -->

        <div class="controls-wrapper">
           <div class="controls clearfix">
            <div class="controls-progress">
                <div class="progress-bar"></div>
            </div>
            <div class="align-left">
                <button class="controls-play">Play</button>
                <button class="controls-pause">Pause</button>
                <div class="time">
                    <span class="current-time"></span>
                    <span>/</span>
                    <span class="duration-time"></span>
                </div>
            </div>
            <div class="align-right">
                <button class="controls-fullScreen">FullScreen</button>
            </div>
           </div>
       </div>
       <!-- end controls-wrapper -->
    </main>
</div>

<?php
	require_once($_SERVER['DOCUMENT_ROOT'] . '/shared/inc/footer.php');
?>