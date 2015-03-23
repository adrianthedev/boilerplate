<?php

$deps = [
    'bootstrap/dist/js/bootstrap.min.js',
    'angular/angular.min.js',
];

?>

<?php foreach ($deps as $dep): ?>
    <script src="bower_components/<?=$dep?>"></script>
<?php endforeach; ?>
