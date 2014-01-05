<?php
/**
 * @file
 * This file contains all functions which need for facebook block view.
 */

/**
 * View facebook block.
 */
function spider_facebook_block_show($selected_item_id) {
  // Content.
  if ($selected_item_id != 0) {
    $param = db_query("SELECT * FROM {spider_facebook_params} WHERE id=:id", array(':id' => $selected_item_id))->fetchObject();
    if (arg(0) == 'node' && is_numeric(arg(1))) {
      $nodeid = arg(1);
    }
    else {
      $nodeid = 0;
    }
    if (strpos($param->articles, $nodeid . ',') === FALSE) {
      return;
    }
  }
  $current_path = url(current_path(), array('absolute' => TRUE));
  // Register page.
  if ($selected_item_id == 0 && isset($_GET['task']) && (isset($_GET['fbid']) || isset($_GET['g_red']) || isset($_GET['res']) || isset($_GET['logout_red'])) && ($_GET['task'] == 'login' || $_GET['task'] == 'registered' || $_GET['task'] == 'registration' || $_GET['task'] == 'loginwith' || $_GET['task'] == 'logout')) {
    $task = (isset($_GET['task']) ? check_plain($_GET['task']) : '');
    $type = (isset($_GET['type']) ? check_plain($_GET['type']) : '');
    $appid = (isset($_GET['appid']) ? check_plain($_GET['appid']) : '');
    $fb_only = (isset($_GET['fb_only']) ? check_plain($_GET['fb_only']) : '');
    $reg_red = (isset($_GET['g_red']) ? check_plain($_GET['g_red']) : '');
    $log_red = (isset($_GET['log_red']) ? check_plain($_GET['log_red']) : '');
    $logout_red = (isset($_GET['logout_red']) ? check_plain($_GET['logout_red']) : '');
    $log_red = str_replace('@@@', '&', $log_red);
    $logout_red = str_replace('@@@', '&', $logout_red);
    switch ($task) {
      case 'logout':
        global $user;
        watchdog('user', 'Session closed for %name.', array('%name' => $user->name));
        module_invoke_all('user_logout', $user);
        // Destroy the current session, and reset $user to the anonymous user.
        session_destroy();
        drupal_goto($logout_red);
        break;

      case 'registration':
        $a = url('get_registration_for_faceebok_page_or_post', array('query' => array('task' => 'registered'), 'absolute' => TRUE)) . '&type=' . $type . '&appid=' . $appid . '&g_red=' . $reg_red;
        $encodedurl = urlencode($a);
        switch ($type) {
          case 'auto':
            ?>
            <iframe src="https://www.facebook.com/plugins/registration?client_id=<?php echo $appid;?>&redirect_uri=<?php echo $encodedurl;?>&
              fields=[
               {'name':'name'},
               {'name':'first_name'},
               {'name':'last_name'},
               {'name':'email'},
               {'name':'gender'},
               {'name':'birthday'},
              ]"
              scrolling="auto"
              frameborder="no"
              style="border:none"
              allowTransparency="true"
              width="100%"
              height="800">
            </iframe>
            <?php
            break;

          case 'password':
            ?>
            <iframe src="https://www.facebook.com/plugins/registration?client_id=<?php echo $appid;?>&redirect_uri=<?php echo $encodedurl;?>&
              fields=[
               {'name':'name'},
               {'name':'first_name'},
               {'name':'last_name'},
               {'name':'email'},
               {'name':'gender'},
               {'name':'birthday'},
               {'name':'username','description':'Username','type':'text'},
               {'name':'password','description':'Password'},
              ]"
              scrolling="auto"
              frameborder="no"
              style="border:none"
              allowTransparency="true"
              width="100%"
              height="1000">
            </iframe>
            <?php
            break;

          case 'captcha':
            ?>
            <iframe src="https://www.facebook.com/plugins/registration?client_id=<?php echo $appid; ?>&redirect_uri=<?php echo $encodedurl;?>&
              fields=[
               {'name':'name'},
               {'name':'first_name'},
               {'name':'last_name'},
               {'name':'email'},
               {'name':'gender'},
               {'name':'birthday'},
               {'name':'username','description':'Username','type':'text'},
               {'name':'password','description':'Password'},
               {'name':'captcha'}
              ]"
              scrolling="auto"
              frameborder="no"
              style="border:none"
              allowTransparency="true"
              width="100%"
              height="1000">
            </iframe>
            <?php
            break;
        }
        return '';
        break;

      case 'registered':
        $reg_red = str_replace('@@@', '&', $reg_red);
        $signed_request = $_POST['signed_request'];
        $data = explode('.', $signed_request);
        $params = json_decode(base64_decode(strtr($data[1], '-_', '+/')), TRUE);
        $user_id = $params['user_id'];
        // Array for all user settings.
        $data = array();
        $data['first_name'] = $params['registration']['first_name'];
        $data['last_name'] = $params['registration']['last_name'];
        $data['email'] = $params['registration']['email'];
        // Should the user receive system mails?
        $data['sendEmail'] = 1;
        switch ($type) {
          case 'auto':
            $username = $params['registration']['name'];
            $password = user_password(10);
            $data['password'] = $password;
            $data['name'] = $params['registration']['name'];
            $data['username'] = $username;
            // Now we can decide, if the user will need an activation.
            $account = new stdClass;
            $account->is_new = TRUE;
            $account->name = $data['username'];
            require_once getcwd() . '/includes/password.inc';
            $account->pass = user_hash_password($data['password']);
            $account->mail = $data['email'];
            $account->init = $data['email'];
            $account->status = TRUE;
            $account->roles = array(DRUPAL_AUTHENTICATED_RID => TRUE);
            $account->timezone = variable_get('date_default_timezone', '');
            // Returns user object.
            if (!db_query("SELECT COUNT(*) FROM {users} WHERE name = :name;", array(':name' => $data['username']))->fetchField()) {
              user_save($account);
              if ($uid = user_authenticate($username, $password)) {
                global $user;
                $user = user_load($uid);
                $login_array = array ('name' => $username);
                user_login_finalize($login_array);
              }
              else {
                drupal_set_message(t('Login Failed.'), 'error', FALSE);
              }
            }
            else {
              drupal_set_message(t('The user with this username already exist.'), 'error', FALSE);
            }
            if ($user_id != "") {
              db_query("DELETE FROM {spider_facebook_login} WHERE id=:id", array(':id' => $user_id));
              db_insert('spider_facebook_login')
                ->fields(array('user_id' => $user_id, 'username' => $username, 'password' => $password))
                ->execute();
            }
            drupal_goto($reg_red);
            exit;
            break;

          case 'password':
          case 'captcha':
            $password = $params['registration']['password'];
            $username = $params['registration']['username'];
            $data['username'] = $username;
            $data['password'] = $password;
            // Confirm the password.
            $data['password2'] = $password;
            $account = new stdClass;
            $account->is_new = TRUE;
            $account->name = $data['username'];
            require_once getcwd() . '/includes/password.inc';
            $account->pass = user_hash_password($data['password']);
            $account->mail = $data['email'];
            $account->init = $data['email'];
            $account->status = TRUE;
            $account->roles = array(DRUPAL_AUTHENTICATED_RID => TRUE);
            $account->timezone = variable_get('date_default_timezone', '');
            // Returns user object.
            if (!db_query("SELECT COUNT(*) FROM {users} WHERE name = :name;", array(':name' => $data['username']))->fetchField()) {
              user_save($account);
              if ($uid = user_authenticate($username, $password)) {
                global $user;
                $user = user_load($uid);
                $login_array = array ('name' => $username);
                user_login_finalize($login_array);
              }
              else {
                drupal_set_message(t('Login Failed.'), 'error', FALSE);
              }
            }
            else {
              drupal_set_message(t('The user with this username already exist.'), 'error', FALSE);
            }
            if ($user_id != "") {
              db_query("DELETE FROM {spider_facebook_login} WHERE id=:id", array(':id' => $user_id));
              db_insert('spider_facebook_login')
                ->fields(array('user_id' => $user_id, 'username' => $username, 'password' => $password))
                ->execute();
            }
            drupal_goto($reg_red);
            exit;
            break;
        }
        break;

      case 'login':
        $res = check_plain($_GET['res']);
        $data = explode('.', $res);
        $user1 = json_decode(base64_decode(strtr($data[1], '-_', '+/')), TRUE);
        $login_user_id = $user1['user_id'];
        $result = db_query("SELECT * FROM {spider_facebook_login} WHERE user_id=:user_id", array(':user_id' => $login_user_id))->fetchObject();
        $username = $result->username;
        $password = $result->password;
        if ($uid = user_authenticate($username, $password)) {
          global $user;
          $user = user_load($uid);
          $login_array = array ('name' => $username);
          user_login_finalize($login_array);
        }
        else {
          drupal_set_message(t('Login Failed.'), 'error', FALSE);
        }
        if ($log_red != '') {
          drupal_goto($log_red);
        }
        else {
          drupal_goto(url('', array('absolute' => FALSE)));
        }
        exit;
    }
  }

  if (($param->type == 'likebutton' || $param->type == 'sendbutton' || $param->type == 'comment') && ($param->articles != '' || $param->articles != 'all')) {
    spider_facebook_add_meta($selected_item_id);
  }
  $login_id = user_password(10);
  $reglog = $current_path;
  global $user;
  $param->code = str_replace('temp_id', $login_id, $param->code);
  if ($user->uid && $param->type == 'register') {
    $url_logen = url('get_registration_for_faceebok_page_or_post', array('query' => array('task' => 'logout'), 'absolute' => TRUE));
    if ($param->fb_only == 1) {
      $login = '
          <script>
            document.getElementById("' . $login_id . '").setAttribute("style","display:none");
            function logout() {
              window.location="' . $url_logen . '&logout_red=' . $reglog . '";
            }
          </script>
          <input type="button" class="form-submit button" value="' . t('Log out') . '" onclick="logout()"/>';
    }
    else {
      $login = '
          <script>
            document.getElementById("' . $login_id . '").setAttribute("style","display:none");
          </script>';
    }
  }
  else {
    $login = '';
  }
  $url = $current_path;
  global $language;
  $reglog = str_replace('&', '@@@', $url);
  $param->code = str_replace('autoLOGREDauto', $reglog, $param->code);
  $param->code = str_replace('autoREGREDauto', $reglog, $param->code);
  if ($param->render == '3' || $param->render == '4') {
    $encode = urlencode($url);
  }
  else {
    $encode = $url;
  }
  $param->code = str_replace('autoSITEURLauto', $encode, $param->code);
  $param->code = str_replace('autoLANGauto', $language->language, $param->code);
  $param->code = str_replace('temp_id', $login_id, $param->code);
  $content = $param->code;
  return $content . $login;
}

