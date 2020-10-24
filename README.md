# Note Taker

## Description
This assignment required us to use an express backend and save and retrieve note data from a JSON file. I connected the backend with the frontend by using fs and express, and set up various API routes as seen in my server.js file. 

  * GET requests - reads database and return all saved notes as JSON.

  * POST requests - receive new notes to save on the request body, add it to the database file, and then return the new note to the client.

  * DELETE request - receievs the param with the id of a note to delete so it changes in the database file


