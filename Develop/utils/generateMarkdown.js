// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
const renderLicenseBadgeLinks = {
  "MIT": "[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)",
  "GNU AGPLv3": "[![License: GNU AGPLv3](https://img.shields.io/badge/License-GNUAGPLv3-blueviolet.svg)](https://https://opensource.org/licenses/AGPL-3.0)",
   "Unlicense": "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-yellow.svg)](http://unlicense.org/)",
   "none": ""
};

let licenseSection
let licenseToc
let optionalSections = [``, ``, ``, ``]
let optionalToc = [``, ``, ``, ``]

function generateOptionals (data) {
    const possibleSections = [data.installation, data.usage, data.contributing, data.test];
    const possibleToc = [`
* [Installation](#installation)`, `
* [Usage](#usage)`, `
* [Contributing](#contributing)`, `
* [Testing](#test)` ];
    const possibleHeadings = [`
## Installation
What are the steps required to install your project?`, `
## Usage
How the project was intended to be used`, ` 
##Contributions
How to contribute to the project`, `
##Testing
Any inbuilt tests thus far`
    ]
    for (let i = 0; i < possibleSections.length; i++) {
      let result
      let result2
      if (possibleSections[i] === "none") {
        result = ``;
        result2 = ``;
        optionalSections[i] = result
        optionalToc[i] = result2
      } else {
        result = `${possibleHeadings[i]}
${possibleSections[i]}`
        result2 = possibleToc[i]
        optionalSections[i] = result
        optionalToc[i] = result2
      }
    }
    ;
}

function generateLicensing (data) {
  let result;
  let result2;
  if (data.license === "none") {
    result = ``;
    result2 = ``;
  } else {
    result = 
    `
## License
This repository is under the licenses of ${data.license}
## Badges
${data.licenseBadgeLinks}`;
  result2 = 
  `
* [License](#license)
* [Badges](#badges)`
  }
  licenseSection = result;
  licenseToc = result2;
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {

// url for licenses and badges
data.licenseBadgeLinks = renderLicenseBadgeLinks[data.license];
generateLicensing (data);
generateOptionals (data);

// content returned from user's input
  return `# ${data.title}
## Description 
${data.description}
## Table of Contents ${licenseToc} ${optionalToc[0]} ${optionalToc[1]} ${optionalToc[2]} ${optionalToc[3]} 
* [Questions](#questions)${licenseSection} ${optionalSections[0]} ${optionalSections[1]} ${optionalSections[2]} ${optionalSections[3]}
## Questions
Questions about this repository, please contact me at [${data.email}](mailto:${data.email}). View more of my work in GitHub at [${data.github}](https://github.com/${data.github})

`;

}

module.exports = generateMarkdown;
