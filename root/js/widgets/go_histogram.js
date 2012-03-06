var Histogram = {
    _init: function(histogram_data) {
        $(this).histogram_v({
            subject: 'GO Term',
            title: ['Title'],
            showPercentage: true,
            showSubValue: false,
            legend: true,
            bars: histogram_data,
        });
    }
};
// $.widget('iris.go_histogram', Histogram);

function render_widget(cvx) {
    var study = getParameterByName('study');
console.log("study = ", study);
    var url   = "/histogram/GO/GWAS/" + study;
console.log("url = ", url);
    var div   = document.getElementById('sidebar');

	$.getJSON(url, 
        {}, 
        function(data) {
            console.log("data =", data);
            data;
        }
    );
}
