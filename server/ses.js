const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1", // Must correspond to the region in which you have verified your email address (or 'eu-west-1' if you are using the Spiced credentials)
});

module.exports.sendEmail = (email, subject, body) => {
    return ses
        .sendEmail({
            Source: "Funky Chicken <cake.brow@spicedling.email>",
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                    Text: {
                        Data: body,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        })
        .promise()
        .then(() => console.log("Email has been sent!"))
        .catch((err) => console.log(err));
};