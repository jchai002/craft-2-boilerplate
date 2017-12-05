# Craft 2 Boilerplate

This is a boilerplate setup for craft 2. It comes with webpack for asset
pipelining, phpdotenv composer module for env variable management, and
capistrano ruby gem for deployment

### using webpack to compile assets

1. cd to project root

2. install all npm dependencies with `npm install`

3. run `npm run build` to start compiling scss and javascript

4. stylesheets are located in the `_src/styles` directory

5. javascript files are located in the `_src/scripts` directory

### using composer and phpdotenv to manage environment variables

1. cd to project root

2. install all php dependencies with `composer install`

3. make a copy of `.env.example` and rename it to `.env`

4. inside `.env`, fill in the database name, user, and password

5. start server

### using capistrano to deploy

1. cd to project root

2. install all ruby dependencies with `bundle install`

3. configure `config/deploy.rb` with the proper git repo and application name

4. configure each environment by modifying the corresponding file under
   `config/deploy/`

5. to deploy, make sure all changes are pushed to the corresponding remote
   branch, then run `bundle exec cap [environment] deploy`
