<?php
/*
------------------------------------------------------------
    Peak for Drupal 7.x - Version 1.1                           
    Copyright (C) 2012 esors.com All Rights Reserved.           
    @license - Copyrighted Commercial Software                   
------------------------------------------------------------
    Theme Name: Peak                                            
    Author: ESORS                                           
    Date: 25th July 2012                                        
    Website: http://www.esors.com/                              
------------------------------------------------------------
    This file may not be redistributed in whole or   
    significant part.                                            
------------------------------------------------------------*/ 

function peak_preprocess_html(&$vars) {

  function get_peak_style() {
    $style = theme_get_setting('peak_style');
	if (empty($style)){
      $style = 'white_blue';
	}
    return $style;
  }

  drupal_add_css(drupal_get_path('theme','peak') . '/css/' . get_peak_style() . '.css', array('group' => CSS_THEME, 'every_page' => TRUE));
  drupal_add_css(path_to_theme() . '/css/ie7.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'IE 7', '!IE' => FALSE), 'preprocess' => FALSE));
  drupal_add_css(path_to_theme() . '/css/ie8.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'IE 8', '!IE' => FALSE), 'preprocess' => FALSE));
}

function peak_preprocess_page(&$vars) {

  if (isset($vars['main_menu'])) {
    $vars['primary_nav'] = theme('links__system_main_menu', array(
      'links' => $vars['main_menu'],
      'attributes' => array(
        'class' => array('links', 'inline', 'main-menu'),
      ),
      'heading' => array(
        'text' => t('Main menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      )
    ));
  }
  else {
    $vars['primary_nav'] = FALSE;
  }
  if (isset($vars['secondary_menu'])) {
    $vars['secondary_nav'] = theme('links__system_secondary_menu', array(
      'links' => $vars['secondary_menu'],
      'attributes' => array(
        'class' => array('links', 'inline', 'secondary-menu'),
      ),
      'heading' => array(
        'text' => t('Secondary menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      )
    ));
  }
  else {
    $vars['secondary_nav'] = FALSE;
  }
  
  $vars['main_top'] = count(array_filter(array($vars['page']['main_top_one'], $vars['page']['main_top_two'], $vars['page']['main_top_three'], $vars['page']['main_top_four'])));

  if (($vars['main_top'] == 3)&&(empty($vars['page']['main_top_two']))) {
    $vars['main_top'] = '3 shift-left';
  }

  if (($vars['main_top'] == 3)&&(empty($vars['page']['main_top_three']))) {
    $vars['main_top'] = '3 shift-right';
  }

  $vars['main_bottom'] = count(array_filter(array($vars['page']['main_bottom_one'], $vars['page']['main_bottom_two'], $vars['page']['main_bottom_three'], $vars['page']['main_bottom_four'])));
  $vars['footer'] = count(array_filter(array($vars['page']['footer_one'], $vars['page']['footer_two'], $vars['page']['footer_three'], $vars['page']['footer_four'])));
}

function peak_menu_link(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';

  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }

  $element['#localized_options']['html'] = TRUE;
  $linktext = '<span><span>' . $element['#title'] . '</span></span>';

  $output = l($linktext, $element['#href'], $element['#localized_options']);
  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

function peak_form_alter(&$form, &$form_state, $form_id) {
  if ($form_id == 'search_block_form') {
    $form['actions']['submit']['#value'] = t(''); // Change the text on the submit button 
  } 
}

function peak_filter_tips($tips, $long = FALSE, $extra = '') {
  return '';
}

function peak_filter_tips_more_info () {
  return '';
}

function peak_button($vars) {
  $element = $vars['element'];
  $element['#attributes']['type'] = 'submit';
  element_set_attributes($element, array('id', 'name', 'value'));

  $element['#attributes']['class'][] = 'form-' . $element['#button_type'];
  if (!empty($element['#attributes']['disabled'])) {
    $element['#attributes']['class'][] = 'form-button-disabled';
  }
  return '<span class="button"><input' . drupal_attributes($element['#attributes']) . ' /></span>';
}