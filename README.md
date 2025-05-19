# inst377-final-project

Final Project for INST377

Title - Advanced Converter Traveling

Description - A currency converter web application allows users to convert amounts between euros to another currency using live exchange rates and retrieves country information based on the currency used.

Target Browsers- Chrome

[Developer Manual](#developer-manual)

Installation

Prerequisites
Node.js
An account and project set up with Supabase
A valid API key from Fixer.io

Steps to Run
Clone the repo
Use NPM Install to install dependencies
Set up environment variables

Endpoints
GET /api/conversions
POST /api/convert

Known Bugs & Limitations
Fixer API limits may cause failures if rate limits are exceeded.
Currently uses Euros to value because of the free fixer plan.
Some countries display no country information because RESTcountries does not support the currency



