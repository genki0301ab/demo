<?
    $siteSetting = Array(
        "type" => "top",
        "title" => "テスト",
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
                <a href="index.php">link</a>
            </div>
        </div>
    </main>
</div>

<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/shared/inc/footer.php');
?>