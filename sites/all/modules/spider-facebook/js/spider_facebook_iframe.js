/**
 * Open iframe.
 */
function spider_facebook_iframe(iframe_div, iframe_src, close_url) {
  var height = 400 + 20;
  var width = 700 + 20;
  var div = document.getElementById(iframe_div);
  div.setAttribute('style', 'position:fixed; width:100%; height:100%; top:50px; left:0;z-index: 10000001;');
  div.innerHTML = '<div id="div_black" style="position:fixed; top:0; left:0; width:100%; height:100%; background-color:#000000; opacity:0.80; z-index:10000000;"></div><div id="div_content" style="position:relative; top:70px; width:' + width + 'px; height:' + height + 'px; margin:0 auto;z-index:10000001;background-color:#FFFFFF;"><iframe width="' + width + '" height="' + height + '" src="' + iframe_src + '"></iframe></div><div onclick=\'spider_facebook_remove_iframe(document.getElementById("' + iframe_div + '"))\' style=\'position:fixed; z-index:10000002; margin: 0 auto; right:20%; top:80px; width:32px; height:32px; background-image:url("' + close_url + '"); \'></div>';
}

/**
 * Close iframe.
 */
function spider_facebook_remove_iframe(iframe_div) {
  iframe_div.setAttribute('style', '');
  iframe_div.innerHTML = '';
}

/**
 * Show/hide image uploader.
 */
function spider_facebook_image_upload(id, is_visible) {
  document.getElementById(id).style.display = is_visible;
}

/**
 * Remove image thumb and url.
 */
function spider_facebook_remove_image(imagebox_id, thumb_id) {
  document.getElementById(imagebox_id).style.display = "none";
  document.getElementById(thumb_id).value = "";
}

/**
 * Check required.
 */
function spider_facebook_check_required(title) {
  if (document.getElementById(title).value == "") {
    alert(Drupal.t('"Title" field is required.'));
    return false;
  }
  if (document.getElementById("edit-req-m").value == "" && document.getElementById("req_m").style.display != "none") {
    alert(Drupal.t('"Request message" field is required.'));
    return false;
  }
  var type = document.getElementById('type').value;
  if (type == 'request' || type == 'recommendation' || type == 'actfeed' || type == 'loginbutton' || type == 'register' || type == 'loginwith') {
    if (document.getElementById("edit-appid").value == "" && document.getElementById("appid").style.display != "none" && document.getElementById("is_requerid_text_sp_facebook").style.display != "none") {
      alert(Drupal.t('"App ID"  field is required.'));
      return false;
    }
  }
}

/**
 * Change layout image.
 */
function spider_facebook_change_layout_image(selected) {
  document.getElementById("like_standard").style.display = "none";
  document.getElementById("like_button_count").style.display = "none";
  document.getElementById("like_box_count").style.display = "none";
  document.getElementById("like_" + selected).style.display = "";
}

/**
 * Remove content td.
 */
function spider_facebook_remove_content_row(id) {
  tr = document.getElementById("m" + id);
  document.getElementById("articles").value = document.getElementById("articles").value.replace(tr.getAttribute("plug_id") + ",", ""); 
  if (tr) {
    tr.parentNode.removeChild(tr);
  }
  tr = document.getElementById("t" + id);
  if (tr) {
    tr.parentNode.removeChild(tr);
  }
}

/**
 * Remove all.
 */
function spider_facebook_remove_all(title) {
  if (confirm(Drupal.t("Are you sure you want to delete " + title + "?"))) {
    if (title == "Contents") {
      for (var i = 0; i < 1000; i++) {
        tr = document.getElementById('m' + i);
        if (tr) {
          tr.parentNode.removeChild(tr);
        }
        tr = document.getElementById('t' + i);
        if (tr) {
          tr.parentNode.removeChild(tr);
        }
        document.getElementById("art_table_meta").style.display = "none";
        document.getElementById("art_table").style.display = "none";
        document.getElementById("articles").value = "";
      }
    }
  }
}

// Before configuration save.
function spider_facebook_on_save() {
  // If checked all contents.
  if (document.getElementById("articles").value == "all") {
    return;
  }
  var id_col_string = document.getElementById("articles").value;
  var ids = id_col_string.split(",");
  for (key in ids) {
    if (ids[key] != '') {
      document.getElementById("meta_title").value += document.getElementById(ids[key] + "_title").value + "***";
      document.getElementById("meta_type").value += document.getElementById(ids[key] + "_type").value + "***";
      document.getElementById("meta_url").value += document.getElementById(ids[key] + "_url").value + "***";
      document.getElementById("meta_image").value += document.getElementById(ids[key] + "_image").value + "***";
      document.getElementById("meta_site_name").value += document.getElementById(ids[key] + "_site_name").value + "***";
      document.getElementById("meta_description").value += document.getElementById(ids[key] + "_description").value + "***";
      document.getElementById("meta_admins").value += document.getElementById(ids[key] + "_admins").value + "***";
    }
  }
}
