<?php

require_once "../../vendor/autoload.php";
use \WideImage\WideImage as WideImage;

$sourceImage = $_POST['sourceImage'];
$watermark = $_POST['watermark'];
$sourceK = $_POST['sourceK'];
$watermarkK = $_POST['watermarkK'];
$positionX = $_POST['x']*$sourceK;
$positionY = $_POST['y']*$sourceK;
$opacity = $_POST['opacity'];

$image = WideImage::LoadFromFile("uploads/$sourceImage");
$image_watermark = WideImage::LoadFromFile("uploads/$watermark");

if ($watermarkK > 1) {
    $imgInfo = getimagesize("uploads/$watermark");
    $newWidth = $imgInfo[0]/$watermarkK;
    $newHeight = $imgInfo[1]/$watermarkK;
    $image_watermark_resized = $image_watermark->resize($newWidth, $newHeight);
    $image_watermark_resized->saveToFile('uploads/watermarkResized.jpg');
    $image_watermark = WideImage::LoadFromFile('uploads/watermarkResized.jpg');
}

$image_merged = $image->merge($image_watermark, $positionX, $positionY, $opacity);
$image_merged->saveToFile('uploads/result.jpg');

$data = $_SERVER['HTTP_HOST'].'/server/uploads/result.jpg';

echo json_encode($data);
exit;
