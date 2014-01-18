<?php
/**
 * @file
 * siga_sorocaba_config.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function siga_sorocaba_config_user_default_roles() {
  $roles = array();

  // Exported role: administrator.
  $roles['administrator'] = array(
    'name' => 'administrator',
    'weight' => 2,
  );

  // Exported role: colunista.
  $roles['colunista'] = array(
    'name' => 'colunista',
    'weight' => 3,
  );

  return $roles;
}
