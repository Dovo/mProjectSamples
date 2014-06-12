# The-M-Project - Absinthe Sample Apps

[Looking for the Samples of The-M-Project 1.x?](https://github.com/mwaylabs/The-M-Project-Sample-Apps/tree/1.x)

## Setup

- Navigate to a sample app ```cd kitchensink/```
- Install dependencies:
  - ```npm install```
  - ```bower install```
- Start the server: ```grunt server```

## Setup all

If you are looking for an easy setup process for all sample applications run:

```sh setup-all.sh```

The script runs the following commands:
  - ```npm install```
  - ```bower install```


To compile android apk:
  1. 
  2. 

To install apk on emulator
  - ```android``` in terminal
  - Open AVD manager and run an instance of the emulator
  - ```adb install /path/to/file.apk```

To listen to console remotely (note that when this script is active, console.log does not output to browser) 
  1. Go to http://jsconsole.com/?%3Alisten%205BE22AB1-A912-40DF-8DAE-377D9B4C06DB
