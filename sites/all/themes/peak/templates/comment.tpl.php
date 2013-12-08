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

<div class="<?php print $classes; ?>">
  <div class="comment-inner clearfix">
    <?php print $picture;?>
    <div class="content">
	  <?php if ($content['links']): ?><div class="links"><?php print render($content['links']) ?></div><?php endif; ?> 
      <span class="author"><?php print $author; ?></span> / <span><?php print $created; ?></span>
      <!--<?php if ($title): ?><h3 class="title"><?php print $title; ?></h3><?php endif; ?>-->
	  <?php
        hide($content['links']);
        print render($content);
      ?>
	</div>
    <?php if ($signature): ?><div class="user-signature clearfix"><?php print $signature; ?></div><?php endif; ?> 
  </div>
</div> <!-- /comment-inner, /comment -->
