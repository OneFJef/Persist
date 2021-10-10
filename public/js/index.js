$(function () {

    const time = $("#time");
    time.text(dayjs().format("MM/DD/YYYY hh:mm A"));

    setInterval(function () {
        time.text(dayjs().format("MM/DD/YYYY hh:mm A"));
    }, 5000);


});