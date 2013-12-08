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
?>

<?php if ($block->region =='primary_menu' || $block->region =='search_box' || $block->region =='content'): ?>
  <?php print $content; ?>
<?php else:?>
  <div id="block-<?php print $block->module . '-' . $block->delta; ?>" class="<?php print $classes; ?>" <?php print $attributes; ?>>
    <div class="block-inner clearfix">
	  <?php if ($block->subject):?>
	    <?php print render($title_prefix); ?>
	      <h2 class="title cufon"><?php print $block->subject; ?></h2>
        <?php print render($title_suffix); ?>
      <?php endif;?>
      <div class="content">
        <?php print $content; ?>
      </div>
    </div>
  </div> <!-- /block-inner, /block -->
<?php endif;?>