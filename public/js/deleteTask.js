$(function () {

    const deleteBtn = $(".delete1");

    const deleteTaskHandler = () => {

        let url = $(location).attr("href");


        let id = url.charAt( url.length - 1 );

        console.log(id);

        $.ajax({
            type: "DELETE",
            url: `/api/task/${id}`,
        }).then(location.replace("/"))
    };

    deleteBtn.click(function (e) {
        e.preventDefault();
        deleteTaskHandler();
    })

});

            
