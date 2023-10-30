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

    var data = {"OkPercent": 99.79454869196, "KoPercent": 0.20545130803999453};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.24893148270544171, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5905730129390019, 500, 1500, "click_on_newticket_link-71"], "isController": false}, {"data": [0.5905730129390019, 500, 1500, "UVD_03_CustomerCreateTicket_S01_clickOnNewTicketLink"], "isController": true}, {"data": [0.09734239802224968, 500, 1500, "click_on_create_ticket-91"], "isController": false}, {"data": [0.02119164619164619, 500, 1500, "UVD_02_CustomerCreateTicket_S01_signIn"], "isController": true}, {"data": [0.6133004926108374, 500, 1500, "click_on_signin-65"], "isController": false}, {"data": [0.028562653562653563, 500, 1500, "click_on_signin-64"], "isController": false}, {"data": [0.013597033374536464, 500, 1500, "UVD_04_CustomerCreateTicket_S01_clickOnCreateTicketButton"], "isController": true}, {"data": [0.5861214374225526, 500, 1500, "click_on_create_ticket-95"], "isController": false}, {"data": [0.09889773423147581, 500, 1500, "UVD_01_CustomerCreateTicket_S01_pageLoad"], "isController": true}, {"data": [0.08504034761018, 500, 1500, "logout_user-108"], "isController": false}, {"data": [0.09889773423147581, 500, 1500, "load_page-14"], "isController": false}, {"data": [0.03717472118959108, 500, 1500, "UVD_05_CustomerCreateTicket_S01_signOut"], "isController": true}, {"data": [0.05947955390334572, 500, 1500, "logout_user-107"], "isController": false}, {"data": [0.5662949194547707, 500, 1500, "click_on_create_ticket-97"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 14602, 30, 0.20545130803999453, 3444.196548418019, 126, 24187, 1835.5, 8423.500000000004, 10837.0, 15859.939999999999, 6.10862662578073, 279.3109993459488, 5.216931945467058], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["click_on_newticket_link-71", 1623, 3, 0.18484288354898337, 1012.8792359827474, 160, 9114, 589.0, 2250.6000000000004, 4258.4, 5942.48, 0.6799190129737597, 17.269504855943467, 0.3391286067284333], "isController": false}, {"data": ["UVD_03_CustomerCreateTicket_S01_clickOnNewTicketLink", 1623, 3, 0.18484288354898337, 1012.8792359827474, 160, 9114, 589.0, 2250.6000000000004, 4258.4, 5942.48, 0.6799187281372405, 17.269497621279402, 0.3391284646582602], "isController": true}, {"data": ["click_on_create_ticket-91", 1618, 14, 0.865265760197775, 2768.4233621755257, 537, 12673, 1799.0, 6509.900000000004, 7948.799999999999, 10997.749999999996, 0.677553020198869, 63.963036009006466, 1.3724821098050464], "isController": false}, {"data": ["UVD_02_CustomerCreateTicket_S01_signIn", 1628, 8, 0.4914004914004914, 7950.478501228504, 671, 26478, 6805.5, 15362.600000000006, 18350.85, 22863.100000000006, 0.6819130929408171, 73.18734679338536, 1.4615081650244346], "isController": true}, {"data": ["click_on_signin-65", 1624, 8, 0.49261083743842365, 958.1083743842369, 162, 12344, 551.0, 2145.5, 3738.75, 5780.5, 0.6803892463306532, 17.80422942409072, 0.33428869381289883], "isController": false}, {"data": ["click_on_signin-64", 1628, 2, 0.12285012285012285, 6994.723587223585, 507, 24030, 6229.5, 13048.800000000003, 15545.299999999997, 19667.590000000015, 0.6820105066483457, 55.3949970426487, 1.12745500086927], "isController": false}, {"data": ["UVD_04_CustomerCreateTicket_S01_clickOnCreateTicketButton", 1618, 16, 0.9888751545117429, 4645.8016069221285, 880, 27829, 2949.0, 10967.900000000001, 12965.249999999998, 16091.579999999998, 0.677402959304745, 97.01637496315732, 2.032593200996929], "isController": true}, {"data": ["click_on_create_ticket-95", 1614, 1, 0.061957868649318466, 1064.7410161090472, 162, 14296, 588.0, 2511.5, 4587.25, 6044.099999999994, 0.6759997068154927, 17.507237174486665, 0.3428135928976053], "isController": false}, {"data": ["UVD_01_CustomerCreateTicket_S01_pageLoad", 1633, 1, 0.0612369871402327, 5332.965094917327, 129, 18849, 4891.0, 9780.600000000002, 11674.199999999999, 15398.100000000015, 0.6841710553328054, 16.11899456797824, 0.28101717942836313], "isController": true}, {"data": ["logout_user-108", 1611, 0, 0.0, 5445.690254500315, 126, 19713, 4932.0, 9931.8, 11813.999999999998, 15779.119999999994, 0.6780608385983713, 16.099946420146026, 0.31958994931063817], "isController": false}, {"data": ["load_page-14", 1633, 1, 0.0612369871402327, 5332.963257807715, 129, 18849, 4891.0, 9780.600000000002, 11674.199999999999, 15398.100000000015, 0.6841928409882209, 16.119507835615863, 0.2810261276926738], "isController": false}, {"data": ["UVD_05_CustomerCreateTicket_S01_signOut", 1614, 0, 0.0, 11998.033457249074, 342, 38772, 11366.0, 21491.0, 24661.0, 30518.399999999998, 0.6757625251579187, 74.75439922084246, 1.096823693703727], "isController": true}, {"data": ["logout_user-107", 1614, 0, 0.0, 6562.465303593561, 216, 24187, 5949.0, 11990.5, 14342.75, 18307.199999999997, 0.6757628080917363, 58.73887290226728, 0.778909352872327], "isController": false}, {"data": ["click_on_create_ticket-97", 1614, 1, 0.061957868649318466, 817.2899628252787, 147, 3497, 609.0, 1628.5, 2101.25, 2847.199999999999, 0.6759430850896756, 15.572245523421385, 0.3178401080765566], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/Internal Server Error", 18, 60.0, 0.12327078482399671], "isController": false}, {"data": ["Test failed: text expected to contain /Ticket Requests/", 12, 40.0, 0.08218052321599781], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 14602, 30, "500/Internal Server Error", 18, "Test failed: text expected to contain /Ticket Requests/", 12, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["click_on_newticket_link-71", 1623, 3, "500/Internal Server Error", 3, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["click_on_create_ticket-91", 1618, 14, "Test failed: text expected to contain /Ticket Requests/", 10, "500/Internal Server Error", 4, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["click_on_signin-65", 1624, 8, "500/Internal Server Error", 6, "Test failed: text expected to contain /Ticket Requests/", 2, null, null, null, null, null, null], "isController": false}, {"data": ["click_on_signin-64", 1628, 2, "500/Internal Server Error", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["click_on_create_ticket-95", 1614, 1, "500/Internal Server Error", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["load_page-14", 1633, 1, "500/Internal Server Error", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["click_on_create_ticket-97", 1614, 1, "500/Internal Server Error", 1, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
