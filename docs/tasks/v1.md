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


What's the status here.
Go to wrkout.com. Sign up. This starts a chain. Each person who signs up has an invite. Each person who signs up was invited by someone. Except the first person. Or the first 5 persons. How does this work? On user create, each user is created with a unique hash token that is accepted as an invite. or just an invite code. Then they can send that to someone. Or the signup url to someone? Or do they do it through the text interface? Yeah. I like that better. Can you send credit card numbers over text? What's the easiest way to sign someone else up?

At the end of the workout, if you haven't invited someone, it asks you if you'd like to. Then what does it do. It asks you to send their number. Then it asks you what you'd like the message to be to invite them (please under 140 characters). Then it sends a text message to that person. Wait, except then they don't get it from that person. So there isn't the trust factor. Or is there. Maybe it asks you if you'd like to invite someone. You say yes. Then it sends you a url. Then it sends a message that says, send this url to the person you want to complete with. Then you send the URl. When they click the url, it pushes them right to the wrkout signup with a reference. wrkout doesn't have a signup page. You can't signup for it. You must get invited in a chain somehow. You can't just sign up. WRKOUT. PSHP. PSHP. WRKT. CRKT.  

So there is no index page. You MUST get invited. If you want to get invited, you have to get fucking invited. If someone spammed fucking hundreds or thousands of messages at you, I'd get charged so hard.

So there is a wrkout.com/signup/:tokenIdHere. This token ID is a field on the user that invited them. So it finds the user by that token ID, and then adds their competitors ID under the compete_id field or whatever the fuck it will be. So I'll be the first one who can invite. What if we give everyone two invites? Then they can compete with two people. Well, everyone already competes with two people. Their invitor, and their invitee. If we had 3, then everyone competes with their invitor, and 2 people that they invite. I think that might be better. Jesus this is gonna pose problems. I'm fucking finishing this.



Stories:  
* The scheduler schedules the events  
* The events fire off, once a day  
* The text messages are sent at the event intervals  
* The user responds with a yes/no completion text  

What are we testing with those?  
* DONE The schedule function is called upon startup  
*
* A mock network request is received which simulates the yes/no response from the user  

* The node-schedule events are fired, and texts are mock-sent. In dev, the events will fire at 9pm, in test, they'll fire at some time indicated by the config/js file. The send text function will be mocked, or it will use the test credentials.
