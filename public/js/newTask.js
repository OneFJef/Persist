$(function() {

    const createActivityBtn = $(".submit");
    const nextDayBtn = $(".nextDay");
    const prevDayBtn = $(".prevDay");
    const homeBtn = $(".home");
    const calenderBtn = $(".calender");
    const color = $(".select");
    const category = $("#category");
    const category_sub = $("#description");
    const day = $();
    const hours = $("#hours");

    
    const newActivityHandler = () => {
        
            if ( category && category_sub && hours) {
                let categoryVal = category.val();
                let category_sub_val = category_sub.val();
                let hoursVal = hours.val();

                $.ajax({
                    type: "POST",
                    url: "/api/task",
                    data: { categoryVal, category_sub_val, hoursVal },
                    dataType:"application/json",

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