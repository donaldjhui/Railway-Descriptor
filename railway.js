// Parse inputs for railway paths/nodes and distances
function createDGraph() {

    // Regex to separate paths/nodes from their distances using a global modifier
    var regex = new RegExp('([0-9]+)|([a-zA-Z]+)','g');

    var nodes_list = [];
    let nodes_map = {};

    // Request graph nodes and organize the paths/nodes into an array
    read.question('Input Nodes of the Directed Graph, separated by commas: ', (nodes) => {
        
        nodes_list = nodes.split(',');
        nodes_list = nodes_list.map(node => node.trim());

        for (var i = 0; i < nodes_list.length; i++) {
            // Set of paths/nodes
            node_set = nodes_list[i].match(regex)[0];
            // The distance between the set of paths/nodes
            node_distance = nodes_list[i].match(regex)[1];

            // Add the paths/nodes and distances into a map
            nodes_map[node_set] = node_distance;
        }

        findDistances(nodes_map)
    });
}

// Get distances of railway paths/nodes
function findDistances(nodes) {
    console.log(nodes);
    read.close();
}

// Read user input
var readline = require('readline');

var read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

createDGraph();