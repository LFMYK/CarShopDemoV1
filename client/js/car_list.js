'use strict';

$(function() {
  $('#delConfirm').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    var id = button.attr('data-id');
    var okbtn = $('#delConfirmbtnOk');
    okbtn.attr('data-id', id);


    console.log('上面输出的ID为：');
    console.log(id);
  });

  $('#delConfirmbtnOk').click(function(event) {
    var target = $(event.target);
    var id = target.attr('data-id');
    var tr = $('.item-id-' + id);

    console.log('输出的ID为：');
    console.log(id);

    $.ajax({
      type: 'DELETE',
      url: '/admin/car/list?id=' + id
    }).done(function(results) {
      console.log(results);
      if (results.ok === 1) {
        if (tr.length > 0) {
          tr.remove();
        }
      }
      $('#delConfirm').modal('hide');
    });
  });

});