//Global variables
var allDraftData;
var selectedYear;
var selectedAnalysis
var selectedPosition;
var selectedPlayer;
var playerArray;
var analysisArray;
var rad_store;
var avg_position;

//Global margin, same for all charts
var margin1 = { top: 50, right: 80, bottom: 50, left: 80 },
  width = Math.min(700, window.innerWidth / 4) - margin1.left - margin1.right,
  height = Math.min(width, window.innerHeight - margin1.top - margin1.bo);


//==============================================================================
function updateCharts(selectedPlayer) {

  // Find players in position and year class
    if (selectedAnalysis == 'College') {
      var newArray = allDraftData.filter(function(el){
        return el.COLLEGE == selectedYear &&
                el.POS == selectedPosition &&
                el.PLAYER == selectedPlayer;
      });
    } else if (selectedAnalysis == 'Team') {
      var newArray = allDraftData.filter(function(el){
        return el.TEAM == selectedYear &&
                el.POS == selectedPosition &&
                el.PLAYER == selectedPlayer;
      });
    } else if (selectedAnalysis == 'Player') {
      var newArray = allDraftData.filter(function(el){
        return el.YEAR == selectedYear &&
                el.POS == selectedPosition &&
                el.PLAYER == selectedPlayer;
      });
    }
//      str1 = 'Player: ';
//      str2 = 'College: ';
//      str3 = 'Drafted By: ';
//      str4 = 'Pick Number: ';

      str1 = '';
      str2 = '';
      str3 = '';
      str4 = '';
      str5 = '';


      var value1 = str1.concat(selectedPlayer);
      var value2 = str2.concat(newArray[0].college);
      var value3 = str3.concat(newArray[0].team);
      var value4 = str4.concat(newArray[0].pick);
      var value5 = str5.concat(newArray[0].year);
//      document.getElementById("INFO1").textContent = value1 + ' played college football at';
//      document.getElementById("INFO2").textContent = value2 + '.';
//      document.getElementById("INFO3").textContent = 'He was drafted by ' + value3 + 'as the number'
//      document.getElementById("INFO4").textContent = value4 + ' overall pick in ';
//      document.getElementById("INFO5").textContent = value5 + '.';
      document.getElementById("BIO1").textContent = value1 + ' played college football at ' + value2 + '.'
      document.getElementById("BIO2").textContent = 'He was drafted by ' + value3 + ' as the number ' + value4 + ' overall pick in ' + value5 + '.'


// Obtain combine metrics for radial chart
  var rad_height = parseFloat(newArray.map(function(item){return item.height_normalized;}));
  var rad_weight = parseFloat(newArray.map(function(item){return item.weight_normalized;}));
  var rad_fort = parseFloat(newArray.map(function(item){return item.forty_normalized;}));
  var rad_vert = parseFloat(newArray.map(function(item){return item.vertical_normalized;}));
  var rad_bench = parseFloat(newArray.map(function(item){return item.bench_normalized;}));
  var rad_broad = parseFloat(newArray.map(function(item){return item.broad_normalized;}));
  var rad_three = parseFloat(newArray.map(function(item){return item.threecone_normalized;}));
  var rad_shut = parseFloat(newArray.map(function(item){return item.shuttle_normalized;}));

  rad_height = rad_height || 0;
  rad_weight = rad_weight || 0;
  rad_fort = rad_fort || 0;
  rad_vert = rad_vert || 0;
  rad_bench = rad_bench || 0;
  rad_broad = rad_broad || 0;
  rad_three = rad_three || 0;
  rad_shut = rad_shut || 0;


  //Obtaining Average Data
    if (selectedPosition == 'CB') {
      avg_position = "CB Average";
    } else if (selectedPosition == 'DL') {
        avg_position = "DL Average";
    } else if (selectedPosition == 'LB') {
        avg_position = "LB Average";
    } else if (selectedPosition == 'OL') {
        avg_position = "OL Average";
    } else if (selectedPosition == 'QB') {
        avg_position = "QB Average";
    } else if (selectedPosition == 'RB') {
        avg_position = "RB Average";
    } else if (selectedPosition == 'S') {
        avg_position = "S Average";
    } else if (selectedPosition == 'TE') {
        avg_position = "TE Average";
    } else if (selectedPosition == 'WR') {
        avg_position = "WR Average";
    }

    var newArray_AVG = allDraftData.filter(function(el){
      return el.POS == selectedPosition &&
             el.PLAYER == avg_position;
    });

    var arad_height = parseFloat(newArray_AVG.map(function(item){return item.height_normalized;}));
    var arad_weight = parseFloat(newArray_AVG.map(function(item){return item.weight_normalized;}));
    var arad_fort = parseFloat(newArray_AVG.map(function(item){return item.forty_normalized;}));
    var arad_vert = parseFloat(newArray_AVG.map(function(item){return item.vertical_normalized;}));
    var arad_bench = parseFloat(newArray_AVG.map(function(item){return item.bench_normalized;}));
    var arad_broad = parseFloat(newArray_AVG.map(function(item){return item.broad_normalized;}));
    var arad_three = parseFloat(newArray_AVG.map(function(item){return item.threecone_normalized;}));
    var arad_shut = parseFloat(newArray_AVG.map(function(item){return item.shuttle_normalized;}));

// allocating data to radar readable table file
  var combineData1 =
      [{name:selectedPlayer,
        axes:[
          {axis: 'Height', value:rad_height},
          {axis: 'Weight', value:rad_weight},
          {axis: 'Forty', value:rad_fort},
          {axis: 'Vertical', value:rad_vert},
          {axis: 'Bench', value:rad_bench},
          {axis: 'Broad', value:rad_broad},
          {axis: 'ThreeCone', value:rad_three},
          {axis: 'Shuttle', value:rad_shut}
              ]
        },
      {name:avg_position,
        axes:[
          {axis: 'Height', value:arad_height},
          {axis: 'Weight', value:arad_weight},
          {axis: 'Forty', value:arad_fort},
          {axis: 'Vertical', value:arad_vert},
          {axis: 'Bench', value:arad_bench},
          {axis: 'Broad', value:arad_broad},
          {axis: 'ThreeCone', value:arad_three},
          {axis: 'Shuttle', value:arad_shut}
        ]
  }];
  //counting missing data
var count = 0;
var c = 0;
var ind = [];
  // counting NA Values
  for(var i = 0; i < (combineData1[0].axes.length); i++) {
    if(combineData1[0].axes[i].value == 0){
      count++;
      ind[c] = i;
      c++;
    }
  };
var datmis = "";
for(var i = 0; i<(ind.length); i++){
  datmis = datmis.concat(combineData1[0].axes[ind[i]].axis);
  if(i<ind.length-1){
    datmis = datmis.concat(", ");
  };
};

if (count == 0){
  document.getElementById("DataMissing").textContent = count + ' Missing combine metrics. '
}
else{
  document.getElementById("DataMissing").textContent = count + ' Missing combine metrics. ' + 'Missing metrics are: ' + datmis + '.'
};
// allocating data to radar readable table file
  var combineData2 =
    [{name:selectedPlayer,
      axes:[
        {axis: 'Height', value:rad_height},
        {axis: 'Weight', value:rad_weight},
        {axis: 'Forty', value:rad_fort},
        {axis: 'Vertical', value:rad_vert},
        {axis: 'Bench', value:rad_bench},
        {axis: 'Broad', value:rad_broad},
        {axis: 'ThreeCone', value:rad_three},
        {axis: 'Shuttle', value:rad_shut}
            ]
      },
    {name:rad_store[0],
      axes:[
        {axis: 'Height', value:rad_store[1]},
        {axis: 'Weight', value:rad_store[2]},
        {axis: 'Forty', value:rad_store[3]},
        {axis: 'Vertical', value:rad_store[4]},
        {axis: 'Bench', value:rad_store[5]},
        {axis: 'Broad', value:rad_store[6]},
        {axis: 'ThreeCone', value:rad_store[7]},
        {axis: 'Shuttle', value:rad_store[8]}
      ]
}];

//creating radar chart options
  var radarChartOptions1 = {
    w: 350, //chart width
    h: 200, //chart height
    margin: margin1, //chart margin
    levels: 10,
    roundStrokes: true,
    color: d3.scaleOrdinal().range(["#234058", "#564536"]), //color options
    format: '.2f',
    legend: { title: 'Current Player V. Average', translateX: 95, translateY: 0 }
  };

//creating radar chart options
  var radarChartOptions2 = {
    w: 200, //chart width
    h: 200, //chart height
    margin: margin1, //chart margins
    levels: 10,
    roundStrokes: true,
    color: d3.scaleOrdinal().range(["#234058", "#564536"]), //color options
    format: '.2f',
    legend: { title: 'Current Player V. Previous', translateX: 95, translateY: 0 }
  };



// Draw the chart, get a reference the created svg element :
  let svg_radar1 = RadarChart(".radarChart1", combineData1, radarChartOptions1);
  let svg_radar2 = RadarChart(".radarChart2", combineData2, radarChartOptions2);

// allocate previous data
  var rad_play = selectedPlayer;
  rad_store = [rad_play, rad_height, rad_weight, rad_fort, rad_vert, rad_bench, rad_broad, rad_three, rad_shut];

//==============================================================================
// Still in "updatecharts function" now beginning Parallel coordinates chart
  var draftposition = ["AVG_1ST", "AVG_2ND", "AVG_3RD", "AVG_4TH", "AVG_5TH", "AVG_6TH","AVG_7TH"];
  var apara_height = [];
  var apara_weight = [];
  var apara_fort = [];
  var apara_vert = [];
  var apara_bench = [];
  var apara_broad = [];
  var apara_three = [];
  var apara_shut = [];

  for(var i = 0; i < (draftposition.length); i++) {
    paraArray_AVG = allDraftData.filter(function(el){
      return el.POS == selectedPosition &&
             el.PLAYER == draftposition[i];
    });
//Allocating parallel coordinates data
    apara_height[i] = parseFloat(paraArray_AVG.map(function(item){return item.height_normalized;}));
    apara_weight[i] = parseFloat(paraArray_AVG.map(function(item){return item.weight_normalized;}));
    apara_fort[i] = parseFloat(paraArray_AVG.map(function(item){return item.forty_normalized;}));
    apara_vert[i] = parseFloat(paraArray_AVG.map(function(item){return item.vertical_normalized;}));
    apara_bench[i] = parseFloat(paraArray_AVG.map(function(item){return item.bench_normalized;}));
    apara_broad[i] = parseFloat(paraArray_AVG.map(function(item){return item.broad_normalized;}));
    apara_three[i] = parseFloat(paraArray_AVG.map(function(item){return item.threecone_normalized;}));
    apara_shut[i] = parseFloat(paraArray_AVG.map(function(item){return item.shuttle_normalized;}));

  };


// Putting parallel corrdinates data into readable table form
  var paratable = [

    {"Player":"AVG_1ST",
    'Height':apara_height[0],
    'Weight':apara_weight[0],
    'Forty':apara_fort[0],
    'Vertical':apara_vert[0],
    'Bench':apara_bench[0],
    'Broad':apara_broad[0],
    'ThreeCone':apara_three[0],
    'Shuttle':apara_shut[0]},

    {"Player":"AVG_2ND",
    'Height':apara_height[1],
    'Weight':apara_weight[1],
    'Forty':apara_fort[1],
    'Vertical':apara_vert[1],
    'Bench':apara_bench[1],
    'Broad':apara_broad[1],
    'ThreeCone':apara_three[1],
    'Shuttle':apara_shut[1]},

    {"Player":"AVG_3RD",
    'Height':apara_height[2],
    'Weight':apara_weight[2],
    'Forty':apara_fort[2],
    'Vertical':apara_vert[2],
    'Bench':apara_bench[2],
    'Broad':apara_broad[2],
    'ThreeCone':apara_three[2],
    'Shuttle':apara_shut[2]},

    {"Player":"AVG_4TH",
    'Height':apara_height[3],
    'Weight':apara_weight[3],
    'Forty':apara_fort[3],
    'Vertical':apara_vert[3],
    'Bench':apara_bench[3],
    'Broad':apara_broad[3],
    'ThreeCone':apara_three[3],
    'Shuttle':apara_shut[3]},

    {"Player":"AVG_5TH",
    'Height':apara_height[4],
    'Weight':apara_weight[4],
    'Forty':apara_fort[4],
    'Vertical':apara_vert[4],
    'Bench':apara_bench[4],
    'Broad':apara_broad[4],
    'ThreeCone':apara_three[4],
    'Shuttle':apara_shut[4]},

    {"Player":"AVG_6TH",
    'Height':apara_height[5],
    'Weight':apara_weight[5],
    'Forty':apara_fort[5],
    'Vertical':apara_vert[5],
    'Bench':apara_bench[5],
    'Broad':apara_broad[5],
    'ThreeCone':apara_three[5],
    'Shuttle':apara_shut[5]},

    {"Player":"AVG_7TH",
    'Height':apara_height[6],
    'Weight':apara_weight[6],
    'Forty':apara_fort[6],
    'Vertical':apara_vert[6],
    'Bench':apara_bench[6],
    'Broad':apara_broad[6],
    'ThreeCone':apara_three[6],
    'Shuttle':apara_shut[6]},

    {"Player":selectedPlayer,
    'Height':rad_height,
    'Weight':rad_weight,
    'Forty':rad_fort,
    'Vertical':rad_vert,
    'Bench':rad_bench,
    'Broad':rad_broad,
    'ThreeCone':rad_three,
    'Shuttle':rad_shut}


  ];

// options being sent to the parallel coordinates chart. These are accessed using cfg.""
  var paraChartOptions1 = {
    w: 800, //width of chart
    h: 180, //height of chart NOTE - 5/12/19 Chan - reduced this from 200 to accomodate a taller info box without scrollbars.
    margin: margin1, //margin
    roundStrokes: true,
    color: d3.scaleOrdinal() //color schemes and how they relate to the data fields
              //.range(["#e6194b","#234058","#3B5264","#536471","#6B767D","#84888A","#9C9A96","#B4ACA3"])

              .range(["#544A7D", "#477183", "#3A988A", "#2EBF91", "#73C67C", "#B9CD67", "#FFD452","#e6194b"])
              .domain(["Player","1st Round","2nd Round", "3rd Round", "4th Round", "5th Round", "6th Round", "7th Round"]),
    format: '.2f',
    legend: { title: 'Player Vs. AVG Draft pos', translateX: 120, translateY: 10 }
  };
  let svg_PCC1 = PCChart(".paraChart1", paratable, paraChartOptions1);


//==========This is where the bar chart can go==================================
//call BarChart like this:
//let svg_bar = BarDummy(".barChart1", bartable, barTableOptions)

//".barChart1" will be the name of the entity created in the .html file, look
//how I did this with the other chart types.

// see lines 23-26 to see how I filter data in order to obtain a table containing
// a specific player's info based on college, position, and name.

// see lines 57-64 to see how I allocate specific data points to variables in the js

// see lines 229-238 to see how I created a table using js variables, which I then pass
// into the function in addition to the options.

//https://www.d3-graph-gallery.com/graph/barplot_grouped_basicWide.html

// Start of Chan code

// We are going to display different data in the histograms based on the position
  var new_h_Array = allDraftData.filter(function(el){
    return el.POS == selectedPosition;
  });
  console.log(new_h_Array);
  if (selectedPosition == 'CB') {
    var hist1_val = parseFloat(newArray.map(function(item){return item.defense_tackles;}));
    var hist2_val = parseFloat(newArray.map(function(item){return item.defense_int;}));
    var hist3_val = parseFloat(newArray.map(function(item){return item.defense_pd;}));

  } else if (selectedPosition == 'DL') {
    var hist1_val = parseFloat(newArray.map(function(item){return item.defense_tackles;}));
    var hist2_val = parseFloat(newArray.map(function(item){return item.defense_loss_tackles;}));
    var hist3_val = parseFloat(newArray.map(function(item){return item.defense_sacks;}));

  } else if (selectedPosition == 'LB') {
    var hist1_val = parseFloat(newArray.map(function(item){return item.defense_tackles;}));
    var hist2_val = parseFloat(newArray.map(function(item){return item.defense_loss_tackles;}));
    var hist3_val = parseFloat(newArray.map(function(item){return item.defense_ast_tackles;}));
  } else if (selectedPosition == 'OL') {
      // we are going to display a blank image here - no data available.

  } else if (selectedPosition == 'QB') {
    var hist1_val = parseFloat(newArray.map(function(item){return item.passing_pass_yards;}));
    var hist2_val = parseFloat(newArray.map(function(item){return item.passing_pass_tds;}));
    var hist3_val = parseFloat(newArray.map(function(item){return item.passing_pass_ints;}));

  } else if (selectedPosition == 'RB') {
    var hist1_val = parseFloat(newArray.map(function(item){return item.rushing_rush_yds;}));
    var hist2_val = parseFloat(newArray.map(function(item){return item.rushing_rush_td;}));
    var hist3_val = parseFloat(newArray.map(function(item){return item.rushing_rush_att;}));

  } else if (selectedPosition == 'S') {
    var hist1_val = parseFloat(newArray.map(function(item){return item.defense_tackles;}));
    var hist2_val = parseFloat(newArray.map(function(item){return item.defense_int;}));
    var hist3_val = parseFloat(newArray.map(function(item){return item.defense_pd;}));

  } else if (selectedPosition == 'TE') {
    var hist1_val = parseFloat(newArray.map(function(item){return item.receiving_receptions;}));
    var hist2_val = parseFloat(newArray.map(function(item){return item.receiving_rec_td;}));
    var hist3_val = parseFloat(newArray.map(function(item){return item.receiving_rec_yards;}));

  } else if (selectedPosition == 'WR') {
    var hist1_val = parseFloat(newArray.map(function(item){return item.receiving_receptions;}));
    var hist2_val = parseFloat(newArray.map(function(item){return item.receiving_rec_td;}));
    var hist3_val = parseFloat(newArray.map(function(item){return item.receiving_rec_yards;}));
    var example_h = new_h_Array[0];
    console.log(example_h);
  };

  let svg_histograms1 = hist("histograms1", hist1_val, hist2_val, hist3_val, selectedPosition, new_h_Array , "green", 1);
  let svg_histograms2 = hist("histograms2", hist2_val, hist2_val, hist3_val, selectedPosition, new_h_Array , "steelBlue", 2);
  let svg_histograms3 = hist("histograms3", hist3_val, hist2_val, hist3_val, selectedPosition, new_h_Array , "#a0500e", 3);
  console.log(hist1_val, hist2_val, hist3_val, selectedPosition, new_h_Array);
}

