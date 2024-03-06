exports.errorName = {
    UNAUTHORIZED: 'UNAUTHORIZED',
    BADREQUEST: 'BADREQUEST',
    INTERNALSERVER: 'INTERNALSERVER',
    NORECORDFOUND: 'NORECORDFOUND',
    INACTIVE: 'INACTIVE',
    INVALIDACCESS: 'INVALIDACCESS',
    EMAILALREADYEXIST: 'EMAILALREADYEXIST',
    ROLEIDINVALID: 'ROLEIDINVALID',
    ROLEALREADYEXIST: 'ROLEALREADYEXIST',
    ACTIVITYALREADYEXIST: 'ACTIVITYALREADYEXIST',
    INTERESTALREADYEXIST: 'INTERESTALREADYEXIST',
    CATEGORYALREADYEXIST: 'CATEGORYALREADYEXIST',
    EMAILNOTREGISTERED: 'EMAILNOTREGISTERED',
    NAMEALREADYEXIST: 'NAMEALREADYEXIST',
    INVALIDDETAIL: 'INVALIDDETAIL',
    TOKENVERIFICATIONFAILED: 'TOKENVERIFICATIONFAILED',
    INVALIDDELIVERYVERIFY: 'INVALIDDELIVERYVERIFY',
    NOTINTEAM: 'NOTINTEAM',
    ALREADYASSIGN: 'ALREADYASSIGN',
    ALREADYREQUESTED: 'ALREADYREQUESTED',
    LESSLEAVEDAYS: 'LESSLEAVEDAYS',
    NOLEAVESREMAIN: 'NOLEAVESREMAIN',
    INVALIDDATE: 'INVALIDDATE',
    ADDMATERIALQUANTITY: 'ADDMATERIALQUANTITY',
    ADDMATERIAL: 'ADDMATERIAL',
    CLIENTSIGNATURE: 'CLIENTSIGNATURE',
    ALREADYINCREMENTSALARY: 'ALREADYINCREMENTSALARY',
    INVALIDEMAILPASSWORD: 'INVALIDEMAILPASSWORD',
    PASSWORDSHOULDNOTSAME: 'PASSWORDSHOULDNOTSAME',
    INVALIDCURRENTPASSWORD: 'INVALIDCURRENTPASSWORD',
    EXPIREDOTP: 'EXPIREDOTP',
    LESSTOTALLEAVES: 'LESSTOTALLEAVES',
    ALREADYMARKEDCHECKIN: 'ALREADYMARKEDCHECKIN',
    ALREADYMARKEDCHECKOUT: 'ALREADYMARKEDCHECKOUT',
    MARKCHECKINFIRST: 'MARKCHECKINFIRST',
    ALREADYMARKEDATTENDANCE: 'ALREADYMARKEDATTENDANCE',
    HOLDTASKNOTCOMPLETE: 'HOLDTASKNOTCOMPLETE',
    NOTINJOBSITE: 'NOTINJOBSITE',
    INVALIDEMAILFORMAT: 'INVALIDEMAILFORMAT',
    INVALIDSTARTINGLEVELNAME: 'INVALIDSTARTINGLEVELNAME',
    INCREASETASKPROGRESS: 'INCREASETASKPROGRESS',
    NEXTYEARLEAVEMESSAGE: 'NEXTYEARLEAVEMESSAGE',
    CHECKOUTTASKNOTALLOWED: 'CHECKOUTTASKNOTALLOWED',
    INVALIDIP: 'INVALIDIP',
    LASTMONTHUPDATEDATE: 'LASTMONTHUPDATEDATE',
    LASTMONTHCREATEDATE: 'LASTMONTHCREATEDATE',
    SLECTONEMONTH: 'SLECTONEMONTH',
    ALREADYAPPROVED: 'ALREADYAPPROVED',
    INVALIDTASKFILENAME: 'INVALIDTASKFILENAME',
    WAITFORADMINAPPROVAL: 'WAITFORADMINAPPROVAL',
    ONLYCLIENTAPPROVAL: 'ONLYCLIENTAPPROVAL',
    SELECTONEOPTION: "SELECTONEOPTION",
    PLEASEAPPLYONWORKINGDAYS: "PLEASEAPPLYONWORKINGDAYS",
    NORECORDSFOUND: "NORECORDSFOUND"
}

exports.successName = {
    REGISTER: 'Successfully created',
    LOGIN: 'Successfully login',
    UPDATEUSER: 'Successfully updated',
    OTPSEND: 'A verification code has been sent to your email',
    OTPVERIFIED: 'A verification code has been verified',
    RESETPASSWORD: 'Password reseted Successfully',
    ROLECREATED: 'Role Successfully created',
    ACTIVITYTYPECREATED: 'Activity type Successfully created',
    ACTIVITYCREATED: 'Activity Successfully created',
    ACTIVITYUPDATED: 'Activity Successfully updated',
    ROLEDELETED: 'Role Successfully deleted',
    ACTIVITYTYPEDELETED: 'Activity type Successfully deleted',
    ACTIVITYDELETED: 'Activity Successfully deleted',
    INTERESTCREATED: 'Interest Successfully created',
    INTERESTDELETED: 'Interest Successfully deleted',
    CATEGORYCREATED: 'Category Successfully created',
    CATEGORYDELETED: 'Category Successfully created',
    CATEGORYDELETED: 'Category Successfully deleted',
    CATEGORYUPDATED: 'Category Successfully updated',
}

