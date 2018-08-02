$(function(){
    var reg = /^[\'\"]+|[\'\"]+$/g;
     //-  chart.js
    var chartjsLen = $('.chartjs').length;
    var myChartJs = [];
    for(var i = 0;i < chartjsLen; i++){
        var ctx = $('.chartjs')[i].getContext('2d');
        myChartJs[i] = new Chart(ctx,$.parseJSON($($('.chartjs')[i])[0].innerHTML))
    }
 })