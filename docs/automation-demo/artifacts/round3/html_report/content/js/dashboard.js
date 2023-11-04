/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.81679283763697, "KoPercent": 0.18320716236302673};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.45224282030763757, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9542626011200995, 500, 1500, "click_on_newticket_link-71"], "isController": false}, {"data": [0.9542626011200995, 500, 1500, "UVD_03_CustomerCreateTicket_S01_clickOnNewTicketLink"], "isController": true}, {"data": [0.4125427948957361, 500, 1500, "click_on_create_ticket-91"], "isController": false}, {"data": [0.06681168427594779, 500, 1500, "UVD_02_CustomerCreateTicket_S01_signIn"], "isController": true}, {"data": [0.9548989113530326, 500, 1500, "click_on_signin-65"], "isController": false}, {"data": [0.09835301429459291, 500, 1500, "click_on_signin-64"], "isController": false}, {"data": [0.07205104263927793, 500, 1500, "UVD_04_CustomerCreateTicket_S01_clickOnCreateTicketButton"], "isController": true}, {"data": [0.9417445482866044, 500, 1500, "click_on_create_ticket-95"], "isController": false}, {"data": [0.24161490683229814, 500, 1500, "UVD_01_CustomerCreateTicket_S01_pageLoad"], "isController": true}, {"data": [0.24298190892077354, 500, 1500, "logout_user-108"], "isController": false}, {"data": [0.24161490683229814, 500, 1500, "load_page-14"], "isController": false}, {"data": [0.08413836086008102, 500, 1500, "UVD_05_CustomerCreateTicket_S01_signOut"], "isController": true}, {"data": [0.1497351199750701, 500, 1500, "logout_user-107"], "isController": false}, {"data": [0.9175755687129947, 500, 1500, "click_on_create_ticket-97"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 28929, 53, 0.18320716236302673, 1294.5287082166694, 132, 11060, 947.0, 2952.0, 3451.0, 5288.990000000002, 12.10143469496261, 226.3175875960765, 10.327859971301498], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["click_on_newticket_link-71", 3214, 2, 0.06222775357809583, 356.07716241443575, 167, 4353, 327.0, 483.0, 551.25, 1051.4499999999966, 1.3462101503575163, 24.18542361534914, 0.6714226888086962], "isController": false}, {"data": ["UVD_03_CustomerCreateTicket_S01_clickOnNewTicketLink", 3214, 2, 0.06222775357809583, 356.07716241443575, 167, 4353, 327.0, 483.0, 551.25, 1051.4499999999966, 1.3462101503575163, 24.18542361534914, 0.6714226888086962], "isController": true}, {"data": ["click_on_create_ticket-91", 3213, 17, 0.5291005291005291, 1275.7603485838754, 555, 4895, 1127.0, 1913.7999999999997, 2589.099999999998, 3572.4600000000014, 1.3456701085331317, 31.448478357243793, 2.7263088616805673], "isController": false}, {"data": ["UVD_02_CustomerCreateTicket_S01_signIn", 3218, 10, 0.3107520198881293, 2984.594468614053, 714, 13068, 2896.0, 4634.1, 5372.199999999993, 7325.919999999998, 1.3474837269775204, 57.041252573246915, 2.8908434446518334], "isController": true}, {"data": ["click_on_signin-65", 3215, 10, 0.3110419906687403, 352.3580093312594, 169, 5941, 329.0, 485.0, 546.3999999999996, 798.7200000000012, 1.3466098312151278, 24.613465189926437, 0.6631506129430776], "isController": false}, {"data": ["click_on_signin-64", 3218, 8, 0.24860161591050342, 2632.564947172159, 535, 11060, 2549.0, 4216.0, 4969.949999999995, 6939.999999999989, 1.3475847328448862, 32.43720644923253, 2.2280481004101382], "isController": false}, {"data": ["UVD_04_CustomerCreateTicket_S01_clickOnCreateTicketButton", 3213, 21, 0.6535947712418301, 2036.2138188608772, 905, 6952, 1870.0, 2904.0, 3682.6999999999975, 4763.58, 1.345344993269088, 69.46163056216201, 4.031097445524623], "isController": true}, {"data": ["click_on_create_ticket-95", 3210, 3, 0.09345794392523364, 366.6404984423673, 169, 3312, 339.5, 512.9000000000001, 584.0, 930.4499999999994, 1.3449459570547444, 25.04169453580091, 0.677788866947974], "isController": false}, {"data": ["UVD_01_CustomerCreateTicket_S01_pageLoad", 3220, 3, 0.09316770186335403, 1906.6158385093136, 135, 8182, 1890.0, 3256.9, 3803.699999999999, 5008.429999999999, 1.3485832128194142, 22.870600407595667, 0.5546496725288156], "isController": true}, {"data": ["logout_user-108", 3206, 2, 0.06238303181534623, 1924.1781035558356, 132, 9265, 1897.0, 3316.9000000000005, 3813.949999999999, 5343.019999999998, 1.3492329025972523, 22.485586182199047, 0.6360703920497945], "isController": false}, {"data": ["load_page-14", 3220, 3, 0.09316770186335403, 1906.6155279503078, 135, 8182, 1890.0, 3256.9, 3803.699999999999, 5008.429999999999, 1.3486216207500095, 22.87125176705556, 0.5546654690669339], "isController": false}, {"data": ["UVD_05_CustomerCreateTicket_S01_signOut", 3209, 9, 0.28046120286693677, 4355.929884699283, 373, 12926, 4394.0, 7071.0, 7936.5, 10085.000000000011, 1.3440730733451756, 52.38423094420924, 2.1816805273329765], "isController": true}, {"data": ["logout_user-107", 3209, 7, 0.21813649111872857, 2433.550638828297, 230, 9611, 2360.0, 4058.0, 4819.5, 6410.200000000005, 1.3440730733451756, 30.005576411774108, 1.5486350088994059], "isController": false}, {"data": ["click_on_create_ticket-97", 3209, 1, 0.031162355874104083, 394.6466188843874, 156, 4156, 380.0, 549.0, 622.0, 811.5000000000005, 1.3444509243990401, 13.002565910145933, 0.6284553284289573], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/Internal Server Error", 33, 62.264150943396224, 0.11407238411282795], "isController": false}, {"data": ["Test failed: text expected to contain /Ticket Requests/", 20, 37.735849056603776, 0.06913477825019876], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 28929, 53, "500/Internal Server Error", 33, "Test failed: text expected to contain /Ticket Requests/", 20, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["click_on_newticket_link-71", 3214, 2, "500/Internal Server Error", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["click_on_create_ticket-91", 3213, 17, "Test failed: text expected to contain /Ticket Requests/", 12, "500/Internal Server Error", 5, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["click_on_signin-65", 3215, 10, "Test failed: text expected to contain /Ticket Requests/", 8, "500/Internal Server Error", 2, null, null, null, null, null, null], "isController": false}, {"data": ["click_on_signin-64", 3218, 8, "500/Internal Server Error", 8, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["click_on_create_ticket-95", 3210, 3, "500/Internal Server Error", 3, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["logout_user-108", 3206, 2, "500/Internal Server Error", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["load_page-14", 3220, 3, "500/Internal Server Error", 3, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["logout_user-107", 3209, 7, "500/Internal Server Error", 7, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["click_on_create_ticket-97", 3209, 1, "500/Internal Server Error", 1, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
