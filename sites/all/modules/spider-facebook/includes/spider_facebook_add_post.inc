<?php
/**
 * @file
 * Add Post.
 */

/**
 * Add Post form.
 */
function spider_facebook_add_post() {
  drupal_add_js(drupal_get_path('module', 'spider_facebook') . '/js/spider_facebook_check_all.js');
  drupal_add_js(drupal_get_path('module', 'spider_facebook') . '/js/spider_facebook_iframe.js');
  $form = array();
  $form['search_posts_title'] = array(
    '#type' => 'textfield',
    '#size' => 25,
    '#title' => t('Title'),
    '#default_value' => variable_get('spider_facebook_search_posts_name', ''),
  );
  $select_type = db_query("SELECT nid,type FROM {node} GROUP BY type")->fetchAllKeyed();
  $form['search_posts_type'] = array(
    '#type' => 'select',
    '#title' => t('Type'),
    '#empty_option' => t('All'),
    '#default_value' => variable_get('spider_facebook_search_posts_type', ''),
    '#options' => $select_type,
  );
  $form['search_posts'] = array(
    '#type' => 'submit',
    '#submit' => array('spider_facebook_search_posts'),
    '#value' => t('Go'),
  );
  $form['reset_posts'] = array(
    '#type' => 'submit',
    '#value' => t('Reset'),
    '#submit' => array('spider_facebook_reset_posts'),
  );
  $nids_col = db_query("SELECT nid FROM {node}")->fetchCol();
  drupal_add_js('var data = [];', array('type' => 'inline'));
  foreach ($nids_col as $nid) {
    $row = db_query("SELECT * FROM {node} WHERE nid=:nid", array(':nid' => $nid))->fetchObject();
    drupal_add_js('
      data[' . $nid . '] = [];
      data[' . $nid . ']["title"] = "' . $row->title . '";
      data[' . $nid . ']["url"] = "' . url('node/' . $nid, array('absolute' => TRUE)) . '";', array('type' => 'inline'));
  }
  $form['add_posts_button'] = array(
    '#prefix' => '<br />',
    '#type' => 'image_button',
    '#src' => base_path() . drupal_get_path('module', 'spider_facebook') . '/images/add_but.png',
    '#attributes' => array('onclick' => 'spider_facebook_add(document.getElementById("post_ids_str").value, "all");spider_facebook_remove_iframe(window.parent.document.getElementById("preview_iframe"));return false;'),
  );
  drupal_add_js('if(document.getElementById("edit-add-posts-button")){document.getElementById("edit-add-posts-button").className = ""}', array('type' => 'inline', 'scope' => 'footer'));
  drupal_add_js('
    function spider_facebook_add(id_col_string, one_or_all) {
      window.parent.document.getElementById("art_tables").style.display = "";
      var ids = id_col_string.split(",");
      var tbody = window.parent.document.getElementById("meta");
      var tbody_only_titles = window.parent.document.getElementById("only_titles");
      var i = ' . variable_get('spider_facebook_post_count', 0) . ';
      var selected_articles_array = window.parent.document.getElementById("articles").value.split(",");
      var count_selected = selected_articles_array.length - 1;
      for (key in ids) {
        if (count_selected < 10 && document.getElementById("check_" + ids[key]) && ((document.getElementById("check_" + ids[key]).checked == true) || (one_or_all == "one"))) {
          // If content exists.
          if (window.parent.document.getElementById("articles").value.search(ids[key] + ",") != -1) {
            continue;
          }
          count_selected++;
          // Create TR for art_table.
          var tr = window.parent.document.createElement("tr");
          tr.setAttribute("id", "t" + i);
          tr.setAttribute("plug_id", ids[key]);
          tbody_only_titles.appendChild(tr);
          // Create TD for art_table.
          var td_info1 = window.parent.document.createElement("td");
          td_info1.setAttribute("id", "info1_" + i);
          td_info1.setAttribute("style", "width:50%;padding:0;");
          tr.appendChild(td_info1);
          var b = window.parent.document.createElement("b");
          b.innerHTML = data[ids[key]]["title"];
          b.setAttribute("style", "width:90%;");
          td_info1.appendChild(b);
          // Delete td from art_table.
          var td_delete = window.parent.document.createElement("td");
          td_delete.setAttribute("id", "X1_" + i);
          td_delete.setAttribute("valign", "middle");
          td_delete.setAttribute("style", "width:50px;border:none;");
          tr.appendChild(td_delete);
          var image_delete = window.parent.document.createElement("img");
          image_delete.setAttribute("onclick", "spider_facebook_remove_content_row(\'" + i + "\')");
          image_delete.setAttribute("style", "margin-left:14px;cursor:pointer;");
          image_delete.setAttribute("src", "' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/delete.png");
          td_delete.appendChild(image_delete);
          
          // Create TR for art_table_meta.
          var tr = window.parent.document.createElement("tr");
          tr.setAttribute("id", "m" + i);
          tr.setAttribute("plug_id", ids[key]);
          tbody.appendChild(tr);
          // Create TD.
          var td_info = window.parent.document.createElement("td");
          td_info.setAttribute("id", "info_" + i);
          td_info.setAttribute("style", "width:12%;text-align:center;padding:0;");
          tr.appendChild(td_info);
          var b = window.parent.document.createElement("b");
          b.innerHTML = data[ids[key]]["title"];
          b.setAttribute("style", "width:90%;");
          td_info.appendChild(b);

          var td_title = window.parent.document.createElement("td");
          td_title.setAttribute("id", "title_" + i);
          td_title.setAttribute("style", "width:12%;text-align:center;padding:0;");
          tr.appendChild(td_title);
          var input_title = window.parent.document.createElement("input");
          input_title.setAttribute("id", ids[key] + "_title");
          input_title.setAttribute("type", "text");
          input_title.setAttribute("value", data[ids[key]]["title"]);
          input_title.setAttribute("style", "width:90%;");
          td_title.appendChild(input_title);

          var td_type = window.parent.document.createElement("td");
          td_type.setAttribute("style", "width:12%;text-align:center;padding:0;");
          td_type.setAttribute("id", "type_" + i);
          tr.appendChild(td_type);
          var select_type = window.parent.document.createElement("select");
          select_type.setAttribute("id", ids[key] + "_type");
          select_type.setAttribute("class", "form-select");
          select_type.setAttribute("style", "width:90%;");
          td_type.appendChild(select_type);
          op0 = document.createElement("option");
          op0.setAttribute("value", "Chose a type");
          op0.innerHTML = "' . t('Chose a type') . '";
          op1 = document.createElement("option");
          op1.setAttribute("value", "activity");
          op1.innerHTML = "' . t('activity') . '";
          op2 = document.createElement("option");
          op2.setAttribute("value", "actor");
          op2.innerHTML = "' . t('actor') . '";
          op3 = document.createElement("option");
          op3.setAttribute("value", "album");
          op3.innerHTML = "' . t('album') . '";
          op4 = document.createElement("option");
          op4.setAttribute("value", "article");
          op4.innerHTML = "' . t('article') . '";
          op5 = document.createElement("option");
          op5.setAttribute("value", "athlete");
          op5.innerHTML = "' . t('athlete') . '";
          op6 = document.createElement("option");
          op6.setAttribute("value", "author");
          op6.innerHTML = "' . t('author') . '";
          op7 = document.createElement("option");
          op7.setAttribute("value", "band");
          op7.innerHTML = "' . t('band') . '";
          op8 = document.createElement("option");
          op8.setAttribute("value", "bar");
          op8.innerHTML = "' . t('bar') . '";
          op9 = document.createElement("option");
          op9.setAttribute("value", "blog");
          op9.innerHTML = "' . t('blog') . '";
          op10 = document.createElement("option");
          op10.setAttribute("value", "book");
          op10.innerHTML = "' . t('book') . '";
          op11 = document.createElement("option");
          op11.setAttribute("value", "cafe");
          op11.innerHTML = "' . t('cafe') . '";
          op12 = document.createElement("option");
          op12.setAttribute("value", "cause");
          op12.innerHTML = "' . t('cause') . '";
          op13 = document.createElement("option");
          op13.setAttribute("value", "city");
          op13.innerHTML = "' . t('city') . '";
          op14 = document.createElement("option");
          op14.setAttribute("value", "company");
          op14.innerHTML = "' . t('company') . '";
          op15 = document.createElement("option");
          op15.setAttribute("value", "country");
          op15.innerHTML = "' . t('country') . '";
          op16 = document.createElement("option");
          op16.setAttribute("value", "director");
          op16.innerHTML = "' . t('director') . '";
          op17 = document.createElement("option");
          op17.setAttribute("value", "drink");
          op17.innerHTML = "' . t('drink') . '";
          op18 = document.createElement("option");
          op18.setAttribute("value", "food");
          op18.innerHTML = "' . t('food') . '";
          op19 = document.createElement("option");
          op19.setAttribute("value", "game");
          op19.innerHTML = "' . t('game') . '";
          op20 = document.createElement("option");
          op20.setAttribute("value", "government");
          op20.innerHTML = "' . t('government') . '";
          op21 = document.createElement("option");
          op21.setAttribute("value", "hotel");
          op21.innerHTML = "' . t('hotel') . '";
          op22 = document.createElement("option");
          op22.setAttribute("value", "landmark");
          op22.innerHTML = "' . t('landmark') . '";
          op23 = document.createElement("option");
          op23.setAttribute("value", "movie");
          op23.innerHTML = "' . t('movie') . '";
          op24 = document.createElement("option");
          op24.setAttribute("value", "musician");
          op24.innerHTML = "' . t('musician') . '";
          op25 = document.createElement("option");
          op25.setAttribute("value", "non_profit");
          op25.innerHTML = "' . t('non_profit') . '";
          op26 = document.createElement("option");
          op26.setAttribute("value", "politician");
          op26.innerHTML = "' . t('politician') . '";
          op27 = document.createElement("option");
          op27.setAttribute("value", "product");
          op27.innerHTML = "' . t('product') . '";
          op28 = document.createElement("option");
          op28.setAttribute("value", "public_figure");
          op28.innerHTML = "' . t('public_figure') . '";
          op29 = document.createElement("option");
          op29.setAttribute("value", "restaurant");
          op29.innerHTML = "' . t('restaurant') . '";
          op30 = document.createElement("option");
          op30.setAttribute("value", "school");
          op30.innerHTML = "' . t('school') . '";
          op31 = document.createElement("option");
          op31.setAttribute("value", "song");
          op31.innerHTML = "' . t('song') . '";
          op32 = document.createElement("option");
          op32.setAttribute("value", "sport");
          op32.innerHTML = "' . t('sport') . '";
          op33 = document.createElement("option");
          op33.setAttribute("value", "sports_league");
          op33.innerHTML = "' . t('sports_league') . '";
          op34 = document.createElement("option");
          op34.setAttribute("value", "sports_team");
          op34.innerHTML = "' . t('sports_team') . '";
          op35 = document.createElement("option");
          op35.setAttribute("value", "state_province");
          op35.innerHTML = "' . t('state_province') . '";
          op36 = document.createElement("option");
          op36.setAttribute("value", "tv_show");
          op36.innerHTML = "' . t('tv_show') . '";
          op37 = document.createElement("option");
          op37.setAttribute("value", "university");
          op37.innerHTML = "' . t('university') . '";
          op38 = document.createElement("option");
          op38.setAttribute("value", "website");
          op38.innerHTML = "' . t('website') . '";
          var op = [op0, op1, op2, op3, op4, op5, op6, op7, op8, op9, op10, op11, op12, op13, op14, op15, op16, op17, op18, op19, op20, op21, op22, op23, op24, op25, op26, op27, op28, op29, op30, op31, op32, op33, op34, op35, op36, op37, op38];
          for (var j = 0; j < 39; j++) {
            select_type.appendChild(op[j]);
          }
          var td_url = window.parent.document.createElement("td");
          td_url.setAttribute("style", "width:12%;text-align:center;padding:0;");
          td_url.setAttribute("id", "url_" + i);
          tr.appendChild(td_url);
          var input_url = window.parent.document.createElement("input");
          input_url.setAttribute("id", ids[key] + "_url");
          input_url.setAttribute("type", "text");
          input_url.setAttribute("value", data[ids[key]]["url"]);
          input_url.setAttribute("style", "width:90%;");
          td_url.appendChild(input_url);

          var td_image = window.parent.document.createElement("td");
          td_image.setAttribute("style", "width:12%;text-align:center;padding:0;");
          td_image.setAttribute("id", "image_" + i);
          tr.appendChild(td_image);
          var input_image = window.parent.document.createElement("input");
          input_image.setAttribute("id", ids[key] + "_image");
          input_image.setAttribute("type", "text");
          input_image.setAttribute("value", "");
          input_image.setAttribute("style", "width:90%;");
          td_image.appendChild(input_image);

          var td_site_name = window.parent.document.createElement("td");
          td_site_name.setAttribute("style", "width:12%;text-align:center;padding:0;");
          td_site_name.setAttribute("id", "site_name_" + i);
          tr.appendChild(td_site_name);
          var input_site_name = window.parent.document.createElement("input");
          input_site_name.setAttribute("id", ids[key] + "_site_name");
          input_site_name.setAttribute("type", "text");
          input_site_name.setAttribute("value", "' . variable_get('site_name') . '");
          input_site_name.setAttribute("style", "width:90%;");
          td_site_name.appendChild(input_site_name);

          var td_description = window.parent.document.createElement("td");
          td_description.setAttribute("style", "width:12%;text-align:center;padding:0;");
          td_description.setAttribute("id", "description_" + i);
          tr.appendChild(td_description);
          var input_description = window.parent.document.createElement("input");
          input_description.setAttribute("id", ids[key] + "_description");
          input_description.setAttribute("type", "text");
          input_description.setAttribute("value", "");
          input_description.setAttribute("style", "width:90%;");
          td_description.appendChild(input_description);

          var td_admins = window.parent.document.createElement("td");
          td_admins.setAttribute("style", "width:12%;text-align:center;padding:0;");
          td_admins.setAttribute("id", "admins_" + i);
          tr.appendChild(td_admins);
          var input_admins = window.parent.document.createElement("input");
          input_admins.setAttribute("id", ids[key] + "_admins");
          input_admins.setAttribute("type", "text");
          input_admins.setAttribute("value", "");
          input_admins.setAttribute("style", "width:90%;");
          td_admins.appendChild(input_admins);

          // Delete td.
          var td_delete = window.parent.document.createElement("td");
          td_delete.setAttribute("id", "X_" + i);
          td_delete.setAttribute("valign", "middle");
          td_delete.setAttribute("style", "width:50px;text-align:center;border:none;");
          tr.appendChild(td_delete);
          var image_delete = window.parent.document.createElement("img");
          image_delete.setAttribute("onclick", "spider_facebook_remove_content_row(\'" + i + "\')");
          image_delete.setAttribute("style", "cursor:pointer;");
          image_delete.setAttribute("src", "' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/delete.png");
          td_delete.appendChild(image_delete);

          i++;
          window.parent.document.getElementById("articles").value += ids[key] + ",";
          ' . variable_set('spider_facebook_post_count', (variable_get('spider_facebook_post_count', 0) + 1)) . '
        }
      }
      if (count_selected > 9) {
        alert(Drupal.t("In free version you can\'t add more than 10 contents."));
      }
      window.parent.document.getElementById("art_table_meta").style.display = "";
    }', array('type' => 'inline'));
  $header = array(
    'checkbox' => array(
      'data' => array(
        '#type' => 'checkbox',
        '#attributes' => array(
          'id' => 'checkall_id',
          'onclick' => 'spider_facebook_check_all("checkall_id", document.getElementById("post_ids_str").value, "check_")',
        ),
      ),
    ),
    'nid' => array('data' => t('ID'), 'field' => 'n.nid'),
    'title' => array('data' => t('Title'), 'field' => 'n.title'),
    'type' => array('data' => t('Type'), 'field' => 'n.type'),
    'status' => array('data' => t('Published'), 'field' => 'n.status'),
  );
  $post_ids_str = '';
  $options = array();
  $query = db_select('node', 'n')
    ->fields('n', array('nid'))
    ->condition('n.title', '%' . db_like(variable_get('spider_facebook_search_posts_name', '')) . '%', 'LIKE')
    ->extend('TableSort')
    ->orderByHeader($header)
    ->extend('PagerDefault')
    ->limit(20);
  if (variable_get('spider_facebook_search_posts_type', '') != '') {
    $type = db_query("SELECT type FROM {node} WHERE nid=:nid", array(':nid' => variable_get('spider_facebook_search_posts_type', '')))->fetchField();
    $query = $query->condition('n.type', $type, '=');
  }
  $post_ids = $query->execute()->fetchCol();
  foreach ($post_ids as $post_id) {
    $post_ids_str .= $post_id . ',';
    $row = db_query("SELECT * FROM {node} WHERE nid=:nid", array(':nid' => $post_id))->fetchObject();
    if ($row->status) {
      $publish_unpublish_png = 'publish.png';
      $publish_unpublish_function = 'unpublish';
      $disabled = 'enabled';
    }
    else {
      $publish_unpublish_png = 'unpublish.png';
      $publish_unpublish_function = 'publish';
      $disabled = 'disabled';
    }
    $options[$post_id] = array(
      'checkbox' => array(
        'data' => array(
          '#type' => 'checkbox',
          '#attributes' => array(
            'id' => 'check_' . $post_id,
            $disabled => $disabled,
          ),
        ),
      ),
      'nid' => $post_id,
      'title' => array(
        'data' => array(
          '#type' => 'link',
          '#title' => $row->title,
          '#href' => '',
          '#attributes' => array(
            'onclick' => (($row->status == 1) ? 'spider_facebook_add("' . $post_id . ',", "one");spider_facebook_remove_iframe(window.parent.document.getElementById("preview_iframe"));return false;' : 'alert(Drupal.t("You can\'t add unpublished videos."));return false;'),
          ),
        ),
      ),
      'type' => $row->type,
      'status' => '<img src="' . base_path() . drupal_get_path('module', 'spider_facebook') . '/images/' . $publish_unpublish_png . '" />',
    );
  }
  $form['post_ids_str'] = array(
    '#type' => 'hidden',
    '#value' => $post_ids_str,
    '#attributes' => array('id' => 'post_ids_str'),
  );
  $form['posts_table'] = array(
    '#prefix' => '<br /><strong>' . t('Contents') . '</strong>',
    '#type' => 'tableselect',
    '#js_select' => FALSE,
    '#header' => $header,
    '#options' => $options,
    '#empty' => t('No content available.'),
    '#suffix' => theme('pager', array('tag' => array())),
  );
  // Disable default checkboxes.
  foreach ($post_ids as $post_id) {
    if (isset($form['posts_table']['#options'][$post_id])) {
      $form['posts_table'][$post_id]['#disabled'] = TRUE;
    }
  }
  // Change in iframe all page with content.
  drupal_add_js('window.onload = function() {
    var content = document.getElementById("content");
    var body = document.getElementsByTagName("body")[0];
    body.innerHTML = content.innerHTML;
    body.setAttribute("style", "padding:20px;height:0px;");
  };', array('type' => 'inline', 'scope' => 'footer'));
  return $form;
}

/**
 * Search.
 */
function spider_facebook_search_posts($form, &$form_state) {
  variable_set('spider_facebook_search_posts_name', $form_state['values']['search_posts_title']);
  variable_set('spider_facebook_search_posts_type', $form_state['values']['search_posts_type']);
}

/**
 * Reset.
 */
function spider_facebook_reset_posts($form, &$form_state) {
  variable_set('spider_facebook_search_posts_name', '');
  variable_set('spider_facebook_search_posts_type', '');
}
