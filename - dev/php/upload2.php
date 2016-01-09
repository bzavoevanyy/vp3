<?php

require('../../vendor/blueimp/jquery-file-upload/server/php/UploadHandler.php');

$options = [
    'script_url' => '/upload2.php',
    'upload_dir' => 'uploads/',
    'upload_url' => '/uploads/',
];

$upload_handler = new UploadHandler($options);