//===============End UpdateCharts function =====================================
//==============================================================================

function chooseData() {

// Obtain selected player value; allocate to global variable
  var playersel = document.getElementById("selectPlay").value;
  selectedPlayer = playerArray[playersel-1];
//did it this way because playersel returns a number, not the player.

// go into function update charts
  updateCharts(selectedPlayer);
}
//==============================================================================

function collegeAnalysis(){

  selectedAnalysis = "College";

  document.getElementById("selectYear").innerHTML = "";

// 5-12-2019 Chan: added style changes when clicked
  document.getElementById("CollegeAnalysis").style.backgroundColor = "#047028";
  document.getElementById("CollegeAnalysis").style.color = "#ffffff";
  document.getElementById("NFLAnalysis").style.backgroundColor = "#cdbfb0";
  document.getElementById("NFLAnalysis").style.color = "#2f2f30";
  document.getElementById("PlayerAnalysis").style.backgroundColor = "#cdbfb0";
  document.getElementById("PlayerAnalysis").style.color = "#2f2f30";

  var data = allDraftData

  var unique = d3.nest()
  .key(function(d) { return d.college;})
  .entries(data);

  unique.sort(function(a, b){ return d3.ascending(a.key, b.key); })

  var dropDown = document.getElementById("selectYear");
  var aa=[];

  for(var i = 0; i < (unique.length); i++) {
       dropDown[dropDown.length] = new Option(unique[i].key, i);
       aa[i] = unique[i].key;
  }
  analysisArray = aa;
  setSelectedIndex(document.getElementById('selectYear'),"Abilene Christian");
  populate();
}

