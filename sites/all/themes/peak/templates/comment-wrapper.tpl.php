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

<?php if ($content): ?>
  <div id="comments" class="<?php print $classes; ?>"<?php print $attributes; ?>>
    <div id="comments-inner">
      <?php if ($content['comments'] && $node->type != 'forum'): ?>
        <?php print render($title_prefix); ?>
          <h2 class="cufon comments-title"><?php print t('Comments'); ?></h2>
        <?php print render($title_suffix); ?>
      <?php endif; ?>    
	  <?php print render($content['comments']); ?>
      <?php if ($content['comment_form']): ?>
        <h2 class="title cufon comment-form"><?php print t('Post new comment'); ?></h2>
        <?php print render($content['comment_form']); ?>
      <?php endif; ?>    
    </div>
  </div>
<?php endif; ?>