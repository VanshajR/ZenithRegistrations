// your_script.js
// var colorArr = ['rgb(75, 192, 192)','rgb(255, 99, 132)','rgb(128,0,128)','rgb(0,0,255)'];
let colorArr = ["rgba(255, 0, 0, 1)","rgba(0, 255, 0, 1)","rgba(0, 0, 255, 1)","rgba(255, 255, 0, 1)","rgba(255, 0, 255, 1)","rgba(0, 255, 255, 1)","rgba(128, 0, 0, 1)","rgba(0, 128, 0, 1)","rgba(0, 0, 128, 1)","rgba(128, 128, 0, 1)","rgba(128, 0, 128, 1)","rgba(0, 128, 128, 1)","rgba(255, 165, 0, 1)","rgba(165, 42, 42, 1) ","rgba(0, 128, 255, 1)","rgba(255, 99, 71, 1)","rgba(255, 192, 203, 1)","rgba(0, 255, 127, 1)","rgba(255, 255, 255, 1)","rgba(0, 0, 0, 1)"];

async function fetchData(){
  try{
    const response = await fetch("/graph")
    let datasets = await response.json();
    for(let i=0;i<datasets.length;i++){
      datasets[i].color = colorArr[i];
    }
    // console.log(datasets);
    for(let i=0;i<datasets.length;i++){
      const arr = datasets[i].data.map((el)=>{
        return el.time;
      });
      console.log(arr);
    }



        // var data = {
        //   labels: ['January', 'February', 'March', 'April', 'May'],
        //   datasets: [{
        //       label: 'Dataset 1',
        //       data: [10, 20, 15, 25, 30],
        //       cubicInterpolationMode: 'monotone', // Choose the interpolation mode here
        //       borderColor: 'rgba(75, 192, 192, 1)',
        //       borderWidth: 2,
        //       fill: false
        //     }]
        // };

        var data = {
          labels: ['0', '1', '2', '3', '4','5', '6', '7', '8', '9','10'],
          datasets: []  // Initialize datasets as an empty array
        };
    
        for (let i = 0; i < datasets.length; i++) {
          data.datasets.push({
            label: datasets[i].teamName,
            data: datasets[i].data.map((el)=>{
              return el.time;
            }),  // Assuming each dataset has a 'data' property
            cubicInterpolationMode: 'monotone',
            borderColor: colorArr[i],
            borderWidth: 2,
            fill: false
          });
        }
    


        var options= {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Chart.js Line Chart - Cubic interpolation mode'
            },
          },
          interaction: {
            intersect: false,
          },
          scales: {
            y: {
              display: true,
              title: {
                display: true,
                text:"Time Taken"
              },
            },
            x: {
              display: true,
              title: {
                display: true,
                text: 'Level',
              },
              suggestedMin: 0,
              suggestedMax: 10
            }
          }
        };
        
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });
  }catch(err){
    console.log(err);
  }
}

fetchData()
