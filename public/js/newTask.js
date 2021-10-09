
$(function () {

    const createTaskBtn = $("#submit");
    const deleteBtn = $(".delete")
    const color = $(".color");
    const start = $(".start")
    const category = $("#category");
    const category_sub = $("#description");
    const hours = $("#hours");
    

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
                    $(".added").show();
                }
            });
        } else $(".complete").show();

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
        
        













