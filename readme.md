#### wrkout

sass watch:
sass --watch app/assets/styles/styles.scss:app/public/styles.css

node-schedule can run 60k jobs, at rate of 100/sec, without losing one. Seems like it'll do the job for now. Especially given that I'll be running everything at 3 specific times, and that's it. It'll only need to handle those times.

ngrok http -subdomain=wrkout 3000  

###### todo

&nbsp;  

near term (in order):

  - DONE add .env for mongo url, twilio vars, etc  
  - DONE integrate Twilio api to send messages  
  - DONE Need to test limits of node-schedule, if I can get to 100 concurrent users, good. otherwise, need to implement job queue immediately.
  - NOPE write quick twilio function test
  - DONE Quick Sketch mock of the homepage  
  - FUCK THIS style a workable homepage   
  - FUCK THIS Get users to signup and confirm their identity with confirmation code
  - FUCK THIS factor out Twilio stuff to it's own module
  - DONE Swap to a once-a-day sending system. Ignore the time zones utterly, PST rules for now. Will have to set Heroku time to PST and keep it there.
  - FUCK THIS All people can send one valid invite code to one other person. Then they are in competition with that person. Once a week, stats are tallied and sent to the two of them. Oh shit that'll be an interesting algorithm problem probably. Like how many handshakes occur in a room of 50 people... So everyone has two competitors: who invited them, and who they invited. That's fun. I like this game.  

midterm:  
  * full unit & integration testing FUCK THIS, NOPE going with a minimalist testing approach, do only integration testing. Test integrally on user actions, unit test MAYBE, if it will save much time over and provide more info than integration testing, or in case a module breaks frequently. If a module is breaking frequently and needs unit tests, it probably needs to be more simple...  
  * custom time picker FUCK THIS, NOPE for the MVP going for 9PM every day, no matter what. The signup action should grab the timezone from that individual, we'll be running the SMS senders at 9PM EST, Central time, and PST. Maybe a serverless SMS delivery architecture would be better if I could call thousands of simultaneous serverless actions at once to get it done swiftly. I'll have to load test and see how fast I can compute & send a few thousand Twilio messages on the sever itself. Could be much cheaper to do it serverless since I may need a big server for tons of messages, but only need that capacity 3x a day. Doesn't matter for now.  
  * client & serverside form validations w/ visible err handling (numbers -- are they real, reasonable pushups range, etc.)  
  * phone number validator via confirmation text message  
  * send time from a clientside check. get timezone from browser, convert to UTC or something.

longterm:  
  * billing  
  * probably swap to something like kue for queueing up twilio tasks, so can spin off separate worker processes to handle the sms sending. or, as discussed above, use amazon Lambas or CGE cloud functions to handle the sending process at peak hours.  