//==============================================================================

function nflAnalysis(){

  selectedAnalysis = "Team";

  document.getElementById("selectYear").innerHTML = "";

// 5-12-2019 Chan: added style changes when clicked
  document.getElementById("CollegeAnalysis").style.backgroundColor = "#cdbfb0";
  document.getElementById("CollegeAnalysis").style.color = "#2f2f30";
  document.getElementById("NFLAnalysis").style.backgroundColor = "#047028";
  document.getElementById("NFLAnalysis").style.color = "#ffffff";
  document.getElementById("PlayerAnalysis").style.backgroundColor = "#cdbfb0";
  document.getElementById("PlayerAnalysis").style.color = "#2f2f30";

  var data = allDraftData

  var unique = d3.nest()
  .key(function(d) { return d.team;})
  .entries(data);

  unique.sort(function(a, b){ return d3.ascending(a.key, b.key); })

  var dropDown = document.getElementById("selectYear");
  var aa=[];

  for(var i = 0; i < (unique.length); i++) {
       dropDown[dropDown.length] = new Option(unique[i].key, i);
       aa[i] = unique[i].key;
  }
  analysisArray = aa;
  setSelectedIndex(document.getElementById('selectYear'),"ARI");
  populate();
}

//==============================================================================

function playerAnalysis(){

  selectedAnalysis = "Player";

  document.getElementById("selectYear").innerHTML = "";

  document.getElementById("CollegeAnalysis").style.backgroundColor = "#cdbfb0";
  document.getElementById("CollegeAnalysis").style.color = "#2f2f30";
  document.getElementById("NFLAnalysis").style.backgroundColor = "#cdbfb0";
  document.getElementById("NFLAnalysis").style.color = "#2f2f30";
  document.getElementById("PlayerAnalysis").style.backgroundColor = "#047028";
  document.getElementById("PlayerAnalysis").style.color = "#ffffff";

  var unique = [ "All", "2000", "2001", "2002", "2003", "2004", "2005",
                "2006", "2007", "2008", "2009", "2010", "2011",
                "2012", "2013", "2014", "2015", "2017", "2018", "2019"];

  var dropDown = document.getElementById("selectYear");
  var aa=[];

  for(var i = 0; i < (unique.length); i++) {
       dropDown[dropDown.length] = new Option(unique[i], i);
       aa[i] = unique[i];
  }
  setSelectedIndex(document.getElementById('selectYear'),"All");
  analysisArray = aa;
  populate();
}

