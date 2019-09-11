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
        <div class="front-wrapper">
            <div class="front">
                <div class="tab-wrapper">
                    <ul class="tab clearfix">
                        <li class="active"><a href="#タブ01">タブ01</a></li>
                        <li><a href="#タブ02">タブ02</a></li>
                        <li><a href="#タブ03">タブ03</a></li>
                        <li><a href="#タブ04">タブ04</a></li>
                    </ul>

                    <div class="content-wrapper">
                        <div class="content">
                            <div class="tab-content-wrapper">
                                <div class="tab-content content01 active">
                                    <p>タブ01</p>
                                    <a class="modal-link" href="#animatedModal">モーダルウィンドウを開く</a>
                                </div>
                                <div class="tab-content content02">
                                    <p>タブ02</p>
                                    <a class="modal-link" href="#animatedModal">モーダルウィンドウを開く</a>
                                </div>
                                <div class="tab-content content03">
                                    <p>タブ03</p>
                                    <a class="modal-link" href="#animatedModal">モーダルウィンドウを開く</a>
                                </div>
                                <div class="tab-content content04">
                                    <p>タブ04</p>
                                    <a class="modal-link" href="#animatedModal">モーダルウィンドウを開く</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end content-wrapper -->
                </div>
                <!-- end tab-wrapper -->
            </div>
        </div>
    </main>
</div>

<?php
	require_once($_SERVER['DOCUMENT_ROOT'] . '/shared/inc/footer.php');
?>