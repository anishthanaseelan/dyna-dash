drawSkaliton()

function drawSkaliton() {
    // 
    var htmltxt = ""
    layout.forEach(element => {
        if (element.type == "text") {
            htmltxt += "<div class=\"chartBox\"><dev id=\"" + element.id + "\" class=\"textchart\"></div></div >"
        } else {
            htmltxt += "<div class=\"chartBox\"><canvas id=\"" + element.id + "\" class=\"chart\"></canvas></div >"
        }

    });
    //    console.log(htmltxt)
    var dash = document.getElementById("dashboard").innerHTML = htmltxt
    layout.forEach(element => {
        if (element.type == "text") {
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
    ctx.innerHTML = "<div class = \"textTitle\">" + layoutData.title + "</div><div class = \"textData\">" + chartData + " </div>";
    ctx.parentNode.style.height = layoutData.height;
    ctx.parentNode.style.width = layoutData.width;
}

function drawChart(layoutData, chartData) {
    var ctx = document.getElementById(layoutData.id).getContext('2d');
    ctx.canvas.parentNode.style.height = layoutData.height;
    ctx.canvas.parentNode.style.width = layoutData.width;
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
                display: true,
                text: layoutData.title
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}

