# Craft 2 Boilerplate

This is a boilerplate setup for craft 2. It comes with the gulp npm module for asset pipelining, phpdotenv composer module for env variable management, and capistrano ruby gem for deployment

### using gulp to compile assets

1) cd to project root

2) install all npm dependencies with `npm install`

3) run `gulp` to start compiling sass and javascript

4) make style edits inside files in the `scss` directory

5) add new javascript files to /public/assets/js/custom

### using composer and phpdotenv to manage environment variables

1) cd to project root

2) install all php dependencies with  `composer install`

3) make a copy of `.env.example` and rename it to `.env`

4) inside `.env`, fill in the database name, user, and password

5) start server

### using capistrano to deploy

1) cd to project root

2) install all ruby dependencies with `bundle install`

3) configure `config/deploy.rb` with the proper git repo and application name

4) configure each environment by modifying the corresponding file under `config/deploy/`

5) to deploy, make sure all changes are pushed to the corresponding remote branch, then run `bundle exec cap [environment] deploy`