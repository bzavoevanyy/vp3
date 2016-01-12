<?php
$URL_image = '';
$URL_image_watermark = '';
$positionX = '150';
$positionY = '100';
$opacity = '50';

require_once "../../vendor/autoload.php";
use \WideImage\WideImage as WideImage;

$image = WideImage::LoadFromFile($URL_image);
$image_watermark = WideImage::LoadFromFile($URL_image_watermark);

$image_merged = $image->merge($image_watermark, $positionX, $positionY, $opacity);
$image_merged->output('jpg');