//==============================================================================

function populate() {

// Remove all names in the player pulldown menu
  document.getElementById("selectPlay").innerHTML = "";

// Obtain selected year value; allocate to global variable
  var yearsel = document.getElementById("selectYear").value;
  selectedYear = analysisArray[yearsel];

// Obtain selected year value; allocate to global variable
  var possel = document.getElementById("selectPos").value;
  selectedPosition = possel;


// Find players in position and year class
  if (selectedAnalysis == 'College') {
    var newArray = allDraftData.filter(function(el){
      return el.COLLEGE == selectedYear &&
             el.POS == selectedPosition;
    });
  } else if (selectedAnalysis == 'Team') {
    var newArray = allDraftData.filter(function(el){
      return el.TEAM == selectedYear &&
             el.POS == selectedPosition;
    });
  } else if ((selectedAnalysis == 'Player')&&(selectedYear !=='All')) {
    var newArray = allDraftData.filter(function(el){
      return el.YEAR == selectedYear &&
             el.POS == selectedPosition;
    });
  } else if ((selectedAnalysis == 'Player')&&(selectedYear=='All')) {
    var newArray = allDraftData.filter(function(el){
      return el.POS == selectedPosition;
    });
  }

  var players = newArray.map(function(item){return item.player;});
  playerArray = players;

// Allocate all players in selected year and position class to dropdown
  var dropDown = document.getElementById("selectPlay");
  for(var i = 0; i < (players.length+1); i++) {
    if (i == 0) {
      dropDown[i] = new Option("Select Player",i);
    }
    else{
        dropDown[i] = new Option(players[i-1], i);
      };
  };
}

