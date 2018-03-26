$("button").click(function(e) {
   var query = $(this).attr('id').split("-");
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/" + query[0],
        data: {
            id: query[1],
        },
        success: function(result) {
          console.log("success" + result);
        },
        error: function(result) {
          console.log("error" + result);
        }
    });
});

