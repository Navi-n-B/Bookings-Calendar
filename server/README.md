# Jest testing suite

## Dependencies
* jest (may need to be installed globally)
* babel-jest
* react-test-renderer
* sequelize-mock --save-dev

* babel also needs to be set-up properly. Make sure you have a .babelrc file with presets of:
    "@babel/preset-env",
    "@babel/preset-react"

* run 'jest --init' to creat a config file.

* In package.json, add the script: { 'test': 'jest' }

* To run a test, type 'npm run test' in terminal

* when you run 'npm run test' I believe jest will automatically look for files with test in the file name. So if you want ONE test file with all of the tests, just name it 'test.js'. If you want to seperate your concerns you can export the module to a [module].test.js file and test that module specifically.

## React components

* Testing of react components seems straight forward. Check out their docs for more info: https://jestjs.io/docs/en/tutorial-react

## Testing databases

* sequeulize-mock will create mock databases from your schema so your seeded data isn't altered. This should aleviate a LOT of headaches.

* https://sequelize-mock.readthedocs.io/en/stable/docs/getting-started/


### MongoDB

* Jest works smoothly with MongoDB. Check out their docs for more info: https://jestjs.io/docs/en/mongodb


### MySQL/MariaDB