function setSelectedIndex(s, v) {
    for ( var i = 0; i < s.options.length; i++ ) {
        if ( s.options[i].text == v ) {
            s.options[i].selected = true;
            return;
        }
    }
}



//==============================================================================

d3.csv("/data/NFL_Draft_Stats_Final.v6.csv", function (error, data) {

    data.forEach(function (d) {
      //General Info
      d.IDENT = +d.ID;
      d.PICK = +d.pick;
      d.TEAM = d.team;
      d.YEAR = +d.year;
      d.PLAYER = d.player;
      d.POS = d.pos_cat;
      d.COLLEGE = d.college;

      //Combine Stats
      d.WEIGHT = +d.weight;
      d.WEIGHT_NORM = +d.weight_normalized;
      d.HEIGHT = +d.height_inches;
      d.HEIGHT_NORM = +d.height_normalized;
      d.FORTY = +d.forty;
      d.FORTY_NORM = +d.forty_normalized;
      d.VERTICAL = +d.vertical;
      d.VERTICAL_NORM = +d.vertical_normalized;
      d.BENCH = +d.bench;
      d.BENCH_NORM = +d.bench_normalized;
      d.BROAD = +d.broad;
      d.BROAD_NORM = +d.broad_normalized;
      d.THREECONE = +d.threecone;
      d.THREECONE_NORM = +d.threecone_normalized;
      d.SHUTTLE = +d.shuttle;
      d.SHUTTLE_NORM = +d.shuttle_normalized;

      //Defensive Stats
      d.DAT = +d.defense_ast_tackles;
      d.DFF = +d.defense_fum_forced;
      d.DFR = +d.defense_fum_rec;
      d.DFT = +d.defense_fum_yds;
      d.DG = +d.defense_games;
      d.DI = +d.defense_int;
      d.DIT = +d.defense_int_td;
      d.DIY = +d.defense_int_yards;
      d.DLT = +d.defense_loss_tackles;
      d.DPD = +d.defense_pd;
      d.DSA = +d.defense_sacks;
      d.DSE = +d.defense_seasons;
      d.DST = +d.defense_solo_tackles;
      d.DT = +d.defense_tackles;

      //QB Stats
      d.PA = +d.passing_attempts;
      d.PCT = +d.passing_comp_pct;
      d.PC = +d.passing_completions;
      d.PG = +d.passing_games;
      d.PPI = +d.passing_pass_ints;
      d.PPT = +d.passing_pass_tds;
      d.PPY = +d.passing_pass_yards;
      d.PS = +d.passing_seasons;

      //Rushing Stats
      d.RRG = +d.rushing_games;
      d.RRRT = +d.rushing_rec_td;
      d.RRRY = +d.rushing_rec_yards;
      d.RRR = +d.rushing_receptions;
      d.RRRA = +d.rushing_rush_att;
      d.RRUT = +d.rushing_rush_td;
      d.RRUY = +d.rushing_rush_yds;
      d.RRSP = +d.rushing_scrim_plays;
      d.RRST = +d.rushing_scrim_tds;
      d.RRSY = +d.rushing_scrim_yds;
      d.RRS = +d.rushing_seasons;

      //Receiving Stats
      d.RG = +d.receiving_games;
      d.RRT = +d.receiving_rec_td;
      d.RRY = +d.receiving_rec_yards; // note this was +d.rreceiving_rec_yards
      d.RR = +d.receiving_receptions;
      d.RRA = +d.receiving_rush_att;
      d.RUT = +d.receiving_rush_td;
      d.RUY = +d.receiving_rush_yds;
      d.RSP = +d.receiving_scrim_plays;
      d.RST = +d.receiving_scrim_tds;
      d.RSY = +d.receiving_scrim_yds;
      d.RRS = +d.receiving_seasons;

      allDraftData = data;


      rad_store = ["Randall Cobb", 4.46, 4.127, 6.49, 4.55, 5.695, 4.196, 4.7434, 4.34];
    });

    selectedAnalysis = "Team";

    document.getElementById("selectYear").innerHTML = "";

    var unique = d3.nest()
    .key(function(d) { return d.team;})
    .entries(data);

    unique.sort(function(a, b){ return d3.ascending(a.key, b.key); })

    var dropDown = document.getElementById("selectYear");
    var aa=[];

    for(var i = 0; i < (unique.length); i++) {
         dropDown[dropDown.length] = new Option(unique[i].key, i);
         aa[i] = unique[i].key;
    }
    analysisArray = aa;
    selectedYear = "Green Bay Packers"
    selectedPosition = "WR"
    var newArray = allDraftData.filter(function(el){
      return el.TEAM == selectedYear &&
             el.POS == selectedPosition;
    });


    var players = newArray.map(function(item){return item.player;});
    playerArray = players;

     updateCharts("Davante Adams")

     setSelectedIndex(document.getElementById('selectYear'),"Green Bay Packers");
     setSelectedIndex(document.getElementById('selectPos'),"WR");
     populate();
     setSelectedIndex(document.getElementById('selectPlay'),"Davante Adams");
  });
