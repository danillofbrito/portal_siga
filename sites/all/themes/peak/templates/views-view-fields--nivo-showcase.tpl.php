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

<div>
  <?php print $fields['field_image']->content; ?>
</div>
<div></div>
<div id="" class="nivo-html-caption">  
  <div class="caption">
    <h3><?php print $fields['title']->content; ?></h3> 
    <?php print $fields['body']->content; ?>
    <div class="read-more"><?php print $fields['field_sc_link']->content; ?></div>
  </div>
</div>

