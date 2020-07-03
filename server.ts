import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as serveStatic from 'serve-static';
import * as path from 'path';
import { StringManipulator } from './string-manipulators/string-manipulator';
import { StringManipulator1 } from './string-manipulators/string-manipulator-1';
import { StringManipulator2 } from './string-manipulators/string-manipulator-2';
import { StringManipulator3 } from './string-manipulators/string-manipulator-3';
import { StringManipulator4 } from './string-manipulators/string-manipulator-4';
import { StringManipulator5 } from './string-manipulators/string-manipulator-5';
import { StringManipulator6 } from './string-manipulators/string-manipulator-6';
import { StringManipulator7 } from './string-manipulators/string-manipulator-7';
import { StringManipulator8 } from './string-manipulators/string-manipulator-8';
import { StringManipulator9 } from './string-manipulators/string-manipulator-9';

// Similar to a C struct; this will be used to help display all your work on the client/webpage
export interface ManipulatedStringOutcomes {
    manipulatedStringOutcome1: Outcome,
    manipulatedStringOutcome2: Outcome,
    manipulatedStringOutcome3: Outcome,
    manipulatedStringOutcome4: Outcome,
    manipulatedStringOutcome5: Outcome,
    manipulatedStringOutcome6: Outcome,
    manipulatedStringOutcome7: Outcome,
    manipulatedStringOutcome8: Outcome,
    manipulatedStringOutcome9: Outcome
}

// Extra example for how an interface/type can be used inside each other
export interface Outcome {
    author: string,
    result: string
}

// Basic interface defining how we want to send errors to the client.
export interface BasicError {
    code: number,
    description: string
}

// Look for a -p flag, and try to use the number after it as the new port
var port: number = 8000;
if (process.argv.includes('-p')) {
    let tempPort: number = Number(process.argv[process.argv.indexOf('-p') + 1]);
    if (!isNaN(tempPort)) {
        port = tempPort;
    }
}

// Use express library to serve files to the browser and expose our API
var app = express();

// Create an express router instance for routing traffic through /api
var apiRouter = express.Router();

// Create an http server that will use express app to handle requests
var server = http.createServer(app);

// Run the server: expose a port on your computer to be used for connections
server.listen(port, () => {
    console.log('Server has started and is listening on port ' + port);
});


// Instantiate our string manipulators (stored in a key-value map)
var stringManipulators: { [key: string]: StringManipulator } = {
    '1': new StringManipulator1(),
    '2': new StringManipulator2(),
    '3': new StringManipulator3(),
    '4': new StringManipulator4(),
    '5': new StringManipulator5(),
    '6': new StringManipulator6(),
    '7': new StringManipulator7(),
    '8': new StringManipulator8(),
    '9': new StringManipulator9()
}

// As the function name suggests... also return all results when done
function runStringThroughAllManipulators(str: string): ManipulatedStringOutcomes {
    // Instantiate the variable to hold all your strings
    // Notice here, I fully instantiate everything. If you remove ': ManipulatedStringOutcomes' you can do...
    // let stringOutcomes = {} and instantiate contents later.
    let stringOutcomes: ManipulatedStringOutcomes = {
        manipulatedStringOutcome1: {                    // expanded out for clearer readability
            author: stringManipulators['1'].author,
            result: ''
        },
        manipulatedStringOutcome2: { author: stringManipulators['2'].author, result: '' },
        manipulatedStringOutcome3: { author: stringManipulators['3'].author, result: '' },
        manipulatedStringOutcome4: { author: stringManipulators['4'].author, result: '' },
        manipulatedStringOutcome5: { author: stringManipulators['5'].author, result: '' },
        manipulatedStringOutcome6: { author: stringManipulators['6'].author, result: '' },
        manipulatedStringOutcome7: { author: stringManipulators['7'].author, result: '' },
        manipulatedStringOutcome8: { author: stringManipulators['8'].author, result: '' },
        manipulatedStringOutcome9: { author: stringManipulators['9'].author, result: '' }
    }
    // Temporary variable to hold each outcome. Notice here I left out the type for the variable... the type is automatically inferred to be a string by what is being stored
    let strTemp = str;
    // Convert 'stringManipulators' into an array of all of its 'keys', then use forEach method to loop through all those keys.
    // forEach requires one parameter: a function with an optional first parameter for holding the array elements (in this case 'key')
    // javascript/typescript allows you to define the function directly in the parameter field as can be seen here: (key) => {}
    Object.keys(stringManipulators).forEach((key) => {
        // store return value of manipulated string
        let result = stringManipulators[key].manipulateString(strTemp);
        // javascript is cool because you can get object properties like this...
        // stringOutcomes['manipulatedStringOutcome' + 1].author, or like this...
        // stringOutcomes.manipulatedStringOutcome1.author, but the first option is usually used on maps. Here is fine because all properties are so similar.
        // store result into stringOutcomes as this is what will be sent to the client
        stringOutcomes['manipulatedStringOutcome' + key].result = result;
        // store result into strTemp for the next loop iteration
        strTemp = result;
    });
    // Job is complete. All that's left is to return...
    return stringOutcomes;
}

