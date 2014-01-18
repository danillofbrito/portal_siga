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

<!--<div class="number cufon">01</div>-->
<ul class="accordion">
  <?php foreach ($rows as $id => $row): ?>
    <?php
	  if ($id==0) {
        print '<li class="first">';
	  } else {
        print '<li>';
	  }
	?>
      <?php print $row; ?>
    </li>
  <?php endforeach; ?>
</ul>
