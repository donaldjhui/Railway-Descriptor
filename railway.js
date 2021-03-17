// Parse inputs for railway routes/nodes and distances
function createDGraph(nodes) {

    // Regex to separate routes/nodes from their distances using a global modifier
    let regex = new RegExp('([0-9]+)|([a-zA-Z]+)','g');

    let nodes_list = [];
    let nodes_map = {};

    nodes_list = nodes.split(',');
    nodes_list = nodes_list.map(node => node.trim());

    for (var i = 0; i < nodes_list.length; i++) {
        // Start of route
        let route_start = nodes_list[i].split('')[0];
        // End of route
        let route_end = nodes_list[i].split('')[1];
        // The distance between the set of routes/nodes
        let route_distance = parseInt(nodes_list[i].match(regex)[1]);

        if (!(route_start in nodes_map)) {
            // Add the routes/nodes and distances into a map
            nodes_map[route_start] = {[route_end]: route_distance};
        } else {
            // Add a key do the dictionary's value
            nodes_map[route_start][route_end] = route_distance;
        }
    }

    return nodes_map;
}

// Get distances of railway routes/nodes
function findDistances(nodes_map) {

    // 1. The distance of the route A-B-C.
    let ABC = null;
    // If the route exists, calculate the distance otherwise output "NO SUCH ROUTE"
    if (nodes_map['A']['B'] && nodes_map['B']['C']) {
        ABC = nodes_map['A']['B'] + nodes_map['B']['C'];
    } else {
        ABC = "NO SUCH ROUTE";
    }

    console.log("Output # 1: " + ABC);

    // 2. The distance of the route A-D.
    let AD = null;
    // If the route exists, calculate the distance otherwise output "NO SUCH ROUTE"
    if (nodes_map['A']['D']) {
        AD = nodes_map['A']['D'];
    } else {
        AD = "NO SUCH ROUTE";
    }

    console.log("Output # 2: " + AD);

    // 3. The distance of the route A-D-C.
    let ADC = null;
    // If the route exists, calculate the distance otherwise output "NO SUCH ROUTE"
    if (nodes_map['A']['D'] && nodes_map['D']['C']) {
        ADC = nodes_map['A']['D'] + nodes_map['D']['C'];
    } else {
        ADC = "NO SUCH ROUTE";
    }

    console.log("Output # 3: " + ADC);

    // 4. The distance of the route A-E-B-C-D.
    let AEBCD = null;
    // If the route exists, calculate the distance otherwise output "NO SUCH ROUTE"
    if (nodes_map['A']['E'] && nodes_map['E']['B'] && nodes_map['B']['C'] && nodes_map['C']['D']) {
        AEBCD = nodes_map['A']['E'] + nodes_map['E']['B'] + nodes_map['B']['C'] + nodes_map['C']['D'];
    } else {
        AEBCD = "NO SUCH ROUTE";
    }

    console.log("Output # 4: " + AEBCD);

    // 5. The distance of the route A-E-D.
    let AED = null;
    // If the route exists, calculate the distance otherwise output "NO SUCH ROUTE"
    if (nodes_map['A']['E'] && nodes_map['E']['D']) {
        AED = nodes_map['A']['E'] + nodes_map['E']['D'];
    } else {
        AED = "NO SUCH ROUTE";
    }

    console.log("Output # 5: " + AED);
    
    return 0;

}

// Get the number of trips from 'start' to 'end' with a maximum of 3 stops
function number_of_trips(nodes_map, start, end, max_stops) {

    // Saves the number of possible trips
    let num_trips = 0;

    // Saves the visited stop
    let visited = [];

    // Contains how many stops we have had for the current route
    let stops = 0;

    let existing_route = iterate_stops(start, end, stops, max_stops);

    if (existing_route == "NO SUCH ROUTE") {
        return existing_route;
    }

    return num_trips;

    // Iterate through the stops in the directed graph
    function iterate_stops(start, end, stops, max_stops) {

        // return "NO SUCH ROUTE" if 'start' and 'end' are not valid stops
        if ((start in nodes_map) && (end in nodes_map)) {

            // number of stops we have made
            stops += 1;

            // If the number of stops we make is greater than 'max_stops', we know the current route is incorrect
            if (stops > max_stops) {
                return 0;
            }    

            visited.push(start);  

            for (let nearby in nodes_map[start]) {

                // print statements for testing purposes
                // console.log("_______________________________");
                // console.log("CURRENT STOP: " + start);
                // console.log("NEXT STOP: " + nearby);
                // console.log("NUMBER OF TRIPS: " + num_trips);
                // console.log("STOPS: " + stops);
                // console.log("VISITED: " + visited);

                // Check if our incoming stop is equivalent to our 'end' stop
                if (nearby === end) {
                    // Increase number of possible trips by 1
                    num_trips += 1;
    
                    visited = [];
                    return 0;
                }

                // move on to the next stop
                iterate_stops(nearby, end, stops, max_stops);   
            }
        } else {
            return "NO SUCH ROUTE";
        }

        return 0;
    }
}

