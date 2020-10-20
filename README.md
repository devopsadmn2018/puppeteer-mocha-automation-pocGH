# Puppeteer | Mocha
POC of Puppeteer Automation with Mocha as a test-runner

## Stack

## Features
```
Automation tool: Puppeteer
Test-Runner tool: Mocha 
Test Application: Bunnings.com.au
running as: Headless and Non-Headless
CICD: ?
```


## Getting Started
Instructions to get you a copy of the project up and running on your local machine for learning purposes only.

### Prerequisites
```
- VS Code or any equivalent IDE
- Node.js Library
```

### Installing
Steps:
```
1) Clone the repo with "git clone git@git.planittesting.com:ajawale/puppeteer-mocha-automation-poc.git"
2) Open the cloned directory in VS Code.
3) Execute "npm install" (to download all the dependencies)
```

## Test Cases
##### TC01: Changes store location.
##### TC02: TC01 + Selects a product and verifies cart for delivery.
##### TC03: TC02 + Clears cart and verifies. 

## Execution on Local Machine
###### TEST_CASE_ID = tc01, tc02, tc03
```
npm run <TEST_CASE_ID>
ex. npm run tc01
```

## further, Improvements

```
- try linking multiple cases to use same browser instance
- find way to execute testcase as group/category
- try multiple parallel executions at a time
- try dependant executions in sequence
- containerise the automation framework (ward's feedback)
- try linking it with build server like jenkins, teamcity
- try auto build on changes in git
- try notification to update other developers
```
