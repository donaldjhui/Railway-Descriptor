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

// ---------------------------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------------------------

// Get the number of trips from 'start' to 'end' with a maximum of 3 stops
function number_of_trips(nodes_map, start, end, max_stops) {

    // Saves the number of possible trips
    let num_trips = 0;

    // Saves the visited stops
    let visited = [];

    // Contains how many stops we have had for the current route
    let stops = 0;

    iterate_stops(start, end, stops, max_stops);

    return num_trips;

    // Iterate through the stops in the directed graph
    function iterate_stops(start, end, stops, max_stops) {

        // Return "NO SUCH ROUTE" if 'start' and 'end' are not valid stops
        if ((start in nodes_map) && (end in nodes_map)) {

            // number of stops we have made
            stops += 1;

            // If the number of stops we make is greater than 'max_stops', we know the current route is incorrect
            if (stops > max_stops) {
                return 0;
            }    

            visited.push(start);  

            for (let nearby in nodes_map[start]) {

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
            num_trips = "NO SUCH ROUTE";
            return 0;
        }

        return 0;
    }
}

// ---------------------------------------------------------------------------------------------

// Get the number of trips start and ending at C with a maximum of 3 stops
function number_of_trips2(nodes_map, start, end, max_stops) {

    // Saves the number of possible trips
    let num_trips = 0;

    // Saves the visited stops
    let visited = [];

    // Contains how many stops we have had for the current route
    let stops = 0;

    iterate_stops2(start, end, stops, max_stops);

    return num_trips;

    function iterate_stops2(start, end, stops, max_stops) {

        // Return "NO SUCH ROUTE" if 'start' and 'end' are not valid stops
        if ((start in nodes_map) && (end in nodes_map)) {

            // Number of stops we have made
            stops += 1;

            if (stops > max_stops) {
                return 0;
            }    

            visited.push(start);  

            for (let nearby in nodes_map[start]) {

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
            num_trips = "NO SUCH ROUTE";
            return 0;
        }

        return 0;
    }
}

// ---------------------------------------------------------------------------------------------

// Get the distance of the shortest route from 'start' to 'end'
function find_shortest_route(nodes_map, start, end) {

    // Save the original starting stop
    let wrong_route = false;

    // Shortest visited route
    let curr_visited = [];

    // Distance for the current route we are checking
    let curr_route = 0;

    // Distance of the shortest route
    let shortest_route = null;

    closest_stop(start, end);

    return shortest_route;

    function closest_stop(start, end) {

        // Return "NO SUCH ROUTE" if 'start' and 'end' are not valid stops
        if ((start in nodes_map) && (end in nodes_map)) {

            if (!(curr_visited.includes(start))) {
                curr_visited.push(start);  
            }

            // Check each each nearby stop
            for (let nearby in nodes_map[start]) {

                // Distance of the nearby stop
                let nearby_dist = nodes_map[start][nearby];

                // We were on the wrong route before, try a different route
                if (wrong_route === true) {
                    curr_visited.pop();
                    curr_route -= nearby_dist; 
                    wrong_route = false;
                    return 0;
                }                           
            
                // If we have already been to the stop before, try a new route
                if (curr_visited.includes(nearby) && nearby != end) {
                    curr_route -= nearby_dist;
                    curr_visited.pop();
                    return 0;
                }

                // If we have already been to the stop before, and it is equal to our destination
                if (curr_visited.includes(nearby) && nearby == end) {
                    curr_route += nearby_dist;
                }

                // It is our first time going to this stop, add it to our list visited stops and add to our distance
                if (!(curr_visited.includes(nearby))) {
                    curr_route += nearby_dist;
                    curr_visited.push(nearby);
                } 

                // Our current route is greater than our shortest route so we do not need to further check it
                if (shortest_route != null && curr_route > shortest_route) {

                    let counter = 0;

                    for (let stop in nodes_map[start]) {

                        // Check if all the nearby stops have been checked
                        if (curr_visited.includes(stop)) {
                            counter += 1;
                        }

                        // If all the nearby stops have been checked, then move on to a different route
                        if (counter === Object.keys(nodes_map[start]).length) {
                            wrong_route = true;
                            // subtract the distance, we are going try a different route
                            curr_visited.pop();
                            curr_route -= nearby_dist;
                            return 0;
                        }

                        // Mark wrong route
                        wrong_route = true;

                    }
                } 

                // Check if our incoming stop is equivalent to our 'end' stop
                if (nearby === end) {

                    // It is the first time finding a route or our new route is closer than our saved route
                    if (shortest_route == null || curr_route <= shortest_route) {
                        
                        // If it is equal to the end route
                        shortest_route = curr_route;
                        curr_route = 0;
                        curr_visited = [];
                        return 0;
                    }
                }          

                // move on to the next stop
                closest_stop(nearby, end);
            }
        } else {
            shortest_route = "NO SUCH ROUTE";
            return 0;
        }

        return 0;
    }
}

// ---------------------------------------------------------------------------------------------

// Get the number of different routes from 'start' to 'end' with a distance less than 'max_dist'
function find_diff_routes(nodes_map, start, end, max_dist) {

    // Saves the number of possible routes with a distance less than max_dist
    let num_routes = 0;

    // The number of stops we make in the route
    let stops = 0;

    // Number of times to subtract distances from incorrect route
    let backtrack = 0;

    // Contains the previous iteration's distance
    let prev_dist = 0;

    // Shows if we have found a valid route
    let not_found = false;

    // Contains how many stops we have had for the current route
    let curr_dist = 0;

    // Show if we have visited the stop before
    let not_visited = true;

    nearby_stops(start, end, [], curr_dist);

    return num_routes;

    function nearby_stops(start, end, visited, curr_dist) {

        // Return "NO SUCH ROUTE" if 'start' and 'end' are not valid stops
        if ((start in nodes_map) && (end in nodes_map)) {

            // Increase the amount of times we will backtrack, based on how many repeat iterations we encounter
            if (visited.includes(start)) {
                backtrack += 1;
            }

            if ((visited.includes(start)) && (curr_dist >= max_dist)) {
                not_visited = false;
            }

            // Add current stop to array of visited stops
            visited.push(start);

            for (let nearby in nodes_map[start]) {

                // Get the distance to the nearby stop
                let nearby_dist = nodes_map[start][nearby];

                if ((curr_dist < max_dist) && (start === end) && (visited.length > 1)) {
                    num_routes += 1;
                }

                // Revert the distance if we have already encountered it, and it is not our end stop
                if ((not_visited === false) && (start != end)) {

                    // Subtract the distance for however many iterations we have gone for the same repeating stops
                    for (let i = 0; i < backtrack; i++) {
                        curr_dist -= prev_dist;
                        visited.pop();
                    }
                    not_visited = true;
                    backtrack = 0;
                    return 0;
                }
                
                // Update current route's distance
                curr_dist += nearby_dist;

                // Number of stops we have made
                stops += 1;

                // Our current route is not a valid route, process with updating values and continue to next route
                if ((visited.includes(nearby)) && (start === end)) {
                    curr_dist -= nearby_dist;
                    
                    // We did not find a valid route, update our array of visited stops and continue to next route
                    for (let i=0; i < 0; i++) {
                        curr_dist -= prev_dist;
                        visited.pop();
                    }
                    stops = 0;
                    return 0;

                }

                // Save distance for next iteration
                prev_dist = nearby_dist;
                
                // Recurse through the other nearby routes
                nearby_stops(nearby, end, visited, curr_dist);
            }

        } else {
            num_routes = "NO SUCH ROUTE";
            return 0;
        }
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

    // Question #6
    // Start and end stop
    start = 'C';
    end = 'C';
    // Maximum number of stops
    max_stops = 3;
    // Find number of trips from 'start' to 'end' with a maximum of 'max_stops'
    num_trips = number_of_trips(nodes_map, start, end, max_stops);
    console.log("Output #6: " + num_trips);

    // Question #7
    // Start and end stop
    start = 'A';
    end = 'C';
    // Number of stops
    num_stops = 4;
    // Find number of trips from 'start' to 'end' with a maximum of 'max_stops'
    num_trips = number_of_trips2(nodes_map, start, end, num_stops);
    console.log("Output #7: " + num_trips);

    // Question #8
    // Start and end stop
    start = 'A';
    end = 'C';

    // Find the shortest route from 'start' to 'end'
    shortest_route = find_shortest_route(nodes_map, start, end);
    console.log("Output # 8: " + shortest_route);

    // Question #9
    // Start and end stop
    start = 'B';
    end = 'B';

    // Find the shortest route from 'start' to 'end'
    shortest_route = find_shortest_route(nodes_map, start, end);
    console.log("Output # 9: " + shortest_route);

    // Question # 10
    // Start and end stop
    start = 'C';
    end = 'C';
    // Maximum distance (can not be over 30)
    max_dist = 30

    // Find the number of different routes from 'start' to 'end' with a distance of less than 30
    diff_routes = find_diff_routes(nodes_map, start, end, max_dist);
    console.log("Output # 10: " + diff_routes);

    read.close();
});