exports.errorType = {
    PLEASEAPPLYONWORKINGDAYS: {
        message: "You are applying leave on holidays.",
        statusCode: 400
    },
    SELECTONEOPTION: {
        message: "Please select at least one option",
        statusCode: 400
    },
    ONLYCLIENTAPPROVAL: {
        message: 'You can`t send email without client approval',
        statusCode: 400
    },
    WAITFORADMINAPPROVAL: {
        message: 'Wait for admin approval',
        statusCode: 400
    },
    ALREADYAPPROVED: {
        message: 'Already approved',
        statusCode: 400
    },
    LASTMONTHUPDATEDATE: {
        message: 'Can`t update previous  month or next day attendance',
        statusCode: 400
    },
    LASTMONTHCREATEDATE: {
        message: 'Can`t create previous month or next day attendance',
        statusCode: 400
    },
    INVALIDIP: {
        message: 'Invalid Ip address',
        statusCode: 400
    },
    TOKENVERIFICATIONFAILED: {
        message: 'Token verification failed',
        statusCode: 400
    },
    CHECKOUTTASKNOTALLOWED: {
        message: 'Update task is not allowed after checkout',
        statusCode: 400
    },
    NEXTYEARLEAVEMESSAGE: {
        message: 'Cann`t apply leave',
        statusCode: 400
    },
    INCREASETASKPROGRESS: {
        message: 'Please increase task progress',
        statusCode: 400
    },
    INVALIDSTARTINGLEVELNAME: {
        message: 'Levels in task file are mismatched',
        statusCode: 400
    },
    INVALIDTASKFILENAME: {
        message: 'Fields name in task file are mismatched',
        statusCode: 400
    },
    NOTINJOBSITE: {
        message: 'Not in jobsite',
        statusCode: 400
    },
    NOTINTEAM: {
        message: 'Not in team',
        statusCode: 400
    },
    //task
    HOLDTASKNOTCOMPLETE: {
        message: 'Hold task can not be marked completed',
        statusCode: 400
    },
    //attendance
    MARKCHECKINFIRST: {
        message: 'Please mark checkin first',
        statusCode: 400
    },
    ALREADYMARKEDATTENDANCE: {
        message: 'Attendance already markedt',
        statusCode: 400
    },
    ALREADYMARKEDCHECKOUT: {
        message: 'Already marked checkout',
        statusCode: 400
    },
    ALREADYMARKEDCHECKIN: {
        message: 'Already checkin please mark checkout',
        statusCode: 400
    },
    //leaves
    LESSTOTALLEAVES: {
        message: 'Total leaves should not less than user approved leaves',
        statusCode: 400
    },
    EXPIREDOTP: {
        message: 'OTP is either invalid or expired.',
        statusCode: 400
    },
    INVALIDCURRENTPASSWORD: {
        message: 'Invalid current password',
        statusCode: 400
    },
    PASSWORDSHOULDNOTSAME: {
        message: 'New password should not be same as old password',
        statusCode: 400
    },
    ALREADYINCREMENTSALARY: {
        message: 'Already increment salary for next month',
        statusCode: 400
    },
    CLIENTSIGNATURE: {
        message: 'Client signature is required',
        statusCode: 400
    },
    ADDMATERIAL: {
        message: 'Add some material',
        statusCode: 400
    },
    ADDMATERIALQUANTITY: {
        message: 'Add material quantity atleast 1',
        statusCode: 400
    },
    INVALIDDATE: {
        message: 'Please select correct date',
        statusCode: 400
    },
    SLECTONEMONTH: {
        message: 'Date selection must be same month',
        statusCode: 400
    },
    LESSLEAVEDAYS: {
        message: 'Your remaining leave is less than applied days',
        statusCode: 400
    },
    NOLEAVESREMAIN: {
        message: 'No leaves remaining',
        statusCode: 400
    },
    ALREADYREQUESTED: {
        message: 'Already requested',
        statusCode: 400
    },
    BADREQUEST: {
        message: 'All fields are required',
        statusCode: 400
    },
    INVALIDDETAIL: {
        message: 'Invalid detail',
        statusCode: 400
    },
    EMAILALREADYEXIST: {
        message: 'Email already exist',
        statusCode: 400
    },
    ROLEIDINVALID: {
        message: 'Role id is invalid',
        statusCode: 400
    },
    ROLEALREADYEXIST: {
        message: 'Role already exist',
        statusCode: 400
    },
    ACTIVITYALREADYEXIST: {
        message: 'Activity name or Type Id might already exist in another activity',
        statusCode: 400
    },
    INTERESTALREADYEXIST: {
        message: 'Interest already exist',
        statusCode: 400
    },
    CATEGORYALREADYEXIST: {
        message: 'Interest already exist',
        statusCode: 400
    },
    EMAILNOTREGISTERED: {
        message: 'Email not registered',
        statusCode: 400
    },
    INVALIDEMAILFORMAT: {
        message: 'Invalid email format',
        statusCode: 400
    },
    NAMEALREADYEXIST: {
        message: 'Name already exist',
        statusCode: 400
    },
    ALREADYASSIGN: {
        message: 'Already assign',
        statusCode: 400
    },
    INVALIDDELIVERYVERIFY: {
        message: 'Only shipped delivery can receive',
        statusCode: 400
    },
    INVALIDEMAILPASSWORD: {
        message: 'Invalid credentials',
        statusCode: 400
    },
    UNAUTHORIZED: {
        message: 'Authentication is needed to get requested response',
        statusCode: 401
    },
    INACTIVE: {
        message: 'Your account is deactivated or unverified',
        statusCode: 401
    },
    INVALIDACCESS: {
        message: 'You do not have access',
        statusCode: 401
    },
    NORECORDFOUND: {
        message: 'No record found',
        statusCode: 404
    },
    INTERNALSERVER: {
        message: 'Internal server error',
        statusCode: 500
    },
    NORECORDSFOUND: {
        message: 'No data found',
        statusCode: 500
    }
}