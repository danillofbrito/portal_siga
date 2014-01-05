<?php
/**
 * @file
 * Spider Facebook module manager.
 */

/**
 * Menu loader callback. Load facebook manager.
 */
function spider_facebook_configure() {
  $free_version = '<a href="http://web-dorado.com/drupal-facebook-guide/step-2-1.html" target="_blank" style="float:right;"><img src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/user-manual.png" border="0" alt="' . t('User Manual') . '"></a><div style="clear:both;"></div>
    <a href="http://web-dorado.com/products/drupal-facebook-module.html" target="_blank" style="color:red; text-decoration:none; float:right;">
      <img src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/header.png" border="0" alt="www.web-dorado.com" width="215"><br />
    <div style="float:right;">' . t('Get the full version') . '&nbsp;&nbsp;&nbsp;&nbsp;</div>
    </a>';
  $form = array();
  $form['fieldset_configure_facebook'] = array(
    '#prefix' => $free_version,
    '#type' => 'fieldset',
  );
  $form['fieldset_configure_facebook']['copy'] = array(
    '#type' => 'submit',
    '#submit' => array('spider_facebook_copy_selected'),
    '#value' => t('Copy'),
  );
  $form['fieldset_configure_facebook']['publish'] = array(
    '#type' => 'submit',
    '#submit' => array('spider_facebook_publish_selected'),
    '#value' => t('Publish'),
  );
  $form['fieldset_configure_facebook']['unpublish'] = array(
    '#type' => 'submit',
    '#submit' => array('spider_facebook_unpublish_selected'),
    '#value' => t('Unpublish'),
  );
  $form['fieldset_configure_facebook']['delete'] = array(
    '#type' => 'submit',
    '#submit' => array('spider_facebook_delete_selected'),
    '#value' => t('Delete'),
    '#attributes' => array('onclick' => 'if (!confirm(Drupal.t("Do you want to delete selected items?"))) {return false;}'),
  );
  $form['fieldset_configure_facebook']['new_playlist'] = array(
    '#prefix' => l(t('New'), url('admin/settings/spider_facebook/edit', array('absolute' => TRUE))),
  );
  $form['fieldset_search_by_title'] = array(
    '#type' => 'fieldset',
    '#title' => t('Search by title'),
    '#collapsible' => TRUE,
    '#collapsed' => ((variable_get('spider_facebook_search_by_title', '') == '') ? TRUE : FALSE),
  );
  $form['fieldset_search_by_title']['search_by_title'] = array(
    '#type' => 'textfield',
    '#size' => 25,
    '#default_value' => variable_get('spider_facebook_search_by_title', ''),
  );
  $form['fieldset_search_by_title']['search'] = array(
    '#type' => 'submit',
    '#submit' => array('spider_facebook_search_by_title'),
    '#value' => t('Go'),
  );
  $form['fieldset_search_by_title']['reset'] = array(
    '#type' => 'submit',
    '#value' => t('Reset'),
    '#submit' => array('spider_facebook_reset_by_title'),
  );
  $header = array(
    'id' => array('data' => t('ID'), 'field' => 'n.id'),
    'title' => array('data' => t('Title'), 'field' => 'n.title'),
    'type' => array('data' => t('Type'), 'field' => 'n.type'),
    'published' => array('data' => t('Published'), 'field' => 'n.published'),
    'copy' => array('data' => t('Copy')),
    'delete' => array('data' => t('Delete')),
  );
  $options = array();
  $query = db_select('spider_facebook_params', 'n')
    ->fields('n', array('id'))
    ->condition('n.title', '%' . db_like(variable_get('spider_facebook_search_by_title', '')) . '%', 'LIKE')
    ->extend('TableSort')
    ->orderByHeader($header)
    ->extend('PagerDefault')
    ->limit(20);
  $ids = $query->execute()->fetchCol();
  foreach ($ids as $id) {
    $row = db_query("SELECT * FROM {spider_facebook_params} WHERE id=:id", array(':id' => $id))->fetchObject();
    if ($row->published) {
      $publish_unpublish_png = 'publish.png';
      $publish_unpublish_function = 'unpublish';
    }
    else {
      $publish_unpublish_png = 'unpublish.png';
      $publish_unpublish_function = 'publish';
    }
    $options[$id] = array(
      'id' => $id,
      'title' => array(
        'data' => array(
          '#type' => 'link',
          '#title' => $row->title,
          '#href' => url('admin/settings/spider_facebook/edit', array('query' => array('id' => $id), 'absolute' => TRUE)),
        ),
      ),
      'type' => $row->type,
      'published' => l(t('<img src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/' . $publish_unpublish_png . '" />'), url('admin/settings/spider_facebook/' . $publish_unpublish_function, array('query' => array('id' => $id), 'absolute' => TRUE)), array('html' => TRUE)),
      'delete' => array(
        'data' => array(
          '#type' => 'link',
          '#title' => t('Delete'),
          '#href' => url('admin/settings/spider_facebook/delete', array('query' => array('id' => $id), 'absolute' => TRUE)),
        ),
      ),
      'copy' => array(
        'data' => array(
          '#type' => 'link',
          '#title' => t('Copy'),
          '#href' => url('admin/settings/spider_facebook/copy', array('query' => array('id' => $id), 'absolute' => TRUE)),
        ),
      ),
    );
  }
  $form['table'] = array(
    '#type' => 'tableselect',
    '#js_select' => TRUE,
    '#header' => $header,
    '#options' => $options,
    '#empty' => t('No items available.'),
    '#suffix' => theme('pager', array('tag' => array())),
  );
  return $form;
}

/**
 * Search.
 */
function spider_facebook_search_by_title($form, &$form_state) {
  if ($form_state['values']['search_by_title'] != '') {
    variable_set('spider_facebook_search_by_title', $form_state['values']['search_by_title']);
  }
  else {
    variable_set('spider_facebook_search_by_title', '');
  }
}

/**
 * Reset.
 */
function spider_facebook_reset_by_title($form, &$form_state) {
  variable_set('spider_facebook_search_by_title', '');
}

/**
 * Copy selected.
 */
function spider_facebook_copy_selected($form, &$form_state) {
  if (db_query("SELECT COUNT(*) FROM {spider_facebook_params}")->fetchField() > 1) {
    drupal_set_message(t("You can't add more than two items in free version in free version."), 'error', FALSE);
    return FALSE;
  }
  if (db_query("SELECT id FROM {spider_facebook_params}")) {
    $ids_col = db_query("SELECT id FROM {spider_facebook_params}")->fetchCol();
    $flag = FALSE;
    foreach ($ids_col as $key => $id) {
      if (isset($_POST['table'][$id])) {
        $flag = TRUE;
        $row = db_query("SELECT * FROM {spider_facebook_params} WHERE id=:id", array(':id' => $id))->fetchObject();
        db_insert('spider_facebook_params')
          ->fields(array(
            'title' => $row->title,
            'published' => $row->published,
            'type' => $row->type,
            'width' => $row->width,
            'url' => $row->url,
            'url_type' => $row->url_type,
            'colorsc' => $row->colorsc,
            'render' => $row->render,
            'code' => $row->code,
            'articles' => $row->articles,
            'backg' => $row->backg,
            'action' => $row->action,
            'send' => $row->send,
            'face' => $row->face,
            'layout' => $row->layout,
            'font' => $row->font,
            'lang' => $row->lang,
            'height' => $row->height,
            'post' => $row->post,
            'rows' => $row->rows,
            'domain' => $row->domain,
            'appid' => $row->appid,
            'head' => $row->head,
            'recom' => $row->recom,
            'target' => $row->target,
            'stream' => $row->stream,
            'size' => $row->size,
            'bord' => $row->bord,
            'share_type' => $row->share_type,
            'request_type' => $row->request_type,
            'place' => (($row->place == 'top') ? 'bottom' : 'top'),
            'twit' => $row->twit,
            'meta_title' => $row->meta_title,
            'meta_type' => $row->meta_type,
            'meta_url' => $row->meta_url,
            'meta_image' => $row->meta_image,
            'meta_site_name' => $row->meta_site_name,
            'meta_description' => $row->meta_description,
            'meta_admins' => $row->meta_admins,
            'css' => $row->css,
            'def_img_art' => $row->def_img_art,
            'fb_only' => $row->fb_only,
            'reg_type' => $row->reg_type,
            'reg_red' => $row->reg_red,
            'log_red' => $row->log_red,
            'url_value' => $row->url_value,
            'lang_type' => $row->lang_type,
            'req_m' => $row->req_m,
            'count_mode' => $row->count_mode,
            'hor_place' => $row->hor_place,
            ))
          ->execute();
        // Parameters for block.
        if ($row->place == 'top') {
          $weight = 50;
        }
        else {
          $weight = -50;
        }
        if ($row->articles == '' || $row->articles == ',') {
          $block_region = '';
          $block_status = 0;
          $block_visibility = 0;
          $block_pages = '';
        }
        elseif ($row->articles == 'all') {
          $block_region = 'content';
          $block_status = 1;
          $block_visibility = 0;
          $block_pages = '';
        }
        else {
          $block_region = 'content';
          $block_status = 1;
          $block_visibility = 1;
          $nodeids = explode(',', $row->articles);
          $block_pages = '';
          foreach ($nodeids as $nodeid) {
            if ($nodeid != '' && $nodeid != ',') {
              $block_pages .= 'node/' . $nodeid . '
';
            }
          }
        }
        $max_id = db_query("SELECT MAX(id) FROM {spider_facebook_params}")->fetchField();
        db_insert('block')
          ->fields(array(
            'module' => 'spider_facebook',
            'delta' => 'spider_facebook' . $max_id,
            'theme' => variable_get('theme_default', 'none'),
            'status' => $block_status,
            'weight' => $weight,
            'region' => $block_region,
            'custom' => 0,
            'visibility' => $block_visibility,
            'pages' => $block_pages,
            'title' => '',
            'cache' => 1,
            ))
          ->execute();
      }
    }
    if ($flag == FALSE) {
      drupal_set_message(t('You must select at least one item.'), 'warning', FALSE);
    }
    else {
      drupal_set_message(t('Selected items successfully copied.'), 'status', FALSE);
    }
  }
}

/**
 * Copy.
 */
