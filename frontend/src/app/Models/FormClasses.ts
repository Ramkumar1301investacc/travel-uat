
//Proposal Form Request

export class ProposalRequest{
    proposalOwnerDetails:ProposalOwnerDetails=new ProposalOwnerDetails();
    proposalNomineeDetails:ProposalNomineeDetails=new ProposalNomineeDetails();
}

export class ProposalOwnerDetails{
    salutation:number=0;
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
   nomtitle:number=0;
   nomfullname:String='';
   nomdob:Date;
   nomphoneno:number=0;
   nomemail:string='';
   appointeereltn: string = '';
}
