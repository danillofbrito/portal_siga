<?php
/**
 * @file
 * siga_sorocaba_config.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function siga_sorocaba_config_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: main-menu_anuncie:node/15
  $menu_links['main-menu_anuncie:node/15'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'node/15',
    'router_path' => 'node/%',
    'link_title' => 'Anuncie',
    'options' => array(
      'attributes' => array(),
      'identifier' => 'main-menu_anuncie:node/15',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -48,
    'customized' => 1,
  );
  // Exported menu link: main-menu_anuncios:admin/anuncios
  $menu_links['main-menu_anuncios:admin/anuncios'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'admin/anuncios',
    'router_path' => 'admin/anuncios',
    'link_title' => 'Anuncios',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'main-menu_anuncios:admin/anuncios',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 1,
    'parent_identifier' => 'main-menu_painel-de-controle:node/33',
  );
  // Exported menu link: main-menu_categorias:admin/categorias
  $menu_links['main-menu_categorias:admin/categorias'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'admin/categorias',
    'router_path' => 'admin/categorias',
    'link_title' => 'Categorias',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'main-menu_categorias:admin/categorias',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 1,
    'parent_identifier' => 'main-menu_painel-de-controle:node/33',
  );
  // Exported menu link: main-menu_contato:node/14
  $menu_links['main-menu_contato:node/14'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'node/14',
    'router_path' => 'node/%',
    'link_title' => 'Contato',
    'options' => array(
      'attributes' => array(),
      'identifier' => 'main-menu_contato:node/14',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -47,
    'customized' => 1,
  );
  // Exported menu link: main-menu_home:<front>
  $menu_links['main-menu_home:<front>'] = array(
    'menu_name' => 'main-menu',
    'link_path' => '<front>',
    'router_path' => '',
    'link_title' => 'Home',
    'options' => array(
      'identifier' => 'main-menu_home:<front>',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 1,
    'has_children' => 1,
    'expanded' => 0,
    'weight' => -50,
    'customized' => 1,
  );
  // Exported menu link: main-menu_localizacao:admin/structure/taxonomy/localizacao
  $menu_links['main-menu_localizacao:admin/structure/taxonomy/localizacao'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'admin/structure/taxonomy/localizacao',
    'router_path' => 'admin/structure/taxonomy/%',
    'link_title' => 'Localizacao',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'main-menu_localizacao:admin/structure/taxonomy/localizacao',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -44,
    'customized' => 1,
    'parent_identifier' => 'main-menu_painel-de-controle:node/33',
  );
  // Exported menu link: main-menu_noticias:noticias
  $menu_links['main-menu_noticias:noticias'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'noticias',
    'router_path' => 'noticias',
    'link_title' => 'Noticias',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'main-menu_noticias:noticias',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -48,
    'customized' => 1,
    'parent_identifier' => 'main-menu_painel-de-controle:node/33',
  );
  // Exported menu link: main-menu_painel-de-controle:node/33
  $menu_links['main-menu_painel-de-controle:node/33'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'node/33',
    'router_path' => 'node/%',
    'link_title' => 'Painel de Controle',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'main-menu_painel-de-controle:node/33',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 1,
    'expanded' => 0,
    'weight' => -46,
    'customized' => 1,
  );
  // Exported menu link: main-menu_quem-somos:node/16
  $menu_links['main-menu_quem-somos:node/16'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'node/16',
    'router_path' => 'node/%',
    'link_title' => 'Quem somos',
    'options' => array(
      'attributes' => array(),
      'identifier' => 'main-menu_quem-somos:node/16',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -49,
    'customized' => 1,
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Anuncie');
  t('Anuncios');
  t('Categorias');
  t('Contato');
  t('Home');
  t('Localizacao');
  t('Noticias');
  t('Painel de Controle');
  t('Quem somos');


  return $menu_links;
}
