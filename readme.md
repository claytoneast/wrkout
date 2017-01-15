#### wrkout

sass watch:
sass --watch app/assets/styles:app/public  

###### todo

near term (in order):

DONE add .env for mongo url, twilio vars, etc  
DONE integrate Twilio api to send messages  
add unit testing ONLY where it can speed up dev process  
  - Need to test limits of node-schedule, if I can get to 100 concurrent users, good. otherwise, need to implement job queue immediately.
  - write quick twilio function test

factor out twilio stuff

NOPE basic styling  

midterm:  
full unit & integration testing  
custom time picker  
client & serverside form validations w/ visible err handling (numbers -- are they real, reasonable pushups range, etc.)  
phone number validator via confirmation text message  
send time from a clientside check. get timezone from browser, convert to UTC or something.

longterm:  
billing  
swap to a job queue system like kue with separate web apps for the two different processes, i.e. signup & workout events.  
