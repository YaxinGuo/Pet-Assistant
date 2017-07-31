const team =
  [
    {method:"Email", number: "petassistant@sample.com" },
    {method:"Cell" , number: "123-456-7890" },
    {method:"Fax" , number: "123-456-7890" }
  ]

Template.contactus.helpers({
  contactusData: team,
})