function spider_facebook_copy() {
  if (db_query("SELECT COUNT(*) FROM {spider_facebook_params}")->fetchField() > 1) {
    drupal_set_message(t("You can't add more than two items in free version."), 'error', FALSE);
    drupal_goto(url('admin/settings/spider_facebook', array('absolute' => TRUE)));
  }
  if (isset($_GET['id'])) {
    $id = check_plain($_GET['id']);
    $row = db_query("SELECT * FROM {spider_facebook_params} WHERE id=:id", array(':id' => $id))->fetchObject();
    db_insert('spider_facebook_params')
      ->fields(array(
        'title' => $row->title,
        'published' => $row->published,
        'type' => $row->type,
        'width' => $row->width,
        'url' => $row->url,
        'url_type' => $row->url_type,
        'colorsc' => $row->colorsc,
        'render' => $row->render,
        'code' => $row->code,
        'articles' => $row->articles,
        'backg' => $row->backg,
        'action' => $row->action,
        'send' => $row->send,
        'face' => $row->face,
        'layout' => $row->layout,
        'font' => $row->font,
        'lang' => $row->lang,
        'height' => $row->height,
        'post' => $row->post,
        'rows' => $row->rows,
        'domain' => $row->domain,
        'appid' => $row->appid,
        'head' => $row->head,
        'recom' => $row->recom,
        'target' => $row->target,
        'stream' => $row->stream,
        'size' => $row->size,
        'bord' => $row->bord,
        'share_type' => $row->share_type,
        'request_type' => $row->request_type,
        'place' => (($row->place == 'top') ? 'bottom' : 'top'),
        'twit' => $row->twit,
        'meta_title' => $row->meta_title,
        'meta_type' => $row->meta_type,
        'meta_url' => $row->meta_url,
        'meta_image' => $row->meta_image,
        'meta_site_name' => $row->meta_site_name,
        'meta_description' => $row->meta_description,
        'meta_admins' => $row->meta_admins,
        'css' => $row->css,
        'def_img_art' => $row->def_img_art,
        'fb_only' => $row->fb_only,
        'reg_type' => $row->reg_type,
        'reg_red' => $row->reg_red,
        'log_red' => $row->log_red,
        'url_value' => $row->url_value,
        'lang_type' => $row->lang_type,
        'req_m' => $row->req_m,
        'count_mode' => $row->count_mode,
        'hor_place' => $row->hor_place,
        ))
      ->execute();
    // Parameters for block.
    if ($row->place == 'top') {
      $weight = 50;
    }
    else {
      $weight = -50;
    }
    if ($row->articles == '' || $row->articles == ',') {
      $block_region = '';
      $block_status = 0;
      $block_visibility = 0;
      $block_pages = '';
    }
    elseif ($row->articles == 'all') {
      $block_region = 'content';
      $block_status = 1;
      $block_visibility = 0;
      $block_pages = '';
    }
    else {
      $block_region = 'content';
      $block_status = 1;
      $block_visibility = 1;
      $nodeids = explode(',', $row->articles);
      $block_pages = '';
      foreach ($nodeids as $nodeid) {
        if ($nodeid != '' && $nodeid != ',') {
          $block_pages .= 'node/' . $nodeid . '
';
        }
      }
    }
    $max_id = db_query("SELECT MAX(id) FROM {spider_facebook_params}")->fetchField();
    db_insert('block')
      ->fields(array(
        'module' => 'spider_facebook',
        'delta' => 'spider_facebook' . $max_id,
        'theme' => variable_get('theme_default', 'none'),
        'status' => $block_status,
        'weight' => $weight,
        'region' => $block_region,
        'custom' => 0,
        'visibility' => $block_visibility,
        'pages' => $block_pages,
        'title' => '',
        'cache' => 1,
        ))
      ->execute();
  }
  drupal_set_message(t('Item successfully copied.'), 'status', FALSE);
  drupal_goto(url('admin/settings/spider_facebook', array('absolute' => TRUE)));
}

/**
 * Publish selected.
 */
function spider_facebook_publish_selected($form, &$form_state) {
  if (db_query("SELECT id FROM {spider_facebook_params}")) {
    $ids_col = db_query("SELECT id FROM {spider_facebook_params}")->fetchCol();
    $flag = FALSE;
    foreach ($ids_col as $id) {
      if (isset($_POST['table'][$id])) {
        $flag = TRUE;
        db_query("UPDATE {spider_facebook_params} SET published=:published WHERE id=:id", array(':published' => 1, ':id' => $id));
      }
    }
    if ($flag == FALSE) {
      drupal_set_message(t('You must select at least one item.'), 'warning', FALSE);
    }
    else {
      drupal_set_message(t('Selected items successfully published.'), 'status', FALSE);
    }
  }
}

/**
 * Publish.
 */
function spider_facebook_publish() {
  if (isset($_GET['id'])) {
    $id = check_plain($_GET['id']);
    db_query("UPDATE {spider_facebook_params} SET published=:published WHERE id=:id", array(':published' => 1, ':id' => $id));
  }
  drupal_set_message(t('Item successfully published.'), 'status', FALSE);
  drupal_goto(url('admin/settings/spider_facebook', array('absolute' => TRUE)));
}

/**
 * Unpublish selected.
 */
function spider_facebook_unpublish_selected($form, &$form_state) {
  if (db_query("SELECT id FROM {spider_facebook_params}")) {
    $ids_col = db_query("SELECT id FROM {spider_facebook_params}")->fetchCol();
    $flag = FALSE;
    foreach ($ids_col as $id) {
      if (isset($_POST['table'][$id])) {
        $flag = TRUE;
        db_query("UPDATE {spider_facebook_params} SET published=:published WHERE id=:id", array(':published' => 0, ':id' => $id));
      }
    }
    if ($flag == FALSE) {
      drupal_set_message(t('You must select at least one item.'), 'warning', FALSE);
    }
    else {
      drupal_set_message(t('Selected items successfully unpublished.'), 'status', FALSE);
    }
  }
}

/**
 * Unpublish.
 */
function spider_facebook_unpublish() {
  if (isset($_GET['id'])) {
    $id = check_plain($_GET['id']);
    db_query("UPDATE {spider_facebook_params} SET published=:published WHERE id=:id", array(':published' => 0, ':id' => $id));
  }
  drupal_set_message(t('Item successfully unpublished.'), 'status', FALSE);
  drupal_goto(url('admin/settings/spider_facebook', array('absolute' => TRUE)));
}

/**
 * Delete selected.
 */
function spider_facebook_delete_selected($form, &$form_state) {
  if (db_query("SELECT id FROM {spider_facebook_params}")) {
    $ids_col = db_query("SELECT id FROM {spider_facebook_params}")->fetchCol();
    $flag = FALSE;
    foreach ($ids_col as $id) {
      if (isset($_POST['table'][$id])) {
        $flag = TRUE;
        db_query("DELETE FROM {spider_facebook_params} WHERE id=:id", array(':id' => $id));
        db_query("DELETE FROM {block} WHERE delta=:delta", array(':delta' => 'spider_facebook' . $id));
      }
    }
    if ($flag == FALSE) {
      drupal_set_message(t('You must select at least one item.'), 'warning', FALSE);
    }
    else {
      drupal_set_message(t('Selected items successfully deleted.'), 'status', FALSE);
    }
  }
}

/**
 * Delete.
 */
function spider_facebook_delete() {
  if (isset($_GET['id'])) {
    $id = check_plain($_GET['id']);
    db_query("DELETE FROM {spider_facebook_params} WHERE id=:id", array(':id' => $id));
    db_query("DELETE FROM {block} WHERE delta=:delta", array(':delta' => 'spider_facebook' . $id));
    drupal_set_message(t('Item successfully deleted.'), 'status', FALSE);
  }
  drupal_goto(url('admin/settings/spider_facebook', array('absolute' => TRUE)));
}

/**
 * Add or edit item.
 */