/**
 * Add metas to page header.
 */
function spider_facebook_add_meta($selected_item_id) {
  $param = db_query("SELECT * FROM {spider_facebook_params} WHERE id=:id", array(':id' => $selected_item_id))->fetchObject();
  $content_ids = explode(',', $param->articles);
  $value_title = explode('***', $param->meta_title);
  $value_type = explode('***', $param->meta_type);
  $value_url = explode('***', $param->meta_url);
  $value_image = explode('***', $param->meta_image);
  $value_site_name = explode('***', $param->meta_site_name);
  $value_description = explode('***', $param->meta_description);
  $value_admin_id = explode('***', $param->meta_admins);
  if (arg(0) == 'node' && is_numeric(arg(1))) {
    $nodeid = arg(1);
  }
  else {
    $nodeid = 0;
  }
  foreach ($content_ids as $key => $content_id) {
    if ($content_id == $nodeid) {
      if ($value_title[$key]) {
        $meta = array(
          '#type' => 'html_tag',
          '#tag' => 'meta',
          '#attributes' => array(
            'property' => 'og:title',
            'content' => htmlspecialchars($value_title[$key]),
          )
        );
        drupal_add_html_head($meta, 'zujava_og_title');
      }
      if ($value_type[$key] != 'Chose a type') {
        $meta = array(
          '#type' => 'html_tag',
          '#tag' => 'meta',
          '#attributes' => array(
            'property' => 'og:type',
            'content' => htmlspecialchars($value_type[$key]),
          )
        );
        drupal_add_html_head($meta, 'zujava_og_type');
      }
      if ($value_url[$key]) {
        $meta = array(
          '#type' => 'html_tag',
          '#tag' => 'meta',
          '#attributes' => array(
            'property' => 'og:url',
            'content' => htmlspecialchars($value_url[$key]),
          )
        );
        drupal_add_html_head($meta, 'zujava_og_url');
      }
      if ($value_image[$key]) {
        $meta = array(
          '#type' => 'html_tag',
          '#tag' => 'meta',
          '#attributes' => array(
            'property' => 'og:image',
            'content' => htmlspecialchars($value_image[$key]),
          )
        );
        drupal_add_html_head($meta, 'zujava_og_image');
      }
      elseif ($param->def_img_art != '') {
        $meta = array(
          '#type' => 'html_tag',
          '#tag' => 'meta',
          '#attributes' => array(
            'property' => 'og:image',
            'content' => 'https://' . $_SERVER['HTTP_HOST'] . $param->def_img_art,
          )
        );
        drupal_add_html_head($meta, 'zujava_og_image');
      }
      if ($value_site_name[$key]) {
        $meta = array(
          '#type' => 'html_tag',
          '#tag' => 'meta',
          '#attributes' => array(
            'property' => 'og:site_name',
            'content' => htmlspecialchars($value_site_name[$key]),
          )
        );
        drupal_add_html_head($meta, 'zujava_og_site_name');
      }
      if ($value_description[$key]) {
        $meta = array(
          '#type' => 'html_tag',
          '#tag' => 'meta',
          '#attributes' => array(
            'property' => 'og:description',
            'content' => htmlspecialchars($value_description[$key]),
          )
        );
        drupal_add_html_head($meta, 'zujava_og_description');
      }
      if ($value_admin_id[$key]) {
        $meta = array(
          '#type' => 'html_tag',
          '#tag' => 'meta',
          '#attributes' => array(
            'property' => 'fb:admins',
            'content' => htmlspecialchars($value_admin_id[$key]),
          )
        );
        drupal_add_html_head($meta, 'zujava_og_admins');
      }
      else {
        $meta = array(
          '#type' => 'html_tag',
          '#tag' => 'meta',
          '#attributes' => array(
            'property' => 'fb:app_id',
            'content' => $param->appid,
          )
        );
        drupal_add_html_head($meta, 'zujava_og_app_id');
      }
    }
  }
  return;
}
