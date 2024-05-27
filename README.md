Hello my friends! Welcome to part 03 of the HBnB Evolution projects.

For this one, everyone should focus their energy on the frontend. HTML, CSS and JS should be the only things your brain cells need to worry about.
The backend should be considered 'completed' at this point and you probably don't ever need to modify it any more. That said, it would be a good idea to take a look at the code in there because I've cleaned up a lot of things from Part 02:
 - File Storage is gone!
 Yes, I got rid of the stupid thing. No need to split the code base to cater to both File Storage and DB Storage. For Part 03, everything is DB only. That said, if anyone is still interested in reading / writing from JSON files, I'm sure there's a way to pull it off in the frontend...
 - storage.get has been modified to accomodate any key passed in!
 If you haven't already done this yourself in Part 02, I've included examples of how to use the .get method to get records from any key-value pair passed in. The syntax is a bit weird though since I'm using private variables.
 - Relationships are now working!
 You'll all notice that the previously commented out relationship attributes in the model files are now being used. These are actually supposed to make your life easier by making it more convenient to access data from related tables.
 e.g. places.host, reviews.user, countries.cities. Reminds me of the way Laravel does it.
 - Error messages are all using abort 400 now.
 For Part 02, a lot of the API calls were still being made in the command line with cURL. Now, we're changing everything to use abort because the error response is going to be received by an AJAX call and displayed on a webpage.