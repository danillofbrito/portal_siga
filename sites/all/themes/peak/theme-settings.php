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

 $defaults = array(
    'peak_style' => 'white_blue',
  );

  $form['tnt_container']['style_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Peak color setting'),
    '#description' => t('Use color setting to change default color for your theme.'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );

  $form['tnt_container']['style_settings']['peak_style'] = array(
    '#type' => 'select',
    '#title' => t('Color'),
    '#default_value' => theme_get_setting('peak_style'),
    '#options' => array(
      'black_orange' => t('Black Orange'),
      'black_green'  => t('Black Green'),
      'black_blue'   => t('Black Blue'),
	  'black_cherry' => t('Black Cherry'),
      'black_red'    => t('Black Red'),
      'white_orange' => t('White Orange'),
      'white_green'  => t('White Green'),
      'white_blue'   => t('White Blue'),
	  'white_cherry' => t('White Cherry'),
      'white_red'    => t('White Red'),
    ),
  );
  
  return $form;
?>