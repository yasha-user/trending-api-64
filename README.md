# trending-api-64

# about this api

It has PostgreSQL database, nice UI in html/css, and CLI client (in folder trending-repos-cli). 

<h3>
 why PostgreSQL and not mySQL
</h3>
I've chosen to use PostgreSQL because this API doesn't require anything special from mySQL database management system, and today PostgreSQL database management system are in much demand, so i used it.

# functionality:

You can get first 30 repos from github trending repositories, you can find these repositories by name or ID, you can change filter of creation date of these repositories. Also you can force-sync your database with repositories with an actual github trending repos list, you can click the @open button and it will open a github address of this link, and besides that you can find easter egg (bonus) pages if you click around.
<br>
In addition this API has its CLI client, which can list all the 30 repos from the database, find repos by name, and force-sync your database with the github actual list of trending repositories.

# about bugs

1. A bug caused by Github API: search by name doesn't always find names, some of them are not visible to search.

2. For some reason the list of repos displayed in html page is often shown in broken order: you can press force sync, apply or any other update button and it sometimes breaks. If the problem is not some incorrect handlebars functionality – then i don't know what the problem is.

# DOCUMENTATION:

# how to run this API:

<h3>Initial setup:</h3>
 You need to get the contents of the repo cloned or downloaded and then invoke the terminal inside the folder to call "npm install" (installs npm dependencies)
then the app will notify you that the server has started and it will be hosted on a port of 4000, which value is set in "app.js" file at a 47th line

<h3>Usage</h3>

1. Graphical interface: <br>
   To use the graphical interface you need to run "npm run dev" from the file of downloaded/cloned repository, and then go to page of localhost:4000 in your browser and then it wont be that hard to go on

2. CLI client <br>
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
