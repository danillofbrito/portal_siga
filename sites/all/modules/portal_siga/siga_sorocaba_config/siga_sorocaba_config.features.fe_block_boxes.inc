<?php
/**
 * @file
 * siga_sorocaba_config.features.fe_block_boxes.inc
 */

/**
 * Implements hook_default_fe_block_boxes().
 */
function siga_sorocaba_config_default_fe_block_boxes() {
  $export = array();

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Banner reduzido';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'banner_reduzido';
  $fe_block_boxes->body = '<p><img alt="" src="sites/default/files/1552791_799209093427661_2100668041_n.jpg" /></p>
';

  $export['banner_reduzido'] = $fe_block_boxes;

  return $export;
}
