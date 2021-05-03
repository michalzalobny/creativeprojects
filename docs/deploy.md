**Project Repo**

1. Go to `vercel-heroku-mysql` template repo -> click `Use this template`
2. Name the repo and clone it with sourcetree

**Strapi**

1. Go to `https://dashboard.heroku.com/apps` => New => Create new app
2. Choose region and app name
3. Go to Deploy => Deployment method => Github
4. Choose the same repository as for frontend => connect
5. Set Heroku config vars (in settings tab):
6. `DATABASE_URL` = `mysql://USERNAME:PASSWORD@HOST:3306/DATABASE_NAME`
   - Go to myDevil panel -> mysql -> Add database with new user (set db name and db user the same)
   - Go to users -> the user you have just created -> manage hosts -> and Add amazon IP ( %.amazonaws.com ) and your IP
   - Now go back to the list of databases -> choose newly created database -> manage -> add permissions -> choose all hosts belonging to user -> choose the user
7. `NODE_ENV` = `production`
8. `PROJECT_PATH` = `cms` (it is a subfolder name from the repository, where the heroku app is situated)
9. `CLOUDINARY_API_KEY` = `value from cloudinary account`
10. `CLOUDINARY_API_SECRET` = `value from cloudinary account`
11. `CLOUDINARY_CLOUD_NAME` = `value from cloudinary account`
12. `CMS_ADMIN_PASSWORD` = `unique password for production cms`
13. Set a Heroku Buildpack that will deploy the PROJECT_PATH folder :
    inside the Settings tab, you need to add a Buildpack that will tell heroku to look for your folder instead of deploying the repo root. Enter this url to add buildpack : `https://github.com/javusScriptus/subdir-heroku-buildpack.git` and make sure this is at the top of the buildpack chain (drag the lines on the left to make it above any other buildpacks you have added.
14. If there is not "heroku/nodejs" buildpack, then add "heroku/nodejs" pack and put it at the bottom of buildpacks
15. Enable Automatic Deploys in "Deploy" section

**Frontend**

1. Go to vercel => New project
2. Import the repository with your Next app (should give the permission)
3. Choose the folder with next app (frontend)
4. Pick framework preset as Next.js => Deploy
5. Set two environmental variables
6. `NEXT_PUBLIC_FRONTEND_PROD` = `https://vercel-heroku-mysql.vercel.app` (plain text)
7. `NEXT_PUBLIC_CMS_GRAPHQL_URL_PROD` = `https://vercel-heroku-mysql.herokuapp.com/graphql` (plain text)
8. `NODE_ENV` = `production` (plain text)
