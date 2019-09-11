<?php
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
        <div class="video-player">
            <div class="vr2d-video-wrapper">
                <video class="vr2d-video" playsinline="" preload="auto" controls="" src="https://ep.t8cdn.com/201804/05/46717851/mp4_hd720_46717851.mp4?validfrom=1551750885&validto=1551758085&rate=154k&burst=1400k&ip=182.164.133.135&hash=9wDC1kN4fvhLF9m0JvngBRIyA4c%3D" poster="" crossorigin="anonymous"></video>

                <div class="vr2d-canvas-wrapper"></div>
                <!-- end vr2d-canvas-wrapper -->
            </div>
            <!-- end vr2d-video-wrapper  -->

            <div class="controls-wrapper">
               <div class="controls clearfix">
                <div class="controls-progress">
                    <div class="progress-bar"></div>
                </div>
                <div class="align-left">
                    <div class="toggle-play">
                        <button class="controls-pause"><i class="fas fa-pause"></i></button>
                        <button class="controls-play"><i class="fas fa-play"></i></button>
                    </div>
                </div>
           </div>
           <!-- end controls-wrapper -->
        </div>
        <!-- end video-player -->
    </main>
</div>

<?php
	require_once($_SERVER['DOCUMENT_ROOT'] . '/shared/inc/footer.php');
?>