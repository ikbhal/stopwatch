$(document).ready(function () {
    let startTime, interval;
    let elapsedTime = 0;
    let isRunning = false;
  
    function formatTime(time) {
      const hours = Math.floor(time / 3600000);
      const minutes = Math.floor((time % 3600000) / 60000);
      const seconds = Math.floor((time % 60000) / 1000);
      const milliseconds = time % 1000;
      return `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${seconds}s ${milliseconds.toString().padStart(3, '0')}`;
    }
  
    function updateTime() {
      const currentTime = Date.now();
      elapsedTime += currentTime - startTime;
      startTime = currentTime;
      $("#microseconds").text(elapsedTime);
      $("#timer").text(formatTime(elapsedTime));
    }
  
    $("#startStopButton").on("click", function () {
      if (!isRunning) {
        startTime = Date.now();
        interval = setInterval(updateTime, 10); // Update every 10 milliseconds (0.01 seconds)
        isRunning = true;
        $(this).text("Pause");
      } else {
        clearInterval(interval);
        isRunning = false;
        $(this).text("Start");
      }
    });
  
    $("#resetButton").on("click", function () {
      clearInterval(interval);
      elapsedTime = 0;
      isRunning = false;
      $("#hours").text("00");
      $("#minutes").text("00");
      $("#seconds").text("00");
      $("#microseconds").text("000");
      $("#startStopButton").text("Start");
    });
  
    // Save the elapsed time in local storage when the window is closed or refreshed
    $(window).on("beforeunload", function () {
      localStorage.setItem("elapsedTime", elapsedTime);
    });
  
    // Load the elapsed time from local storage if it exists
    const storedElapsedTime = localStorage.getItem("elapsedTime");
    if (storedElapsedTime) {
      elapsedTime = parseInt(storedElapsedTime);
      $("#microseconds").text(elapsedTime);
      $("#timer").text(formatTime(elapsedTime));
    }
  });
  