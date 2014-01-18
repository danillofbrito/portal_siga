/**
 * Change.
 */
function spider_facebook_change() {
  if (document.getElementById("articles").value == "") {
    document.getElementById("art_tables").style.display = "none";
  }
  switch (document.getElementById('type').value) {
    case 'likebutton':
      document.getElementById('is_requerid_text_sp_facebook').style.display = 'none';
      document.getElementById('likebutton').style.display = 'none';
      document.getElementById('sendbutton').style.display = '';
      document.getElementById('follow').style.display = '';
      document.getElementById('comment').style.display = '';
      document.getElementById('actfeed').style.display = '';
      document.getElementById('recommendation').style.display = '';
      document.getElementById('likebox').style.display = '';
      document.getElementById('loginbutton').style.display = '';
      document.getElementById('facepile').style.display = '';
      document.getElementById('share').style.display = '';
      document.getElementById('request').style.display = '';
      document.getElementById('register').style.display = '';
      document.getElementById('socials').style.display = '';
      document.getElementById('likebutton_hover').style.display = '';
      document.getElementById('sendbutton_hover').style.display = 'none';
      document.getElementById('follow_hover').style.display = 'none';
      document.getElementById('comment_hover').style.display = 'none';
      document.getElementById('actfeed_hover').style.display = 'none';
      document.getElementById('recommendation_hover').style.display = 'none';
      document.getElementById('likebox_hover').style.display = 'none';
      document.getElementById('loginbutton_hover').style.display = 'none';
      document.getElementById('facepile_hover').style.display = 'none';
      document.getElementById('share_hover').style.display = 'none';
      document.getElementById('request_hover').style.display = 'none';
      document.getElementById('register_hover').style.display = 'none';
      document.getElementById('socials_hover').style.display = 'none';
      document.getElementById('likebutton_prev').style.display = '';
      document.getElementById('sendbutton_prev').style.display = 'none';
      document.getElementById('comment_prev').style.display = 'none';
      document.getElementById('like_box_prev').style.display = 'none';
      document.getElementById('follow_prev').style.display = 'none';
      document.getElementById('request_prev').style.display = 'none';
      document.getElementById('recommendation_prev').style.display = 'none';
      document.getElementById('activity_feed_prev').style.display = 'none';
      document.getElementById('facepile_prev').style.display = 'none';
      document.getElementById('share_prev').style.display = 'none';
      document.getElementById('login_prev').style.display = 'none';
      document.getElementById('register_prev').style.display = 'none';
      document.getElementById('social_prev').style.display = 'none';
      switch (document.getElementById('render').value) {
        case '1':
        case '2':
          document.getElementById('domain').style.display = 'none';
          document.getElementById('appid').style.display = '';
          document.getElementById('url_type').style.display = '';
          if (document.getElementById('url_change').value == 'normal') {
            document.getElementById('url_tr').style.display = '';
          }
          else {
            document.getElementById('url_tr').style.display = 'none';
          }
          document.getElementById('render_tr').style.display = '';
          document.getElementById('r3').style.display = '';
          document.getElementById('r4').style.display = '';
          document.getElementById('width').style.display = '';
          document.getElementById('height').style.display = 'none';
          document.getElementById('target').style.display = 'none';
          document.getElementById('rows').style.display = 'none';
          document.getElementById('size').style.display = 'none';
          document.getElementById('post').style.display = 'none';
          document.getElementById('head').style.display = 'none';
          document.getElementById('stream').style.display = 'none';
          document.getElementById('recom').style.display = 'none';
          document.getElementById('action').style.display = '';
          document.getElementById('send').style.display = '';
          document.getElementById('face').style.display = '';
          document.getElementById('layout').style.display = '';
          document.getElementById('backg').style.display = '';
          document.getElementById('colorsc').style.display = '';
          document.getElementById('font').style.display = '';
          document.getElementById('lang_type').style.display = '';
          if (document.getElementById('lang_change').value == 'normal') {
            document.getElementById('lang').style.display = '';
          }
          else {
            document.getElementById('lang').style.display = 'none';
          }
          document.getElementById('bord').style.display = 'none';
          document.getElementById('share_type').style.display = 'none';
          document.getElementById('request_type').style.display = 'none';
          document.getElementById('twit').style.display = 'none';
          document.getElementById('art_table_meta').style.display = '';
          document.getElementById('art_table').style.display = 'none';
          document.getElementById('def_img_art_tr').style.display = '';
          document.getElementById('reg_red').style.display = 'none';
          document.getElementById('log_red').style.display = 'none';
          document.getElementById('reg_type').style.display = 'none';
          document.getElementById('fb_only').style.display = 'none';
          document.getElementById('url_value').style.display = 'none';
          document.getElementById('req_m').style.display = 'none';
          break;

        case '3':
          document.getElementById('domain').style.display = 'none';
          document.getElementById('appid').style.display = '';
          document.getElementById('url_type').style.display = '';
          if (document.getElementById('url_change').value == 'normal') {
            document.getElementById('url_tr').style.display = '';
          }
          else {
            document.getElementById('url_tr').style.display = 'none';
          }
          document.getElementById('render_tr').style.display = '';
          document.getElementById('r3').style.display = '';
          document.getElementById('r4').style.display = '';
          document.getElementById('width').style.display = '';
          document.getElementById('height').style.display = '';
          document.getElementById('target').style.display = 'none';
          document.getElementById('rows').style.display = 'none';
          document.getElementById('size').style.display = 'none';
          document.getElementById('post').style.display = 'none';
          document.getElementById('head').style.display = 'none';
          document.getElementById('stream').style.display = 'none';
          document.getElementById('recom').style.display = 'none';
          document.getElementById('action').style.display = '';
          document.getElementById('send').style.display = 'none';
          document.getElementById('face').style.display = '';
          document.getElementById('layout').style.display = '';
          document.getElementById('backg').style.display = '';
          document.getElementById('colorsc').style.display = '';
          document.getElementById('font').style.display = '';
          document.getElementById('lang').style.display = 'none';
          document.getElementById('lang_type').style.display = 'none';
          document.getElementById('bord').style.display = '';
          document.getElementById('share_type').style.display = 'none';
          document.getElementById('request_type').style.display = 'none';
          document.getElementById('twit').style.display = 'none';
          document.getElementById('art_table_meta').style.display = '';
          document.getElementById('art_table').style.display = 'none';
          document.getElementById('def_img_art_tr').style.display = '';
          document.getElementById('reg_red').style.display = 'none';
          document.getElementById('log_red').style.display = 'none';
          document.getElementById('reg_type').style.display = 'none';
          document.getElementById('fb_only').style.display = 'none';
          document.getElementById('url_value').style.display = 'none';
          document.getElementById('req_m').style.display = 'none';
          break;

        case '4':
          document.getElementById('domain').style.display = 'none';
          document.getElementById('appid').style.display = 'none';
          document.getElementById('url_type').style.display = '';
          if (document.getElementById('url_change').value == 'normal') {
            document.getElementById('url_tr').style.display = '';
          }
          else {
            document.getElementById('url_tr').style.display = 'none';
          }
          document.getElementById('render_tr').style.display = '';
          document.getElementById('r3').style.display = '';
          document.getElementById('r4').style.display = '';
          document.getElementById('width').style.display = '';
          document.getElementById('height').style.display = 'none';
          document.getElementById('target').style.display = '';
          document.getElementById('rows').style.display = 'none';
          document.getElementById('size').style.display = 'none';
          document.getElementById('post').style.display = 'none';
          document.getElementById('head').style.display = 'none';
          document.getElementById('stream').style.display = 'none';
          document.getElementById('recom').style.display = 'none';
          document.getElementById('action').style.display = '';
          document.getElementById('send').style.display = 'none';
          document.getElementById('face').style.display = '';
          document.getElementById('layout').style.display = '';
          document.getElementById('backg').style.display = 'none';
          document.getElementById('colorsc').style.display = '';
          document.getElementById('font').style.display = '';
          document.getElementById('lang').style.display = 'none';
          document.getElementById('lang_type').style.display = 'none';
          document.getElementById('bord').style.display = 'none';

          document.getElementById('share_type').style.display = 'none';
          document.getElementById('request_type').style.display = 'none';
          document.getElementById('twit').style.display = 'none';
          document.getElementById('art_table_meta').style.display = '';
          document.getElementById('art_table').style.display = 'none';
          document.getElementById('def_img_art_tr').style.display = '';
          document.getElementById('reg_red').style.display = 'none';
          document.getElementById('log_red').style.display = 'none';
          document.getElementById('reg_type').style.display = 'none';
          document.getElementById('fb_only').style.display = 'none';
          document.getElementById('url_value').style.display = '';
          document.getElementById('req_m').style.display = 'none';
          break;
      }
      document.getElementById('l_url').innerHTML = Drupal.t('Url');
      document.getElementById('count_tr').style.display = 'none';
      document.getElementById('hor_place').style.display = 'none';
      document.getElementById('notification').innerHTML = Drupal.t('The Like button is a social plugin that lets users share pages from your site back to their Facebook profile with one click.');
      break;

    case 'sendbutton':
      document.getElementById('is_requerid_text_sp_facebook').style.display = 'none';
      document.getElementById('likebutton').style.display = '';
      document.getElementById('sendbutton').style.display = 'none';
      document.getElementById('follow').style.display = '';
      document.getElementById('comment').style.display = '';
      document.getElementById('actfeed').style.display = '';
      document.getElementById('recommendation').style.display = '';
      document.getElementById('likebox').style.display = '';
      document.getElementById('loginbutton').style.display = '';
      document.getElementById('facepile').style.display = '';
      document.getElementById('share').style.display = '';
      document.getElementById('request').style.display = '';
      document.getElementById('register').style.display = '';
      document.getElementById('socials').style.display = '';
      document.getElementById('likebutton_hover').style.display = 'none';
      document.getElementById('sendbutton_hover').style.display = '';
      document.getElementById('follow_hover').style.display = 'none';
      document.getElementById('comment_hover').style.display = 'none';
      document.getElementById('actfeed_hover').style.display = 'none';
      document.getElementById('recommendation_hover').style.display = 'none';
      document.getElementById('likebox_hover').style.display = 'none';
      document.getElementById('loginbutton_hover').style.display = 'none';
      document.getElementById('facepile_hover').style.display = 'none';
      document.getElementById('share_hover').style.display = 'none';
      document.getElementById('request_hover').style.display = 'none';
      document.getElementById('register_hover').style.display = 'none';
      document.getElementById('socials_hover').style.display = 'none';
      document.getElementById('likebutton_prev').style.display = 'none';
      document.getElementById('sendbutton_prev').style.display = '';
      document.getElementById('comment_prev').style.display = 'none';
      document.getElementById('like_box_prev').style.display = 'none';
      document.getElementById('follow_prev').style.display = 'none';
      document.getElementById('request_prev').style.display = 'none';
      document.getElementById('recommendation_prev').style.display = 'none';
      document.getElementById('activity_feed_prev').style.display = 'none';
      document.getElementById('facepile_prev').style.display = 'none';
      document.getElementById('share_prev').style.display = 'none';
      document.getElementById('login_prev').style.display = 'none';
      document.getElementById('register_prev').style.display = 'none';
      document.getElementById('social_prev').style.display = 'none';
      switch (document.getElementById('render').value) {
        case '1':
        case '2':
          document.getElementById('domain').style.display = 'none';
          document.getElementById('appid').style.display = 'none';
          document.getElementById('url_type').style.display = '';
          if (document.getElementById('url_change').value == 'normal') {
            document.getElementById('url_tr').style.display = '';
          }
          else {
            document.getElementById('url_tr').style.display = 'none';
          }
          document.getElementById('render_tr').style.display = '';
          document.getElementById('r3').style.display = 'none';
          document.getElementById('r4').style.display = 'none';
          document.getElementById('width').style.display = 'none';
          document.getElementById('height').style.display = 'none';
          document.getElementById('target').style.display = 'none';
          document.getElementById('rows').style.display = 'none';
          document.getElementById('size').style.display = 'none';
          document.getElementById('post').style.display = 'none';
          document.getElementById('head').style.display = 'none';
          document.getElementById('stream').style.display = 'none';
          document.getElementById('recom').style.display = 'none';
          document.getElementById('action').style.display = 'none';
          document.getElementById('send').style.display = 'none';
          document.getElementById('face').style.display = 'none';
          document.getElementById('layout').style.display = 'none';
          document.getElementById('backg').style.display = 'none';
          document.getElementById('colorsc').style.display = '';
          document.getElementById('font').style.display = '';
          document.getElementById('lang_type').style.display = '';
          if (document.getElementById('lang_change').value == 'normal') {
            document.getElementById('lang').style.display = '';
          }
          else {
            document.getElementById('lang').style.display = 'none';
          }
          document.getElementById('bord').style.display = 'none';
          document.getElementById('bord').style.display = 'none';
          document.getElementById('share_type').style.display = 'none';
          document.getElementById('request_type').style.display = 'none';
          document.getElementById('twit').style.display = 'none';
          document.getElementById('art_table_meta').style.display = '';
          document.getElementById('art_table').style.display = 'none';
          document.getElementById('def_img_art_tr').style.display = '';
          document.getElementById('reg_red').style.display = 'none';
          document.getElementById('log_red').style.display = 'none';
          document.getElementById('reg_type').style.display = 'none';
          document.getElementById('fb_only').style.display = 'none';
          document.getElementById('url_value').style.display = 'none';
          document.getElementById('req_m').style.display = 'none';
          break;

        case '3':
        case '4':
          spider_facebook_change_render('2');
          break;
      }
      document.getElementById('l_url').innerHTML = Drupal.t('Url');
      document.getElementById('count_tr').style.display = 'none';
      document.getElementById('hor_place').style.display = 'none';
      document.getElementById('notification').innerHTML = Drupal.t('The Send button is a social plugin that allows your users to easily send your content to their friends.');
      break;

    case 'follow':
      document.getElementById('is_requerid_text_sp_facebook').style.display = 'none';
      document.getElementById('edit-url-type-normal').checked = true;
      document.getElementById('likebutton').style.display = '';
      document.getElementById('sendbutton').style.display = '';
      document.getElementById('follow').style.display = 'none';
      document.getElementById('comment').style.display = '';
      document.getElementById('actfeed').style.display = '';
      document.getElementById('recommendation').style.display = '';
      document.getElementById('likebox').style.display = '';
      document.getElementById('loginbutton').style.display = '';
      document.getElementById('facepile').style.display = '';
      document.getElementById('share').style.display = '';
      document.getElementById('request').style.display = '';
      document.getElementById('register').style.display = '';
      document.getElementById('socials').style.display = '';
      document.getElementById('likebutton_hover').style.display = 'none';
      document.getElementById('sendbutton_hover').style.display = 'none';
      document.getElementById('follow_hover').style.display = '';
      document.getElementById('comment_hover').style.display = 'none';
      document.getElementById('actfeed_hover').style.display = 'none';
      document.getElementById('recommendation_hover').style.display = 'none';
      document.getElementById('likebox_hover').style.display = 'none';
      document.getElementById('loginbutton_hover').style.display = 'none';
      document.getElementById('facepile_hover').style.display = 'none';
      document.getElementById('share_hover').style.display = 'none';
      document.getElementById('request_hover').style.display = 'none';
      document.getElementById('register_hover').style.display = 'none';
      document.getElementById('socials_hover').style.display = 'none';
      document.getElementById('likebutton_prev').style.display = 'none';
      document.getElementById('sendbutton_prev').style.display = 'none';
      document.getElementById('comment_prev').style.display = 'none';
      document.getElementById('like_box_prev').style.display = 'none';
      document.getElementById('follow_prev').style.display = '';
      document.getElementById('request_prev').style.display = 'none';
      document.getElementById('recommendation_prev').style.display = 'none';
      document.getElementById('activity_feed_prev').style.display = 'none';
      document.getElementById('facepile_prev').style.display = 'none';
      document.getElementById('share_prev').style.display = 'none';
      document.getElementById('login_prev').style.display = 'none';
      document.getElementById('register_prev').style.display = 'none';
      document.getElementById('social_prev').style.display = 'none';
      switch (document.getElementById('render').value) {
        case '1':
        case '2':
          document.getElementById('domain').style.display = 'none';
          document.getElementById('appid').style.display = 'none';
          document.getElementById('url_type').style.display = 'none';
          document.getElementById('url_change').value = 'normal';
          document.getElementById('url_tr').style.display = '';
          document.getElementById('edit-url-type-normal').checked = true;
          document.getElementById('render_tr').style.display = '';
          document.getElementById('r3').style.display = '';
          document.getElementById('r4').style.display = '';
          document.getElementById('width').style.display = '';
          document.getElementById('height').style.display = 'none';
          document.getElementById('target').style.display = 'none';
          document.getElementById('rows').style.display = 'none';
          document.getElementById('size').style.display = 'none';
          document.getElementById('post').style.display = 'none';
          document.getElementById('head').style.display = 'none';
          document.getElementById('stream').style.display = 'none';
          document.getElementById('recom').style.display = 'none';
          document.getElementById('action').style.display = 'none';
          document.getElementById('send').style.display = 'none';
          document.getElementById('face').style.display = '';
          document.getElementById('layout').style.display = '';
          document.getElementById('backg').style.display = '';
          document.getElementById('colorsc').style.display = '';
          document.getElementById('font').style.display = '';
          document.getElementById('lang').style.display = 'none';
          document.getElementById('lang_type').style.display = 'none';
          document.getElementById('bord').style.display = 'none';
          document.getElementById('bord').style.display = 'none';
          document.getElementById('share_type').style.display = 'none';
          document.getElementById('request_type').style.display = 'none';
          document.getElementById('twit').style.display = 'none';
          document.getElementById('art_table_meta').style.display = 'none';
          document.getElementById('art_table').style.display = '';
          document.getElementById('def_img_art_tr').style.display = 'none';
          document.getElementById('reg_red').style.display = 'none';
          document.getElementById('log_red').style.display = 'none';
          document.getElementById('reg_type').style.display = 'none';
          document.getElementById('fb_only').style.display = 'none';
          document.getElementById('url_value').style.display = 'none';
          document.getElementById('req_m').style.display = 'none';
          break;

        case '3':
          document.getElementById('domain').style.display = 'none';
          document.getElementById('appid').style.display = 'none';
          document.getElementById('url_type').style.display = 'none';
          document.getElementById('url_change').value = 'normal';
          document.getElementById('url_tr').style.display = '';
          document.getElementById('edit-url-type-normal').checked = true;
          document.getElementById('render_tr').style.display = '';
          document.getElementById('r3').style.display = '';
          document.getElementById('r4').style.display = '';
          document.getElementById('width').style.display = '';
          document.getElementById('height').style.display = 'none';
          document.getElementById('target').style.display = 'none';
          document.getElementById('rows').style.display = 'none';
          document.getElementById('size').style.display = 'none';
          document.getElementById('post').style.display = 'none';
          document.getElementById('head').style.display = 'none';
          document.getElementById('stream').style.display = 'none';
          document.getElementById('recom').style.display = 'none';
          document.getElementById('action').style.display = 'none';
          document.getElementById('send').style.display = 'none';
          document.getElementById('face').style.display = '';
          document.getElementById('layout').style.display = 'none';
          document.getElementById('backg').style.display = '';
          document.getElementById('colorsc').style.display = '';
          document.getElementById('font').style.display = 'none';
          document.getElementById('lang').style.display = 'none';
          document.getElementById('lang_type').style.display = 'none';
          document.getElementById('bord').style.display = '';
          document.getElementById('share_type').style.display = 'none';
          document.getElementById('request_type').style.display = 'none';
          document.getElementById('twit').style.display = 'none';
          document.getElementById('art_table_meta').style.display = 'none';
          document.getElementById('art_table').style.display = '';
          document.getElementById('def_img_art_tr').style.display = 'none';
          document.getElementById('reg_red').style.display = 'none';
          document.getElementById('log_red').style.display = 'none';
          document.getElementById('reg_type').style.display = 'none';
          document.getElementById('fb_only').style.display = 'none';
          document.getElementById('url_value').style.display = 'none';
          document.getElementById('req_m').style.display = 'none';
          break;

        case '4':
          document.getElementById('domain').style.display = 'none';
          document.getElementById('appid').style.display = 'none';
          document.getElementById('url_type').style.display = 'none';
          document.getElementById('url_change').value = 'normal';
          document.getElementById('url_tr').style.display = '';
          document.getElementById('edit-url-type-normal').checked = true;
          document.getElementById('render_tr').style.display = '';
          document.getElementById('r3').style.display = '';
          document.getElementById('r4').style.display = '';
          document.getElementById('width').style.display = '';
          document.getElementById('height').style.display = 'none';
          document.getElementById('target').style.display = '';
          document.getElementById('rows').style.display = 'none';
          document.getElementById('size').style.display = 'none';
          document.getElementById('post').style.display = 'none';
          document.getElementById('head').style.display = 'none';
          document.getElementById('stream').style.display = 'none';
          document.getElementById('recom').style.display = 'none';
          document.getElementById('action').style.display = 'none';
          document.getElementById('send').style.display = 'none';
          document.getElementById('face').style.display = '';
          document.getElementById('layout').style.display = 'none';
          document.getElementById('backg').style.display = 'none';
          document.getElementById('colorsc').style.display = '';
          document.getElementById('font').style.display = 'none';
          document.getElementById('lang').style.display = 'none';
          document.getElementById('lang_type').style.display = 'none';
          document.getElementById('bord').style.display = 'none';
          document.getElementById('share_type').style.display = 'none';
          document.getElementById('request_type').style.display = 'none';
          document.getElementById('twit').style.display = 'none';
          document.getElementById('art_table_meta').style.display = 'none';
          document.getElementById('art_table').style.display = '';
          document.getElementById('def_img_art_tr').style.display = 'none';
          document.getElementById('reg_red').style.display = 'none';
          document.getElementById('log_red').style.display = 'none';
          document.getElementById('reg_type').style.display = 'none';
          document.getElementById('fb_only').style.display = 'none';
          document.getElementById('url_value').style.display = '';
          document.getElementById('req_m').style.display = 'none';
          break;
      }
      document.getElementById('l_url').innerHTML = Drupal.t('Facebook Profile Url');
      document.getElementById('count_tr').style.display = 'none';
      document.getElementById('hor_place').style.display = 'none';
      document.getElementById('notification').innerHTML = Drupal.t('The Follow button social plugin allows people to follow to other Facebook users directly from your site.');
      break;

    case 'comment':
      document.getElementById('is_requerid_text_sp_facebook').style.display = 'none';
      document.getElementById('likebutton').style.display = '';
      document.getElementById('sendbutton').style.display = '';
      document.getElementById('follow').style.display = '';
      document.getElementById('comment').style.display = 'none';
      document.getElementById('actfeed').style.display = '';
      document.getElementById('recommendation').style.display = '';
      document.getElementById('likebox').style.display = '';
      document.getElementById('loginbutton').style.display = '';
      document.getElementById('facepile').style.display = '';
      document.getElementById('share').style.display = '';
      document.getElementById('request').style.display = '';
      document.getElementById('register').style.display = '';
      document.getElementById('socials').style.display = '';
      document.getElementById('likebutton_hover').style.display = 'none';
      document.getElementById('sendbutton_hover').style.display = 'none';
      document.getElementById('follow_hover').style.display = 'none';
      document.getElementById('comment_hover').style.display = '';
      document.getElementById('actfeed_hover').style.display = 'none';
      document.getElementById('recommendation_hover').style.display = 'none';
      document.getElementById('likebox_hover').style.display = 'none';
      document.getElementById('loginbutton_hover').style.display = 'none';
      document.getElementById('facepile_hover').style.display = 'none';
      document.getElementById('share_hover').style.display = 'none';
      document.getElementById('request_hover').style.display = 'none';
      document.getElementById('register_hover').style.display = 'none';
      document.getElementById('socials_hover').style.display = 'none';
      document.getElementById('likebutton_prev').style.display = 'none';
      document.getElementById('sendbutton_prev').style.display = 'none';
      document.getElementById('comment_prev').style.display = '';
      document.getElementById('like_box_prev').style.display = 'none';
      document.getElementById('follow_prev').style.display = 'none';
      document.getElementById('request_prev').style.display = 'none';
      document.getElementById('recommendation_prev').style.display = 'none';
      document.getElementById('activity_feed_prev').style.display = 'none';
      document.getElementById('facepile_prev').style.display = 'none';
      document.getElementById('share_prev').style.display = 'none';
      document.getElementById('login_prev').style.display = 'none';
      document.getElementById('register_prev').style.display = 'none';
      document.getElementById('social_prev').style.display = 'none';
      switch (document.getElementById('render').value) {
        case '1':
        case '2':
          document.getElementById('domain').style.display = 'none';
          document.getElementById('appid').style.display = 'none';
          document.getElementById('url_type').style.display = '';
          if (document.getElementById('url_change').value == 'normal') {
            document.getElementById('url_tr').style.display = '';
          }
          else {
            document.getElementById('url_tr').style.display = 'none';
          }
          document.getElementById('render_tr').style.display = '';
          document.getElementById('r3').style.display = 'none';
          document.getElementById('r4').style.display = 'none';
          document.getElementById('width').style.display = '';
          document.getElementById('height').style.display = '';
          document.getElementById('target').style.display = 'none';
          document.getElementById('rows').style.display = 'none';
          document.getElementById('size').style.display = 'none';
          document.getElementById('post').style.display = '';
          document.getElementById('head').style.display = 'none';
          document.getElementById('stream').style.display = 'none';
          document.getElementById('recom').style.display = 'none';
          document.getElementById('action').style.display = 'none';
          document.getElementById('send').style.display = 'none';
          document.getElementById('face').style.display = 'none';
          document.getElementById('layout').style.display = 'none';
          document.getElementById('backg').style.display = '';
          document.getElementById('colorsc').style.display = '';
          document.getElementById('font').style.display = '';
          document.getElementById('lang_type').style.display = '';
          if (document.getElementById('lang_change').value == 'normal') {
            document.getElementById('lang').style.display = '';
          }
          else {
            document.getElementById('lang').style.display = 'none';
          }
          document.getElementById('bord').style.display = 'none';
          document.getElementById('bord').style.display = 'none';
          document.getElementById('share_type').style.display = 'none';
          document.getElementById('request_type').style.display = 'none';
          document.getElementById('twit').style.display = 'none';
          document.getElementById('art_table').style.display = 'none';
          document.getElementById('art_table_meta').style.display = '';
          document.getElementById('def_img_art_tr').style.display = 'none';
          document.getElementById('reg_red').style.display = 'none';
          document.getElementById('log_red').style.display = 'none';
          document.getElementById('reg_type').style.display = 'none';
          document.getElementById('fb_only').style.display = 'none';
          document.getElementById('url_value').style.display = 'none';
          document.getElementById('req_m').style.display = 'none';
          break;

        case '3':
        case '4':
          spider_facebook_change_render('2');
          break;
      }
      document.getElementById('l_url').innerHTML = Drupal.t('Url');
      document.getElementById('count_tr').style.display = 'none';
      document.getElementById('hor_place').style.display = 'none';
      document.getElementById('notification').innerHTML = Drupal.t('The Comments social plugin lets users comment on any piece of content on your site.');
      break;

    case 'actfeed':
      document.getElementById('likebutton').style.display = '';
      document.getElementById('sendbutton').style.display = '';
      document.getElementById('follow').style.display = '';
      document.getElementById('comment').style.display = '';
      document.getElementById('actfeed').style.display = 'none';
      document.getElementById('recommendation').style.display = '';
      document.getElementById('likebox').style.display = '';
      document.getElementById('loginbutton').style.display = '';
      document.getElementById('facepile').style.display = '';
      document.getElementById('share').style.display = '';
      document.getElementById('request').style.display = '';
      document.getElementById('register').style.display = '';
      document.getElementById('socials').style.display = '';
      document.getElementById('likebutton_hover').style.display = 'none';
      document.getElementById('sendbutton_hover').style.display = 'none';
      document.getElementById('follow_hover').style.display = 'none';
      document.getElementById('comment_hover').style.display = 'none';
      document.getElementById('actfeed_hover').style.display = '';
      document.getElementById('recommendation_hover').style.display = 'none';
      document.getElementById('likebox_hover').style.display = 'none';
      document.getElementById('loginbutton_hover').style.display = 'none';
      document.getElementById('facepile_hover').style.display = 'none';
      document.getElementById('share_hover').style.display = 'none';
      document.getElementById('request_hover').style.display = 'none';
      document.getElementById('register_hover').style.display = 'none';
      document.getElementById('socials_hover').style.display = 'none';
      document.getElementById('likebutton_prev').style.display = 'none';
      document.getElementById('sendbutton_prev').style.display = 'none';
      document.getElementById('comment_prev').style.display = 'none';
      document.getElementById('like_box_prev').style.display = 'none';
      document.getElementById('follow_prev').style.display = 'none';
      document.getElementById('request_prev').style.display = 'none';
      document.getElementById('recommendation_prev').style.display = 'none';
      document.getElementById('activity_feed_prev').style.display = '';
      document.getElementById('facepile_prev').style.display = 'none';
      document.getElementById('share_prev').style.display = 'none';
      document.getElementById('login_prev').style.display = 'none';
      document.getElementById('register_prev').style.display = 'none';
      document.getElementById('social_prev').style.display = 'none';
      switch (document.getElementById('render').value) {
        case '1':
        case '2':
          document.getElementById('domain').style.display = '';
          document.getElementById('appid').style.display = '';
          document.getElementById('is_requerid_text_sp_facebook').style.display = '';
          document.getElementById('url_type').style.display = 'none';
          document.getElementById('url_tr').style.display = 'none';
          document.getElementById('render_tr').style.display = '';
          document.getElementById('r3').style.display = 'none';
          document.getElementById('r4').style.display = 'none';
          document.getElementById('width').style.display = '';
          document.getElementById('height').style.display = '';
          document.getElementById('target').style.display = '';
          document.getElementById('rows').style.display = 'none';
          document.getElementById('size').style.display = 'none';
          document.getElementById('post').style.display = 'none';
          document.getElementById('head').style.display = '';
          document.getElementById('stream').style.display = 'none';
          document.getElementById('recom').style.display = '';
          document.getElementById('action').style.display = '';
          document.getElementById('send').style.display = 'none';
          document.getElementById('face').style.display = 'none';
          document.getElementById('layout').style.display = 'none';
          document.getElementById('backg').style.display = '';
          document.getElementById('colorsc').style.display = '';
          document.getElementById('font').style.display = '';
          document.getElementById('lang_type').style.display = '';
          if (document.getElementById('lang_change').value == 'normal') {
            document.getElementById('lang').style.display = '';
          }
          else {
            document.getElementById('lang').style.display = 'none';
          }
          document.getElementById('bord').style.display = 'none';
          document.getElementById('bord').style.display = 'none';
          document.getElementById('share_type').style.display = 'none';
          document.getElementById('request_type').style.display = 'none';
          document.getElementById('twit').style.display = 'none';
          document.getElementById('art_table_meta').style.display = 'none';
          document.getElementById('art_table').style.display = '';
          document.getElementById('def_img_art_tr').style.display = 'none';
          document.getElementById('reg_red').style.display = 'none';
          document.getElementById('log_red').style.display = 'none';
          document.getElementById('reg_type').style.display = 'none';
          document.getElementById('fb_only').style.display = 'none';
          document.getElementById('url_value').style.display = 'none';
          document.getElementById('req_m').style.display = 'none';
          break;

        case '3':
        case '4':
          spider_facebook_change_render('2');
          break;
      }
      document.getElementById('l_url').innerHTML = Drupal.t('Facebook Page Url');
      document.getElementById('count_tr').style.display = 'none';
      document.getElementById('hor_place').style.display = 'none';
      document.getElementById('notification').innerHTML = Drupal.t('The Activity Feed social plugin shows users what their friends are doing on your site through likes and comments.');
      break;

    case 'recommendation':
      document.getElementById('likebutton').style.display = '';
      document.getElementById('sendbutton').style.display = '';
      document.getElementById('follow').style.display = '';
      document.getElementById('comment').style.display = '';
      document.getElementById('actfeed').style.display = '';
      document.getElementById('recommendation').style.display = 'none';
      document.getElementById('likebox').style.display = '';
      document.getElementById('loginbutton').style.display = '';
      document.getElementById('facepile').style.display = '';
      document.getElementById('share').style.display = '';
      document.getElementById('request').style.display = '';
      document.getElementById('register').style.display = '';
      document.getElementById('socials').style.display = '';
      document.getElementById('likebutton_hover').style.display = 'none';
      document.getElementById('sendbutton_hover').style.display = 'none';
      document.getElementById('follow_hover').style.display = 'none';
      document.getElementById('comment_hover').style.display = 'none';
      document.getElementById('actfeed_hover').style.display = 'none';
      document.getElementById('recommendation_hover').style.display = '';
      document.getElementById('likebox_hover').style.display = 'none';
      document.getElementById('loginbutton_hover').style.display = 'none';
      document.getElementById('facepile_hover').style.display = 'none';
      document.getElementById('share_hover').style.display = 'none';
      document.getElementById('request_hover').style.display = 'none';
      document.getElementById('register_hover').style.display = 'none';
      document.getElementById('socials_hover').style.display = 'none';
      document.getElementById('likebutton_prev').style.display = 'none';
      document.getElementById('sendbutton_prev').style.display = 'none';
      document.getElementById('comment_prev').style.display = 'none';
      document.getElementById('like_box_prev').style.display = 'none';
      document.getElementById('follow_prev').style.display = 'none';
      document.getElementById('request_prev').style.display = 'none';
      document.getElementById('recommendation_prev').style.display = '';
      document.getElementById('activity_feed_prev').style.display = 'none';
      document.getElementById('facepile_prev').style.display = 'none';
      document.getElementById('share_prev').style.display = 'none';
      document.getElementById('login_prev').style.display = 'none';
      document.getElementById('register_prev').style.display = 'none';
      document.getElementById('social_prev').style.display = 'none';
      switch (document.getElementById('render').value) {
        case '1':
        case '2':
          document.getElementById('domain').style.display = '';
          document.getElementById('appid').style.display = '';
          document.getElementById('is_requerid_text_sp_facebook').style.display = '';
          document.getElementById('url_type').style.display = 'none';
          document.getElementById('url_tr').style.display = 'none';
          document.getElementById('render_tr').style.display = '';
          document.getElementById('r3').style.display = 'none';
          document.getElementById('r4').style.display = 'none';
          document.getElementById('width').style.display = '';
          document.getElementById('height').style.display = '';
          document.getElementById('target').style.display = '';
          document.getElementById('rows').style.display = 'none';
          document.getElementById('size').style.display = 'none';
          document.getElementById('post').style.display = 'none';
          document.getElementById('head').style.display = '';
          document.getElementById('stream').style.display = 'none';
          document.getElementById('recom').style.display = '';
          document.getElementById('action').style.display = 'none';
          document.getElementById('send').style.display = 'none';
          document.getElementById('face').style.display = 'none';
          document.getElementById('layout').style.display = 'none';
          document.getElementById('backg').style.display = '';
          document.getElementById('colorsc').style.display = '';
          document.getElementById('font').style.display = '';
          document.getElementById('lang_type').style.display = '';
          if (document.getElementById('lang_change').value == 'normal') {
            document.getElementById('lang').style.display = '';
          }
          else {
            document.getElementById('lang').style.display = 'none';
          }
          document.getElementById('bord').style.display = 'none';
          document.getElementById('bord').style.display = 'none';
          document.getElementById('share_type').style.display = 'none';
          document.getElementById('request_type').style.display = 'none';
          document.getElementById('twit').style.display = 'none';
          document.getElementById('art_table_meta').style.display = 'none';
          document.getElementById('art_table').style.display = '';
          document.getElementById('def_img_art_tr').style.display = 'none';
          document.getElementById('reg_red').style.display = 'none';
          document.getElementById('log_red').style.display = 'none';
          document.getElementById('reg_type').style.display = 'none';
          document.getElementById('fb_only').style.display = 'none';
          document.getElementById('url_value').style.display = 'none';
          document.getElementById('req_m').style.display = 'none';
          break;

        case '3':
        case '4':
          spider_facebook_change_render('2');
          break;
      }
      document.getElementById('l_url').innerHTML = Drupal.t('Facebook Page Url');
      document.getElementById('count_tr').style.display = 'none';
      document.getElementById('hor_place').style.display = 'none';
      document.getElementById('notification').innerHTML = Drupal.t('The Recommendations social plugin gives users personalized suggestions for pages on your site they might like.');
      break;

    case 'likebox':
      document.getElementById('is_requerid_text_sp_facebook').style.display = 'none';
      document.getElementById('likebutton').style.display = '';
      document.getElementById('sendbutton').style.display = '';
      document.getElementById('follow').style.display = '';
      document.getElementById('comment').style.display = '';
      document.getElementById('actfeed').style.display = '';
      document.getElementById('recommendation').style.display = '';
      document.getElementById('likebox').style.display = 'none';
      document.getElementById('loginbutton').style.display = '';
      document.getElementById('facepile').style.display = '';
      document.getElementById('share').style.display = '';
      document.getElementById('request').style.display = '';
      document.getElementById('register').style.display = '';
      document.getElementById('socials').style.display = '';
      document.getElementById('likebutton_hover').style.display = 'none';
      document.getElementById('sendbutton_hover').style.display = 'none';
      document.getElementById('follow_hover').style.display = 'none';
      document.getElementById('comment_hover').style.display = 'none';
      document.getElementById('actfeed_hover').style.display = 'none';
      document.getElementById('recommendation_hover').style.display = 'none';
      document.getElementById('likebox_hover').style.display = '';
      document.getElementById('loginbutton_hover').style.display = 'none';
      document.getElementById('facepile_hover').style.display = 'none';
      document.getElementById('share_hover').style.display = 'none';
      document.getElementById('request_hover').style.display = 'none';
      document.getElementById('register_hover').style.display = 'none';
      document.getElementById('socials_hover').style.display = 'none';
      document.getElementById('likebutton_prev').style.display = 'none';
      document.getElementById('sendbutton_prev').style.display = 'none';
      document.getElementById('comment_prev').style.display = 'none';
      document.getElementById('like_box_prev').style.display = '';
      document.getElementById('follow_prev').style.display = 'none';
      document.getElementById('request_prev').style.display = 'none';
      document.getElementById('recommendation_prev').style.display = 'none';
      document.getElementById('activity_feed_prev').style.display = 'none';
      document.getElementById('facepile_prev').style.display = 'none';
      document.getElementById('share_prev').style.display = 'none';
      document.getElementById('login_prev').style.display = 'none';
      document.getElementById('register_prev').style.display = 'none';
      document.getElementById('social_prev').style.display = 'none';
      switch (document.getElementById('render').value) {
        case '1':
        case '2':
          document.getElementById('domain').style.display = 'none';
          document.getElementById('appid').style.display = 'none';
          document.getElementById('url_type').style.display = 'none';
          document.getElementById('url_change').value = 'normal';
          document.getElementById('url_tr').style.display = '';
          document.getElementById('edit-url-type-normal').checked = true;
          document.getElementById('render_tr').style.display = '';
          document.getElementById('r3').style.display = '';
          document.getElementById('r4').style.display = '';
          document.getElementById('width').style.display = '';
          document.getElementById('height').style.display = '';
          document.getElementById('target').style.display = 'none';
          document.getElementById('rows').style.display = 'none';
          document.getElementById('size').style.display = 'none';
          document.getElementById('post').style.display = 'none';
          document.getElementById('head').style.display = '';
          document.getElementById('stream').style.display = '';
          document.getElementById('recom').style.display = 'none';
          document.getElementById('action').style.display = 'none';
          document.getElementById('send').style.display = 'none';
          document.getElementById('face').style.display = '';
          document.getElementById('layout').style.display = 'none';
          document.getElementById('backg').style.display = '';
          document.getElementById('colorsc').style.display = '';
          document.getElementById('font').style.display = '';
          document.getElementById('lang_type').style.display = '';
          if (document.getElementById('lang_change').value == 'normal') {
            document.getElementById('lang').style.display = '';
          }
          else {
            document.getElementById('lang').style.display = 'none';
          }
          document.getElementById('bord').style.display = 'none';
          document.getElementById('bord').style.display = 'none';
          document.getElementById('share_type').style.display = 'none';
          document.getElementById('request_type').style.display = 'none';
          document.getElementById('twit').style.display = 'none';
          document.getElementById('art_table_meta').style.display = 'none';
          document.getElementById('art_table').style.display = '';
          document.getElementById('def_img_art_tr').style.display = 'none';
          document.getElementById('reg_red').style.display = 'none';
          document.getElementById('log_red').style.display = 'none';
          document.getElementById('reg_type').style.display = 'none';
          document.getElementById('fb_only').style.display = 'none';
          document.getElementById('url_value').style.display = 'none';
          document.getElementById('req_m').style.display = 'none';
          break;

        case '3':
          document.getElementById('domain').style.display = 'none';
          document.getElementById('appid').style.display = 'none';
          document.getElementById('url_type').style.display = 'none';
          document.getElementById('url_change').value = 'normal';
          document.getElementById('url_tr').style.display = '';
          document.getElementById('edit-url-type-normal').checked = true;
          document.getElementById('render').style.display = '';
          document.getElementById('r3').style.display = '';
          document.getElementById('r4').style.display = '';
          document.getElementById('width').style.display = '';
          document.getElementById('height').style.display = '';
          document.getElementById('target').style.display = 'none';
          document.getElementById('rows').style.display = 'none';
          document.getElementById('size').style.display = 'none';
          document.getElementById('post').style.display = 'none';
          document.getElementById('head').style.display = '';
          document.getElementById('stream').style.display = '';
          document.getElementById('recom').style.display = 'none';
          document.getElementById('action').style.display = 'none';
          document.getElementById('send').style.display = 'none';
          document.getElementById('face').style.display = '';
          document.getElementById('layout').style.display = 'none';
          document.getElementById('backg').style.display = '';
          document.getElementById('colorsc').style.display = '';
          document.getElementById('font').style.display = 'none';
          document.getElementById('lang').style.display = 'none';
          document.getElementById('lang_type').style.display = 'none';
          document.getElementById('bord').style.display = '';
          document.getElementById('share_type').style.display = 'none';
          document.getElementById('request_type').style.display = 'none';
          document.getElementById('twit').style.display = 'none';
          document.getElementById('art_table_meta').style.display = 'none';
          document.getElementById('art_table').style.display = '';
          document.getElementById('def_img_art_tr').style.display = 'none';
          document.getElementById('reg_red').style.display = 'none';
          document.getElementById('log_red').style.display = 'none';
          document.getElementById('reg_type').style.display = 'none';
          document.getElementById('fb_only').style.display = 'none';
          document.getElementById('url_value').style.display = 'none';
          document.getElementById('req_m').style.display = 'none';
          break;

        case '4':
          document.getElementById('domain').style.display = 'none';
          document.getElementById('appid').style.display = 'none';
          document.getElementById('url_type').style.display = 'none';
          document.getElementById('url_change').value = 'normal';
          document.getElementById('url_tr').style.display = '';
          document.getElementById('edit-url-type-normal').checked = true;
          document.getElementById('render_tr').style.display = '';
          document.getElementById('r3').style.display = '';
          document.getElementById('r4').style.display = '';
          document.getElementById('width').style.display = '';
          document.getElementById('height').style.display = '';
          document.getElementById('target').style.display = '';
          document.getElementById('rows').style.display = 'none';
          document.getElementById('size').style.display = 'none';
          document.getElementById('post').style.display = 'none';
          document.getElementById('head').style.display = '';
          document.getElementById('stream').style.display = '';
          document.getElementById('recom').style.display = 'none';
          document.getElementById('action').style.display = 'none';
          document.getElementById('send').style.display = 'none';
          document.getElementById('face').style.display = '';
          document.getElementById('layout').style.display = 'none';
          document.getElementById('backg').style.display = 'none';
          document.getElementById('colorsc').style.display = '';
          document.getElementById('font').style.display = 'none';
          document.getElementById('lang').style.display = 'none';
          document.getElementById('lang_type').style.display = 'none';
          document.getElementById('bord').style.display = 'none';
          document.getElementById('share_type').style.display = 'none';
          document.getElementById('request_type').style.display = 'none';
          document.getElementById('twit').style.display = 'none';
          document.getElementById('art_table_meta').style.display = 'none';
          document.getElementById('art_table').style.display = '';
          document.getElementById('def_img_art_tr').style.display = 'none';
          document.getElementById('reg_red').style.display = 'none';
          document.getElementById('log_red').style.display = 'none';
          document.getElementById('reg_type').style.display = 'none';
          document.getElementById('fb_only').style.display = 'none';
          document.getElementById('url_value').style.display = '';
          document.getElementById('req_m').style.display = 'none';
          break;
      }
      document.getElementById('l_url').innerHTML = Drupal.t('Facebook Page Url');
      document.getElementById('count_tr').style.display = 'none';
      document.getElementById('hor_place').style.display = 'none';
      document.getElementById('notification').innerHTML = Drupal.t('The Like Box social plugin enables users to like your Facebook Page and view its stream directly from your website.');
      break;

    case 'loginbutton':
      document.getElementById('likebutton').style.display = '';
      document.getElementById('sendbutton').style.display = '';
      document.getElementById('follow').style.display = '';
      document.getElementById('comment').style.display = '';
      document.getElementById('actfeed').style.display = '';
      document.getElementById('recommendation').style.display = '';
      document.getElementById('likebox').style.display = '';
      document.getElementById('loginbutton').style.display = 'none';
      document.getElementById('facepile').style.display = '';
      document.getElementById('share').style.display = '';
      document.getElementById('request').style.display = '';
      document.getElementById('register').style.display = '';
      document.getElementById('socials').style.display = '';
      document.getElementById('likebutton_hover').style.display = 'none';
      document.getElementById('sendbutton_hover').style.display = 'none';
      document.getElementById('follow_hover').style.display = 'none';
      document.getElementById('comment_hover').style.display = 'none';
      document.getElementById('actfeed_hover').style.display = 'none';
      document.getElementById('recommendation_hover').style.display = 'none';
      document.getElementById('likebox_hover').style.display = 'none';
      document.getElementById('loginbutton_hover').style.display = '';
      document.getElementById('facepile_hover').style.display = 'none';
      document.getElementById('share_hover').style.display = 'none';
      document.getElementById('request_hover').style.display = 'none';
      document.getElementById('register_hover').style.display = 'none';
      document.getElementById('socials_hover').style.display = 'none';
      document.getElementById('likebutton_prev').style.display = 'none';
      document.getElementById('sendbutton_prev').style.display = 'none';
      document.getElementById('comment_prev').style.display = 'none';
      document.getElementById('like_box_prev').style.display = 'none';
      document.getElementById('follow_prev').style.display = 'none';
      document.getElementById('request_prev').style.display = 'none';
      document.getElementById('recommendation_prev').style.display = 'none';
      document.getElementById('activity_feed_prev').style.display = 'none';
      document.getElementById('facepile_prev').style.display = 'none';
      document.getElementById('share_prev').style.display = 'none';
      document.getElementById('login_prev').style.display = '';
      document.getElementById('register_prev').style.display = 'none';
      document.getElementById('social_prev').style.display = 'none';
      switch (document.getElementById('render').value) {
        case '1':
        case '2':
          document.getElementById('domain').style.display = 'none';
          document.getElementById('appid').style.display = '';
          document.getElementById('is_requerid_text_sp_facebook').style.display = '';
          document.getElementById('url_type').style.display = 'none';
          document.getElementById('url_tr').style.display = 'none';
          document.getElementById('render_tr').style.display = '';
          document.getElementById('r3').style.display = 'none';
          document.getElementById('r4').style.display = 'none';
          document.getElementById('width').style.display = '';
          document.getElementById('height').style.display = 'none';
          document.getElementById('target').style.display = 'none';
          document.getElementById('rows').style.display = '';
          document.getElementById('size').style.display = 'none';
          document.getElementById('post').style.display = 'none';
          document.getElementById('head').style.display = 'none';
          document.getElementById('stream').style.display = 'none';
          document.getElementById('recom').style.display = 'none';
          document.getElementById('action').style.display = 'none';
          document.getElementById('send').style.display = 'none';
          document.getElementById('face').style.display = '';
          document.getElementById('layout').style.display = 'none';
          document.getElementById('backg').style.display = '';
          document.getElementById('colorsc').style.display = '';
          document.getElementById('font').style.display = '';
          document.getElementById('lang').style.display = 'none';
          document.getElementById('lang_type').style.display = 'none';
          document.getElementById('bord').style.display = 'none';
          document.getElementById('share_type').style.display = 'none';
          document.getElementById('request_type').style.display = 'none';
          document.getElementById('twit').style.display = 'none';
          document.getElementById('art_table_meta').style.display = 'none';
          document.getElementById('art_table').style.display = '';
          document.getElementById('def_img_art_tr').style.display = 'none';
          document.getElementById('reg_red').style.display = 'none';
          document.getElementById('log_red').style.display = 'none';
          document.getElementById('reg_type').style.display = 'none';
          document.getElementById('fb_only').style.display = 'none';
          document.getElementById('url_value').style.display = 'none';
          document.getElementById('req_m').style.display = 'none';
          break;

        case '3':
        case '4':
          spider_facebook_change_render('2');
          break;
      }
      document.getElementById('l_url').innerHTML = Drupal.t('Facebook Page Url');
      document.getElementById('count_tr').style.display = 'none';
      document.getElementById('hor_place').style.display = 'none';
      document.getElementById('notification').innerHTML = Drupal.t("The Login Button social plugin shows profile pictures of the user's friends who have already signed up for your site in addition to a login button.");
      break;

    case 'facepile':
      document.getElementById('is_requerid_text_sp_facebook').style.display = 'none';
      document.getElementById('edit-url-type-normal').checked = true;
      document.getElementById('likebutton').style.display = '';
      document.getElementById('sendbutton').style.display = '';
      document.getElementById('follow').style.display = '';
      document.getElementById('comment').style.display = '';
      document.getElementById('actfeed').style.display = '';
      document.getElementById('recommendation').style.display = '';
      document.getElementById('likebox').style.display = '';
      document.getElementById('loginbutton').style.display = '';
      document.getElementById('facepile').style.display = 'none';
      document.getElementById('share').style.display = '';
      document.getElementById('request').style.display = '';
      document.getElementById('register').style.display = '';
      document.getElementById('socials').style.display = '';
      document.getElementById('likebutton_hover').style.display = 'none';
      document.getElementById('sendbutton_hover').style.display = 'none';
      document.getElementById('follow_hover').style.display = 'none';
      document.getElementById('comment_hover').style.display = 'none';
      document.getElementById('actfeed_hover').style.display = 'none';
      document.getElementById('recommendation_hover').style.display = 'none';
      document.getElementById('likebox_hover').style.display = 'none';
      document.getElementById('loginbutton_hover').style.display = 'none';
      document.getElementById('facepile_hover').style.display = '';
      document.getElementById('share_hover').style.display = 'none';
      document.getElementById('request_hover').style.display = 'none';
      document.getElementById('register_hover').style.display = 'none';
      document.getElementById('socials_hover').style.display = 'none';
      document.getElementById('likebutton_prev').style.display = 'none';
      document.getElementById('sendbutton_prev').style.display = 'none';
      document.getElementById('comment_prev').style.display = 'none';
      document.getElementById('like_box_prev').style.display = 'none';
      document.getElementById('follow_prev').style.display = 'none';
      document.getElementById('request_prev').style.display = 'none';
      document.getElementById('recommendation_prev').style.display = 'none';
      document.getElementById('activity_feed_prev').style.display = 'none';
      document.getElementById('facepile_prev').style.display = '';
      document.getElementById('share_prev').style.display = 'none';
      document.getElementById('login_prev').style.display = 'none';
      document.getElementById('register_prev').style.display = 'none';
      document.getElementById('social_prev').style.display = 'none';
      switch (document.getElementById('render').value) {
        case '1':
        case '2':
          document.getElementById('domain').style.display = 'none';
          document.getElementById('appid').style.display = 'none';
          document.getElementById('url_type').style.display = 'none';
          document.getElementById('url_tr').style.display = '';
          document.getElementById('render_tr').style.display = '';
          document.getElementById('r3').style.display = '';
          document.getElementById('r4').style.display = '';
          document.getElementById('width').style.display = '';
          document.getElementById('height').style.display = 'none';
          document.getElementById('target').style.display = 'none';
          document.getElementById('rows').style.display = '';
          document.getElementById('size').style.display = '';
          document.getElementById('post').style.display = 'none';
          document.getElementById('head').style.display = 'none';
          document.getElementById('stream').style.display = 'none';
          document.getElementById('recom').style.display = 'none';
          document.getElementById('action').style.display = '';
          document.getElementById('send').style.display = 'none';
          document.getElementById('face').style.display = 'none';
          document.getElementById('layout').style.display = 'none';
          document.getElementById('backg').style.display = '';
          document.getElementById('colorsc').style.display = '';
          document.getElementById('font').style.display = '';
          document.getElementById('lang_type').style.display = '';
          if (document.getElementById('lang_change').value == 'normal') {
            document.getElementById('lang').style.display = '';
          }
          else {
            document.getElementById('lang').style.display = 'none';
          }
          document.getElementById('bord').style.display = 'none';
          document.getElementById('bord').style.display = 'none';
          document.getElementById('share_type').style.display = 'none';
          document.getElementById('request_type').style.display = 'none';
          document.getElementById('twit').style.display = 'none';
          document.getElementById('art_table_meta').style.display = 'none';
          document.getElementById('art_table').style.display = '';
          document.getElementById('def_img_art_tr').style.display = 'none';
          document.getElementById('reg_red').style.display = 'none';
          document.getElementById('log_red').style.display = 'none';
          document.getElementById('reg_type').style.display = 'none';
          document.getElementById('fb_only').style.display = 'none';
          document.getElementById('url_value').style.display = 'none';
          document.getElementById('req_m').style.display = 'none';
          break;

        case '3':
          document.getElementById('domain').style.display = 'none';
          document.getElementById('appid').style.display = 'none';
          document.getElementById('url_type').style.display = 'none';
          document.getElementById('url_tr').style.display = '';
          document.getElementById('render_tr').style.display = '';
          document.getElementById('r3').style.display = '';
          document.getElementById('r4').style.display = '';
          document.getElementById('width').style.display = '';
          document.getElementById('height').style.display = 'none';
          document.getElementById('target').style.display = 'none';
          document.getElementById('rows').style.display = '';
          document.getElementById('size').style.display = '';
          document.getElementById('post').style.display = 'none';
          document.getElementById('head').style.display = 'none';
          document.getElementById('stream').style.display = 'none';
          document.getElementById('recom').style.display = 'none';
          document.getElementById('action').style.display = '';
          document.getElementById('send').style.display = 'none';
          document.getElementById('face').style.display = 'none';
          document.getElementById('layout').style.display = 'none';
          document.getElementById('backg').style.display = '';
          document.getElementById('colorsc').style.display = '';
          document.getElementById('font').style.display = 'none';
          document.getElementById('lang').style.display = 'none';
          document.getElementById('lang_type').style.display = 'none';
          document.getElementById('bord').style.display = '';
          document.getElementById('share_type').style.display = 'none';
          document.getElementById('request_type').style.display = 'none';
          document.getElementById('twit').style.display = 'none';
          document.getElementById('art_table_meta').style.display = 'none';
          document.getElementById('art_table').style.display = '';
          document.getElementById('def_img_art_tr').style.display = 'none';
          document.getElementById('reg_red').style.display = 'none';
          document.getElementById('log_red').style.display = 'none';
          document.getElementById('reg_type').style.display = 'none';
          document.getElementById('fb_only').style.display = 'none';
          document.getElementById('url_value').style.display = 'none';
          document.getElementById('req_m').style.display = 'none';
          break;

        case '4':
          document.getElementById('domain').style.display = 'none';
          document.getElementById('appid').style.display = 'none';
          document.getElementById('url_type').style.display = 'none';
          document.getElementById('url_tr').style.display = '';
          document.getElementById('render_tr').style.display = '';
          document.getElementById('r3').style.display = '';
          document.getElementById('r4').style.display = '';
          document.getElementById('width').style.display = '';
          document.getElementById('height').style.display = 'none';
          document.getElementById('target').style.display = '';
          document.getElementById('rows').style.display = '';
          document.getElementById('size').style.display = '';
          document.getElementById('post').style.display = 'none';
          document.getElementById('head').style.display = 'none';
          document.getElementById('stream').style.display = 'none';
          document.getElementById('recom').style.display = 'none';
          document.getElementById('action').style.display = '';
          document.getElementById('send').style.display = 'none';
          document.getElementById('face').style.display = 'none';
          document.getElementById('layout').style.display = 'none';
          document.getElementById('backg').style.display = 'none';
          document.getElementById('colorsc').style.display = '';
          document.getElementById('font').style.display = 'none';
          document.getElementById('lang').style.display = 'none';
          document.getElementById('lang_type').style.display = 'none';
          document.getElementById('bord').style.display = 'none';
          document.getElementById('share_type').style.display = 'none';
          document.getElementById('request_type').style.display = 'none';
          document.getElementById('twit').style.display = 'none';
          document.getElementById('art_table_meta').style.display = 'none';
          document.getElementById('art_table').style.display = '';
          document.getElementById('reg_red').style.display = 'none';
          document.getElementById('log_red').style.display = 'none';
          document.getElementById('reg_type').style.display = 'none';
          document.getElementById('fb_only').style.display = 'none';
          document.getElementById('url_value').style.display = '';
          document.getElementById('req_m').style.display = 'none';
          break;
      }
      document.getElementById('count_tr').style.display = 'none';
      document.getElementById('hor_place').style.display = 'none';
      document.getElementById('l_url').innerHTML = Drupal.t('Facebook Page Url');
      document.getElementById('notification').innerHTML = Drupal.t("The Facepile social plugin displays the Facebook profile pictures of users who have liked your page or have signed up for your site.");
      break;

    case 'share':
      document.getElementById('is_requerid_text_sp_facebook').style.display = 'none';
      document.getElementById('likebutton').style.display = '';
      document.getElementById('sendbutton').style.display = '';
      document.getElementById('follow').style.display = '';
      document.getElementById('comment').style.display = '';
      document.getElementById('actfeed').style.display = '';
      document.getElementById('recommendation').style.display = '';
      document.getElementById('likebox').style.display = '';
      document.getElementById('loginbutton').style.display = '';
      document.getElementById('facepile').style.display = '';
      document.getElementById('share').style.display = 'none';
      document.getElementById('request').style.display = '';
      document.getElementById('register').style.display = '';
      document.getElementById('socials').style.display = '';
      document.getElementById('likebutton_hover').style.display = 'none';
      document.getElementById('sendbutton_hover').style.display = 'none';
      document.getElementById('follow_hover').style.display = 'none';
      document.getElementById('comment_hover').style.display = 'none';
      document.getElementById('actfeed_hover').style.display = 'none';
      document.getElementById('recommendation_hover').style.display = 'none';
      document.getElementById('likebox_hover').style.display = 'none';
      document.getElementById('loginbutton_hover').style.display = 'none';
      document.getElementById('facepile_hover').style.display = 'none';
      document.getElementById('share_hover').style.display = '';
      document.getElementById('request_hover').style.display = 'none';
      document.getElementById('register_hover').style.display = 'none';
      document.getElementById('socials_hover').style.display = 'none';
      document.getElementById('likebutton_prev').style.display = 'none';
      document.getElementById('sendbutton_prev').style.display = 'none';
      document.getElementById('comment_prev').style.display = 'none';
      document.getElementById('like_box_prev').style.display = 'none';
      document.getElementById('follow_prev').style.display = 'none';
      document.getElementById('request_prev').style.display = 'none';
      document.getElementById('recommendation_prev').style.display = 'none';
      document.getElementById('activity_feed_prev').style.display = 'none';
      document.getElementById('facepile_prev').style.display = 'none';
      document.getElementById('share_prev').style.display = '';
      document.getElementById('login_prev').style.display = 'none';
      document.getElementById('register_prev').style.display = 'none';
      document.getElementById('social_prev').style.display = 'none';
      document.getElementById('domain').style.display = 'none';
      document.getElementById('appid').style.display = 'none';
      document.getElementById('url_type').style.display = '';
      if (document.getElementById('url_change').value == 'normal') {
        document.getElementById('url_tr').style.display = '';
      }
      else {
        document.getElementById('url_tr').style.display = 'none';
      }
      document.getElementById('render_tr').style.display = 'none';
      document.getElementById('width').style.display = 'none';
      document.getElementById('height').style.display = 'none';
      document.getElementById('target').style.display = 'none';
      document.getElementById('rows').style.display = 'none';
      document.getElementById('size').style.display = 'none';
      document.getElementById('post').style.display = 'none';
      document.getElementById('head').style.display = 'none';
      document.getElementById('stream').style.display = 'none';
      document.getElementById('recom').style.display = 'none';
      document.getElementById('action').style.display = 'none';
      document.getElementById('send').style.display = 'none';
      document.getElementById('face').style.display = 'none';
      document.getElementById('layout').style.display = 'none';
      document.getElementById('backg').style.display = 'none';
      document.getElementById('colorsc').style.display = 'none';
      document.getElementById('font').style.display = 'none';
      document.getElementById('lang').style.display = 'none';
      document.getElementById('lang_type').style.display = 'none';
      document.getElementById('bord').style.display = 'none';
      document.getElementById('share_type').style.display = '';
      document.getElementById('request_type').style.display = 'none';
      document.getElementById('twit').style.display = 'none';
      document.getElementById('art_table_meta').style.display = 'none';
      document.getElementById('art_table').style.display = '';
      document.getElementById('def_img_art_tr').style.display = 'none';
      document.getElementById('reg_red').style.display = 'none';
      document.getElementById('log_red').style.display = 'none';
      document.getElementById('reg_type').style.display = 'none';
      document.getElementById('fb_only').style.display = 'none';
      document.getElementById('url_value').style.display = 'none';
      document.getElementById('req_m').style.display = 'none';
      document.getElementById('l_url').innerHTML = Drupal.t('Url');
      document.getElementById('note').style.display = '';
      document.getElementById('notification').innerHTML = Drupal.t("Facebook has replaced the Share Button with the Like Button. However, here the Share button provides additional functionality and, therefore, might be useful.");
      document.getElementById('css').style.display = '';
      document.getElementById('count_tr').style.display = 'none';
      document.getElementById('hor_place').style.display = 'none';
      break;

    case 'request':
      document.getElementById('likebutton').style.display = '';
      document.getElementById('sendbutton').style.display = '';
      document.getElementById('follow').style.display = '';
      document.getElementById('comment').style.display = '';
      document.getElementById('actfeed').style.display = '';
      document.getElementById('recommendation').style.display = '';
      document.getElementById('likebox').style.display = '';
      document.getElementById('loginbutton').style.display = '';
      document.getElementById('facepile').style.display = '';
      document.getElementById('share').style.display = '';
      document.getElementById('request').style.display = 'none';
      document.getElementById('register').style.display = '';
      document.getElementById('socials').style.display = '';
      document.getElementById('likebutton_hover').style.display = 'none';
      document.getElementById('sendbutton_hover').style.display = 'none';
      document.getElementById('follow_hover').style.display = 'none';
      document.getElementById('comment_hover').style.display = 'none';
      document.getElementById('actfeed_hover').style.display = 'none';
      document.getElementById('recommendation_hover').style.display = 'none';
      document.getElementById('likebox_hover').style.display = 'none';
      document.getElementById('loginbutton_hover').style.display = 'none';
      document.getElementById('facepile_hover').style.display = 'none';
      document.getElementById('share_hover').style.display = 'none';
      document.getElementById('request_hover').style.display = '';
      document.getElementById('register_hover').style.display = 'none';
      document.getElementById('socials_hover').style.display = 'none';
      document.getElementById('likebutton_prev').style.display = 'none';
      document.getElementById('sendbutton_prev').style.display = 'none';
      document.getElementById('comment_prev').style.display = 'none';
      document.getElementById('like_box_prev').style.display = 'none';
      document.getElementById('follow_prev').style.display = 'none';
      document.getElementById('request_prev').style.display = '';
      document.getElementById('recommendation_prev').style.display = 'none';
      document.getElementById('activity_feed_prev').style.display = 'none';
      document.getElementById('facepile_prev').style.display = 'none';
      document.getElementById('share_prev').style.display = 'none';
      document.getElementById('login_prev').style.display = 'none';
      document.getElementById('register_prev').style.display = 'none';
      document.getElementById('social_prev').style.display = 'none';
      document.getElementById('domain').style.display = 'none';
      document.getElementById('appid').style.display = '';
      document.getElementById('is_requerid_text_sp_facebook').style.display = '';
      document.getElementById('url_type').style.display = 'none';
      document.getElementById('url_tr').style.display = 'none';
      document.getElementById('render_tr').style.display = 'none';
      document.getElementById('width').style.display = 'none';
      document.getElementById('height').style.display = 'none';
      document.getElementById('target').style.display = 'none';
      document.getElementById('rows').style.display = 'none';
      document.getElementById('size').style.display = 'none';
      document.getElementById('post').style.display = 'none';
      document.getElementById('head').style.display = 'none';
      document.getElementById('stream').style.display = 'none';
      document.getElementById('recom').style.display = 'none';
      document.getElementById('action').style.display = 'none';
      document.getElementById('send').style.display = 'none';
      document.getElementById('face').style.display = 'none';
      document.getElementById('layout').style.display = 'none';
      document.getElementById('backg').style.display = 'none';
      document.getElementById('colorsc').style.display = 'none';
      document.getElementById('font').style.display = 'none';
      document.getElementById('lang').style.display = 'none';
      document.getElementById('lang_type').style.display = 'none';
      document.getElementById('bord').style.display = 'none';
      document.getElementById('share_type').style.display = 'none';
      document.getElementById('request_type').style.display = '';
      document.getElementById('twit').style.display = 'none';
      document.getElementById('art_table_meta').style.display = 'none';
      document.getElementById('art_table').style.display = '';
      document.getElementById('def_img_art_tr').style.display = 'none';
      document.getElementById('reg_red').style.display = 'none';
      document.getElementById('log_red').style.display = 'none';
      document.getElementById('reg_type').style.display = 'none';
      document.getElementById('fb_only').style.display = 'none';
      document.getElementById('url_value').style.display = 'none';
      document.getElementById('req_m').style.display = '';
      document.getElementById('l_url').innerHTML = Drupal.t('Facebook Page Url');
      document.getElementById('css').style.display = '';
      document.getElementById('count_tr').style.display = 'none';
      document.getElementById('hor_place').style.display = 'none';
      document.getElementById('notification').innerHTML = Drupal.t("The Request Dialog sends a Request from one user (the sender) to one or more users (the recipients).</br>The Request Dialog can be used to send a Request directly from one user to another or display a Multi Friend Selector Dialog, allowing the sending user to select multiple recipient users.");
      break;

    case 'register':
      document.getElementById('likebutton').style.display = '';
      document.getElementById('sendbutton').style.display = '';
      document.getElementById('follow').style.display = '';
      document.getElementById('comment').style.display = '';
      document.getElementById('actfeed').style.display = '';
      document.getElementById('recommendation').style.display = '';
      document.getElementById('likebox').style.display = '';
      document.getElementById('loginbutton').style.display = '';
      document.getElementById('facepile').style.display = '';
      document.getElementById('share').style.display = '';
      document.getElementById('request').style.display = '';
      document.getElementById('register').style.display = 'none';
      document.getElementById('socials').style.display = '';
      document.getElementById('likebutton_hover').style.display = 'none';
      document.getElementById('sendbutton_hover').style.display = 'none';
      document.getElementById('follow_hover').style.display = 'none';
      document.getElementById('comment_hover').style.display = 'none';
      document.getElementById('actfeed_hover').style.display = 'none';
      document.getElementById('recommendation_hover').style.display = 'none';
      document.getElementById('likebox_hover').style.display = 'none';
      document.getElementById('loginbutton_hover').style.display = 'none';
      document.getElementById('facepile_hover').style.display = 'none';
      document.getElementById('share_hover').style.display = 'none';
      document.getElementById('request_hover').style.display = 'none';
      document.getElementById('register_hover').style.display = '';
      document.getElementById('socials_hover').style.display = 'none';
      document.getElementById('likebutton_prev').style.display = 'none';
      document.getElementById('sendbutton_prev').style.display = 'none';
      document.getElementById('comment_prev').style.display = 'none';
      document.getElementById('like_box_prev').style.display = 'none';
      document.getElementById('follow_prev').style.display = 'none';
      document.getElementById('request_prev').style.display = 'none';
      document.getElementById('recommendation_prev').style.display = 'none';
      document.getElementById('activity_feed_prev').style.display = 'none';
      document.getElementById('facepile_prev').style.display = 'none';
      document.getElementById('share_prev').style.display = 'none';
      document.getElementById('login_prev').style.display = 'none';
      document.getElementById('register_prev').style.display = '';
      document.getElementById('social_prev').style.display = 'none';
      document.getElementById('domain').style.display = '';
      document.getElementById('appid').style.display = '';
      document.getElementById('is_requerid_text_sp_facebook').style.display = '';
      document.getElementById('url_type').style.display = 'none';
      document.getElementById('url_tr').style.display = 'none';
      document.getElementById('render_tr').style.display = 'none';
      document.getElementById('width').style.display = 'none';
      document.getElementById('height').style.display = 'none';
      document.getElementById('target').style.display = 'none';
      document.getElementById('rows').style.display = 'none';
      document.getElementById('size').style.display = 'none';
      document.getElementById('post').style.display = 'none';
      document.getElementById('head').style.display = 'none';
      document.getElementById('stream').style.display = 'none';
      document.getElementById('recom').style.display = 'none';
      document.getElementById('action').style.display = 'none';
      document.getElementById('send').style.display = 'none';
      document.getElementById('face').style.display = 'none';
      document.getElementById('layout').style.display = 'none';
      document.getElementById('backg').style.display = 'none';
      document.getElementById('colorsc').style.display = 'none';
      document.getElementById('font').style.display = 'none';
      document.getElementById('lang').style.display = 'none';
      document.getElementById('lang_type').style.display = 'none';
      document.getElementById('bord').style.display = 'none';
      document.getElementById('share_type').style.display = 'none';
      document.getElementById('request_type').style.display = 'none';
      document.getElementById('twit').style.display = 'none';
      document.getElementById('art_table_meta').style.display = 'none';
      document.getElementById('art_table').style.display = '';
      document.getElementById('def_img_art_tr').style.display = 'none';
      document.getElementById('reg_red').style.display = '';
      document.getElementById('log_red').style.display = '';
      document.getElementById('reg_type').style.display = '';
      document.getElementById('fb_only').style.display = '';
      document.getElementById('fb_only').style.display = '';
      document.getElementById('url_value').style.display = 'none';
      document.getElementById('req_m').style.display = 'none';
      document.getElementById('l_url').innerHTML = Drupal.t('URL');
      document.getElementById('css').style.display = '';
      document.getElementById('count_tr').style.display = 'none';
      document.getElementById('hor_place').style.display = 'none';
      document.getElementById('notification').innerHTML = Drupal.t("The registration social plugin allows users to easily sign up for your website with their Facebook account.");
      break;

    case 'socials':
      document.getElementById('is_requerid_text_sp_facebook').style.display = 'none';
      document.getElementById('likebutton').style.display = '';
      document.getElementById('sendbutton').style.display = '';
      document.getElementById('follow').style.display = '';
      document.getElementById('comment').style.display = '';
      document.getElementById('actfeed').style.display = '';
      document.getElementById('recommendation').style.display = '';
      document.getElementById('likebox').style.display = '';
      document.getElementById('loginbutton').style.display = '';
      document.getElementById('facepile').style.display = '';
      document.getElementById('share').style.display = '';
      document.getElementById('request').style.display = '';
      document.getElementById('register').style.display = '';
      document.getElementById('socials').style.display = 'none';
      document.getElementById('likebutton_hover').style.display = 'none';
      document.getElementById('sendbutton_hover').style.display = 'none';
      document.getElementById('follow_hover').style.display = 'none';
      document.getElementById('comment_hover').style.display = 'none';
      document.getElementById('actfeed_hover').style.display = 'none';
      document.getElementById('recommendation_hover').style.display = 'none';
      document.getElementById('likebox_hover').style.display = 'none';
      document.getElementById('loginbutton_hover').style.display = 'none';
      document.getElementById('facepile_hover').style.display = 'none';
      document.getElementById('share_hover').style.display = 'none';
      document.getElementById('request_hover').style.display = 'none';
      document.getElementById('register_hover').style.display = 'none';
      document.getElementById('socials_hover').style.display = '';
      document.getElementById('likebutton_prev').style.display = 'none';
      document.getElementById('sendbutton_prev').style.display = 'none';
      document.getElementById('comment_prev').style.display = 'none';
      document.getElementById('like_box_prev').style.display = 'none';
      document.getElementById('follow_prev').style.display = 'none';
      document.getElementById('request_prev').style.display = 'none';
      document.getElementById('recommendation_prev').style.display = 'none';
      document.getElementById('activity_feed_prev').style.display = 'none';
      document.getElementById('facepile_prev').style.display = 'none';
      document.getElementById('share_prev').style.display = 'none';
      document.getElementById('login_prev').style.display = 'none';
      document.getElementById('register_prev').style.display = 'none';
      document.getElementById('social_prev').style.display = '';
      document.getElementById('domain').style.display = 'none';
      document.getElementById('appid').style.display = '';
      document.getElementById('url_type').style.display = '';
      if (document.getElementById('url_change').value == 'normal') {
        document.getElementById('url_tr').style.display = '';
      }
      else {
        document.getElementById('url_tr').style.display = 'none';
      }
      document.getElementById('render_tr').style.display = 'none';
      document.getElementById('r3').style.display = 'none';
      document.getElementById('r4').style.display = 'none';
      document.getElementById('width').style.display = 'none';
      document.getElementById('height').style.display = 'none';
      document.getElementById('target').style.display = 'none';
      document.getElementById('rows').style.display = 'none';
      document.getElementById('size').style.display = 'none';
      document.getElementById('post').style.display = 'none';
      document.getElementById('head').style.display = 'none';
      document.getElementById('stream').style.display = 'none';
      document.getElementById('recom').style.display = 'none';
      document.getElementById('action').style.display = 'none';
      document.getElementById('send').style.display = 'none';
      document.getElementById('face').style.display = 'none';
      document.getElementById('layout').style.display = 'none';
      document.getElementById('backg').style.display = 'none';
      document.getElementById('colorsc').style.display = 'none';
      document.getElementById('font').style.display = 'none';
      document.getElementById('lang_type').style.display = '';
      if (document.getElementById('lang_change').value == 'normal') {
        document.getElementById('lang').style.display = '';
      }
      else {
        document.getElementById('lang').style.display = 'none';
      }
      document.getElementById('bord').style.display = 'none';
      document.getElementById('share_type').style.display = 'none';
      document.getElementById('request_type').style.display = 'none';
      document.getElementById('twit').style.display = 'none';
      document.getElementById('art_table_meta').style.display = '';
      document.getElementById('art_table').style.display = 'none';
      document.getElementById('def_img_art_tr').style.display = '';
      document.getElementById('reg_red').style.display = 'none';
      document.getElementById('log_red').style.display = 'none';
      document.getElementById('reg_type').style.display = 'none';
      document.getElementById('fb_only').style.display = 'none';
      document.getElementById('url_value').style.display = 'none';
      document.getElementById('req_m').style.display = 'none';
      document.getElementById('css').style.display = '';
      document.getElementById('count_tr').style.display = '';
      document.getElementById('hor_place').style.display = '';
      document.getElementById('notification').innerHTML = Drupal.t('A set of social widgets for LinkedIn, Twitter, Google, and Facebook.');
      break;
  }
}

