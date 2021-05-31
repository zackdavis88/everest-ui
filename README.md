# Everest UI

Everest is a UI designed to help with web application content management utilizing the Everest API.

## Required Dependencies

Everest UI requires NodeJS:

### [NodeJS 13.9.0](https://nodejs.org/en/download/)

## Required Configuration

Before running the UI and getting started there are a few steps that 
must be completed.

**_NOTE:_** *These steps assume you are using a Linux operating system, the 
equivalent Windows commands will have to be researched on your own.*

**_You must complete all steps to start the UI_**

### 1. Configure HTTPS
This step may be completed by providing a CA signed certificate, assuming 
you have the .pem files, or by generating a self-signed certificate 
as shown below:

```
mkdir -p everest-ui/config/ssl
cd everest-ui/config/ssl
openssl req -x509 -nodes -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
```
*You will be asked questions when generating the self-signed certificate, answer the prompts until the process completes*


TODO: STEPS ARE MISSING AFTER THIS POINT, WILL FILL IN THE REST AS ITS DEVELOPED.