<?php
require_once "../../vendor/autoload.php";

$sourceImage = $_POST['sourceImage'];
$watermark = $_POST['watermark'];
$sourceK = $_POST['sourceK'];
$watermarkK = $_POST['watermarkK'];
$positionX = $_POST['x']*$sourceK;
$positionY = $_POST['y']*$sourceK;
$opacity = $_POST['opacity']/100;
$mode = $_POST['mode'];
$top = $_POST['top']*$sourceK;;
$left = $_POST['left']*$sourceK;;
$marginleft = $_POST['gutterLeft']*$sourceK;
$marginbottom = $_POST['gutterBottom']*$sourceK;



$image = new abeautifulsite\SimpleImage($sourceImage);
$image_watermark = new abeautifulsite\SimpleImage($watermark);

if ($watermarkK > 1) {
    $imgInfo = getimagesize($watermark);
    $newWidth = $imgInfo[0]/$watermarkK;
    $newHeight = $imgInfo[1]/$watermarkK;
    $image_watermark = $image_watermark->resize($newWidth, $newHeight);
    $image_watermark->save($watermark);
}
if ($mode == 'tiling') {
    $sourceSize = getimagesize($sourceImage);
    $watermarkSize = getimagesize($watermark);
    $sourceWidth = $sourceSize[0];
    $sourceHeight = $sourceSize[1];
    $offsetX = $left;
    //$data = $sourceWidth;
    for ($top; $top < $sourceHeight; $top += ($watermarkSize[1] + $marginbottom)) {

        for ($offsetX; $offsetX < $sourceWidth;$offsetX += ($watermarkSize[0] + $marginleft)) {
            $image->overlay($image_watermark, 'top left', $opacity, $offsetX, $top);

        }

        $offsetX = $left;
    }


} elseif ($mode == 'alone') {
    $image->overlay($image_watermark, 'top left', $opacity, $positionX, $positionY);
}
$result_name = time().'.png';
$image->save('uploads/'.$result_name);
$data = '/server/uploads/'.$result_name;

echo json_encode($data);
exit;
