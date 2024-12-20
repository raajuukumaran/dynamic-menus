import { JsonObject, JsonProperty } from 'json2typescript';


@JsonObject("Detail")
export class Detail {
  @JsonProperty("key", String)
  key: string = "";

  @JsonProperty("type", String)
  type: string = "";

  @JsonProperty("value", String)
  value: string = ""; 
}

@JsonObject("subscription")
export class Subcription {

  // @JsonProperty("docId", String)
  // docId: string = ""

  @JsonProperty("docType", String)
  docType: string = "";

  // @JsonProperty("createdOn", String)
  // createdOn: string = ""

  @JsonProperty("createdBy", String)
  createdBy: string = "";

  @JsonProperty("application", String)
  application: string = "";

  @JsonProperty("subscription", [Detail])
  subscription: Detail[] = [];
  // modifiedOn: string ="";
  modifiedBy: string = "";
}

