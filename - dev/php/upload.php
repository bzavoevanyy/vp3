<?php
/**
 * Uploading images to the server
 */

// if there was a method for the post, the process images
if($_SERVER['REQUEST_METHOD'] == "POST"){

    //get post file
    $file = $_FILES["img1"];

    $valid = true;

    //additional verification on the file size
    if ($file['size'] == 0) {
        $data['status'] = 'error';
        $data['message'] = 'Вы не выбрали первый файл';
        $valid = false;
    } elseif ($file['size'] > 5242880) {
        $data['status'] = 'error';
        $data['message'] = 'Файл превышает допустимый размер в 5Мб';
        $valid = false;
    }

    // check upload dir
    if( (!file_exists(__DIR__.'/uploads/')) && $valid ){
        mkdir(__DIR__.'/uploads/', 777);
    }

    //check - file is loaded?
    if( (is_uploaded_file($file["tmp_name"])) && $valid ) {
        //transferring files
        $filename = $file['name'];
        $filename_new = time().'_'.$filename;
        move_uploaded_file($file["tmp_name"], __DIR__.'/uploads/'.$filename_new);
        $filelink = 'uploads/'.$filename_new;

        $data['status'] = 'success';
        $data['message'] = 'Файл успешно загружен '.$file['type'];
        $data['filelink'] = $filelink;
    } else {
        $data['status'] = 'error';
        $data['message'] = 'Ошибка загрузки файла на сервер.';
    }

} else {
    $data['status'] = 'error';
    $data['message'] = 'Что-то пошло не так!';
}

echo json_encode($data);
exit;