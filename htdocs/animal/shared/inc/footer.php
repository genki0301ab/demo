<div class="footer-wrapper">
	<footer class="footer"></footer>
</div>
<!-- end footer-wrapper -->
</div>
<!-- end container -->

<!-- SCRIPT -->
<script src="/shared/js/lib/jquery-2.1.3.min.js"></script>
<script src="/shared/js/lib/jquery.pjax.js"></script>
<script src="/shared/js/lib/jquery.easing.1.3.js"></script>
<script type="module" src="/shared/js/common.js"></script>

<?php
//ページ独自のjsファイル読み込み
foreach ($siteSetting['js'] as $value) {
    echo '<script src="'. $value . '" /></script>' . "\n";
}
?>

</body>
</html>