/**
 * Change type.
 */
function spider_facebook_change_type(type) {
  document.getElementById('type').value = type;
  spider_facebook_change();
}

/**
 * Change render.
 */
function spider_facebook_change_render(render) {
  document.getElementById('render').value = render;
  switch (render) {
    case '2':
      document.getElementById('xfbml').style.display = 'none';
      document.getElementById('html5').style.display = '';
      document.getElementById('iframe').style.display = '';
      document.getElementById('url').style.display = '';
      document.getElementById('xfbml_hover').style.display = '';
      document.getElementById('html5_hover').style.display = 'none';
      document.getElementById('iframe_hover').style.display = 'none';
      document.getElementById('url_hover').style.display = 'none';
      break;

    case '1':
      document.getElementById('xfbml').style.display = '';
      document.getElementById('html5').style.display = 'none';
      document.getElementById('iframe').style.display = '';
      document.getElementById('url').style.display = '';
      document.getElementById('xfbml_hover').style.display = 'none';
      document.getElementById('html5_hover').style.display = '';
      document.getElementById('iframe_hover').style.display = 'none';
      document.getElementById('url_hover').style.display = 'none';
      break;

    case '3':
      document.getElementById('xfbml').style.display = '';
      document.getElementById('html5').style.display = '';
      document.getElementById('iframe').style.display = 'none';
      document.getElementById('url').style.display = '';
      document.getElementById('xfbml_hover').style.display = 'none';
      document.getElementById('html5_hover').style.display = 'none';
      document.getElementById('iframe_hover').style.display = '';
      document.getElementById('url_hover').style.display = 'none';
      break;

    case '4':
      document.getElementById('xfbml').style.display = '';
      document.getElementById('html5').style.display = '';
      document.getElementById('iframe').style.display = '';
      document.getElementById('url').style.display = 'none';
      document.getElementById('xfbml_hover').style.display = 'none';
      document.getElementById('html5_hover').style.display = 'none';
      document.getElementById('iframe_hover').style.display = 'none';
      document.getElementById('url_hover').style.display = '';
      break;
  }
  spider_facebook_change();
}

/**
 * Change url.
 */
function spider_facebook_change_url(url) {
  document.getElementById('url_change').value = url;
  spider_facebook_change();
}

/**
 * Change lang.
 */
function spider_facebook_change_lang(lang) {
  document.getElementById('lang_change').value = lang;
  spider_facebook_change();
}
