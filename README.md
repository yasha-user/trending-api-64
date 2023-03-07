# trending-api-64

in progress

When i was writing messages for commits i hadnt yet thought that all the files would be captioned as "..with unsolved bugs" etc. 
The real case is it is alive and kicking and bugs are rare

# about bugs
1: When you search by name it sometimes failes to find some letters in particular names.

2: When you call fsync function from cli: 
Firstly: it starts counting seconds (it shouldnt)(its because newrepos.js is imported i need to fix it)
Also: It doesnt fsync, the variable is not noticed when passed from func that changes it
(Im working on it^^^^^^^^^^^^^^^^^^^^^^^)
