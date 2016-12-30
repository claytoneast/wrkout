#### wrkout

sass watch:
sass --watch app/assets/styles:app/public  

###### todo

near term (in order):

add .env for mongo url, twilio vars, etc  
add unit testing ONLY where it can speed up dev process  
create a test button that fills in the field with my number, pushups, the current time plus 1 minute for current testing purposes. tests will go to my number for now.  
integrate Twilio api to send messages  
basic styling  

midterm:  
full unit & integration testing  
custom time picker  
client & serverside form validations w/ visible err handling (numbers -- are they real, reasonable pushups range, etc.)  
phone number validator via confirmation text message  
send time from a clientside check. get timezone from browser, convert to UTC or something.

longterm:  
billing  
swap to a job queue system like kue with separate web apps for the two different processes, i.e. signup & workout events.  
