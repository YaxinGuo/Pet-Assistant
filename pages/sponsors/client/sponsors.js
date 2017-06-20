const ourSponsors = [
 {name:"Google",amt:"$50 million"},
 {name:"Apple",amt:"$20 million"},
 {name:"Facebook",amt:"$40 million"},
 {name:"Instagram", amt: "$30 million"},
 {name:"Twitter", amt:"$60 million"},
]


Template.sponsors.helpers({
	sponsorData: ourSponsors,
  today: new Date(),
})
