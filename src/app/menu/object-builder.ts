
// import moment from 'moment';
// import * as uuid from "uuid";
import { Subcription } from './model';
export class subscriptionObjectBuilder {
  constructor(){

  }
  static create(subs: any,app: any, ): Subcription {    
    // const ref = uuid.v4();
    const instance: Subcription = new Subcription();
    instance.application = app;
    instance.subscription = subs;  
    instance.docType = "INEVITO-EVITO-SUSBCRIPTION"
    // instance.docId = ref
    // instance.createdOn = moment().toISOString();
    instance.createdBy = "Admin"
    return instance;
  }

  static edit(data: any,filter: any, ): Subcription {    
    const instance: Subcription = new Subcription();
    instance.application = data.application;
    instance.subscription = filter;  
    instance.docType = data.docType;
    // instance.docId = data.docId;
    // instance.modifiedOn = moment().toISOString();
    instance.modifiedBy = "Admin12";
    // instance.createdOn = data.createdOn;
    instance.createdBy = data.createdBy;
    return instance;
  }
  
}
