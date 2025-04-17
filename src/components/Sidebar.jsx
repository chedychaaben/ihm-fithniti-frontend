import { useState, useMemo } from 'react'
import { Coins, Hourglass } from 'lucide-react'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Checkbox } from './ui/checkbox'

const Sidebar = ({ filters, onFiltersChange }) => {
  const { sortOption, departureOptions, otherFilters } = filters;

  const handleClearFilter = () => {
    onFiltersChange({
      sortOption: null,
      departureOptions: {
        departure_before_seven_am: false,
        departure_seven_to_noon: false,
        departure_noon_to_seven: false,
      },
      otherFilters: [
        { name: 'maxTwoPassengersInBackSeats', title: "👥 Max 2 Passengers in Back Seats", checked: false },
        { name: 'heavyLuggage', title: "🧳 Heavy Luggage", checked: false },
        { name: 'smokingAllowed', title: "🚬 Smoking Allowed", checked: false },
        { name: 'petsAllowed', title: "🐾 Pets Allowed", checked: false },
        { name: 'airConditioning', title: "❄️ Air Conditioning", checked: false },
      ]
    });
  }


  const toggleDeparture = (name) => {
    onFiltersChange({
      ...filters,
      departureOptions: {
        ...departureOptions,
        [name]: !departureOptions[name],
      },
    });
  }

  const toggleOtherFilter = (name) => {
    const updatedFilters = otherFilters.map(filter =>
      filter.name === name ? { ...filter, checked: !filter.checked } : filter
    );
    onFiltersChange({
      ...filters,
      otherFilters: updatedFilters,
    });
  }

  const sortBy = useMemo(() => [
    { icon: <Hourglass size={16} />, title: 'Earliest departure' },
    { icon: <Coins size={16} />, title: 'Lowest price' },
  ], []);

  const departureTime = useMemo(() => [
    { name: 'departure_before_eight_am', title: 'Before 8:00' },
    { name: 'departure_eight_am_to_four_pm', title: '8:00 - 16:00' },
    { name: 'departure_after_four_pm', title: 'After 16:00' },
  ], []);

  
  return (
    <aside className="space-y-4 py-4">
      
      <div className="px-3 py-2">
        <div className="flex items-center justify-between">
          <h2 className="mb-2 px-4 text-lg font-semibold">Sort by</h2>
          <span onClick={handleClearFilter} className="mb-2 px-4 text-sm text-primary text-right underline cursor-pointer">
            Reset Filter
          </span>
        </div>
        <RadioGroup 
          value={sortOption} 
          onValueChange={(value) => onFiltersChange({ ...filters, sortOption: value })}
        >
          {sortBy.map((s) => (
            <Label key={s.title} htmlFor={s.title} className="flex gap-2 items-center justify-between rounded-md bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
              {s.icon}
              {s.title}
              <RadioGroupItem 
                value={s.title} 
                id={s.title} 
                className="ml-auto" 
              />
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
            <Checkbox checked={o.checked} onCheckedChange={() => toggleOtherFilter(o.name)} id={o.name} />
          </Label>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar;
