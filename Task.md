# Tasks

## Abstract Changes

Energy Carriers split into 2 parts, electrical energy types [renewable, other] and the other carriers stay in the same place as primary energy carriers, with an additional none option

heat pumps stay are applicable only to the none option.

another heating system will be added, gas/heatpump hybrid. it is applicable to gas primary carriers.

for that to work we need a factor for heating systems that tell it, how much percent of the heating happens electrically. that means a part of the heating demand goes into primaryHeatingDemand, while the other portion goes into electrical heating demand.

Users will be able to provide accurate data on their actual electrical and heating expenses. in the front end, renovation deltas get calculated by running the calculation again with the renovationpatches. when the user gives their actual electrical and heating expenses, this does not work. because of that, the resolvers will need to calculate the heatingdemand of each individual part and their portion of the total heating demand. the frontend can give the original values and a reduction can be calculated.

## New inputs

- Optional pre Renovation resolved heating demands
- Electricity
  - energyType (in place of is electricity renewable)
  - Electricity price
  - electricity consumption
- Heat
  - primary energy consumption? (better naming needed)

## Config Changes

- Primary Energy Carriers splits up into primary Energy Carriers and electricEnergyType
- Electrical primary carrier get replaced by "none"
- heating systems have more individual configuration
  - electrical ratio
  - unit

## Result Changes

- Result produces the optional pre Renovation resolved heating demands the input can consume.
  - (total heating demand, roof heating demand, outer wall heating demand, ventilation heating demand etc)

## resolver changes

- heatloss in heatdemand(sum) should not add up conditionally, instead demand of a induvidual heatloss component is 0, when it would otherwise not be added up
