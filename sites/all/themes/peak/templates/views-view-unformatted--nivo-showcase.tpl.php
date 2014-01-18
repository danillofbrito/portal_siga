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

<?php 
  $image = "";
  $caption = "";
?>

<?php foreach ($rows as $id => $row): ?>
  <?php 
	$image = $image.str_replace('alt=""', 'alt="" title="#caption'.$id.'"', substr($row, 0, strpos($row,'<div></div>')));
	if(strpos($row,'Empty') === false)  {
      $caption = $caption.str_replace('id=""','id="caption'.$id.'"',substr($row, strpos($row,'<div></div>')+11));
	}
  ?>
<?php endforeach; ?>
  
<div id="slider" class="nivoSlider">
  <?php print $image; ?>
</div>
<div class="frame"></div>
<?php print $caption; ?>