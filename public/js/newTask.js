$(() => {

    const createActivityBtn = $(".submit");
    const nextDayBtn = $(".nextDay");
    const prevDayBtn = $(".prevDay");
    const homeBtn = $(".home");
    const calenderBtn = $(".calender");

    const newActivityHandler = () => {

        const color = $();
        const category = $("#project-name").val().trim();
        const category_sub = $("#project-disc").val().trim();
        const day = $();
        const hours = $("#project-funding").val().trim();
        
            if (color && category && category_sub && day && hours) {
                $.ajax({
                    type: "POST",
                    url: "/api/newtask",
                    data: { color, category, category_sub, day, hours },

                }).done(function() {
                    console.log("category created")
                }).fail(function() {
                    console.error("500 server error")
                })
                
            } else {alert("Fill out all fields")};
            
        };
        
       createActivityBtn.click(function(e){
            e.preventDefault();
           newActivityHandler();
       });



});