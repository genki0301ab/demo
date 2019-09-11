<?
    $siteSetting = Array(
        "type" => "top",
        "title" => "test",
        "css" => Array("./style.css"),
        "js" => Array("./shared/js/main.js")
    );
?>

<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/shared/inc/header.php');
?>

<div class="main-wrapper">
    <main class="main">
        <div class="test-wrapper">
            <div class="test">
                <a href="index.php">トップへ</a>
                <img src="./img/img01.jpg">
            </div>
        </div>
    </main>
</div>

<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/shared/inc/footer.php');
?>