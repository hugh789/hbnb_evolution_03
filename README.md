Hello my friends! Welcome to part 03 of the HBnB Evolution projects.

For this one, everyone should focus their energy on the frontend. HTML, CSS and JS should be the only things your brain cells need to worry about.
The backend should be considered 'completed' at this point and you probably don't ever need to modify it any more. That said, it would be a good idea to take a look at the code in there because I've cleaned up a lot of things from Part 02:
 
 - File Storage is gone!
 Yes, I got rid of the stupid thing. No need to split the code base to cater to both File Storage and DB Storage. For Part 03, everything is DB only. That said, if anyone is still interested in reading / writing from JSON files, I'm sure there's a way to pull it off in the frontend...
 
 - storage.get has been modified to accomodate any key passed in!
 If you haven't already done this yourself in Part 02, I've included examples of how to use the .get method to get records from any key-value pair passed in. The syntax is a bit weird though since I'm using private attributes in the models.
  
 - Standardising of conventions.
 You can all see that I've did my best to standardise the naming conventions and terminology used within the various methods. This makes it easier for people to remember what is what.

What about the HTML portion of Part03?
You'll see that there are now 2 new folders: templates and static. These folders need to be present for the templating system to work.
Start the server up and go to localhost:5000. You will see the landing page I have created. This landing page makes use of all the files contained in the templates and static folders.
You will see that there are weird things like {% %} inside the HTML. This is how the Jinja templates allow us to run tiny bits of code logic within the web page. Yes, it's very ugly and also yes there are other alternatives out there as well.

Play with the website. Take note of the functionality of the search form. Look at the CSS and dissect what I did to align and position the different elements.
You should have your own design prepared and ready to implement right? Go ahead and start building your own version of the landing page while using my code as a reference.