<div class="footer-wrapper">
	<footer class="footer"></footer>
</div>
<!-- end footer-wrapper -->
</div>
<!-- end container -->

<!-- SCRIPT -->
<script src="/shared/js/lib/barba.min.js"></script>
<script src="/shared/js/lib/d3.min.js"></script>
<script src="/shared/js/lib/underscore-min.js"></script>
<script src="/shared/js/lib/jquery-3.2.1.min.js"></script>
<script src="/shared/js/lib/jquery.easing.1.3.js"></script>
<script src="/shared/js/lib/velocity.min.js"></script>
<script src="/shared/js/vue.min.js"></script>
<?php
//ページ独自のjsファイル読み込み
foreach ($siteSetting['js'] as $value) {
    echo '<script src="'. $value . '" /></script>' . "\n";
}
?>

</body>
</html>