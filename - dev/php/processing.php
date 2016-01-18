<?php
require_once "../../vendor/autoload.php";

$sourceImage = $_POST['sourceImage'];
$watermark = $_POST['watermark'];
$sourceK = $_POST['sourceK'];
$watermarkK = $_POST['watermarkK'];
$positionX = $_POST['x']*$sourceK;
$positionY = $_POST['y']*$sourceK;
$opacity = $_POST['opacity']/100;

$image = new abeautifulsite\SimpleImage($sourceImage);
$image_watermark = new abeautifulsite\SimpleImage($watermark);

if ($watermarkK > 1) {
    $imgInfo = getimagesize($watermark);
    $newWidth = $imgInfo[0]/$watermarkK;
    $newHeight = $imgInfo[1]/$watermarkK;
    $image_watermark = $image_watermark->resize($newWidth, $newHeight);
}

$image->overlay($image_watermark, 'top left', $opacity, $positionX, $positionY);
$image->save("uploads/result.png");

$data = '/server/uploads/result.png';

echo json_encode($data);
exit;
