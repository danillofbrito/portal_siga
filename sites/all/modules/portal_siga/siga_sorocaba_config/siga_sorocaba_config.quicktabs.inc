<?php
/**
 * @file
 * siga_sorocaba_config.quicktabs.inc
 */

/**
 * Implements hook_quicktabs_default_quicktabs().
 */
function siga_sorocaba_config_quicktabs_default_quicktabs() {
  $export = array();

  $quicktabs = new stdClass();
  $quicktabs->disabled = FALSE; /* Edit this to true to make a default quicktabs disabled initially */
  $quicktabs->api_version = 1;
  $quicktabs->machine_name = 'front_right';
  $quicktabs->ajax = 0;
  $quicktabs->hide_empty_tabs = FALSE;
  $quicktabs->default_tab = 0;
  $quicktabs->title = 'Front Right';
  $quicktabs->tabs = array(
    0 => array(
      'bid' => 'views_delta_filmes_em_cartaz-block',
      'hide_title' => 1,
      'title' => 'Filmes',
      'weight' => '-100',
      'type' => 'block',
    ),
    1 => array(
      'nid' => '23',
      'teaser' => 1,
      'hide_title' => 1,
      'title' => 'Cinemas',
      'weight' => '-99',
      'type' => 'node',
    ),
  );
  $quicktabs->renderer = 'quicktabs';
  $quicktabs->style = 'nostyle';
  $quicktabs->options = array();

  // Translatables
  // Included for use with string extractors like potx.
  t('Cinemas');
  t('Filmes');
  t('Front Right');

  $export['front_right'] = $quicktabs;

  return $export;
}