// Here we begin to setup our api
// These two lines are used for parsing body data that is usually sent with post requests. The first line though, I don't really know why it's needed.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // very important that you include this or you can't parse body information
// Ensure that the two lines above appear first. Imagine a stack of things a request has to flow through before it reaches your api
// This line will route your /api related endpoints through apiRouter
app.use('/api', apiRouter);
// Our api needs two endpoints. This first one will handle processing through all our string manipulators
apiRouter.post('/string-manipulator', (request, response) => {
    // Set header; set the return type you want to send back to the client. We are sending data in the JSON format (JavaScript Object Notation)
    response.setHeader('Content-Type', 'application/json');
    // No parameters here but we do need to check our string. I actually wrote up the second endpoint first, so I just copied and pasted
    // Take a look at the comments in the second endpoint for things to make sense here...
    if (request.body.string == null || typeof request.body.string != 'string') {
        let err: BasicError = {
            code: 400,
            description: 'A string was not provided or properly provided with this request.'
        }
        response.status(err.code).json(err);
        return;
    }
    // Check is done; now we can run the string through the function made above and hope our server doesn't crash or error out
    let stringOutcomes = runStringThroughAllManipulators(request.body.string);
    // Keep in mind the return type of the function. This object is sent to the client and can be used immediately without any parsing
    response.json(stringOutcomes);
});
// The second endpoint will need one optional (indicated by the ?) parameter (indicated by the :) called 'choice' for choosing the string manipulator
apiRouter.post('/string-manipulator/:choice?', (request, response) => {
    // Set header; set the return type you want to send back to the client. We are sending data in the JSON format (JavaScript Object Notation)
    response.setHeader('Content-Type', 'application/json');
    // Because choice is a parameter, it can be anything. So we have to do an initial check to ensure it is what we want
    let choice = parseInt(request.params.choice); // this should return NaN (not a number) if choice can not be converted into a number
    if (isNaN(choice)) { //use builtin function isNaN to check
        // If indeed not a number, send a status 400 (Bad Request) response along with a BasicError that describes the error.
        let err: BasicError = {
            code: 400,
            description: 'Provided parameter is not a number.'
        }
        response.status(err.code).json(err);
        return;
    }
    // If you reach this point, choice is a number, but we still have to check if choice actually exists
    // We can use hasOwnProperty to check a Map or any javascript object to see if a property exists in it
    if (!stringManipulators.hasOwnProperty(choice)) {
        // If it does not exist, send another error. This time a status 404 (Not Found) response along with an error again
        let err: BasicError = {
            code: 404,
            description: 'Provided string manipulator choice does not exist.'
        }
        response.status(err.code).json(err);
        return;
    }
    // Finally, we want to check if the string that is sent over in the body exists. Lets assume our string is simply stored in a property called 'string'
    if (request.body.string == null || typeof request.body.string != 'string') {
        // If it doesn't exist or it's not an actual string, send an error. A status 400 can once again describe the error.
        let err: BasicError = {
            code: 400,
            description: 'A string was not provided or properly provided with this request.'
        }
        response.status(err.code).json(err);
        return;
    }
    // If you reach this point, all initial test cases have passed so you are good to go. Do what you need to do
    // Lets return an Outcome since we have already defined what it is
    let outcome: Outcome = {
        author: stringManipulators[choice].author,
        result: stringManipulators[choice].manipulateString(request.body.string)
    }
    // If you exlude .status, it will automatically be status 200 (OK)
    response.json(outcome);
});

// The api is ready. Running the server as is will work just fine and will allow you to start using these endpoints
// But what if we want to build a graphical interface for this? Well you can. The next part will show you how to serve webpages

// Express can be used again. This time, we will use serve-static to let us serve static html/css/javascript files
// Notice in this project directory there's a 'public' folder. This folder will hold files/pages anyone can get acccess to
// We'll also use the path library to help us locate this folder wherever you decide to move your project
app.use(serveStatic(path.resolve(__dirname, './public')));
// And that's it, now you use the graphical interface provided in the folder. Open a browser and do http://{your-ip-here}/{filename} to access it.