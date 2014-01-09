<?php
/**
 * @file
 * Image uploader.
 */

/**
 * Preview image uploader.
 */
function spider_facebook_image_upload() {
  $iframe_id = ((isset($_GET['iframe_id'])) ? check_plain($_GET['iframe_id']) : '');
  $thumb_id = ((isset($_GET['thumb_id'])) ? check_plain($_GET['thumb_id']) : '');
  $url_id = ((isset($_GET['url_id'])) ? check_plain($_GET['url_id']) : '');
  $folder = ((isset($_GET['folder'])) ? check_plain($_GET['folder']) : '');
  $del_file = ((isset($_POST['del_file'])) ? check_plain($_POST['del_file']) : '');
  if (isset($_FILES['file']['name'])) {
    $files = $_FILES['file'];
  }
  else {
    $files = '';
  }
  echo '
    <script type="text/javascript">
      function set_image_value() {
        var image = document.getElementById("image").value;
        if (image == "") {
          alert("Image is empty");
          return;
        }
        window.parent.document.getElementById("' . $thumb_id . '").src = "' . base_path() . '" + image;
        window.parent.document.getElementById("' . $thumb_id . '").style.display = "block";
        window.parent.document.getElementById("' . $thumb_id . '").height = "30";
        window.parent.document.getElementById("' . $url_id . '").value = "' . base_path() . '" + image;
        window.parent.document.getElementById("' . $iframe_id . '").style.display = "none";
      }
      function set_selected_image(path) {
        document.getElementById("image").value = path;//.replace(/\\/g, "/").replace(/\/\//g, "/");
      }
    </script>
    <style>
      button {
        padding: 3px;
        border: 1px solid #CCCCCC;
        color: #0B55C4;
        background-color: white;
      }
    </style>';
  $dir = 'sites/default/files/spider_facebook' . $folder;
  function delfiles($del_file) {
    if (is_dir($del_file)) {
      $del_folder = scandir($del_file);
      foreach ($del_folder as $file) {
        if ($file != '.' and $file != '..') {
          delfiles($del_file . '/' . $file);
        }
      }
      rmdir($del_file);
    }
    else {
      unlink($del_file);
    }
  }
  if (isset($_POST['del_file']) && (check_plain($_POST['del_file']) != '')) {
    delfiles(check_plain($_POST['del_file']));
  }
  if (isset($_POST['foldername']) && (check_plain($_POST['foldername']) != '')) {
    drupal_mkdir($dir . '/' . check_plain($_POST['foldername']));
  }
  $allowed_extensions = array("jpg", "png", "gif");
  $max_upload = (int)(ini_get('upload_max_filesize'));
  $max_post = (int)(ini_get('post_max_size'));
  $memory_limit = (int)(ini_get('memory_limit'));
  $upload_mb = min($max_upload, $max_post, $memory_limit);
  if (isset($files["type"])) {
    if (isset($_SERVER['CONTENT_LENGTH']) && ($_SERVER['CONTENT_LENGTH'] / 1048576) > $upload_mb) {
      echo '
    <span style="color:red;">' . t('The file size exceeds the maximum allowed size. You can upload images directly by FTP.') . '</span>';
    }
    else {
      if ($files["error"] > 0) {
        echo '
    <span style="color:red;">' . t('Error Code:') . ' <b>' . $files["error"] . '</b></span><br />';
      }
      else {
        if (file_exists($dir . '/' . $files["name"])) {
          echo '
    <span style="color:red;"><b>' . $files["name"] . '</b> ' . t('already exists.') . '</span><br />';
        }
        else {
          $file_parts = explode(".", (string) $files['name']);
          $file_extension = strtolower($file_parts[count($file_parts) - 1]);
          if (!in_array($file_extension, $allowed_extensions)) {
            echo '
    <span style="color:red;"><b>' . $files["name"] . '</b> ' . t('invalid file format') . '</span><br />';
          }
          else {
            $moved = move_uploaded_file($files["tmp_name"], $dir . '/' . $files["name"]);
            if ($moved) {
              echo '
    <span style="color:blue;">' . t('Stored in:') . ' <b>' . $folder . '/' . $files["name"] . '</b></span><br />';
            }
            else {
              echo '
    <span style="color:red;">' . t('Error') . '</span><br />';
            }
          }
        }
      }
    }
  }
  else {
    echo t('Allowed file extensions - jpg, png, gif');
  }
  echo '
    <br />' . t('Directory:') . ' <b>' . $folder . '/' . '</b>
    <div style="float:right">
      <button type="button" onclick="set_image_value();">' . t('Insert') . '</button>
      <button type="button" onclick=\'window.parent.document.getElementById("' . $iframe_id . '").style.display = "none";\'>' . t('Cancel') . '</button>
    </div>
    <br /><br />';
  $files1 = scandir($dir);
  $nofiles = TRUE;
  echo '
    <table cellpadding="5" cellspacing="0" border="1" width="500">
      <tr>
        <td>' . t('Name') . '</td>
        <td>' . t('Size') . '</td>
        <td>' . t('Delete') . '</td>
      </tr>';
      if ($folder != '') {
        echo '
      <tr>
        <td colspan="3">
          <a href="' . url('admin/settings/spider_facebook/image_upload', array('query' => array('folder' => substr($folder, 0, strrpos($folder, '/'))), 'absolute' => TRUE)) . '" title="' . t('Directory Up') . '" style="text-decoration:none; margin:5px;">
            <button type="button" onclick="">
              <img src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/arrow_up.png" alt="" />' . t('Folder Up') . '
            </button>
          </a>
        </td>
      </tr>';
      }
      foreach ($files1 as $file) {
        if ($file != '.' and $file != '..' and is_dir($dir . '/' . $file)) {
          echo '
      <tr>
        <td>
          <a href="' . url('admin/settings/spider_facebook/image_upload', array('query' => array('folder' => $folder . '/' . $file), 'absolute' => TRUE)) . '" style="color:#333399">
            <img src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/folder_sm.png" alt="" />&nbsp;' . $file . '
          </a>
        </td>
        <td>&nbsp;</td>
        <td>
          <a style="color:#333399" href=\'javascript:if(confirm("Are you sure you want to delete the directory and all its contents?"))document.forms.delfileform.del_file.value="' . addslashes($dir . '/' . $file) . '";document.forms.delfileform.submit();\'>' . t('Delete') . '</a>
        </td>
      </tr>';
          $nofiles = FALSE;
        }
      }
      foreach ($files1 as $file) {
        if (!(is_dir($dir . '/' . $file))) {
          $file_parts = explode(".", (string) $file);
          $file_extension = strtolower($file_parts[count($file_parts) - 1]);
          if (in_array($file_extension, $allowed_extensions)) {
            echo '
      <tr>
        <td>
          <a href="javascript:set_selected_image(\'' . addslashes($dir . '/' . $file) . '\')" style="color:#333399">' . $file . '</a>
        </td>
        <td>' . round(filesize($dir . '/' . $file) / 1024) . ' ' . t('Kb') . '</td>
        <td>
          <a style="color:#333399" href=\'javascript:if(confirm("Are you sure you want to delete?"))document.forms.delfileform.del_file.value="' . addslashes($dir . '/' . $file) . '";document.forms.delfileform.submit();\'>' . t('Delete') . '</a>
        </td>
      </tr>';
            $nofiles = FALSE;
          }
        }
      }
      if ($nofiles) {
        echo '
      <tr>
        <td colspan="3">' . t('No Files') . '</td>
      </tr>';
      }
  $a = 'form';
  echo '
    </table>
    <br/>
    <table cellpadding="5" cellspacing="0" border="1" width="500">
      <tr>
        <td>' . t('Create a New Folder') . '</td>
      </tr>
      <tr>
        <td>
          <' . $a . ' method="post" style="margin:5px;">
            <label for="file">' . t('Folder Name') . '</label>
            <input type="text" name="foldername" id="foldername" />
            <input type="hidden" name="submited" value="">
            <input id="create_button" type="submit" name="submit" value="' . t('Create') . '" 
            />
          </form>
        </td>
      </tr>
    </table>
    <br/>
    <table cellpadding="5" cellspacing="0" border="1" width="500">
      <tr>
        <td>' . t('Upload a File') . '</td>
      </tr>
      <tr>
        <td>
          <' . $a . ' method="post" enctype="multipart/form-data" style="margin:5px;">
            <label for="file">' . t('Select a file:') . '</label>
            <input type="file" name="file" id="file"/>
            <input type="hidden" name="submited" value="">
            <input type="submit" name="submit" value="' . t('Upload') . '"/>
          </form>
        </td>
      </tr>
    </table>
    <br/><br/>
    <label for="file">' . t('Image URL:') . '</label>
    <input type="text" name="image" id="image" size="50"/>
    <br/><br/><br/>
    <' . $a . ' method="post" name="delfileform">
      <input type="hidden" name="submited" value="">
      <input type="hidden" name="del_file"/>
    </form>';
}
