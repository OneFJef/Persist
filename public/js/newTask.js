$(function () {

    const createTaskBtn = $("#submit");
    const deleteBtn = $(".delete")
    const color = $("select");
    const category = $("#category");
    const category_sub = $("#description");
    const hours = $("#hours");

    const newTaskHandler = () => {
        if (color.val() && category.val() && category_sub.val() && hours.val()) {

            let taskData = {
                color: color.val(),
                category: category.val(),
                category_sub: category_sub.val(),
                hours: hours.val(),
            };

            $.ajax({
                type: "POST",
                url: "/api/task",
                data: taskData,
                complete: function () {
                    $(".added").show();
                }
            });
        } else $(".complete").show();

    };

    const renderNewTask = () => {
        const task = $("<h1>").text("task");
        const desc = $("p").text("description");
        $(".addTask").append(task, desc);

    };

    createTaskBtn.click(function(e) {
        e.preventDefault();
        newTaskHandler();
    });

    deleteBtn.click(function(e) {
        e.preventDefault();
        $(".notification").hide();
    })

});
        
        













