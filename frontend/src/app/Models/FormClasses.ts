
//Proposal Form Request

export class ProposalRequest{
    proposalOwnerDetails:ProposalOwnerDetails=new ProposalOwnerDetails();
    proposalNomineeDetails:ProposalNomineeDetails=new ProposalNomineeDetails();
}

export class ProposalOwnerDetails{
    salutation:string='';
    firstname:string = '';
    middlename:string = '';
    surname:string = '';
    gender:string = '';
    dob:string = '';
    passportno:string = '';
    email:string = '';
    phonenumber:string = '';
    altphoneno:string = '';
    add1:string = '';
    add2:string = '';
    add3:string = '';
    state:string = '';
    city:string = '';
    pincode:string = '';
}

export class ProposalNomineeDetails{
    verificationOption:string='';
    nomCardno:number=0;
    nomFullname:string='';
    nomrelation:string='';
    nomge:number=0;
    nomemail:string='';
    nomphoneno:string='';
}
