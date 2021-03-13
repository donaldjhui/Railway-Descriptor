// Parse inputs for railway routes/nodes and distances
function createDGraph() {

    // Regex to separate routes/nodes from their distances using a global modifier
    var regex = new RegExp('([0-9]+)|([a-zA-Z]+)','g');

    var nodes_list = [];
    let nodes_map = {};

    // Request graph routes/nodes and organize the routes/nodes into an array
    read.question('Input Nodes of the Directed Graph, separated by commas: ', (nodes) => {
        
        nodes_list = nodes.split(',');
        nodes_list = nodes_list.map(node => node.trim());

        for (var i = 0; i < nodes_list.length; i++) {
            // Start of route
            route_start = nodes_list[i].split('')[0];
            // End of route
            route_end = nodes_list[i].split('')[1];
            // The distance between the set of routes/nodes
            route_distance = parseInt(nodes_list[i].match(regex)[1]);

            if (!(route_start in nodes_map)) {
                // Add the routes/nodes and distances into a map
                nodes_map[route_start] = {[route_end]: route_distance};
            } else {
                // Add a key do the dictionary's value
                nodes_map[route_start][route_end] = route_distance;
            }
        }

        findDistances(nodes_map);
    });
}

// Get distances of railway routes/nodes
function findDistances(nodes_map) {

    // 1. The distance of the route A-B-C.
    var ABC = null;
    // If the route exists, calculate the distance otherwise output "NO SUCH ROUTE"
    if (nodes_map['A']['B'] && nodes_map['B']['C']) {
        ABC = nodes_map['A']['B'] + nodes_map['B']['C'];
    } else {
        ABC = "NO SUCH ROUTE";
    }

    console.log("Output # 1: " + ABC);

    // 2. The distance of the route A-D.
    var AD = null;
    // If the route exists, calculate the distance otherwise output "NO SUCH ROUTE"
    if (nodes_map['A']['D']) {
        AD = nodes_map['A']['D'];
    } else {
        AD = "NO SUCH ROUTE";
    }

    console.log("Output # 2: " + AD);

    // 3. The distance of the route A-D-C.
    var ADC = null;
    // If the route exists, calculate the distance otherwise output "NO SUCH ROUTE"
    if (nodes_map['A']['D'] && nodes_map['D']['C']) {
        ADC = nodes_map['A']['D'] + nodes_map['D']['C'];
    } else {
        ADC = "NO SUCH ROUTE";
    }

    console.log("Output # 3: " + ADC);

    // 4. The distance of the route A-E-B-C-D.
    var AEBCD = null;
    // If the route exists, calculate the distance otherwise output "NO SUCH ROUTE"
    if (nodes_map['A']['E'] && nodes_map['E']['B'] && nodes_map['B']['C'] && nodes_map['C']['D']) {
        AEBCD = nodes_map['A']['E'] + nodes_map['E']['B'] + nodes_map['B']['C'] + nodes_map['C']['D'];
    } else {
        AEBCD = "NO SUCH ROUTE";
    }

    console.log("Output # 4: " + AEBCD);



    // 5. The distance of the route A-E-D.
    var AED = null;
    // If the route exists, calculate the distance otherwise output "NO SUCH ROUTE"
    if (nodes_map['A']['E'] && nodes_map['E']['D']) {
        AED = nodes_map['A']['E'] + nodes_map['E']['D'];
    } else {
        AED = "NO SUCH ROUTE";
    }

    console.log("Output # 5: " + AED);
    
    numberOfTrips(nodes_map);

}

// Get the number of trips start and ending at C with a maximum of 3 stops
function numberOfTrips(nodes_map) {

    console.log(nodes_map);

    // Start and end location
    start, end = 'C';
    // Maximum number of stops
    max_stops = 3;

    // Keep track of the routes we visited
    visited = []


    read.close();
}

// Read user input
var readline = require('readline');

var read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

createDGraph();

// AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7