const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient");

// create command to send an email using AWS SES
const createSendEmailCommand = (toAddress, fromAddress, subject, htmlBody, textBody) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: [
        toAddress,
        /* more To-email addresses */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: htmlBody,
        },
        Text: {
          Charset: "UTF-8",
          Data: textBody,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

// run command to send email
const run = async (toAddress, fromAddress, subject, htmlBody, textBody) => { 
  // emails can be dynamic by including parameters here
  const sendEmailCommand = createSendEmailCommand(
    toAddress,          // -> verified receiver both emails should be verified in aws ses rithishvkv@gmail.com
    fromAddress,        // -> verified sender rithishcodespace@gmail.com
    subject,
    htmlBody,
    textBody
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      /** @type { import('@aws-sdk/client-ses').MessageRejected} */
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

// snippet-end:[ses.JavaScript.email.sendEmailV3]
module.exports = { run };
