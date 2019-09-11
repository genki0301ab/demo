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

<div class="cube">
    <div class="front cube-inner"></div>
    <div class="back cube-inner"></div>
    <div class="top cube-inner"></div>
    <div class="bottom cube-inner"></div>
    <div class="left cube-inner"></div>
    <div class="right cube-inner"></div>
</div>

<div class="main-wrapper">
    <main class="main">
        <div class="front-wrapper">
            <div class="front">
                <section>
                    <div class="section-inner">
                        <h2>サンプルタイトル</h2>
                        <p>サンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトル。</p>
                    </div>
                </section>
                <section>
                    <div class="section-inner">
                        <h2>サンプルタイトル</h2>
                        <p>サンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトル。</p>
                    </div>
                </section>
                <section>
                    <div class="section-inner">
                        <h2>サンプルタイトル</h2>
                        <p>サンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトル。</p>
                    </div>
                </section>
                <section>
                    <div class="section-inner">
                        <h2>サンプルタイトル</h2>
                        <p>サンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトルサンプルタイトル。</p>
                    </div>
                </section>
            </div>
        </div>
    </main>
</div>

<?php
	require_once($_SERVER['DOCUMENT_ROOT'] . '/shared/inc/footer.php');
?>