function spider_facebook_edit() {
  drupal_add_js(drupal_get_path('module', 'spider_facebook') . '/js/spider_facebook_change_type.js');
  if (!file_exists("sites/all/libraries/jscolor/jscolor.js")) {
    $message = t('Download "jscolor" library from !jscolor_url and extract it to "sites/all/libraries/jscolor" directory.', array(
      '!jscolor_url' => l(t('here'), 'http://jscolor.com/release/jscolor-1.4.0.zip')));
    drupal_set_message(filter_xss($message), 'warning', FALSE);
  }
  else {
    drupal_add_js('sites/all/libraries/jscolor/jscolor.js');
  }
  if (isset($_GET['id']) && (check_plain($_GET['id']) != '')) {
    $id = check_plain($_GET['id']);
    $row = db_query("SELECT * FROM {spider_facebook_params} WHERE id=:id", array(':id' => $id))->fetchObject();
    $title = $row->title;
    $published = $row->published;
    $type = $row->type;
    $width = $row->width;
    $url = $row->url;
    $url_type = $row->url_type;
    $colorsc = $row->colorsc;
    $render = $row->render;
    $code = $row->code;
    $articles = $row->articles;
    $backg = $row->backg;
    $action = $row->action;
    $send = $row->send;
    $face = $row->face;
    $layout = $row->layout;
    $font = $row->font;
    $lang = $row->lang;
    $height = $row->height;
    $post = $row->post;
    $rows = $row->rows;
    $domain = $row->domain;
    $appid = $row->appid;
    $head = $row->head;
    $recom = $row->recom;
    $target = $row->target;
    $stream = $row->stream;
    $size = $row->size;
    $bord = $row->bord;
    $share_type = $row->share_type;
    $request_type = $row->request_type;
    $place = $row->place;
    $twit = $row->twit;
    // $items = $row->items;
    $meta_title = $row->meta_title;
    $meta_type = $row->meta_type;
    $meta_url = $row->meta_url;
    $meta_image = $row->meta_image;
    $meta_site_name = $row->meta_site_name;
    $meta_description = $row->meta_description;
    $meta_admins = $row->meta_admins;
    $css = $row->css;
    $def_img_art = $row->def_img_art;
    $fb_only = $row->fb_only;
    $reg_type = $row->reg_type;
    $reg_red = $row->reg_red;
    $log_red = $row->log_red;
    $url_value = $row->url_value;
    $lang_type = $row->lang_type;
    $req_m = $row->req_m;
    $count_mode = $row->count_mode;
    $hor_place = $row->hor_place;
  }
  else {
    if (db_query("SELECT COUNT(*) FROM {spider_facebook_params}")->fetchField() > 1) {
      drupal_set_message(t("You can't add more than two items in free version."), 'error', FALSE);
      drupal_goto(url('admin/settings/spider_facebook', array('absolute' => TRUE)));
    }
    $id = '';
    $title = '';
    $published = 1;
    $type = 'likebutton';
    $width = '';
    $url = '';
    $url_type = 'auto';
    $colorsc = 'light';
    $render = '2';
    $code = '';
    $articles = '';
    $backg = '';
    $action = 'like';
    $send = '';
    $face = 1;
    $layout = 'standard';
    $font = 'arial';
    $lang = '';
    $height = '';
    $post = '';
    $rows = '';
    $domain = '';
    $appid = '';
    $head = '';
    $recom = 'true';
    $target = '_blank';
    $stream = '';
    $size = '';
    $bord = '';
    $share_type = '';
    $request_type = 1;
    $place = 'top';
    $twit = '';
    $meta_title = '';
    $meta_type = '';
    $meta_url = '';
    $meta_image = '';
    $meta_site_name = '';
    $meta_description = '';
    $meta_admins = '';
    $css = 'padding-bottom: 0px;
padding-left: 0px;
padding-right: 0px;
padding-top: 0px;
margin-bottom: 0px;
margin-left: 0px;
margin-right: 0px;
margin-top: 0px;';
    $def_img_art = '';
    $fb_only = 1;
    $reg_type = '';
    $reg_red = '';
    $log_red = '';
    $url_value = '';
    $lang_type = 'auto';
    $req_m = '';
    $count_mode = '';
    $hor_place = '';
  }
  $free_version = '<a href="http://web-dorado.com/drupal-facebook-guide/step-2-1.html" target="_blank" style="float:left;"><img src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/user-manual.png" border="0" alt="' . t('User Manual') . '"></a>
      <a href="http://web-dorado.com/products/drupal-facebook-module.html" target="_blank" style="color:red; text-decoration:none; float:right;">
        <img src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/header.png" border="0" alt="www.web-dorado.com" width="215"><br />
        <div style="float:right;">' . t('Get the full version') . '&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </a>';
  $form = array();
  drupal_add_js('spider_facebook_change_type("' . $type . '");spider_facebook_change_render("' . $render . '");', array('type' => 'inline', 'scope' => 'footer'));
  $form['buttons'] = array(
    '#prefix' => $free_version . '
      <div style="text-align:center;clear:both;">
        <span class="type_span" style="cursor:pointer" onclick="spider_facebook_change_type(\'likebutton\')">
          <img id="likebutton" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/like.png"/>
          <img id="likebutton_hover" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/like_hover.png"/>
        </span>
        <span class="type_span" style="cursor:pointer" onclick="spider_facebook_change_type(\'sendbutton\')">
          <img id="sendbutton" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/send.png"/>
          <img id="sendbutton_hover" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/send_hover.png"/>
        </span>
        <span class="type_span" style="cursor:pointer" onclick="spider_facebook_change_type(\'comment\')">
          <img id="comment" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/comment.png"/>
          <img id="comment_hover" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/comment_hover.png"/>
        </span>
        <span class="type_span" style="cursor:pointer" onclick="spider_facebook_change_type(\'likebox\')">
          <img id="likebox" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/like_box.png"/>
          <img id="likebox_hover" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/like_box_hover.png"/>
        </span>
        <span class="type_span" style="cursor:pointer" onclick="spider_facebook_change_type(\'follow\')">
          <img id="follow" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/follow.png"/>
          <img id="follow_hover" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/follow_hover.png"/>
        </span>
        <span class="type_span" style="cursor:pointer" onclick="spider_facebook_change_type(\'request\')">
          <img id="request" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/request.png"/>
          <img id="request_hover" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/request_hover.png"/>
        </span>
        <span class="type_span" style="cursor:pointer" onclick="spider_facebook_change_type(\'recommendation\')">
          <img id="recommendation" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/recommendation.png"/>
          <img id="recommendation_hover" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/recommendation_hover.png"/>
        </span>
        <span class="type_span" style="cursor:pointer" onclick="spider_facebook_change_type(\'actfeed\')">
          <img id="actfeed" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/activity_feed.png"/>
          <img id="actfeed_hover" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/activity_feed_hover.png"/>
        </span>
        <span class="type_span" style="cursor:pointer" onclick="spider_facebook_change_type(\'facepile\')">
          <img id="facepile" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/facepile.png"/>
          <img id="facepile_hover" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/facepile_hover.png"/>
        </span>
        <span class="type_span" style="cursor:pointer" onclick="spider_facebook_change_type(\'share\')">
          <img id="share" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/share.png"/>
          <img id="share_hover" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/share_hover.png"/>
        </span>
        <span class="type_span" style="cursor:pointer" onclick="spider_facebook_change_type(\'loginbutton\')">
          <img id="loginbutton" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/login_button.png"/>
          <img id="loginbutton_hover" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/login_button_hover.png"/>
        </span>
        <span class="type_span" style="cursor:pointer" onclick="spider_facebook_change_type(\'register\')">
          <img id="register" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/register.png"/>
          <img id="register_hover" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/register_hover.png"/>
        </span>
        <span class="type_span" style="cursor:pointer" onclick="spider_facebook_change_type(\'socials\')">
          <img id="socials" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/socials.png"/>
          <img id="socials_hover" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/socials_hover.png"/>
        </span>
      </div>',
  );
  $form['title'] = array(
    '#prefix' => '<div style="float:left;width:70%;">',
    '#type' => 'textfield',
    '#title' => t('Title'),
    '#required' => TRUE,
    '#default_value' => $title,
    '#size' => 35,
    '#suffix' => '<div style="width:100%;" id="note">
      <label>' . t('Description') . '</label>
      <p id="notification" style="font-size:14px"></p>
      </div>',
  );
  $form['published'] = array(
    '#type' => 'radios',
    '#title' => t('Published'),
    '#description' => t('Choose whether to publish the plugin or not.'),
    '#default_value' => $published,
    '#options' => array('1' => t('Yes'), '0' => t('No')),
    '#attributes' => array('id' => 'published'),
  );
  $form['rendering'] = array(
    '#prefix' => '
      <div id="render_tr">
        <label>' . t('Rendering') . '</label>
        <div class="description">' . t('It is recommended to leave the choice at the default XFBML(eXtended Facebook Markup Language) option to avoid problems with unsupported browsers and other issues.') . '</div>
        <span style="cursor:pointer" onclick="spider_facebook_change_render(\'2\')">
          <img src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/xfbml.png" id="xfbml"/>
          <img src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/xfbml_hover.png" id="xfbml_hover"/>
        </span>
        <span style="cursor:pointer" onclick="spider_facebook_change_render(\'1\')">
          <img src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/html5.png" id="html5"/>
          <img src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/html5_hover.png" id="html5_hover"/>
        </span>
        <span style="cursor:pointer" id="r3" onclick="spider_facebook_change_render(\'3\')">
          <img src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/iframe.png" id="iframe"/>
          <img src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/iframe_hover.png" id="iframe_hover"/>
        </span>
        <span style="cursor:pointer" id="r4" onclick="spider_facebook_change_render(\'4\')">
          <img src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/url.png" id="url"/>
          <img src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/url_hover.png" id="url_hover"/>
        </span>
      </div>',
  );
  $form['url_type'] = array(
    '#prefix' => '<div id="url_type">',
    '#type' => 'radios',
    '#title' => t('Type of URL'),
    '#description' => t('By default, the plugin refers to the current page, but it is possible to link it to a different page by choosing the "URL" option and filling out the "Facebook page link" field.'),
    '#default_value' => $url_type,
    '#options' => array('normal' => t('URL'), 'auto' => t('Current')),
    '#attributes' => array('onchange' => 'spider_facebook_change_url(this.value)'),
    '#suffix' => '</div>',
  );
  drupal_add_js('spider_facebook_change_url("' . $url_type . '")', array('type' => 'inline', 'scope' => 'footer'));
  $form['url'] = array(
    '#prefix' => '<div id="url_tr"><label for="url" id="l_url">' . t('Facebook Page Link Text') . '</label>',
    '#type' => 'textfield',
    '#default_value' => (($url == 'autoSITEURLauto') ? '' : htmlspecialchars($url)),
    '#size' => 35,
    '#suffix' => '</div>',
  );
  $form['count_mode'] = array(
    '#prefix' => '<div id="count_tr">',
    '#type' => 'select',
    '#title' => t('Count Box Position'),
    '#default_value' => $count_mode,
    '#options' => array('vertical' => t('Top'), 'horizontal' => t('Right'), 'none' => t('None')),
    '#attributes' => array('id' => 'count_mode'),
    '#suffix' => '</div>',
  );
  $form['hor_place'] = array(
    '#prefix' => '<div id="hor_place">',
    '#type' => 'select',
    '#title' => t('Horizontal position'),
    '#description' => t('Choose whether to place the plugin on the left or on the right hand of the page.'),
    '#default_value' => $hor_place,
    '#options' => array('left' => t('Left'), 'right' => t('Right')),
    '#suffix' => '</div>',
  );
  $form['domain'] = array(
    '#prefix' => '<div id="domain">',
    '#type' => 'textfield',
    '#title' => t('Domain'),
    '#description' => t('Specify the domain for which you want the information to be shown. By default, this is the domain on which the plugin is added.'),
    '#default_value' => htmlspecialchars($domain),
    '#size' => 35,
    '#suffix' => '</div>',
  );
  $form['appid'] = array(
    '#prefix' => '<div id="appid">',
    '#type' => 'textfield',
    '#title' => t('App ID') . '<span id="is_requerid_text_sp_facebook"> * ' . t('Is required.') . '</span> ' . l(t('How to create facebook application?'), 'http://web-dorado.com/drupal-facebook-guide-step-3.html', array('attributes' => array('target' => '_blank'))),
    '#description' => t('Your Facebook application ID.'),
    '#default_value' => $appid,
    '#size' => 20,
    '#suffix' => '</div>',
  );
  drupal_add_js('document.getElementById("is_requerid_text_sp_facebook").style.color = "#F00";', array('type' => 'inline', 'scope' => 'footer'));
  drupal_add_js('document.getElementById("is_requerid_message_sp_facebook").style.color = "#F00";', array('type' => 'inline', 'scope' => 'footer'));
  $form['req_m'] = array(
    '#prefix' => '<div id="req_m">',
    '#type' => 'textfield',
    '#title' => t('Request message') . '<span id="is_requerid_message_sp_facebook"> * </span>',
    '#description' => t('The message that accompanies the request.'),
    '#default_value' => $req_m,
    '#size' => 35,
    '#suffix' => '</div>',
  );
  $form['reg_red'] = array(
    '#prefix' => '<div id="reg_red">',
    '#type' => 'textfield',
    '#title' => t('Redirect URL after registration'),
    '#description' => t('Specify the URL to which the user is redirected after registration.'),
    '#default_value' => (($reg_red == 'autoREGREDauto') ? '' : $reg_red),
    '#size' => 35,
    '#suffix' => '</div>',
  );
  $form['log_red'] = array(
    '#prefix' => '<div id="log_red">',
    '#type' => 'textfield',
    '#title' => t('Redirect URL after login'),
    '#description' => t('Specify the URL to which the user is redirected after login.'),
    '#default_value' => (($log_red == 'autoLOGREDauto') ? '' : $log_red),
    '#size' => 35,
    '#suffix' => '</div>',
  );
  $form['fb_only'] = array(
    '#prefix' => '<div id="fb_only">',
    '#type' => 'radios',
    '#title' => t('Allow login only via Facebook'),
    '#default_value' => $fb_only,
    '#options' => array(1 => t('Yes'), 0 => t('No')),
    '#suffix' => '</div>',
  );
  $form['reg_type'] = array(
    '#prefix' => '<div id="reg_type">',
    '#type' => 'select',
    '#title' => t('Registration fields type'),
    '#default_value' => $reg_type,
    '#options' => array(
      'auto' => t('Automatically generates a username and imports user profile information'),
      'password' => t('The user sets the username and password'),
      'captcha' => t('Requires setting username and password and verifies with captcha'),
    ),
    '#suffix' => '</div>',
  );
  $form['share_type'] = array(
    '#prefix' => '<div id="share_type">',
    '#type' => 'select',
    '#title' => t('Share type'),
    '#default_value' => $share_type,
    '#options' => array(
      'button' => t('Standard'),
      'link' => t('Text'),
      'icon_link' => t('Text and icon'),
      'button_count' => t('Button count'),
      'box_count' => t('Box count'),
    ),
    '#suffix' => '</div>',
  );
  $form['width'] = array(
    '#prefix' => '<div id="width">',
    '#type' => 'textfield',
    '#title' => t('Width'),
    '#description' => t('Define the width of the social plugin in pixels.'),
    '#default_value' => $width,
    '#size' => 10,
    '#suffix' => '</div>',
  );
  $form['height'] = array(
    '#prefix' => '<div id="height">',
    '#type' => 'textfield',
    '#title' => t('Height'),
    '#description' => t('Define the height of the social plugin in pixels.'),
    '#default_value' => $height,
    '#size' => 10,
    '#suffix' => '</div>',
  );
  $form['url_value'] = array(
    '#prefix' => '<div id="url_value">',
    '#type' => 'textfield',
    '#title' => t('Link text'),
    '#default_value' => htmlspecialchars($url_value),
    '#size' => 35,
    '#suffix' => '</div>',
  );
  $form['target'] = array(
    '#prefix' => '<div id="target">',
    '#type' => 'select',
    '#title' => t('Target'),
    '#description' => t('Select the context in which content links are opened.'),
    '#default_value' => $target,
    '#options' => array(
      '_blank' => t('_blank'),
      '_top' => t('_top'),
      '_parent' => t('_parent'),
    ),
    '#suffix' => '</div>',
  );
  $form['rows'] = array(
    '#prefix' => '<div id="rows">',
    '#type' => 'textfield',
    '#title' => t('Max Rows'),
    '#description' => t('The maximum number of rows of profile pictures.'),
    '#default_value' => $rows,
    '#size' => 35,
    '#suffix' => '</div>',
  );
  $form['size'] = array(
    '#prefix' => '<div id="size">',
    '#type' => 'select',
    '#title' => t('Image size'),
    '#description' => t('Define the size of the images.'),
    '#default_value' => $size,
    '#options' => array(
      'small' => t('Small'),
      'medium' => t('Medium'),
      'large' => t('Large'),
    ),
    '#suffix' => '</div>',
  );
  $form['post'] = array(
    '#prefix' => '<div id="post">',
    '#type' => 'textfield',
    '#title' => t('Number of posts'),
    '#description' => t('Specify how many posts are displayed by default.'),
    '#default_value' => $post,
    '#size' => 35,
    '#suffix' => '</div>',
  );
  $form['head'] = array(
    '#prefix' => '<div id="head">',
    '#type' => 'radios',
    '#title' => t('Show Header'),
    '#description' => t('Choose whether to show the Facebook header on the top of the plugin container or not.'),
    '#default_value' => $head,
    '#options' => array(1 => t('Yes'), 0 => t('No')),
    '#suffix' => '</div>',
  );
  $form['stream'] = array(
    '#prefix' => '<div id="stream">',
    '#type' => 'radios',
    '#title' => t('Show stream'),
    '#description' => t('Show the profile stream for the public profile.'),
    '#default_value' => $stream,
    '#options' => array(1 => t('Yes'), 0 => t('No')),
    '#suffix' => '</div>',
  );
  $form['recom'] = array(
    '#prefix' => '<div id="recom">',
    '#type' => 'radios',
    '#title' => t('Show Recommendations'),
    '#description' => t('Show user recommendations.'),
    '#default_value' => $recom,
    '#options' => array('true' => t('Yes'), 'false' => t('No')),
    '#suffix' => '</div>',
  );
  $form['action'] = array(
    '#prefix' => '<div id="action">',
    '#type' => 'radios',
    '#title' => t('Button label'),
    '#default_value' => $action,
    '#options' => array('like' => t('Like'), 'recommend' => t('Recommend')),
    '#suffix' => '</div>',
  );
  $form['send'] = array(
    '#prefix' => '<div id="send">',
    '#type' => 'radios',
    '#title' => t('Show send button'),
    '#description' => t('Places a Send button next to the Like button.'),
    '#default_value' => $send,
    '#options' => array(1 => t('Yes'), 0 => t('No')),
    '#suffix' => '</div>',
  );
  $form['face'] = array(
    '#prefix' => '<div id="face">',
    '#type' => 'radios',
    '#title' => t('Show Page Fans'),
    '#description' => t('Places a Send button next to the Like button.'),
    '#default_value' => $face,
    '#options' => array(1 => t('Yes'), 0 => t('No')),
    '#suffix' => '</div>',
  );
  $form['layout'] = array(
    '#prefix' => '<div id="layout">',
    '#type' => 'select',
    '#title' => t('Layout style'),
    '#default_value' => $layout,
    '#attributes' => array('onchange' => 'spider_facebook_change_layout_image(this.value)'),
    '#options' => array(
      'standard' => t('Standard'),
      'button_count' => t('Button count'),
      'box_count' => t('Box count'),
    ),
    '#suffix' => '
      <img id="like_standard" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/like_standard.png" />
      <img id="like_button_count" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/like_button_count.png" />
      <img id="like_box_count" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/like_box_count.png" />
      </div>',
  );
  drupal_add_js('spider_facebook_change_layout_image("' . $layout . '");', array('type' => 'inline', 'scope' => 'footer'));
  $form['bord'] = array(
    '#prefix' => '<div id="bord">',
    '#type' => 'radios',
    '#title' => t('Border'),
    '#default_value' => $bord,
    '#options' => array(1 => t('Yes'), 0 => t('No')),
    '#suffix' => '</div>',
  );
  $form['backg'] = array(
    '#prefix' => '<div id="backg">',
    '#type' => 'textfield',
    '#title' => t('Background Color'),
    '#description' => t('The background color of the plugin container.'),
    '#default_value' => $backg,
    '#attributes' => array('class' => array('color')),
    '#size' => 10,
    '#suffix' => '</div>',
  );
  $form['colorsc'] = array(
    '#prefix' => '<div id="colorsc">',
    '#type' => 'radios',
    '#title' => t('Color Scheme'),
    '#description' => t('The color scheme of the plugin.'),
    '#default_value' => $colorsc,
    '#options' => array('light' => t('Light'), 'dark' => t('Dark')),
    '#suffix' => '</div>',
  );
  $form['request_type'] = array(
    '#prefix' => '<div id="request_type">',
    '#type' => 'radios',
    '#title' => t('Request type'),
    '#description' => t('Choose whether to enable request for one or multiple users.'),
    '#default_value' => $request_type,
    '#options' => array(1 => t('Multi users'), 0 => t('One user')),
    '#suffix' => '</div>',
  );
  $form['twit'] = array(
    '#prefix' => '<div id="twit">',
    '#type' => 'textfield',
    '#title' => t('Your screen name'),
    '#default_value' => $twit,
    '#size' => 35,
    '#suffix' => '</div>',
  );
  $form['font'] = array(
    '#prefix' => '<div id="font">',
    '#type' => 'select',
    '#title' => t('Font'),
    '#description' => t('The text font of the plugin.'),
    '#default_value' => $font,
    '#options' => array(
      'arial' => t('Arial'),
      'lucida grande' => t('Lucida grande'),
      'segoe ui' => t('Segoe ui'),
      'tahoma' => t('Tahoma'),
      'trebuchet ms' => t('Trebuchet ms'),
      'verdana' => t('Verdana'),
    ),
    '#suffix' => '</div>',
  );
  $form['lang_type'] = array(
    '#prefix' => '<div id="lang_type">',
    '#type' => 'radios',
    '#title' => t('Language Preference'),
    '#default_value' => $lang_type,
    '#options' => array('normal' => t('Custom'), 'auto' => t('Current')),
    '#attributes' => array('onchange' => 'spider_facebook_change_lang(this.value)'),
    '#suffix' => '</div>',
  );
  drupal_add_js('spider_facebook_change_lang("' . $lang_type . '")', array('type' => 'inline', 'scope' => 'footer'));
  $form['lang'] = array(
    '#prefix' => '<div id="lang">',
    '#type' => 'select',
    '#title' => t('Language'),
    '#default_value' => $lang,
    '#options' => array(
      'sq_AL' => t('Albanian'),
      'ar_AR' => t('Arabic'),
      'hy_AM' => t('Armenian'),
      'az_AZ' => t('Azeri'),
      'eu_ES' => t('Basque'),
      'be_BY' => t('Belarusian'),
      'bn_IN' => t('Bengali'),
      'bs_BA' => t('Bosnian'),
      'bg_BG' => t('Bulgarian'),
      'ck_US' => t('Cherokee'),
      'hr_HR' => t('Croatian'),
      'cs_CZ' => t('Czech'),
      'da_DK' => t('Danish'),
      'nl_NL' => t('Dutch'),
      'nl_BE' => t('Dutch (Belgie)'),
      'af_ZA' => t('Afrikaans'),
      'en_PI' => t('English (Pirate)'),
      'en_GB' => t('English (UK)'),
      'en_US' => t('English (US)'),
      'en_UD' => t('English (Upside Down)'),
      'eo_EO' => t('Esperanto'),
      'et_EE' => t('Estonian'),
      'fo_FO' => t('Faroese'),
      'tl_PH' => t('Filipino'),
      'fi_FI' => t('Finnish'),
      'fr_CA' => t('French (Canada)'),
      'fr_FR' => t('French (France)'),
      'gl_ES' => t('Galician'),
      'ka_GE' => t('Georgian'),
      'de_DE' => t('German'),
      'el_GR' => t('Greek'),
      'gu_IN' => t('Gujarati'),
      'he_IL' => t('Hebrew'),
      'hi_IN' => t('Hindi'),
      'hu_HU' => t('Hungarian'),
      'is_IS' => t('Icelandic'),
      'id_ID' => t('Indonesian'),
      'ga_IE' => t('Irish'),
      'it_IT' => t('Italian'),
      'ja_JP' => t('Japanese'),
      'jv_ID' => t('Javanese'),
      'kn_IN' => t('Kannada'),
      'km_KH' => t('Khmer'),
      'ko_KR' => t('Korean'),
      'ku_TR' => t('Kurdish'),
      'la_VA' => t('Latin'),
      'lv_LV' => t('Latvian'),
      'fb_LT' => t('Leet Speak'),
      'lt_LT' => t('Lithuanian'),
      'mk_MK' => t('Macedonian'),
      'mg_MG' => t('Malagasy'),
      'ms_MY' => t('Malay'),
      'ml_IN' => t('Malayalam'),
      'mn_MN' => t('Mongolian'),
      'ne_NP' => t('Nepali'),
      'se_NO' => t('Northern Sami'),
      'nb_NO' => t('Norwegian (bokmal)'),
      'nn_NO' => t('Norwegian (nynorsk)'),
      'ps_AF' => t('Pashto'),
      'fa_IR' => t('Persian'),
      'pl_PL' => t('Polish'),
      'pt_BR' => t('Portuguese (Brazil)'),
      'pt_PT' => t('Portuguese (Portugal)'),
      'pa_IN' => t('Punjabi'),
      'ro_RO' => t('Romanian'),
      'rm_CH' => t('Romansh'),
      'ru_RU' => t('Russian'),
      'sr_RS' => t('Serbian'),
      'zh_CN' => t('Simplified Chinese (China)'),
      'sk_SK' => t('Slovak'),
      'sl_SI' => t('Slovenian'),
      'es_CL' => t('Spanish (Chile)'),
      'es_CO' => t('Spanish (Colombia)'),
      'es_MX' => t('Spanish (Mexico)'),
      'es_ES' => t('Spanish (Spain)'),
      'es_VE' => t('Spanish (Venezuela)'),
      'sw_KE' => t('Swahili'),
      'sv_SE' => t('Swedish'),
      'sy_SY' => t('Syriac'),
      'ta_IN' => t('Tamil'),
      'te_IN' => t('Telugu'),
      'th_TH' => t('Thai'),
      'zh_HK' => t('Traditional Chinese (Hong Kong)'),
      'zh_TW' => t('Traditional Chinese (Taiwan)'),
      'tr_TR' => t('Turkish'),
      'uk_UA' => t('Ukrainian'),
      'vi_VN' => t('Vietnamese'),
      'cy_GB' => t('Welsh'),
      'xh_ZA' => t('Xhosa'),
      'yi_DE' => t('Yiddish'),
    ),
    '#suffix' => '</div>',
  );
  drupal_add_js(drupal_get_path('module', 'spider_facebook') . '/js/spider_facebook_iframe.js');
  if ($articles == '') {
    drupal_add_js('document.getElementById("art_tables").style.display = "none";', array('type' => 'inline', 'scope' => 'footer'));
  }
  // Default image for Contents.
  $form['def_img_art'] = array(
    '#prefix' => '
    <div id="def_img_art_tr">
      <div id="image_iframe" style="position:fixed; width:100%; height:100%; top:50px; left:0; display:none">
        <div id="div_black" style="position:fixed; top:0; left:0; width:100%; height:100%; background-color:#000000; opacity:0.80; z-index:10000000;"></div>
        <div id="div_content" style="position:relative; top:50px; width:570px; height:500px; margin:0 auto;z-index:10000001;background-color:#FFFFFF;">
          <iframe width="570" height="500" src="' . url('admin/settings/spider_facebook/image_upload', array('query' => array('iframe_id' => 'image_iframe', 'thumb_id' => 'imagebox', 'url_id' => 'thumb'), 'absolute' => TRUE)) . '"></iframe>
        </div>
        <div onclick=\'spider_facebook_image_upload("image_iframe", "none")\' style=\'position:fixed; z-index:10000002; right:20%; top:100px; width:32px; height:32px; background-image:url("' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/close1.png"); \'></div>
      </div>
      <br />
      <strong>' . t('Default image for Contents') . '</strong>
      <br />',
    '#type' => 'link',
    '#href' => '',
    '#title' => t('Select Image'),
    '#attributes' => array('onclick' => 'spider_facebook_image_upload("image_iframe", "");return false;'),
  );
  $form['def_img_art_hidden'] = array(
    '#type' => 'hidden',
    '#value' => $def_img_art,
    '#attributes' => array('id' => 'thumb'),
  );
  $form['def_img_art_remove'] = array(
    '#prefix' => '<br />',
    '#type' => 'link',
    '#href' => '',
    '#title' => t('Remove Image'),
    '#attributes' => array('onclick' => 'spider_facebook_remove_image("imagebox", "thumb"); return false;'),
    '#suffix' => '<br /><img id="imagebox" ' . (($def_img_art != '') ? 'height="30" src="' . $def_img_art . '"' : '') . '/><br />
    </div>',
  );
  // Add a post.
  $form['add_post_button'] = array(
    '#prefix' => '
    <div id="add_article">
      <div id="preview_iframe"></div><label><strong>' . t('Contents') . '</strong></label>',
    '#description' => t('The following META tags allow specifying how the chosen post will look when published on the user`s wall.'),
    '#type' => 'image_button',
    '#src' => base_path() . drupal_get_path('module', 'spider_facebook') . '/images/add_but.png',
    '#attributes' => array('onclick' => 'spider_facebook_iframe("preview_iframe", "' . url('admin/settings/spider_facebook/add_post', array('absolute' => TRUE)) . '", "' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/close1.png"); return false;'),
  );
  // Remove button standart class.
  drupal_add_js('if(document.getElementById("edit-add-post-button")){document.getElementById("edit-add-post-button").className = ""}', array('type' => 'inline', 'scope' => 'footer'));
  $content_ids = explode(',', $articles);
  $meta_titles = explode('***', $meta_title);
  $meta_types = explode('***', $meta_type);
  $meta_urls = explode('***', $meta_url);
  $meta_images = explode('***', $meta_image);
  $meta_site_names = explode('***', $meta_site_name);
  $meta_descriptions = explode('***', $meta_description);
  $meta_adminss = explode('***', $meta_admins);
  $select_type_options = array(
    "Chose a type" => t('Chose a type'),
    "activity" => t('activity'),
    "actor" => t('actor'),
    "album" => t('album'),
    "article" => t('article'),
    "athlete" => t('athlete'),
    "author" => t('author'),
    "band" => t('band'),
    "bar" => t('bar'),
    "blog" => t('blog'),
    "book" => t('book'),
    "cafe" => t('cafe'),
    "cause" => t('cause'),
    "city" => t('city'),
    "company" => t('company'),
    "country" => t('country'),
    "director" => t('director'),
    "drink" => t('drink'),
    "food" => t('food'),
    "game" => t('game'),
    "government" => t('government'),
    "hotel" => t('hotel'),
    "landmark" => t('landmark'),
    "movie" => t('movie'),
    "musician" => t('musician'),
    "non_profit" => t('non_profit'),
    "politician" => t('politician'),
    "product" => t('product'),
    "public_figure" => t('public_figure'),
    "restaurant" => t('restaurant'),
    "school" => t('school'),
    "song" => t('song'),
    "sport" => t('sport'),
    "sports_league" => t('sports_league'),
    "sports_team" => t('sports_team'),
    "state_province" => t('state_province'),
    "tv_show" => t('tv_show'),
    "university" => t('university'),
    "website" => t('website'),
  );
  $contents_list = '
    <div id="art_tables">
    <div id="art_table_meta">
    <p><b>' . t('If you have changed META, please debug your URL in') . '</b> ' . l(t('Facebook Debugger'), 'https://developers.facebook.com/tools/debug/', array('attributes' => array('target' => '_blank'))) . '
    <p>' . t('The following META tags allow you to customize the appearance of the chosen item on the user`s wall') . '</p>
    <table class="hasTable" width="100%">
      <thead class="hasTable" id="th_art_meta" style="border-collapse: separate;">
        <tr class="hasTable">
          <th style="width:12%;border-style:solid;border-width:2px;text-align:center;">' . t('CONTENT') . '</th>
          <th style="width:12%;border-style:solid;border-width:2px;text-align:center;" class="hasTip" title="' . t('The title of the item') . '">' . t('TITLE') . '</th>
          <th style="width:12%;border-style:solid;border-width:2px;text-align:center;" class="hasTip" title="' . t('The source websitewill be categorized by the chosen type') . '">' . t('TYPE') . '</th>
          <th style="width:12%;border-style:solid;border-width:2px;text-align:center;" class="hasTip" title="' . t('For providing a canonical address for the page') . '">' . t('URL') . '</th>
          <th style="width:12%;border-style:solid;border-width:2px;text-align:center;" class="hasTip" title="' . t('The image accompanying the published item') . '">' . t('IMAGE') . '</th>
          <th style="width:12%;border-style:solid;border-width:2px;text-align:center;" class="hasTip" title="' . t('For specifying a name for your website') . '">' . t('SITE NAME') . '</th>
          <th style="width:12%;border-style:solid;border-width:2px;text-align:center;" class="hasTip" title="' . t('For providing a description for the item') . '">' . t('DESCRIPTION') . '</th>
          <th style="width:12%;border-style:solid;border-width:2px;text-align:center;" class="hasTip" title="' . t('You can fill out the Admin ID of your Facebook page to connect the post to the page') . '">' . t('ADMIN ID') . '</th>
          <th style="text-align:center;"><img style="cursor:pointer" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/close.png" onclick="spider_facebook_remove_all(\'Contents\')"/></th>
        </tr>
      </thead>
      <tbody id="meta">';
  // If selected content exists.
  foreach ($content_ids as $key => $content_id) {
    if (($content_id != '') && ($content_id != ',') && ($content_id != 'all')) {
      $title = db_query("SELECT title FROM {node} WHERE nid=:nid", array(':nid' => $content_id))->fetchField();
      $contents_list .= '
        <tr id="m' . $key . '" plug_id="' . $content_id . '">
          <td id="info_' . $key . '" style="width:12%;text-align:center;padding:0;">
            <b style="width:90%;">' . $title . '</b>
          </td>
          <td id="title_' . $key . '" style="width:12%;text-align:center;padding:0;">
            <input id="' . $content_id . '_title" type="text" value="' . $meta_titles[$key] . '" style="width:90%;">
          </td>
          <td id="type_' . $key . '" style="width:12%;text-align:center;padding:0;">
            <select id="' . $content_id . '_type" class="form-select" style="width:90%;">';
      foreach ($select_type_options as $key1 => $select_type_option) {
        $contents_list .= '
              <option value="' . $key1 . '" ' . (($key1 == $meta_types[$key]) ?  'SELECTED' : '') . '>' . $select_type_option . '</option>';
      }
      $contents_list .= '
            </select>
          </td>
          <td id="url_' . $key . '" style="width:12%;text-align:center;padding:0;">
            <input id="' . $content_id . '_url" type="text" value="' . $meta_urls[$key] . '" style="width:90%;">
          </td>
          <td id="image_' . $key . '" style="width:12%;text-align:center;padding:0;">
            <input id="' . $content_id . '_image" type="text" value="' . $meta_images[$key] . '" style="width:90%;">
          </td>
          <td id="site_name_' . $key . '" style="width:12%;text-align:center;padding:0;">
            <input id="' . $content_id . '_site_name" type="text" value="' . $meta_site_names[$key] . '" style="width:90%;">
          </td>
          <td id="description_' . $key . '" style="width:12%;text-align:center;padding:0;">
            <input id="' . $content_id . '_description" type="text" value="' . $meta_descriptions[$key] . '" style="width:90%;">
          </td>
          <td id="admins_' . $key . '" style="width:12%;text-align:center;padding:0;">
            <input id="' . $content_id . '_admins" type="text" value="' . $meta_adminss[$key] . '" style="width:90%;">
          </td>
          <td id="X_' . $key . '" valign="middle" style="width:50px;text-align:center;border:none;">
            <img onclick="spider_facebook_remove_content_row(' . $key . ')" style="cursor:pointer;" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/delete.png">
          </td>
        </tr>';
    }
  }
  $contents_list .= '
      </tbody>
    </table>
    </div>
    <table class="hasTable" id="art_table" width="30%">
      <thead id="th_art">
        <tr>
          <th style="border-style:solid;border-width:2px;width:50%">' . t('CONTENT') . '</th>
          <th><img style="margin-left:10px;cursor:pointer;" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/close.png" onclick="spider_facebook_remove_all(\'Contents\')"/></th>
        </tr>
      </thead>
      <tbody id="only_titles">';
  foreach ($content_ids as $key => $content_id) {
    if (($content_id != '') && ($content_id != ',') && ($content_id != 'all')) {
      $title = db_query("SELECT title FROM {node} WHERE nid=:nid", array(':nid' => $content_id))->fetchField();
      $contents_list .= '
          <tr id="t' . $key . '" plug_id="' . $content_id . '">
            <td id="info1_' . $key . '" style="width:50%;padding:0;">
              <b style="width:90%;">' . $title . '</b>
            </td>
            <td id="X1_' . $key . '" valign="middle" style="width:50px;border:none;">
              <img onclick="spider_facebook_remove_content_row(' . $key . ')" style="margin:10px;cursor:pointer;" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/delete.png">
            </td>';
    }
  }
  $contents_list .= '
      </tbody>
    </table>
    </div>
    <input type="hidden" name="meta_title" id="meta_title"/>
    <input type="hidden" name="meta_type" id="meta_type"/>
    <input type="hidden" name="meta_url" id="meta_url"/>
    <input type="hidden" name="meta_image" id="meta_image"/>
    <input type="hidden" name="meta_site_name" id="meta_site_name"/>
    <input type="hidden" name="meta_description" id="meta_description"/>
    <input type="hidden" name="meta_admins" id="meta_admins"/>
    <input type="hidden" name="articles" id="articles" value="' . $articles . '"/>';
  $form['place'] = array(
    '#prefix' => $contents_list . '</div><div id="place">',
    '#type' => 'select',
    '#title' => t('Vertical position'),
    '#description' => t('Choose whether to place the plugin at the top or at the bottom of the content.'),
    '#default_value' => $place,
    '#options' => array(
      'top' => t('Top'),
      'bottom' => t('Bottom'),
    ),
    '#suffix' => '</div>',
  );
  $form['css'] = array(
    '#prefix' => '<div id="css" style="width:300px;">',
    '#type' => 'textarea',
    '#title' => t('Style'),
    '#description' => t('You can provide a custom Style for the plugin container.'),
    '#default_value' => $css,
    '#rows' => 8,
    '#resizable' => FALSE,
    '#suffix' => '</div>',
  );
  $form['html_tag'] = array(
    '#prefix' => '<div id="html_tag" style="width:300px;">',
    '#type' => 'textarea',
    '#title' => t('Add to &lt;html&gt; tag'),
    '#description' => t('Add by yourself code from this field into &lt;html&gt; tag of your template(file:themes/your_theme/page.tpl.php).'),
    '#default_value' => 'xmlns:og="http://ogp.me/ns#"
xmlns:fb="http://www.facebook.com/2008/fbml"',
    '#rows' => 2,
    '#resizable' => FALSE,
    '#attributes' => array('readonly' => 'readonly'),
    '#suffix' => '</div></div>',
  );
  $form['preview'] = array(
    '#prefix' => '
    <div style="float:right;width:25%">
      <div align="center" id="likebutton_prev" class="preview">
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/like_standard.png"/>
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/like_button_count.png"/>
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/like_box_count.png"/>
      </div>
      <div align="center" id="sendbutton_prev" class="preview">
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/send_prev_1.png"/>
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/send_prev_2.png"/>
      </div>
      <div align="center" id="comment_prev" class="preview">
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/comment_prev_1.png"/>
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/comment_prev_2.png"/>
      </div>
      <div align="center" id="like_box_prev" class="preview">
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/likebox_prev_1.png"/>
      </div>
      <div align="center" id="follow_prev" class="preview">
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/follow_prev_1.png"/>
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/follow_prev_2.png"/>
      </div>
      <div align="center" id="request_prev" class="preview">
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/request_prev_1.png"/>
      </div>
      <div align="center" id="recommendation_prev" class="preview">
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/recommendation_prev_1.png"/>
      </div>
      <div align="center" id="activity_feed_prev" class="preview">
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/activity_feed_prev_1.png"/>
      </div>
      <div align="center" id="facepile_prev" class="preview">
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/facepile_prev_1.png"/>
      </div>
      <div align="center" id="share_prev" class="preview">
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/share_prev_1.png"/><br>
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/share_prev_2.png"/><br>
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/share_prev_3.png"/><br>
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/share_prev_4.png"/>
      </div>
      <div align="center" id="login_prev" class="preview">
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/login_prev_1.png"/><br>
      </div>
      <div align="center" id="register_prev" class="preview">
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/register_prev_1.png"/><br>
      </div>
      <div align="center" id="social_prev" class="preview">
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/social_prev_2.png"/>
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/social_prev_3.png"/>
        <img style="padding-top:50px" src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/social_prev_1.png"/>
      </div>
    </div>
    <input type="hidden" name="option" value="com_spiderfacebook"/>
    <input type="hidden" name="id" value="' . $id . '"/>
    <input type="hidden" name="task" value=""/>
    <input type="hidden" id="type" name="type" value="' . $type . '"/>
    <input type="hidden" id="render" name="render" value="' . $render . '"/>
    <input type="hidden" id="url_change" value="' . $url_type . '"/>
    <input type="hidden" id="lang_change" value="' . $lang_type . '"/>',
  );
  $form['save'] = array(
    '#prefix' => '<div style="float:right;width:100%">',
    '#type' => 'submit',
    '#value' => t('Save'),
    '#submit' => array('spider_facebook_save'),
    '#attributes' => array('onclick' => 'spider_facebook_on_save(); return spider_facebook_check_required("edit-title");'),
  );
  $form['apply'] = array(
    '#type' => 'submit',
    '#value' => t('Apply'),
    '#submit' => array('spider_facebook_save'),
    '#attributes' => array('onclick' => 'spider_facebook_on_save(); return spider_facebook_check_required("edit-title");'),
  );
  $form['playlist_cancel'] = array(
    '#type' => 'submit',
    '#value' => t('Cancel'),
    '#attributes' => array('onclick' => 'document.getElementById("edit-title").setAttribute("style", "color:rgba(255, 0, 0, 0)");document.getElementById("edit-title").setAttribute("value", "cancel");document.getElementById("edit-req-m").setAttribute("value", "cancel");'),
    '#submit' => array('spider_facebook_cancel'),
    '#suffix' => '</div>',
  );
  return $form;
}

/**
 * Save item.
 */
function spider_facebook_save($form, &$form_state) {
  $title = $form_state['values']['title'];
  $published = $form_state['values']['published'];
  $type = ((isset($_POST['type'])) ? check_plain($_POST['type']) : '');
  $width = $form_state['values']['width'];
  $url_type = $form_state['values']['url_type'];
  if ($url_type == 'normal') {
    $url = $form_state['values']['url'];
  }
  else {
    $url = 'autoSITEURLauto';
  }
  $colorsc = $form_state['values']['colorsc'];
  $render = ((isset($_POST['render'])) ? check_plain($_POST['render']) : '');
  $backg = $form_state['values']['backg'];
  $action = $form_state['values']['action'];
  $send = $form_state['values']['send'];
  $face = $form_state['values']['face'];
  $layout = $form_state['values']['layout'];
  $font = $form_state['values']['font'];
  $lang = $form_state['values']['lang'];
  $height = $form_state['values']['height'];
  $post = $form_state['values']['post'];
  $rows = $form_state['values']['rows'];
  $domain = $form_state['values']['domain'];
  $appid = $form_state['values']['appid'];
  $head = $form_state['values']['head'];
  $recom = $form_state['values']['recom'];
  $target = $form_state['values']['target'];
  $stream = $form_state['values']['stream'];
  $size = $form_state['values']['size'];
  $bord = $form_state['values']['bord'];
  $share_type = $form_state['values']['share_type'];
  $request_type = $form_state['values']['request_type'];
  $place = $form_state['values']['place'];
  $twit = $form_state['values']['twit'];
  $articles = ((isset($_POST['articles'])) ? check_plain($_POST['articles']) : '');
  $meta_title = ((isset($_POST['meta_title'])) ? check_plain($_POST['meta_title']) : '');
  $meta_type = ((isset($_POST['meta_type'])) ? check_plain($_POST['meta_type']) : '');
  $meta_url = ((isset($_POST['meta_url'])) ? check_plain($_POST['meta_url']) : '');
  $meta_image = ((isset($_POST['meta_image'])) ? check_plain($_POST['meta_image']) : '');
  $meta_site_name = ((isset($_POST['meta_site_name'])) ? check_plain($_POST['meta_site_name']) : '');
  $meta_description = ((isset($_POST['meta_description'])) ? check_plain($_POST['meta_description']) : '');
  $meta_admins = ((isset($_POST['meta_admins'])) ? check_plain($_POST['meta_admins']) : '');
  $css = $form_state['values']['css'];
  $def_img_art = ((isset($_POST['def_img_art_hidden'])) ? check_plain($_POST['def_img_art_hidden']) : '');
  $fb_only = $form_state['values']['fb_only'];
  $reg_type = $form_state['values']['reg_type'];
  $reg_red = $form_state['values']['reg_red'];
  $log_red = $form_state['values']['log_red'];
  $url_value = $form_state['values']['url_value'];
  $lang_type = $form_state['values']['lang_type'];
  if ($lang_type == 'auto') {
    $lang = 'autoLANGauto';
  }
  $req_m = $form_state['values']['req_m'];
  $count_mode = $form_state['values']['count_mode'];
  $hor_place = $form_state['values']['hor_place'];
  // Parameters for block.
  if ($place == 'top') {
    $weight = -50;
  }
  else {
    $weight = 50;
  }
  if ($articles == '' || $articles == ',') {
    $block_region = '';
    $block_status = 0;
    $block_visibility = 0;
    $block_pages = '';
  }
  elseif ($articles == 'all') {
    $block_region = 'content';
    $block_status = 1;
    $block_visibility = 0;
    $block_pages = '';
  }
  else {
    $block_region = 'content';
    $block_status = 1;
    $block_visibility = 1;
    $nodeids = explode(',', $articles);
    $block_pages = '';
    foreach ($nodeids as $nodeid) {
      if ($nodeid != '' && $nodeid != ',') {
        $block_pages .= 'node/' . $nodeid . '
';
      }
    }
  }
  switch ($type) {
    case 'socials':
      switch ($count_mode) {
        case 'vertical' :
          $linkedin = '
            <script src="//platform.linkedin.com/in.js" type="text/javascript"></script>
            <script type="IN/Share" data-counter="top" data-url="' . $url . '"></script>';
          $twitter = '
            <a href="https://twitter.com/share" class="twitter-share-button" data-url="' . $url . '" data-lang="' . $lang . '" data-related="anywhereTheJavascriptAPI" data-count="vertical">Tweet</a>
            <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>';
          $googleplus = "
            <!-- Place this tag where you want the +1 button to render. -->
            <div class='g-plusone' data-size='tall' data-href='" . $url . "'></div>
            <!-- Place this tag after the last +1 button tag. -->
            <script type='text/javascript'>
              (function() {
                var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
                po.src = 'https://apis.google.com/js/plusone.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
              })();
            </script>";
          $facebook = '
            <div id="fb-root"  style="display:inline-block;"></div>
            <script>
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, "script", "facebook-jssdk"));
            </script>
            <fb:like send="false" layout="box_count" width="450" show_faces="false" href="' . $url . '" ></fb:like>';
          break;

        case 'horizontal' :
          $linkedin = '
            <script src="//platform.linkedin.com/in.js" type="text/javascript"></script>
            <script type="IN/Share" data-counter="right" data-url="' . $url . '"></script>';
          $twitter = '
            <div style="width:85px"><a href="https://twitter.com/share" class="twitter-share-button" data-url="' . $url . '" data-lang="' . $lang . '" data-related="anywhereTheJavascriptAPI">Tweet</a>
            <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script></div>';
          $googleplus = "
            <div style='width:65px'><!-- Place this tag where you want the +1 button to render. -->
              <div class='g-plusone' data-size='medium' data-href='" . $url . "'></div>
              <!-- Place this tag after the last +1 button tag. -->
              <script type='text/javascript'>
                (function() {
                  var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
                  po.src = 'https://apis.google.com/js/plusone.js';
                  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
                })();
              </script>
            </div>";
          $facebook = '
            <div id="fb-root"  style="display:inline-block;"></div>
            <script>
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, "script", "facebook-jssdk"));
            </script>
            <fb:like send="false" layout="button_count" width="450" show_faces="false" href="' . $url . '" ></fb:like>';
          break;

        case 'none':
          $linkedin = '
            <script src="//platform.linkedin.com/in.js" type="text/javascript"></script>
            <script type="IN/Share" data-url="' . $url . '"></script>';
          $twitter = '
            <a href="https://twitter.com/share" class="twitter-share-button" data-url="' . $url . '" data-lang="' . $lang . '" data-related="anywhereTheJavascriptAPI" data-count="none">Tweet</a>
            <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>';
          $googleplus = "
            <!-- Place this tag where you want the +1 button to render. -->
            <div class='g-plusone'  data-annotation='none' data-href='" . $url . "'></div>
            <!-- Place this tag after the last +1 button tag. -->
            <script type='text/javascript'>
              (function() {
                var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
                po.src = 'https://apis.google.com/js/plusone.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
              })();
            </script>";
          $facebook = '
            <div id="fb-root"  style="display:inline-block;"></div>
            <script>
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, "script", "facebook-jssdk"));
            </script>
            <fb:like send="false" layout="standard" width="450" show_faces="false" href="' . $url . '" ></fb:like>';
          break;
      }
      if ($hor_place == "left") {
        $code = '
          <div style="' . $css . '">
            <div style="float:left">' . $linkedin . '</div>
            <div style="margin-left:5px;float:left">' . $twitter . '</div>
            <div style="margin-left:5px;float:left">' . $googleplus . '</div>
            <div style="margin-left:5px;float:left">' . $facebook . '</div>
          </div>
          <div style="clear:left"></div>';
      }
      else {
        $code = '
          <div style="' . $css . '">
            <div style="float:right">' . $facebook . '</div>
            <div style="margin-right:5px;float:right">' . $googleplus . '</div>
            <div style="margin-right:5px;float:right">' . $twitter . '</div>
            <div style="margin-right:5px;float:right">' . $linkedin . '</div>
          </div>
          <div style="clear:right"></div>';
      }
      break;

    case 'sendbutton':
      if ($render == 1) {
        $code = '
          <div id="fb-root"></div>
          <script>
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, "script", "facebook-jssdk"));
          </script>
          <div style="float:left;margin-right: 20px;" class="fb-send" data-href="' . $url . '" data-font="' . $font . '" data-colorscheme="' . $colorsc . '"></div>';
      }
      else {
        $code = '
          <div id="fb-root"></div>
          <script>
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, "script", "facebook-jssdk"));
          </script>
          <fb:send href="' . $url . '" font="' . $font . '"  colorscheme="' . $colorsc . '"></fb:send>';
      }
      break;

    case 'likebutton':
      switch ($render) {
        case 1:
          $code = '
            <div id="fb-root"></div>
            <script>
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, "script", "facebook-jssdk"));
            </script>
            <div class="fb-like" data-font="' . $font . '" data-href="' . $url . '"  data-action="' . $action . '" data-layout="' . $layout . '" data-send="' . $send . '"  data-colorscheme="' . $colorsc . '" data-width="' . $width . '"  data-show-faces="' . $face . '"  style="background:#' . $backg . ';' . $css . '"></div>';
          break;

        case 2:
          $code = '
            <div id="fb-root"></div>
            <script>
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, "script", "facebook-jssdk"));
            </script>
            <fb:like href="' . $url . '" font="' . $font . '" action="' . $action . '" layout="' . $layout . '" send="' . $send . '" width="' . $width . '"  colorscheme="' . $colorsc . '" show_faces="' . $face . '"  style="background:#' . $backg . ';' . $css . '"></fb:like>';
          break;

        case 3:
          $encodedurl = urlencode($url);
          $code = "
            <iframe src=\"//www.facebook.com/plugins/like.php?href=" . $encodedurl . "&amp;send=false&amp;layout=" . $layout . "&amp;width=" . $width . "&amp;height=21&amp;colorscheme=" . $colorsc . "&amp;font=" . $font . "&amp;show_faces=" . $face . "&amp;action=" . $action . "\" scrolling=\"no\" frameborder=" . $bord . " style=\" background-color:#" . $backg . "; overflow:hidden; width:" . $width . "px; height:" . $height . "px;" . $css . "\" allowTransparency=\"true\"></iframe>";
          break;

        case 4:
          $encodedurl = urlencode($url);
          $code = "
            <a href=\"//www.facebook.com/plugins/like.php?href=" . $encodedurl . "&width=" . $width . "&send=false&colorscheme=" . $colorsc . "&layout=" . $layout . "&font=" . $font . "&height=21&action=" . $action . "\" target=\"" . $target . "\">" . $url_value . "</a>";
          break;
      }
      break;
    case 'comment':
      if ($render == 1) {
        $code = '
          <div id="fb-root"></div>
          <script>
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, "script", "facebook-jssdk"));
          </script>
          <div class="fb-comments" data-href="' . $url . '" data-num-posts="' . $post . '" data-colorscheme="' . $colorsc . '" data-width="' . $width . '" data-font="' . $font . '" data-height="' . $height . '" style="background:#' . $backg . ';' . $css . '"></div>';
      }
      else {
        $code = '
          <div id="fb-root"></div>
          <script>
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, "script", "facebook-jssdk"));
          </script>
          <fb:comments href="' . $url . '" font="' . $font . '" num_posts="' . $post . '" width="' . $width . '" height="' . $height . '" colorscheme="' . $colorsc . '"  style="background:#' . $backg . ';' . $css . '"></fb:comments>';
      }
      break;

    case 'loginbutton':
      if ($render == 1) {
        $code = '
          <div id="fb-root"></div>
          <script>
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1&appId=' . $appid . '";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, "script", "facebook-jssdk"));
          </script>
          <div class="fb-login-button" data-font="' . $font . '"  data-width="' . $width . '"  data-colorscheme="' . $colorsc . '" data-show-faces="' . $face . '"  data-max-rows="' . $rows . '" style="background:#' . $backg . '";' . $css . '></div>';
      }
      else {
        $code = '
          <div id="fb-root"></div>
          <script>
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1&appId=' . $appid . '";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, "script", "facebook-jssdk"));
          </script>
          <fb:login-button font="' . $font . '"  width="' . $width . '" colorscheme="' . $colorsc . '" max-rows="' . $rows . '" show_faces="' . $face . '"  style="background:#' . $backg . ';' . $css . '"></fb:login-button>';
      }
      break;

    case 'actfeed':
      if ($render == 1) {
        $code = '
          <div id="fb-root"></div>
          <script>
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, "script", "acebook-jssdk"));
          </script>
          <div class="fb-activity" data-site="' . $domain . '" data-action="' . $action . '" data-width="' . $width . '" data-height="' . $height . '" data-header="' . $head . '" data-colorscheme="' . $colorsc . '" data-linktarget="' . $target . '" data-font="' . $font . '" data-recommendations="' . $recom . '" style="background:#' . $backg . ';' . $css . '"></div>';
      }
      else {
        $code = '
          <div id="fb-root"></div>
          <script>
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, "script", "facebook-jssdk"));
          </script>
          <fb:activity site="' . $domain . '" action="' . $action . '" width="' . $width . '" height="' . $height . '" header="' . $head . '" colorscheme="' . $colorsc . '" linktarget="' . $target . '" font="' . $font . '" recommendations="' . $recom . '" style="background:#' . $backg . ';' . $css . '"></fb:activity>';
      }
      break;

    case 'recommendation':
      if ($render == 1) {
        $code = '
          <div id="fb-root"></div>
          <script>
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, "script", "facebook-jssdk"));
          </script>
          <div class="fb-recommendations" data-site="' . $domain . '" data-action="' . $action . '" data-width="' . $width . '" data-height="' . $height . '" data-header="' . $head . '" data-colorscheme="' . $colorsc . '" data-linktarget="' . $target . '" data-font="' . $font . '" data-recommendations="' . $recom . '" style="background:#' . $backg . ';' . $css . '"></div>';
      }
      else {
        $code = '
          <div id="fb-root"></div>
          <script>
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, "script", "facebook-jssdk"));
          </script>
          <fb:recommendations site="' . $domain . '" action="' . $action . '" width="' . $width . '" height="' . $height . '" header="' . $head . '" colorscheme="' . $colorsc . '" linktarget="' . $target . '" font="' . $font . '" recommendations="' . $recom . '" style="background:#' . $backg . ';' . $css . '"></fb:recommendations>';
      }
      break;

    case 'facepile':
      switch ($render) {
        case 1:
          $code = '
            <div id="fb-root"></div>
            <script>
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, "script", "facebook-jssdk"));
            </script>
            <div class="fb-facepile" data-href="' . $url . '" data-size="' . $size . '" data-action="' . $action . '"  data-font="' . $font . '" data-width="' . $width . '"  data-max-rows="' . $rows . '" data-colorscheme="' . $colorsc . '"  style="background:#' . $backg . ';' . $css . '"></div>';
          break;

        case 2:
          $code = '
            <div id="fb-root"></div>
            <script>
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, "script", "facebook-jssdk"));
            </script>
            <fb:facepile href="' . $url . '" size="' . $size . '" action="' . $action . '" font="' . $font . '" width="' . $width . '"  max-rows="' . $rows . '" colorscheme="' . $colorsc . '"  style="background:#' . $backg . ';"></fb:facepile>';
          break;

        case 3:
          $encodedurl = urlencode($url);
          $code = "<iframe src=\"//www.facebook.com/plugins/facepile.php?href=" . $encodedurl . "&amp;width=" . $width . "&amp;colorscheme=" . $colorsc . "&amp;max_rows=" . $rows . "&amp;action=" . $action . "&amp;size=" . $size . "\" scrolling=\"no\" frameborder=" . $bord . " style=\" background-color:#" . $backg . "; overflow:hidden; width:" . $width . "px; height:" . $height . "px;" . $css . "\" allowTransparency=\"true\"></iframe>";
          break;

        case 4:
          $encodedurl = urlencode($url);
          $code = "<a href=\"//www.facebook.com/plugins/facepile.php?href=" . $encodedurl . "&width=" . $width . "&colorscheme=" . $colorsc . "&max_rows=" . $rows . "&action=" . $action . "&size=" . $size . "\" target=\"" . $target . "\">" . $url_value . "</a>";
          break;
      }
      break;

    case 'follow':
      switch ($render) {
        case 1:
          $code = '
            <div id="fb-root"></div>
            <script>
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, "script", "facebook-jssdk"));
            </script>
            <div class="fb-follow" data-href="' . $url . '" data-layout="' . $layout . '" data-colorscheme="' . $colorsc . '" data-show-faces="' . $face . '" data-font="' . $font . '" data-width="' . $width . '" style="background:#' . $backg . ';' . $css . '"></div>';
          break;

        case 2:
          $code = '
            <div id="fb-root"></div>
            <script>
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, "script", "facebook-jssdk"));
            </script>
            <fb:follow href="' . $url . '" layout="' . $layout . '" colorscheme="' . $colorsc . '" show_faces="' . $face . '" font="' . $font . '" width="' . $width . '" style="background:#' . $backg . ';' . $css . '"></fb:follow>';
          break;

        case 3:
          $encodedurl = urlencode($url);
          $code = "
            <iframe src=\"//www.facebook.com/plugins/follow.php?href=" . $encodedurl . "&amp;width=" . $width . "&amp;colorscheme=" . $colorsc . "&amp;show_faces=" . $face . "&amp;\" scrolling=\"no\" frameborder=" . $bord . " style=\" background-color:#" . $backg . "; overflow:hidden; width:" . $width . "px;" . $css . "\"  allowTransparency=\"true\"></iframe>";
          break;

        case 4:
          $encodedurl = urlencode($url);
          $code = "
            <a href=\"//www.facebook.com/plugins/follow.php?href=" . $encodedurl . "&width=" . $width . "&colorscheme=" . $colorsc . "&show_faces=" . $face . "&\" target=\"" . $target . "\">" . $url_value . "</a>";
          break;
      }
      break;

    case 'likebox':
      switch ($render) {
        case 1:
          $code = '
            <div id="fb-root"></div>
            <script>
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, "script", "facebook-jssdk"));
            </script>
            <div class="fb-like-box" data-href="' . $url . '" data-font="' . $font . '"  data-width="' . $width . '" data-height="' . $height . '" data-colorscheme="' . $colorsc . '" data-show-faces="' . $face . '" data-stream="' . $stream . '" data-header="' . $head . '" style="background:#' . $backg . ';' . $css . '"></div>';
          break;

        case 2:
          $code = '
            <div id="fb-root"></div>
            <script>
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, "script", "facebook-jssdk"));
            </script>
            <fb:like-box href="' . $url . '" font="' . $font . '" width="' . $width . '" height="' . $height . '" colorscheme="' . $colorsc . '" show_faces="' . $face . '" stream="' . $stream . '" header="' . $head . '" style="background:#' . $backg . ';' . $css . '"></fb:like-box>';
          break;

        case 3:
          $encodedurl = urlencode($url);
          $code = "<iframe src=\"//www.facebook.com/plugins/likebox.php?href=" . $encodedurl . "&amp;width=" . $width . "&amp;colorscheme=" . $colorsc . "&amp;show_faces=" . $face . "&amp;stream=" . $stream . "&amp;header=" . $head . "&amp;height=" . $height . "\" scrolling=\"no\" frameborder=" . $bord . " style=\" background-color:#" . $backg . "; overflow:hidden; width:" . $width . "px; height:" . $height . "px;" . $css . "\" allowTransparency=\"true\"></iframe>";
          break;

        case 4:
          $encodedurl = urlencode($url);
          $code = "<a href=\"//www.facebook.com/plugins/likebox.php?href=" . $encodedurl . "&width=" . $width . "&height=" . $height . "&colorscheme=" . $colorsc . "&show_faces=" . $face . "&stream=" . $stream . "&header=" . $head . "\" target=\"" . $target . "\">" . $url_value . "</a>";
          break;
      }
      break;

    case 'pagetab':
      $code = "
        <div id='fb-root'></div>
        <script src='http://connect.facebook.net/en_US/all.js'></script>
        <p><button onclick='addToPage(); return false;'>Add to Page</button></p>
        <p id='msg'></p>
        <script>
          FB.init({appId: '" . $appid . "', status: true, cookie: true});
          function addToPage() {
            // calling the API ...
            var obj = {
              method: 'pagetab',
              redirect_uri: '" . $url . "',
            };
            FB.ui(obj);
          }
        </script>";
      break;

    case 'share':
      $code = '
        <div id="fb-root"></div>
        <script>
          (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/' . $lang . '/all.js#xfbml=1";
            fjs.parentNode.insertBefore(js, fjs);
          }(document, "script", "facebook-jssdk"));
        </script>
        <fb:share-button href="' . $url . '" type="' . $share_type . '" style="' . $css . '"></fb:share-button>';
      break;

    case 'request':
      if ($request_type == '1') {
        $code = '
          <div id="fb-root"></div>
          <script src="http://connect.facebook.net/en_US/all.js"></script>
          <p>
            <input type="button" onclick="sendRequestViaMultiFriendSelector(); return false;" value="' . t('Request') . '" style="' . $css . '" class="form-submit"/>
          </p>
          <script>
            FB.init({
              appId  : "' . $appid . '",
              frictionlessRequests: true
            });
            function sendRequestViaMultiFriendSelector() {
              FB.ui({method: "apprequests",
                message: "' . $req_m . '"
              }, requestCallback);
            }
            function requestCallback(response) {
              // Handle callback here.
            }
          </script>';
      }
      else {
        $code = '
          <div id="fb-root"></div>
          <script src="http://connect.facebook.net/en_US/all.js"></script>
          <p>
            <input type="button" onclick="sendRequestToRecipients(); return false;" value="' . t('Request') . '" style="' . $css . '" class="form-submit"/>
            <input type="text" value="" name="user_ids" />
          </p>
          <script>
            FB.init({
              appId  : "' . $appid . '",
              frictionlessRequests: true
            });
            function sendRequestToRecipients() {
              var user_ids = document.getElementsByName("user_ids")[0].value;
              FB.ui({method: "apprequests",
                message: "' . $req_m . '",
                to: user_ids
              }, requestCallback);
            }
            function requestCallback(response) {
              // Handle callback here.
            }
          </script>';
      }
      break;

    case 'register':
      if ($log_red != '') {
        $log_red = str_replace('&', '@@@', $log_red);
      }
      else {
        $log_red = 'autoLOGREDauto';
      }
      if ($reg_red != '') {
        $reg_red = str_replace('&', '@@@', $reg_red);
      }
      else {
        $reg_red = 'autoREGREDauto';
      }
      $code = '
        <div id="fb-root"></div>
        <script>
          window.fbAsyncInit = function() {
            FB.init({
              appId      : "' . $appid . '",
              channelUrl : "' . $domain . '",
              status     : true,
              cookie     : true,
              xfbml      : true
            });
          };
          var web = {
            login: {
              login_custom: function() {
                FB.login(function (response) {
                    if (response.status === "connected") {
                      web.login.login_button_click();
                    }
                }, {
                    scope: jfbcRequiredPermissions
                });
              },
              // Action to perform after authentication on FB has occurred.
              login_button_click: function() {
                  FB.getLoginStatus(function(response) {
                      if (response.status === "connected") {
                        self.location = "' . url('get_registration_for_faceebok_page_or_post', array('query' => array('task' => 'login'), 'absolute' => TRUE)) . '&res="+response.authResponse.signedRequest+"&log_red=' . $log_red . '";
                      }
                  });
              },
            },
          };
          // Load the SDK Asynchronously.
          (function(d) {
            var js, id = "facebook-jssdk", ref = d.getElementsByTagName("script")[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement("script"); js.id = id; js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
          }(document));
        </script>
        <fb:login-button id="temp_id" registration-url="' . url('get_registration_for_faceebok_page_or_post', array('query' => array('task' => 'registration'), 'absolute' => TRUE)) . '&type=' . $reg_type . '&appid=' . $appid . '&g_red=' . $reg_red . '" onlogin="javascript:web.login.login_button_click();"></fb:login-button>';
      break;
  }
  if (isset($_GET['id']) && (check_plain($_GET['id']) != '')) {
    $id = check_plain($_GET['id']);
    db_query("UPDATE {spider_facebook_params} SET 
       title=:title,
       published=:published,
       type=:type,
       width=:width,
       url=:url,
       url_type=:url_type,
       colorsc=:colorsc,
       render=:render,
       code=:code,
       articles=:articles,
       backg=:backg,
       action=:action,
       send=:send,
       face=:face,
       layout=:layout,
       font=:font,
       lang=:lang,
       height=:height,
       post=:post,
       rows=:rows,
       domain=:domain,
       appid=:appid,
       head=:head,
       recom=:recom,
       target=:target,
       stream=:stream,
       size=:size,
       bord=:bord,
       share_type=:share_type,
       request_type=:request_type,
       place=:place,
       twit=:twit,
       meta_title=:meta_title,
       meta_type=:meta_type,
       meta_url=:meta_url,
       meta_image=:meta_image,
       meta_site_name=:meta_site_name,
       meta_description=:meta_description,
       meta_admins=:meta_admins,
       css=:css,
       def_img_art=:def_img_art,
       fb_only=:fb_only,
       reg_type=:reg_type,
       reg_red=:reg_red,
       log_red=:log_red,
       url_value=:url_value,
       lang_type=:lang_type,
       req_m=:req_m,
       count_mode=:count_mode,
       hor_place=:hor_place WHERE id=:id", array(
      ':title' => $title,
      ':published' => $published,
      ':type' => $type,
      ':width' => $width,
      ':url' => $url,
      ':url_type' => $url_type,
      ':colorsc' => $colorsc,
      ':render' => $render,
      ':code' => $code,
      ':articles' => $articles,
      ':backg' => $backg,
      ':action' => $action,
      ':send' => $send,
      ':face' => $face,
      ':layout' => $layout,
      ':font' => $font,
      ':lang' => $lang,
      ':height' => $height,
      ':post' => $post,
      ':rows' => $rows,
      ':domain' => $domain,
      ':appid' => $appid,
      ':head' => $head,
      ':recom' => $recom,
      ':target' => $target,
      ':stream' => $stream,
      ':size' => $size,
      ':bord' => $bord,
      ':share_type' => $share_type,
      ':request_type' => $request_type,
      ':place' => $place,
      ':twit' => $twit,
      ':meta_title' => $meta_title,
      ':meta_type' => $meta_type,
      ':meta_url' => $meta_url,
      ':meta_image' => $meta_image,
      ':meta_site_name' => $meta_site_name,
      ':meta_description' => $meta_description,
      ':meta_admins' => $meta_admins,
      ':css' => $css,
      ':def_img_art' => $def_img_art,
      ':fb_only' => $fb_only,
      ':reg_type' => $reg_type,
      ':reg_red' => $reg_red,
      ':log_red' => $log_red,
      ':url_value' => $url_value,
      ':lang_type' => $lang_type,
      ':req_m' => $req_m,
      ':count_mode' => $count_mode,
      ':hor_place' => $hor_place,
      ':id' => $id));
    if (db_table_exists('block')) {
      db_query("UPDATE {block} SET 
         status=:status,
         weight=:weight,
         region=:region,
         visibility=:visibility,
         pages=:pages WHERE module=:module AND delta=:delta AND theme=:theme", array(
        ':status' => $block_status,
        ':weight' => $weight,
        ':region' => $block_region,
        ':visibility' => $block_visibility,
        ':pages' => $block_pages,
        ':module' => 'spider_facebook',
        ':delta' => 'spider_facebook' . $id,
        ':theme' => variable_get('theme_default', 'none')));
    }
  }
  else {
    db_insert('spider_facebook_params')
      ->fields(array(
        'title' => $title,
        'published' => $published,
        'type' => $type,
        'width' => $width,
        'url' => $url,
        'url_type' => $url_type,
        'colorsc' => $colorsc,
        'render' => $render,
        'code' => $code,
        'articles' => $articles,
        'backg' => $backg,
        'action' => $action,
        'send' => $send,
        'face' => $face,
        'layout' => $layout,
        'font' => $font,
        'lang' => $lang,
        'height' => $height,
        'post' => $post,
        'rows' => $rows,
        'domain' => $domain,
        'appid' => $appid,
        'head' => $head,
        'recom' => $recom,
        'target' => $target,
        'stream' => $stream,
        'size' => $size,
        'bord' => $bord,
        'share_type' => $share_type,
        'request_type' => $request_type,
        'place' => $place,
        'twit' => $twit,
        'meta_title' => $meta_title,
        'meta_type' => $meta_type,
        'meta_url' => $meta_url,
        'meta_image' => $meta_image,
        'meta_site_name' => $meta_site_name,
        'meta_description' => $meta_description,
        'meta_admins' => $meta_admins,
        'css' => $css,
        'def_img_art' => $def_img_art,
        'fb_only' => $fb_only,
        'reg_type' => $reg_type,
        'reg_red' => $reg_red,
        'log_red' => $log_red,
        'url_value' => $url_value,
        'lang_type' => $lang_type,
        'req_m' => $req_m,
        'count_mode' => $count_mode,
        'hor_place' => $hor_place,
        ))
      ->execute();
    $id = db_query("SELECT MAX(id) FROM {spider_facebook_params}")->fetchField();
    if (db_table_exists('block')) {
      db_insert('block')
        ->fields(array(
          'module' => 'spider_facebook',
          'delta' => 'spider_facebook' . $id,
          'theme' => variable_get('theme_default', ''),
          'status' => $block_status,
          'weight' => $weight,
          'region' => $block_region,
          'custom' => 0,
          'visibility' => $block_visibility,
          'pages' => $block_pages,
          'title' => '',
          'cache' => 1,
          ))
        ->execute();
      db_insert('block')
        ->fields(array(
          'module' => 'spider_facebook',
          'delta' => 'spider_facebook' . $id,
          'theme' => variable_get('admin_theme', ''),
          'status' => 0,
          'weight' => $weight,
          'region' => '',
          'custom' => 0,
          'visibility' => $block_visibility,
          'pages' => $block_pages,
          'title' => '',
          'cache' => 1,
          ))
        ->execute();
    }
  }
  if ($form_state['values']['op'] == $form_state['values']['save']) {
    $form_state['redirect'] = url('admin/settings/spider_facebook', array('absolute' => TRUE));
  }
  elseif ($form_state['values']['op'] == $form_state['values']['apply']) {
    $form_state['redirect'] = url('admin/settings/spider_facebook/edit', array('query' => array('id' => $id), 'absolute' => TRUE));
  }
  drupal_set_message(t('Your item successfully saved.'), 'status', FALSE);
}

/**
 * Cancel.
 */
function spider_facebook_cancel($form, &$form_state) {
  $form_state['redirect'] = url('admin/settings/spider_facebook', array('absolute' => TRUE));
}
