import { useState } from 'react'
import { Coins, Hourglass } from 'lucide-react'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Checkbox } from './ui/checkbox'

const Sidebar = () => {
  const [sortOption, setSortOption] = useState('Earliest departure')
  const [departureOptions, setDepartureOptions] = useState({
    departure_before_six_am: false,
    departure_six_to_noon: false,
    departure_noon_to_six: false,
  })
  const [otherOptions, setOtherOptions] = useState({
    'max-passengers': false,
    'smoking-allowed': false,
    'pets-allowed': false,
    'air-conditioning': false,
  })

  const handleClearFilter = () => {
    setSortOption('')
    setDepartureOptions({
      departure_before_six_am: false,
      departure_six_to_noon: false,
      departure_noon_to_six: false,
    })
    setOtherOptions({
      'max-passengers': false,
      'smoking-allowed': false,
      'pets-allowed': false,
      'air-conditioning': false,
    })
  }

  const toggleDeparture = (name) => {
    setDepartureOptions(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const toggleOther = (name) => {
    setOtherOptions(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const sortBy = [
    { icon: <Hourglass size={16} />, title: 'Earliest departure' },
    { icon: <Coins size={16} />, title: 'Lowest price' },
  ]

  const departureTime = [
    { name: 'departure_before_six_am', title: 'Before 6:00' },
    { name: 'departure_six_to_noon', title: '6:00 - 12:00' },
    { name: 'departure_noon_to_six', title: '12:00 - 18:00' },
  ]

  const otherFilters = [
    { name: 'max-passengers', title: 'Max. 2 passengers in the back' },
    { name: 'smoking-allowed', title: 'Smoking allowed' },
    { name: 'pets-allowed', title: 'Pets allowed' },
    { name: 'air-conditioning', title: 'Air conditioning' },
  ]

  return (
    <aside className="space-y-4 py-4">
      <div className="px-3 py-2">
        <div className="flex items-center justify-between">
          <h2 className="mb-2 px-4 text-lg font-semibold">Sort by</h2>
          <span onClick={handleClearFilter} className="mb-2 px-4 text-sm text-primary text-right underline cursor-pointer">
            Clear Filter
          </span>
        </div>
        <RadioGroup value={sortOption} onValueChange={setSortOption}>
          {sortBy.map(s => (
            <Label key={s.title} htmlFor={s.title} className="flex gap-2 items-center justify-between rounded-md bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
              {s.icon}
              {s.title}
              <RadioGroupItem value={s.title} className="ml-auto" id={s.title} />
            </Label>
          ))}
        </RadioGroup>
      </div>

      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Departure time</h2>
        {departureTime.map(d => (
          <Label key={d.title} htmlFor={d.name} className="flex gap-2 items-center justify-between rounded-md bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
            {d.title}
            <Checkbox checked={departureOptions[d.name]} onCheckedChange={() => toggleDeparture(d.name)} id={d.name} />
          </Label>
        ))}
      </div>

      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Others</h2>
        {otherFilters.map(o => (
          <Label key={o.name} htmlFor={o.name} className="flex gap-2 items-center justify-between rounded-md bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
            {o.title}
            <Checkbox checked={otherOptions[o.name]} onCheckedChange={() => toggleOther(o.name)} id={o.name} />
          </Label>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
