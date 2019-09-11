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
        <div class="front-wrapper">
            <div class="front">
                <ul class="card-wrapper">
                    <li class="card">
                        <span class="card__text"></span>
                        <div class="img-wrapper"><a class="photo" href="#"><img src="./img/img01.jpg"></a></div>
                    </li>
                    <li class="card">
                        <span class="card__text"></span>
                        <div class="img-wrapper"><a class="photo" href="#"><img src="./img/img02.jpg"></a></div>
                    </li>
                    <li class="card">
                        <span class="card__text"></span>
                        <div class="img-wrapper"><a class="photo" href="#"><img src="./img/img03.jpg"></a></div>
                    </li>
                    <li class="card">
                        <span class="card__text"></span>
                        <div class="img-wrapper"><a class="photo" href="#"><img src="./img/img01.jpg"></a></div>
                    </li>
                    <li class="card">
                        <span class="card__text"></span>
                        <div class="img-wrapper"><a class="photo" href="#"><img src="./img/img02.jpg"></a></div>
                    </li>
                    <li class="card">
                        <span class="card__text"></span>
                        <div class="img-wrapper"><a class="photo" href="#"><img src="./img/img03.jpg"></a></div>
                    </li>
                    <li class="card">
                        <span class="card__text"></span>
                        <div class="img-wrapper"><a class="photo" href="#"><img src="./img/img01.jpg"></a></div>
                    </li>
                    <li class="card">
                        <span class="card__text"></span>
                        <div class="img-wrapper"><a class="photo" href="#"><img src="./img/img02.jpg"></a></div>
                    </li>
                    <li class="card">
                        <span class="card__text"></span>
                        <div class="img-wrapper"><a class="photo" href="#"><img src="./img/img03.jpg"></a></div>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</div>

<?php
	require_once($_SERVER['DOCUMENT_ROOT'] . '/shared/inc/footer.php');
?>