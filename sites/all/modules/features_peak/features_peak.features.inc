<?php
/**
 * @file
 * features_peak.features.inc
 */

/**
 * Implements hook_views_api().
 */
function features_peak_views_api() {
  return array("version" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function features_peak_node_info() {
  $items = array(
    'showcase' => array(
      'name' => t('Showcase'),
      'base' => 'node_content',
      'description' => t('Use for showcase content.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
