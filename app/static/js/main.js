
$('.playlist-song-actions').delegate('.playlist-song-action','click', function () {
    var $row = $(this).parents('.playlist-song-container');
    var songId = $row.data('id');
    var status = $(this).data('status');

    $.ajax({
        url: window.endpoint + '/songs/' + songId + '/status',
        type: 'PUT',
        crossDomain: true,
        headers: {
            'Content-type': 'application/json;charset=utf-8',
        },
        data: JSON.stringify({'status': status })
    }).done(function(response){
        if (status == 'normal'){
            $row.find('.playlist-song-actions').html(
                "<div class='flex-row'>" +
                "<div class='playlist-song-action' data-status='liked'> " +
                "<i class='icon-heart-empty icon-large'></i> </div> " +
                "<div class='playlist-song-action' data-status='removed'>" +
                " <i class='icon-remove-sign icon-large'></i> </div></div>"
            )
        }
        if (status == 'removed') {
            $row.fadeOut();
        }
        if (status == 'liked') {
             $row.find('.playlist-song-actions').html("<div class='playlist-song-action single-action' " +
                 "data-status='normal'>" +
                 " <i class='icon-heart icon-large'></i> </div>"
            )
        }
        console.log(response);
    }).fail(function(response){
        console.log(response);
    });
});
