import { MultiForm } from "../form/multyform"
import { Name } from "../form/name"
import { Famly } from "../form/famly"
import { Study } from "../form/study"
import { Bank } from "../form/bank"

export const ApplyRequests = () => {


  return <>
    <br />
    <h1 style={{ textAlign: "center", color: "#1e3a8a" }}> Fill in your details  </h1>

    <MultiForm>
      <Name></Name>
      <Famly></Famly>
      <Study></Study>
      <Bank></Bank>
    </MultiForm>
  </>
}