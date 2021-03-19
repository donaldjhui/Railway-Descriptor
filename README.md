# Railway Descriptor

**Railway descriptor to get distances of routes, shortest routes, and number of different routes from a 'start' to 'end' stop.**

## How to run?

1. Install node.js if it is not already installed on your machine at "https://nodejs.org/en/download/".
2. Download the project to your machine into any folder you choose.
3. Run command prompt and go into the directory where the project is located (the folder will contain railway.js).
4. Type "node railway.js" into command prompt.
5. You will be prompted an input of directed graph node. Input the directed graph nodes along with their distances, each separated by a comma.
6. Modifying any values such as the starting point and ending point must be done in the code itself.

### An example input is shown below:

**Example:** AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7

### Brief explanation of the program:

- Once the user inputs the nodes of the directed graph, my program has a function called createDGraph() which converts the string input of nodes into a map. Once the map has been created, I can use it to find my results.
- For Output #1 - #5, I have a function called findDistances() to find the distances for the routes 'A-B-C', 'A-D', 'A-D-C', 'A-E-B-C-D', and 'A-E-D', returning "NO SUCH ROUTE" when the route does not exist. It does so by iterating through every stop in the route, adding each distance together.
- For Output #6 - #7, I have a function called number_of_trips() and a function called number_of_trips2() due to slight differences in requirements but the logic is similar. They use recursion to iterate through the map while recording the number of stops it takes for each route. If the start and end stops have been found but other requirements have not been met or vice versa, then the program proceeds to check another route.
- For Output #8 - #9, I have a function called find_shortest_route() that uses recursion to iterate through the map. I mark when both the start and end stop have been found, and save the distance for the route. I continue iterating through the map, updating my result when I encounter a shorter route.
- For Output #10, I have a function called find_diff_routes() to iterate recursively through the map. The function iterates through the map, avoiding infinite loops when necessary. When the function encounters the start and end stops we desire, it increases our counter for our number of different routes if it has a distance less than 30. It proceeds to continue doing so until it has traversed the different routes in the directed graph. This function is not working correctly, I had an issue with fixing the program to work for all scenarios, including loops. I was unable to complete this in time.

_Thank you for taking the time to look at this project, I hope you enjoyed it!_
