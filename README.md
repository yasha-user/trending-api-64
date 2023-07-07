# trending-api-64

about commit names that are sometimes wrong here:

When i was writing messages for commits i hadnt yet thought that all the files would be captioned as "..with unsolved bugs" etc.
The real case is it is alive and kicking and bugs are rare (crashes after a 5 hrs doesnt count)

# about bugs

0.0 : Submodules are destroyed CLI and im working on fixing it

1: When you search by name it sometimes failes to find some letters in particular names, it looks like it has something to do with github API and its responds to this kind of requests.

2: Only working commands in CLI are -v and -h, others are saying "is not defined", "is not a functions", or fsync is just silent and its hard to tell what is the matter yet.
--- A note from the past: Fsync doesnt fsync, the variable is not noticed when passed from func that changes it

# DOCUMENTATION:

# how to run this API:

You need to get the contents of the repo cloned and then invoke the terminal inside the folder to call "npm run dev".
then the app will notify you that the server has started and it will be hosted on a port of 4000, which value is set in "app.js" file at a 47th line

1. Graphical interface:
   To use the graphical interface you need to run localhost:4000 in your browser and then it wont be that hard to go on

2. Command Line Interface
   In order to use CLI you need to invoke the file commands.js with node by calling node commands.js in terminal while located in file "trending-repos-cli"
