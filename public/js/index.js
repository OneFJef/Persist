$(function () {

    const time = $("#time");

    setInterval(function () {
        time.text(dayjs().format("MM/DD/YYYY hh:mm:ss A"));
    }, 1000);


});