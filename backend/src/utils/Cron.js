// sends emails everyday morning 8 am about the pending request me got yesterday

const cron = require('node-cron');
const {subDays,startOfDay,endOfDay} = require("date-fns");
const connectionRequest = require('../models/connectionRequest');
const sendEmail = require("./sendEmail") // imported file

cron.schedule("0 8 * * *",async() => { // this cron string runs at 8 am everyday
    // send emails to all persons who got request the previous day
    try{
        const yesterday = subDays (new Date(),1) // current date - 1 day
        const yesterdayStart = startOfDay(yesterday); // time stamp
        const yesterdayEnd = endOfDay(yesterday);

        const pendingRequests = await connectionRequest.find({
            status : "interested",
            createdAt : {
                $gte: yesterdayStart,
                $lt: yesterdayEnd
            }
        }).populate("fromUserId toUserId") //fetch related data from another collection. Think of it like a JOIN in SQL.

        // avoiding duplicates request to a single person from multiple persons
        const listOfEmails = [...new Set(pendingRequests.map(req = req.toUserId.emailId))] // creates an array of without duplicates

        for (const email of listOfEmails) {
            const res = await sendEmail.run(
              email,
              "rithishcodespace@gmail.com", // your verified sender
              "You have a new connection request!",
              `<p>You received a connection request yesterday. Log in to view it!</p>`,
              "You received a connection request yesterday. Log in to view it."
            );
        }
    }
    catch(error)
    {
      console.log(error);
    }
})