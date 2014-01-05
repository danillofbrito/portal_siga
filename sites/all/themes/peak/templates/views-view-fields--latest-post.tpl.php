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
// echo "<pre>";
// print_r($fields['view_node']);
// die();

?>

<span class="date"><i><?php print $fields['created']->content; ?></i></span>
<h3 class="title"><a href=""><?php print $fields['title']->content; ?></a></h3>
<div class="content">
  <div class="content-inner">
    <?php print $fields['field_foto']->content; ?>
    <?php print $fields['body']->content; ?>
  </div>
  <div class="read-more"><?php print $fields['view_node']->content; ?></div>
</div>
