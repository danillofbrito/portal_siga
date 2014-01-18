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
  <div class="node-inner clearfix">
  	<?php print render($title_prefix); ?>
      <?php if (!$page): ?>
        <h2 class="title cufon"><a href="<?php print $node_url; ?>" title="<?php print $title ?>"><?php print $title; ?></a></h2>
      <?php endif; ?>
	<?php print render($title_suffix); ?>

    <?php if ($display_submitted): ?>
	  <span class="meta">	 
		<?php print $user_picture; ?>
		<?php echo t('Author: '); ?>
		<i><?php echo $name; ?></i>	
		<span class="divider"> / </span>
		<?php echo t('Date: '); ?>
		<i><?php echo date("d-m-Y", $created); ?></i>	  
	    <?php if (!empty($content['field_tags'])): ?>
	      <span class="divider"> / </span>
	      <?php print ' Tag: '; ?>
		  <i><?php print render($content['field_tags']); ?></i>
	    <?php endif; ?>
	    <?php if (!empty($content['links'])&&$page): ?>
          <span class="divider"> / </span>
	      <i><?php print render($content['links']); ?></i>
	    <?php endif; ?>
      </span>
    <?php endif; ?>

    <div class="content clearfix">
	  <?php if (!empty($content['field_image'])): ?>
        <div class="default-image left framed"><?php print render($content['field_image']); ?></div>
	  <?php endif; ?>
      <?php
        hide($content['comments']);
        hide($content['links']);
        hide($content['field_tags']); // hide tags
	    hide($content['field_image']); // hide image
        print render($content);
      ?>
    </div>

    <?php print render($content['comments']); ?>
  </div>
</div> <!-- /node-inner, /node -->

