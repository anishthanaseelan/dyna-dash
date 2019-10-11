init()
var maxwidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var cellsize = (maxwidth - 5) / properties.settings.grid.maxx;
drawSkaliton()

function init() {

}
function drawSkaliton() {
    var htmltxt = ""
    properties.layout.forEach(element => {
        if (element.type == "title") {
            htmltxt += "<div id=\"" + element.id + "\" class=\"title\"></div >"
        } else if (element.type == "text") {
            htmltxt += "<div class=\"chartBox\"><div class=\"chartTitle\">" + element.title + "</div><dev id=\"" + element.id + "\" class=\"textData\"></div></div >"
        } else {
            htmltxt += "<div class=\"chartBox\"><div class=\"chartTitle\">" + element.title + "</div><div><canvas id=\"" + element.id + "\" class=\"chart\"></canvas></div></div >"
        }

    });
    var dash = document.getElementById("dashboard").innerHTML = htmltxt
    properties.layout.forEach(element => {
        if (element.type == "title") {
            drawTitle(element, element.title)
        } else if (element.type == "text") {
            drawText(element, finddata(element.id))
        } else {
            drawChart(element, finddata(element.id))
        }
    });
}

function finddata(id) {
    var data;
    reportData.forEach(element => {
        if (element.id == id) {
            console.log(element.data)
            data = element.data
            return
        }
    });
    return data;
}

function drawText(layoutData, chartData) {
    var ctx = document.getElementById(layoutData.id);
    ctx.innerHTML = chartData;
    //    ctx.innerHTML = "<div class = \"textData\">" + chartData + " </div>";
    ctx.style.height = (layoutData.height * cellsize) - 30 - 20 + "px";
    ctx.style.width = (layoutData.width * cellsize) - 20 + "px";
    ctx.parentNode.style.top = layoutData.y * cellsize + "px";
    ctx.parentNode.style.left = layoutData.x * cellsize + "px";
}

function drawTitle(layoutData, chartData) {
    console.log(layoutData.id)
    var ctx = document.getElementById(layoutData.id);
    ctx.innerHTML = "<div class = \"titletext\">" + layoutData.title + "</div>";
    ctx.style.height = (layoutData.height * cellsize) - 10 + "px";
    ctx.style.width = (layoutData.width * cellsize) - 10 + "px";
    ctx.style.top = layoutData.y * cellsize + "px";
    ctx.style.left = layoutData.x * cellsize + "px";
}

function drawChart(layoutData, chartData) {
    var ctx = document.getElementById(layoutData.id).getContext('2d');
    //Margin correction - 5 + 5
    //Padding correction - 5 + 5 
    //Title higtht corrections - 30 
    ctx.canvas.parentNode.style.height = (layoutData.height * cellsize) - 30 - 20 + "px";
    ctx.canvas.parentNode.style.width = (layoutData.width * cellsize) - 20 + "px";
    ctx.canvas.parentNode.parentNode.style.top = layoutData.y * cellsize + "px"
    ctx.canvas.parentNode.parentNode.style.left = layoutData.x * cellsize + "px";
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

