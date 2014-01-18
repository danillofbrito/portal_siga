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

  <div id="page">
    <div id="header"><div id="header-inner">
	  <div id="header-upper" class="clearfix">
        <?php if ($logo || $site_name || $site_slogan): ?>
          <div id="site-info">
            <?php if ($logo): ?>
              <div id="site-logo"><a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>"/></a></div>
            <?php endif; ?>
		    <?php if ($site_name): ?>
		      <div id="site-name">
		        <h1 class="cufon"><a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><?php print $site_name; ?></a></h1>
		      </div>
	        <?php endif; ?>
		    <?php if ($site_slogan): ?>
		      <div id="site-slogan"><?php print $site_slogan; ?></div>
		    <?php endif; ?>
          </div> <!-- /#logo-title -->
        <?php endif; ?>
	    <div id="primary">
          <?php if ($page['primary_menu']): ?>
            <?php print render($page['primary_menu']); ?>
          <?php endif; ?> <!-- /#primary -->
	    </div>
	  </div>
	  <div id="header-lower" class="header-lower-<?php print (bool) $page['header_left'] + (bool) $page['header_right']; ?> clearfix">
		<?php if ($page['header_left']): ?>
          <div id="header-left">
            <?php print render($page['header_left']); ?>
          </div> <!-- /#header-left -->
        <?php endif; ?>
		<?php if ($page['header_right']): ?>
          <div id="header-right">
            <?php print render($page['header_right']); ?>
          </div> <!-- /#header-right -->
        <?php endif; ?>
	  </div>
    </div></div> <!-- /#header-inner, /#header -->

    <div id="main-wrapper">
	  <div id="main"><div id="main-inner" class="clearfix">
	    <?php if ($page['showcase']): ?>
          <div id="showcase">
            <?php print render($page['showcase']); ?>
		  </div>
        <?php endif; ?> <!-- /#showcase -->
		<div id="search-breadcrumb">
	      <?php if ($page['search_box']): ?>
            <div id="search">
              <?php print render($page['search_box']); ?>
            </div> <!-- /#search -->
          <?php endif; ?>
	      <?php if ($breadcrumb && $breadcrumb != '<div class="breadcrumb"></div>'): print '<div id="breadcrumb">You are here: '.$breadcrumb.'</div>';
	      else: print '<div id="breadcrumb">You are here: <a href="/">Home</a></div>';
	      endif; ?>
		</div>
	    <?php if ($page['main_top_one'] || $page['main_top_two'] || $page['main_top_three'] || $page['main_top_four']): ?>
          <div id="main-top"><div id="main-top-inner" class="main-top-<?php print $main_top; ?> clearfix">
            <?php if ($page['main_top_one']): ?>
              <div id="main-top-one" class="column">
	            <?php print render($page['main_top_one']); ?>
              </div><!-- /main-top-one -->
            <?php endif; ?>
            <?php if ($page['main_top_two']): ?>
              <div id="main-top-two" class="column">
	            <?php print render($page['main_top_two']); ?>
              </div><!-- /main-top-two -->
            <?php endif; ?>
		    <?php if ($page['main_top_three']): ?>
              <div id="main-top-three" class="column">
	            <?php print render($page['main_top_three']); ?>
              </div><!-- /main-top-three -->
            <?php endif; ?>
		    <?php if ($page['main_top_four']): ?>
              <div id="main-top-four" class="column">
                <?php print render($page['main_top_four']); ?>
              </div><!-- /main-top-four -->
		    <?php endif; ?>
          </div></div>
	    <?php endif; ?>

		<div id="main-middle" class="clearfix">
		  <div id="content">
			<?php if ($page['content_top']): ?>
              <div id="content-top"><div id="content-top-inner">
			    <?php print render($page['content_top']); ?>
		      </div></div>
            <?php endif; ?> <!-- /#content-top -->
		    <div id="content-main"><div id="content-main-inner" class="clearfix">
			  <?php if (($title=='Preview comment')||($title=='Add new comment')): ?>
			    <div id="comments"><div id="comments-inner">
			  <?php endif; ?>
  		      <?php if ($title || $tabs || $help || $messages): ?>
                <div id="content-header">
                  <?php
			        if ($title) {
                      if (isset($node)) {
                        if ($node->type != 'blog') {
                          print "<h1 class=\"title cufon\">".$title."</h1>";
                        }
                      } else {
                        print "<h1 class=\"title cufon\">".$title."</h1>";
                      }
		            }
                  ?>
                  <?php print $messages; ?>
                  <?php if ($tabs): ?>
                    <div class="tabs"><?php print render($tabs); ?></div>
                  <?php endif; ?>
                  <?php print render($page['help']); ?>
			  	  <?php if ($action_links): ?>
                    <ul class="action-links"><?php print render($action_links); ?></ul>
                  <?php endif; ?>
                </div> <!-- /#content-header -->
              <?php endif; ?>
              <?php print render($page['content']); ?>
			  <?php if (($title=='Preview comment')||($title=='Add new comment')): ?>
			    </div></div>
			  <?php endif; ?>
		    </div></div>
			<?php if ($page['content_bottom']): ?>
              <div id="content-bottom"><div id="content-bottom-inner">
			    <?php print render($page['content_bottom']); ?>
		      </div></div>
            <?php endif; ?> <!-- /#content-bottom -->
		  </div>
          <?php if ($page['sidebar_first']): ?>
            <div id="sidebar-left">
              <?php print render($page['sidebar_first']); ?>
            </div> <!-- /#sidebar-left -->
          <?php endif; ?>

          <?php if ($page['sidebar_second']): ?>
            <div id="sidebar-right">
              <?php print render($page['sidebar_second']); ?>
            </div> <!-- /#sidebar-right -->
          <?php endif; ?>
		</div>

	    <?php if ($page['main_bottom_one'] || $page['main_bottom_two'] || $page['main_bottom_three'] || $page['main_bottom_four']): ?>
          <div id="main-bottom" ><div id="main-bottom-inner" class="main-bottom-<?php print $main_bottom; ?> clearfix">
            <?php if ($page['main_bottom_one']): ?>
              <div id="main-bottom-one" class="column">
                <?php print render($page['main_bottom_one']); ?>
              </div><!-- /main-bottom-one -->
            <?php endif; ?>
            <?php if ($page['main_bottom_two']): ?>
              <div id="main-bottom-two" class="column">
                <?php print render($page['main_bottom_two']); ?>
              </div><!-- /main-bottom-two -->
            <?php endif; ?>
	    	<?php if ($page['main_bottom_three']): ?>
              <div id="main-bottom-three" class="column">
                <?php print render($page['main_bottom_three']); ?>
              </div><!-- /main-bottom-three -->
            <?php endif; ?>
		    <?php if ($page['main_bottom_four']): ?>
              <div id="main-bottom-four" class="column">
                <?php print render($page['main_bottom_four']); ?>
              </div><!-- /main-bottom-four -->
            <?php endif; ?>
          </div></div>
	    <?php endif; ?>
		<div id="main-border"></div>
      </div></div> <!-- /#main-inner, /#main -->
	</div> <!-- /main-wrapper -->

	<div id="footer"><div id="footer-inner" class="footer-<?php print $footer; ?> clearfix">
	  <?php if ($page['footer_one']): ?>
        <div id="footer-one" class="column">
          <?php print render($page['footer_one']); ?>
        </div><!-- /footer-one -->
      <?php endif; ?>
      <?php if ($page['footer_two']): ?>
        <div id="footer-two" class="column">
          <?php print render($page['footer_two']); ?>
        </div><!-- /footer-two -->
      <?php endif; ?>
      <?php if ($page['footer_three']): ?>
        <div id="footer-three" class="column">
          <?php print render($page['footer_three']); ?>
        </div><!-- /footer-three -->
      <?php endif; ?>
   	  <?php if ($page['footer_four']): ?>
        <div id="footer-four" class="column">
          <?php print render($page['footer_four']); ?>
        </div><!-- /footer-four -->
      <?php endif; ?>
	  <div id="closure"><!--<div id="designed-by"><a href="http://www.esors.com" title="Drupal theme">Drupal Theme by ESORS</a></div>--><?php print render($page['footer']); ?></div>
    </div></div> <!-- /#footer-inner, /#footer -->

  </div> <!-- /#page -->
  <!--[if IE]><script type="text/javascript"> Cufon.now(); </script><![endif]-->
