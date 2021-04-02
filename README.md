# Chess Combo CMS

CMS for adding combinations, players and games to backend.

## Frontend

It's Vue using a shitty ElementUI as UI framework. I tried to cut some corners by using already setup CMS template but it's pretty bad.

## Backend

.NET Core API with PostgreSQL as db. Best way to run it is to use a Docker image of Postgresql and provide connection string in appsettings.json

**UPDATE**: I created a free heroku postgreSQL instance and applied the initial migrations. Keep in mind that data from there can ocassionally disappear. So if you don't want to create local instance of Postgre add this to your appsettings.json file:

`"ConnectionStrings": {
    "DefaultConnection": "Server=ec2-54-247-158-179.eu-west-1.compute.amazonaws.com;Port=5432;Database=dmu8d4tmsuces;username=wegxqxyqnnyusx;password=37c3741d56800fd96c88ccd86750beefe2a18df2f22df4882e21c112187db085;SslMode=Require;Trust Server Certificate=true"
  }`



## Tasks

- Backend
- - Create another layer in backend so the Request flow goes like Controller -> Service -> DbContext. No DbContext should be mentioned anywhere in controllers.
- - Provide proper Input&Response model, no mention of the DB models should be inside controller layer
- - Replace temporary user logic in UserController with proper one. Add ASP.NET Identity.
- Frontend
- - Provide edit & delete feature for all three main entities (Players, Combinations and Games)
- - Plug in the login logic with the proper token you now get from backend
- - Figure out the retarded routing so editing/creating features for entities have proper route. For example, editing Game would go to /games/edit not /editGame

I know this is random but over time we'll figure out some good documentation if we continue developing this. 

**UPDATE** I drew a diagram of the overall architecture. This Repo concerns itself with the left part.
![alt text](chesscombo.jpg "Chess Combo Architecture")

**UPDATE**
API available on https://chess-combo-cms-api.azurewebsites.net/swagger/index.html so you don't have to run it locally.