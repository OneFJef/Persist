let hoursDiv = $(".hours-div");
const taskSubmit = $(".task-submit");
const taskName = $(".task-name");
let todayDiv = $(".today");
let totalTaskHrs = $(".countHours");

let taskHours = [];

let currentHourTotal = 0;
const dayHours = 24;

// Returns the day as a string value
const todayDay = (day) => {
    switch (day) {
        case 0:
            return "Sunday";

        case 1:
            return "Monday";

        case 2:
            return "Tuesday";

        case 3:
            return "Wednesday";

        case 4:
            return "Thursday";

        case 5:
            return "Friday";

        case 6:
            return "Saturday";
    };
};

const onPageLoad = () => {
    let storedHours = JSON.parse(localStorage.getItem("todayTaskHours"));
    if (storedHours !== null) {
        taskHours = storedHours;
        localStorage.setItem("todayTaskHours", JSON.stringify(taskHours));
    };

};

const deleteTask = (id) => {

    $.ajax({
        url: "buildDay",
        method: "GET"
    }).then((response) => {
        let currentDay = dayjs().day();
        let taskIds = [];
        let idToDelete = [];

        for (let i = 0; i < response.length; i++) {
            if (response[i].day == currentDay) {
                taskIds.push(response[i]);
            };
        };

        for (let i = 0; i < taskIds.length; i++) {
            if (taskIds[i].task_id == id) {
                idToDelete.push(taskIds[i].id);
            };
        };
        console.log(idToDelete);
        $.ajax({
            url: `/day/${idToDelete[0]}`,
            method: "DELETE",
        }).then((response) => {
            console.log("Success", response);
        });
    });
};

// Creates the task HTML element and appends it
const createAndAppendTask = (header, paragraph, hours, id, start) => {

    const currentHour = dayjs().hour() + 1;
    const completionLength = start + hours;


    //Render the task
    let columnAdd = $("<div>").addClass("column");
    let sectionDiv = $("<div>").addClass("content blue");
    let sectionHead = $("<h1>").html(header);
    let description = $("<p>").html(paragraph);
    let hoursPara = $("<p>").addClass("countHours").html(hours + "hrs");
    let shownButt = $("<div>").addClass("show");
    let removeButt = $("<button>").addClass("button is-danger").html("Remove");

    //Hidden until conditions are met
    let hiddenControls = $("<div>").addClass("pad-me hide");
    let hiddenCaption = $("<h3>").html("Did you complete this on time?");
    let hiddenField = $("<div>").addClass("field is-grouped");
    let hiddenSuccess = $("<div>").addClass("control success");
    let hiddenFailure = $("<div>").addClass("control failure");
    let hiddenSuccButt = $("<button>").addClass("button is-link is-success").attr("type", "button").html("Yes");
    let hiddenFailButt = $("<button>").addClass("button is-link is-danger").attr("type", "button").html("No");

    shownButt.append(removeButt);

    hiddenFailure.append(hiddenFailButt);
    hiddenSuccess.append(hiddenSuccButt);
    hiddenField.append(hiddenSuccess, hiddenFailure);
    hiddenControls.append(hiddenCaption, hiddenField);

    sectionDiv.append(sectionHead, description, hoursPara, shownButt, hiddenControls);
    columnAdd.append(sectionDiv);

    hoursDiv.append(columnAdd);

    if (currentHour > completionLength) {
        hiddenControls.removeClass("hide");
        sectionDiv.removeClass("blue");
        sectionDiv.addClass("grey");
    };

    removeButt.on("click", (e) => {
        e.stopPropagation();
        columnAdd.addClass("hide");
        deleteTask(id);
    });

    hiddenSuccButt.on("click", (e) => {
        e.preventDefault();
        columnAdd.addClass("hide");
        updateCompletion(id, true);
        //deleteTask(id);
    });

    hiddenFailButt.on("click", (e) => {
        e.preventDefault();
        columnAdd.addClass("hide");
        updateCompletion(id, false);
        //deleteTask(id);
    });
};

// Loads all of the daily tasks from the DB
const loadDay = () => {
    $.ajax({
        url: "/buildDay",
        method: "GET",
    }).then((response) => {
        let currentDay = dayjs().day();
        let taskIds = [];

        for (let i = 0; i < response.length; i++) {
            if (response[i].day == currentDay) {
                taskIds.push(response[i].task_id);
            };
        };
        for (let i = 0; i < taskIds.length; i++) {
            $.ajax({
                url: `/taskData/${taskIds[i]}`,
                method: "GET",
            }).then((response) => {
                createAndAppendTask(response.category, response.category_sub, response.hours, response.id, response.start_time);
            });
        };
    });
};

// Add the selected task to the current day in the DB
const addDayToDB = (id, length) => {
    const dayData = {
        day: dayjs().day(),
        task_id: id,
        activity_length: length
    };

    $.ajax({
        url: `/day`,
        method: "POST",
        data: dayData,
    }).then((response) => {
        console.log("Success", response);
    });
};

//Checks to see if the day has it's hours full
const checkHours = (newHours) => {
    const dayHours = 24;
    const newTaskHours = [];
    $.ajax({
        url: "/buildDay",
        method: "GET",
    }).then((response) => {
        let currentDay = dayjs().day();

        for (let i = 0; i < response.length; i++) {
            if (response[i].day == currentDay) {
                newTaskHours.push(response[i].activity_length);
                localStorage.setItem("todayTaskHours", JSON.stringify(newTaskHours));
            };
        };
    });

    let savedHours = JSON.parse(localStorage.getItem("todayTaskHours"));
    if (!savedHours) {
        return;
    }
    const existingHours = savedHours.reduce(function (a, b) {
        return a + b;
    });

    const totalHours = newHours + existingHours;
    console.log(totalHours)
    if (totalHours <= dayHours) {
        return true;
    };
    return false;
}

// Adds the selected task to the day if there is enough time remaining in the day
const addTaskToDay = () => {
    taskSubmit.on("click", () => {
        if (taskName.val() !== "Add an activity") {
            $.ajax({
                url: "/tasks",
                method: "GET",
            }).then((response) => {
                console.log(response)
                const categoryName = taskName.val();
                for (let i = 0; i < response.length; i++) {
                    if (response[i].category == categoryName) {
                        const timeLeft = true;
                        if (timeLeft === true) {
                            createAndAppendTask(response[i].category, response[i].category_sub, response[i].hours, response[i].id, response[i].start_time);
                            addDayToDB(response[i].id, response[i].hours);
                        } else {
                            console.log("Too many Hours");
                        }
                    };
                };
            });
        } else {
            console.log("error");
        };
    });
};

// Updates the completion status
const updateCompletion = (id, bool) => {
    const taskData = { is_completed: bool };

    $.ajax({
        url: `/task/${id}`,
        method: "PUT",
        data: taskData,
    }).then((response) => {
        console.log(response);
    });
};

// Starts the functionality on page load
const init = () => {
    onPageLoad();
    loadDay();
    let dayCaption = $("<h1>").html(todayDay(dayjs().day()));
    todayDiv.append(dayCaption);
    taskSubmit.on("click", addTaskToDay());
    checkHours(0);
};


init();