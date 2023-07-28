# trending-api-64

# about this api

It has Postgres database, nice UI in html/css, and CLI client (in folder trending-repos-cli).

# about bugs

1. When you search by name it sometimes failes to find some letters in particular names, it looks like it has something to do with github API and its responds to this kind of requests.

2. If the last line in newrepos.js is <code>module.exports = router</code>, (which is the current state) then Fsync from CLI logs that the dateValue and url are undefined. However, if you move <code>module.exports = router </code> before the <code> module.exports = {dateValue, url}</code>, then CLI will be fully functional, but API itself will break and stop responding.

# DOCUMENTATION:

# how to run this API:

You need to get the contents of the repo cloned or downloaded and then invoke the terminal inside the folder to call "npm install" (installs npm dependencies)
then the app will notify you that the server has started and it will be hosted on a port of 4000, which value is set in "app.js" file at a 47th line

1. Graphical interface: <br>
   To use the graphical interface you need to run "npm run dev" from the file of downloaded/cloned repository, and then go to page of localhost:4000 in your browser and then it wont be that hard to go on

2. Command Line Interface <br>
   In order to use CLI you need to invoke the file commands.js with node by calling node commands.js in terminal while located in file "trending-repos-cli".
   <br>
   <br>
   <br>
   <br>
   <br>
   <br>
   <br>
   <br>
   <br>
