$(function () {

    const deleteBtn = $(".delete1");
    // delete a task from the database
    const deleteTaskHandler = () => {

        let url = $(location).attr("href");
        let id = url.split("/").at(-1);
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




