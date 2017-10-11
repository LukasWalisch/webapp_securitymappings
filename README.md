# Frontend for the security mappings web application

For the installation of the matching backend, refer to https://github.com/Tayi22/Bachelor_Backend_Linux

## Recommended installation for Ubuntu 16.04:

Install the standard nodejs version:
```
sudo apt-get install nodejs
sudo apt-get install npm
```

Install version 6.3 of Node with the n version manager 
_Note: Any other version of nodejs may works just fine too but this is the version from the time of development_
```
sudo npm install -g n
n 6.3
```

Check the version of node:
```
node -v
```
this should now return "v6.3.1"

Install the bower package manager:
```
sudo npm install -g bower
```
Install ember-cli:
```
sudo npm install -g ember-cli
```
Install git:
```
sudo apt-get install git
```
Download the repository:
```
mkdir securitymappings-frontend
cd securitymappings-frontend
git clone https://github.com/LukasWalisch/webapp_securitymappings.git .
```
Install project dependencies:
```
npm install
bower install
```

## Configuration:
It is important to tell this application the ip adress of the server where the backend application is running. Therefore a configuration file must be edited:
```
nano config/environment.js
```
change the ip adress in the line that states `backend: '127.0.0.1'` accordingly.

## Start the frontend web application:
```
ember s
```
navigate in browser to: https://<serverip>:4200

