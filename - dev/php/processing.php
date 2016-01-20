<?php
require_once "../vendor/autoload.php";

$sourceImage = $_POST['sourceImage'];
$watermark = $_POST['watermark'];
$sourceK = $_POST['sourceK'];
$watermarkK = $_POST['watermarkK'];
$positionX = $_POST['x']*$sourceK;
$positionY = $_POST['y']*$sourceK;
$opacity = $_POST['opacity']/100;
$mode = $_POST['mode'];
$top = $_POST['top'];
$left = $_POST['left'];
$marginleft = $_POST['gutterLeft'];
$marginbottom = $_POST['gutterBottom'];



$image = new abeautifulsite\SimpleImage($sourceImage);
$image_watermark = new abeautifulsite\SimpleImage($watermark);

if ($watermarkK > 1) {
    $imgInfo = getimagesize($watermark);
    $newWidth = $imgInfo[0]/$watermarkK;
    $newHeight = $imgInfo[1]/$watermarkK;
    $image_watermark = $image_watermark->resize($newWidth, $newHeight);
}
if ($mode == 'tiling') {
    $positionX = 0;
    $positionY = 0;
    $imgSize = getimagesize($sourceImage);
    $waterSize = getimagesize($watermark);

    $waterSizeWidth = $waterSize[0];
    $waterSizeHeight = $waterSize[1];
    $offsetX = ($left);
    $offsetY = ($top);
    $positionY = fmod($offsetY, $waterSizeHeight/$sourceK);

while (abs($positionY) < $imgSize[1]) {

    while ($offsetX < $imgSize[0]) {
        if ($offsetX < 0) {
            if (abs($offsetX) > $waterSizeWidth / $sourceK) {

                $positionX = fmod($offsetX, $waterSizeWidth / $sourceK);

                $image->overlay($image_watermark, 'top left', $opacity, $positionX, $positionY);

                $offsetX = $positionX + $waterSizeWidth + $marginleft;


            } else {

                $positionX = $offsetX;
                $image->overlay($image_watermark, 'top left', $opacity, $positionX, $positionY);
                $offsetX += ($waterSizeWidth - abs($positionX)) + $marginleft;

            }
        } else {
            $positionX = $offsetX + $marginleft;
            $offsetX = $positionX;
            $image->overlay($image_watermark, 'top left', $opacity, $positionX, $positionY);
            $offsetX = $offsetX + $waterSizeWidth + $marginleft;
        }

    }
    $offsetX = $left;
    $positionY += $waterSizeHeight + $marginbottom;
}
    $image->save("uploads/result.png");
    $data = '/server/uploads/result.png';

    echo json_encode($data);


} elseif ($mode == 'alone') {
    $image->overlay($image_watermark, 'top left', $opacity, $positionX, $positionY);
    $image->save("uploads/result.png");

    $data = '/server/uploads/result.png';

    echo json_encode($data);
}
exit;
