$(function () {

    const createTaskBtn = $("#submit");
    const color = $(".color");
    const start = $(".start");
    const category = $("#category");
    const category_sub = $("#description");
    const hours = $("#hours");

    // creates a new task and adds it to the database
    const newTaskHandler = () => {

        if (color.val() && category.val() && hours.val() && start.val()) {

            let taskData = {
                color: color.val(),
                category: category.val(),
                category_sub: category_sub.val(),
                hours: hours.val(),
                start_time: start.val()
            };

            $.ajax({
                type: "POST",
                url: "/api/task",
                data: taskData,
                complete: function () {
                    $(".added").show().delay(1000).fadeOut();
                }
            });
        } else $(".complete").show().delay(2000).fadeOut();

    };

    createTaskBtn.click(function (e) {
        e.preventDefault();
        newTaskHandler();
    });

});



















