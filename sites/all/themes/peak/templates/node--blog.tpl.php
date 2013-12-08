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
    <div class="clearfix">
  	  <div class="date cufon"><div class="day"><?php print date("d", $created);?></div><div class="month-year"><div><?php print date("M", $created);?></div><div><?php print date("Y", $created); ?></div></div>
      </div>
      <?php print render($title_prefix); ?>
        <?php if (!$page): ?><h2 class="title cufon"><a href="<?php print $node_url; ?>" title="<?php print $title ?>"><?php print $title; ?></a></h2><?php endif; ?>
  	  <?php print render($title_suffix); ?>
      <?php if ($page): ?><h1 class="title"><?php print $title; ?></h1><?php endif; ?>
	</div>

	<div class="content clearfix">
	  <?php if (!empty($content['field_image'])): ?>
        <div class="default-image right"><?php print render($content['field_image']); ?></div>
	  <?php endif; ?>
      <?php
        hide($content['comments']);
        hide($content['links']);
        hide($content['field_tags']); // hide tags
	    hide($content['field_image']); // hide image
        print render($content);
      ?>
    </div>

 	<div class="meta">
      <?php print $user_picture; ?>
	  <?php if (!$page): ?>
	    <div class="read-more"><?php print l(t(''), 'node/'.$nid); ?></div>
	  <?php endif; ?>
	  <?php if ($display_submitted): ?>
	    <span class="blog-submitted">
		  <?php echo t('Author: '); ?>
		</span>
		<i><?php echo $name; ?></i>
	  <?php endif; ?>
	  <?php if (!empty($content['field_tags'])): ?>
	  	<span class="divider"> / </span>
	    <span class="blog-terms">
		  <?php echo t('Tag: '); ?>
		</span>
		<i><?php print render($content['field_tags']); ?></i>
	  <?php endif; ?>
	  <?php if ($teaser): ?>
		<span class="divider"> / </span>
	    <i><?php echo $node->comment_count; ?></i> Comments
      <?php endif; ?>
	  <?php if (!empty($content['links'])&&$page): ?>
  		<span class="divider"> / </span>
	    <i><?php print render($content['links']); ?></i>
	  <?php endif; ?>
    </div>

    <?php print render($content['comments']); ?>
  </div>
</div> <!-- /node-inner, /node -->