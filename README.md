Environment setup:

This project runs using react and the react-bootstrap addition.

Clone our Git repository to a folder on your computer for editing and testing code.

Here are the steps to do that with Fork which I highly recommend downloading if you're not all that familiar with Git:
	On Fork, click 'File' in the top left and hit 'Clone'.
	Put our Repository URL: https://github.com/deaddydot/todolist.git
	Select the folder where you'd like to store the repository and edit the files and clone it.
	From there, you can 'Fetch' in the top left everything in the repository.
	The files should download so you can edit them.
	Once you've made edits you'd like to add back to the repository, do the following:
		Right click on 'main' in the 'Branches on the left and select new branch with some name for your branch, I've just been doing jack#, as you'll make a new branch each time you commit.
		Enter and branch name and create and checkout.
		Select 'Local Changes' in the top left and select and stage the files you changed here.
		Enter a commit describing what you've changed and add a description if you need to describe further.
		'Commit' in the bottom right.
		'Push' in the top left, selecting the branch you're currently on and origin/main as the destination and push this.
		From there a pull request can be created from that branch in Github, and we can merge that branch with main if the changes are solid.

If you would like to push changes to the build so they will render on our active webpage, you can navigate to your app folder in the command line and run this with some commit message: npm run deploy -- -m "commit message"
	
To create a new React app if you'd like to test or whatnot, run this command in a folder you'd like to create a react app in with whatever you'd like the folder of the project to be named: npx create-react-app <appName>
To use Bootstrap in your app run this command, still in that folder on the command line: npm install react-bootstrap bootstrap

To start a react app so that it will render in your browser for testing on your local computer, navigate in the command line to the app folder and run this command: npm start
This should open up the browser and display what you have coded.





What I've implemented so far:

So far I've just created a home page in the Category View. Checking off tasks makes them disappear. The Show all checkboxes button in the bottom left can toggle showing and hiding these checked checkboxes. The Views and Categories options on the left have expandable menus for Views we are implementing and the categories the user has defined. I'm trying to make the implementation very modular which will hopefully lead to easier editing. Any new feature or function of a feature has its own file, and I'm trying to create a folder hierarchy for viewing the files that go together so that it makes sense. The core of the app is the index.js which calls everything else and probably won't need changed much at all. From there App.js calls major components for piecing together the page, and individual features are implemented down the hierarchy. All user categories and tasks are hard-coded right now.

Next steps:
Calendar view.
Toggling the categories on the left side should select those categories to be shown instead of all of them.
I'm hoping to make a finished tasks view where you can view tasks you've checked off, I'm hoping to move these from checked off in the view to this view, maybe once they're checked off add them to this view immediately then maybe review them from the other views after 10 minutes or something. This will probably need a database.
We need to make it so that all values for user categories and tasks can be passed in from the database. This needs to be dynamic as users change their tasks and categories and different users need the site. For now we can at least create the functions that will be capturing this information so that this can more easily occur between the app and the database when we implement that.
User authentication and sessions should be implemented soon so that custom data can be stored per user, although this would also require a database, although we could again hard-code some values for now.
Users should be able to add and remove tasks. This will be easier once we have a database as well, but we could have it create some tasks just through submitting forms. Removing tasks should be easy enough.

Whatever else y'all wanna do! These are just my ideas for next steps. Hoping we can have the calendar and categories views with some functionality for the first prototype.