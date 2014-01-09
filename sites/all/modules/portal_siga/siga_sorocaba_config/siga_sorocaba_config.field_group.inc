<?php
/**
 * @file
 * siga_sorocaba_config.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function siga_sorocaba_config_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_contato|node|anuncios|default';
  $field_group->group_name = 'group_contato';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'anuncios';
  $field_group->mode = 'default';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Informações de Contato',
    'weight' => '13',
    'children' => array(
      0 => 'field_endereco',
      1 => 'field_localizacao',
      2 => 'field_contato',
      3 => 'field_email',
      4 => 'field_site',
      5 => 'field_facebook',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-contato field-group-fieldset',
      ),
    ),
  );
  $export['group_contato|node|anuncios|default'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_contato|node|anuncios|form';
  $field_group->group_name = 'group_contato';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'anuncios';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Informações de Contato',
    'weight' => '16',
    'children' => array(
      0 => 'field_endereco',
      1 => 'field_localizacao',
      2 => 'field_contato',
      3 => 'field_site',
      4 => 'field_facebook',
      5 => 'field_email',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-contato field-group-fieldset',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_contato|node|anuncios|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_contato|node|anuncios|full';
  $field_group->group_name = 'group_contato';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'anuncios';
  $field_group->mode = 'full';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Contato',
    'weight' => '5',
    'children' => array(
      0 => 'field_endereco',
      1 => 'field_localizacao',
      2 => 'field_contato',
      3 => 'field_site',
      4 => 'field_facebook',
      5 => 'field_email',
    ),
    'format_type' => 'div',
    'format_settings' => array(
      'label' => 'Contato',
      'instance_settings' => array(
        'classes' => 'cufon',
        'description' => '',
        'show_label' => '1',
        'label_element' => 'h3',
        'effect' => 'none',
        'speed' => 'none',
      ),
      'formatter' => 'open',
    ),
  );
  $export['group_contato|node|anuncios|full'] = $field_group;

  return $export;
}
