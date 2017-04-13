# Azure Functions + Node 
This repository contains code is designed to demonstrate how to use Azure Functions with Node.js for both Blob Storage and HTTP Triggers. Both functions take a photo as input and output a caption to describe what is in that image.

## Blob Storage Triggered Function
This function takes input to a Blob Storage account table named input. When any file is uploaded to the blob storage account in the input table, this function is automatically triggered, gets the url of the image hosted in Blob Storage, and sends that to Cognitive Services to analyze the image.

The results are written out to the outTable inside of an Azure Table Storage account.

## HTTP Triggered Function
This function acts as an HTTP endpoint. Send a post request with the body format `{"name": "[ENTER PICTURE URL HERER]"}` to trigger this function. The photo will be sent to Cognitive Services to be analyzed and then the results will be returned.
