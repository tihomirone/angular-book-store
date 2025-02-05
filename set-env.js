const {writeFile} = require("fs");

require("dotenv").config();

const isProduction = process.env.NODE_ENV === 'production';

console.log("Is production: " + isProduction);

const targetPath = isProduction ? `./src/environments/environment.prod.ts` : `./src/environments/environment.development.ts`;

const envFileContent = `
    export const environment = {
        production: ${isProduction},
        BASE_URL: "${process.env.BASE_URL}"
    };

`;

console.log("envFileContent: " + envFileContent);

writeFile(targetPath, envFileContent, (err) => {
    if (err) {
        throw console.error(err);
    }
});