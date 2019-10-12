init()
var maxwidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var cellsize = (maxwidth - 5) / properties.settings.grid.maxx;
drawSkaliton()

function init() {
    var ts = "2019-10-11T09:24:17"
    console.log(timeSince(new Date(ts)));
}
function drawSkaliton() {
    var htmltxt = ""
    properties.layout.forEach(element => {
        if (element.type == "title") {
            htmltxt += "<div id=\"" + element.id + "\" class=\"title\"></div >"
        } else if (element.type == "text") {
            htmltxt += "<div class=\"chartBox\"><div class=\"chartTitle\"><p class = charttitletext>" + element.title + "</p><p class = charttimesince  id=\"" + element.id + "_ts" + "\"></p></div><dev id=\"" + element.id + "\" class=\"textData\"></div></div >"
        } else {
            htmltxt += "<div class=\"chartBox\"><div class=\"chartTitle\"><p class = charttitletext>" + element.title + "</p><p class = charttimesince  id=\"" + element.id + "_ts" + "\"></p></div><div><canvas id=\"" + element.id + "\" class=\"chart\"></canvas></div></div >"
        }

    });
    var dash = document.getElementById("dashboard").innerHTML = htmltxt
    properties.layout.forEach(element => {
        if (element.type == "title") {
            drawTitle(element, element.title)
        } else if (element.type == "text") {
            dataset = finddata(element.id);
            drawText(element, dataset.data)
            fillTimeSince(element.id, dataset.timestamp)
        } else {
            dataset = finddata(element.id);
            drawChart(element, dataset.data)
            fillTimeSince(element.id, dataset.timestamp)
        }
    });
}

function finddata(id) {
    var data;
    reportData.forEach(element => {
        if (element.id == id) {
            // console.log(element.data)
            data = element
            return
        }
    });
    return data;
}

function drawText(layoutData, chartData) {
    var ctx = document.getElementById(layoutData.id);
    ctx.innerHTML = chartData;
    ctx.style.height = (layoutData.height * cellsize) - (cellsize * 0.1) - 20 + "px";
    ctx.style.width = (layoutData.width * cellsize) - 20 + "px";
    ctx.parentNode.style.top = layoutData.y * cellsize + 10 + "px";
    ctx.parentNode.style.left = layoutData.x * cellsize + 10 + "px";

}
function fillTimeSince(id, time) {
    //Fill time since
    document.getElementById(id + "_ts").innerHTML = timeSince(new Date(time));
}

function drawTitle(layoutData, chartData) {
    //console.log(layoutData.id)
    var ctx = document.getElementById(layoutData.id);
    ctx.innerHTML = "<div class = \"titletext\">" + layoutData.title + " </div><div class=\"time\" id=\"time\"></div>";
    ctx.style.height = (layoutData.height * cellsize) - 10 + "px";
    ctx.style.width = (layoutData.width * cellsize) - 10 + "px";
    ctx.style.top = layoutData.y * cellsize + 10 + "px";
    ctx.style.left = layoutData.x * cellsize + 10 + "px";

}
// TODO: time since -Done
// Configurable Charts 
// Gauge 
// Numbers
function drawChart(layoutData, chartData) {
    var ctx = document.getElementById(layoutData.id).getContext('2d');
    //Margin correction - 5 + 5
    //Padding correction - 5 + 5 
    //Title hight corrections - 30 
    ctx.canvas.parentNode.style.height = (layoutData.height * cellsize) - (cellsize * 0.1) - 20 + "px";
    ctx.canvas.parentNode.style.width = (layoutData.width * cellsize) - 20 + "px";
    ctx.canvas.parentNode.parentNode.style.top = layoutData.y * cellsize + 10 + "px"
    ctx.canvas.parentNode.parentNode.style.left = layoutData.x * cellsize + 10 + "px";
    var myChart = new Chart(ctx, {
        type: layoutData.type,
        data: {
            labels: layoutData.labels,
            datasets: [{
                label: layoutData.title,
                data: chartData[0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: layoutData.title
            },
            scales: {
                yAxes: [{
                    ticks: {
                        display: false,
                        beginAtZero: false
                    }
                }]
            }
        }
    });

}

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

var span = document.getElementById('time');

function time() {
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    var date = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    span.textContent = h + ":" + m + ":" + s + " " + date + "/" + month + "/" + year;
}

setInterval(time, 1000);