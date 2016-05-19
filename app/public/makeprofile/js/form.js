// doesn't work

$('#comment_form').on('submit', function(e){       
    e.preventDefault();

    var formData = $("#comment_form").serialize();
    
    $.ajax({
        type: "POST",
        url: "index.html",
        cache: false,
        data: formData,
        success: function (result) {
            alert('Success');
        },
        error: function (request,error) {
            alert('Thanks for your Social Deeds registration!');
        }        
        
    });    
    
    return false;
}); 
