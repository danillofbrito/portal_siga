(function ($) {

  $(document).ready(function () {
    $('.field-name-field-cupom img').click(function() {
      $(this).jqprint();
    });

    if ($('body.node-type-anuncios').length > 0) {
      var cupons = $('.field-name-field-cupom .field-item').size();

      if (cupons == 2) {
        // Hide tab 2
        $('.field-name-field-cupom .field-item').hide();
        $('.field-name-field-cupom .field-items').prepend("<a href='javascript:void(0)' class='cupom-tab cupom-2-tab'>Cupom 2</a>");
        $('.field-name-field-cupom .field-items').prepend("<a href='javascript:void(0)' class='cupom-tab cupom-1-tab active'>Cupom 1</a>");

        $('a.cupom-1-tab').click(function(){
          $('.field-name-field-cupom .field-item').first().show();
          $('.field-name-field-cupom .field-item').last().hide();
          $(this).addClass('active');
          $('a.cupom-2-tab').removeClass('active');
        });

        $('a.cupom-2-tab').click(function(){
          $('.field-name-field-cupom .field-item').first().hide();
          $('.field-name-field-cupom .field-item').last().show();
          $(this).addClass('active');
          $('a.cupom-1-tab').removeClass('active');
        });
      }

    }
  });

})(jQuery);
;
