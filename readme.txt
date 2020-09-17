Before you run the project. Make sure:
+ You have installed NPM (Node Package Manager) on your computer, if you haven't, you can download it here: https://nodejs.org/en/download/
+ You have installed MongoDB on your computer, if you haven't, you can download and configure it here: https://www.mongodb.com/try/download/community
In your VS Code Terminal, you can use queries command by typing "mongo" in termianl, some queries such as:
+ "show dbs" to show all MongoDB database on your computer
+ "use + database name", if the database name is on your computer, you'll be switched to that database, else Mongo will create a new database for you
+ "show collections" to list all collections in database 
+ "db.collectionname.find": to list all documents in database
+ "db.collectionname.insert": to insert new document in database
You can use Robo 3T or MogoDB Compass to check the database, collections, documents if you don't want to remember queries command 

Packages used in project:
+ ExpressJS
+ Mongoose
+ Puppeteer
If you can't run the project, check the packages list above and install them, then run again

Thanks for reading