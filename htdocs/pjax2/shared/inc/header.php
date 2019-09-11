<!DOCTYPE html>
<html lang="ja">
<head>
	<title><?php echo $siteSetting["title"]; ?> | pjax2</title>

	<!-- META -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, user-scalable=no">
	<meta name="format-detection" content="telephone=no">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="robots" content="index,follow">
	<meta name="description" content="">
	<meta name="keywords" content="">

	<!-- OGP -->
	<meta property="og:title" content="<?php echo $siteSetting["title"]; ?> | pjax2">
	<meta property="og:type" content="website">
	<meta property="og:description" content="">
	<meta property="og:url" content="<?php echo (empty($_SERVER["HTTPS"]) ? "http://" : "https://") . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]; ?>">
	<meta property="og:image" content="/og/og.jpg">
	<meta property="og:site_name" content="SiteName">
	<meta property="og:locale" content="ja_JP">

	<!-- CSS -->
	<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
	<link href="https://fonts.googleapis.com/earlyaccess/notosansjapanese.css" rel="stylesheet">
	<link rel="stylesheet" href="/shared/css/import.css">
	<?php
    //ページ独自のcssファイル読み込み
    foreach ($siteSetting['css'] as $value) {
        echo '<link rel="stylesheet" href="'. $value . '">' . "\n";
    }
    ?>
</head>

<body class="<?php echo $siteSetting["type"]; ?>">
<div class="loader-wrapper">
	<div class="loader"></div>
</div>
<!-- end loader -->

<div class="jump-layer"></div>
<!-- jump-layer -->

<div class="container">
<div class="header-wrapper">
	<header class="header">
        <div class="toggle-button-wrapper">
            <div class="toggle-button">
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>

        <div class="gnavi-wrapper">
            <ul class="gnavi">
                <li><a href="#">ホーム</a></li>
                <li><a href="#">塩竈の藻塩</a></li>
                <li><a href="#">藻塩について</a></li>
                <li><a href="#">藻塩レシピ</a></li>
                <li><a href="#">人々のはなし</a></li>
                <li><a href="#">販売店一覧</a></li>
                <li><a href="#">よくあるご質問</a></li>
                <li><a href="#">企業情報</a></li>
                <li><a href="#">お問い合わせ</a></li>
            </ul>
        </div>
	</header>
</div>
<!-- end header-wrapper -->