// Get the number of trips start and ending at C with a maximum of 3 stops
function number_of_trips2(nodes_map, start, end, max_stops) {

    // Saves the number of possible trips
    let num_trips = 0;

    // Saves the visited stop
    let visited = [];

    // Contains how many stops we have had for the current route
    let stops = 0;

    let existing_route = iterate_stops2(start, end, stops, max_stops);

    if (existing_route == "NO SUCH ROUTE") {
        return existing_route;
    }

    return num_trips;

    function iterate_stops2(start, end, stops, max_stops) {

        // return "NO SUCH ROUTE" if 'start' and 'end' are not valid stops
        if ((start in nodes_map) && (end in nodes_map)) {

            // number of stops we have made
            stops += 1;

            if (stops > max_stops) {
                return 0;
            }    

            visited.push(start);  

            for (let nearby in nodes_map[start]) {

                // print statements for testing purposes
                // console.log("_______________________________");
                // console.log("CURRENT STOP: " + start);
                // console.log("NEXT STOP: " + nearby);
                // console.log("NUMBER OF TRIPS: " + num_trips);
                // console.log("STOPS: " + stops);
                // console.log("VISITED: " + visited);

                // Check if our incoming stop is equivalent to our 'end' stop
                if (nearby === end && stops === max_stops) {
                    // Increase number of possible trips by 1
                    num_trips += 1;
    
                    visited = [];
                    return 0;
                }

                // move on to the next stop
                iterate_stops2(nearby, end, stops, max_stops);   
            }
        } else {
            return "NO SUCH ROUTE";
        }

        return 0;
    }
}

// Get the number of trips from 'start' to 'end' with exactly 4 stops
function shortest_route(nodes_map, start, end) {

    // visited stops
    let visited = [];

    // Mark if the current node is the shortest
    let shortest = null;

    closest_stop(start, end, stops);

    function closest_stop(start, end) {

        return 0;
    }
}

// Read user input
var readline = require('readline');

var read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Input Nodes of the Directed Graph, separated by commas: '
});

read.prompt();

read.on('line', (nodes) => {
    // Request graph routes/nodes and organize the routes/nodes into a map
    nodes_map = createDGraph(nodes);

    // testing purposes
    console.log(nodes_map);

    // Questions #1-#5
    findDistances(nodes_map);

    // // Question #6
    // // Start and end stop
    // start = 'C';
    // end = 'C';
    // // Maximum number of stops
    // max_stops = 3;
    // // Find number of trips from 'start' to 'end' with a maximum of 'max_stops'
    // num_trips = number_of_trips(nodes_map, start, end, max_stops);
    // console.log("Output #6: " + num_trips);

    // // Question #7
    // // Start and end stop
    // start = 'A';
    // end = 'C';
    // // Number of stops
    // num_stops = 4;
    // // Find number of trips from 'start' to 'end' with a maximum of 'max_stops'
    // num_trips = number_of_trips2(nodes_map, start, end, num_stops);
    // console.log("Output #7: " + num_trips);

    // Question #8
    // Start and end stop
    start = 'A';
    end = 'C';

    // Find the shortest route from 'start' to 'end'
    shortest_route = shortestRoute(nodes_map, start, end);
    console.log("Output #8: " + shortest_route);
    shortest_route(nodes_map, start, end);

    read.close();
});

// Install node.js if it is not already installed on your device at "https://nodejs.org/en/download/".
// How to run code, type "node railway.js" then when prompted for the directed graph nodes, input them, separated by a comma, until the last one
// Example: AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7

// Example: AB5, BC4, CD8, DE6, AD5, CE2, EB3, AE7, EC2

// AB5, BC4, CD8, DE6, AD5, CE2, EB3, AE7, EC2, CB2