import { Coins, Clock, Hourglass } from 'lucide-react'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Checkbox } from './ui/checkbox'

const Sidebar = () => {
  const sortBy = [
    {
      icon: <Hourglass size={16} />,
      title: "Earliest departure"
    },
    { 
      icon: <Coins  size={16} />,
      title: "Lowest price", 
    }
  ]
  const departureTime= [
    {
      name: "departure_before_six_am",
      title: "Before 6:00"
    },
    {
      name: "departure_six_to_noon",
      title: "6:00 - 12:00"
    },
    {
      name: "departure_noon_to_six",
      title: "12:00 - 18:00"
    },
  ]
  
  return (
    <aside className="space-y-4 py-4">
      <div className="px-3 py-2">
        <div className="flex items-center justify-between">
          <h2 className="mb-2 px-4 text-lg font-semibold">Sort by</h2>
          <span className="mb-2 px-4 text-sm text-primary text-right underline cursor-pointer">Clear Filter</span>
        </div>
        <RadioGroup>
          {sortBy.map(s => 
            <Label key={s.title} htmlFor={s.title} className="flex gap-2 items-center justify-between rounded-md bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
              {s.icon}
              {s.title}
              <RadioGroupItem value={s.title} className="ml-auto" id={s.title} />
            </Label>
          )}
        </RadioGroup>
      </div>

      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Departure time</h2>
        {departureTime.map(d => 
          <Label key={d.title} htmlFor={d.name} aria-label={d.name} className="flex gap-2 items-center justify-between rounded-md bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
            {d.title}
            <Checkbox name={d.name} id={d.name} />
          </Label>
        )}
      </div>

      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Autre</h2>
        
        <Label key="max-passengers" htmlFor="max-passengers" aria-label="Max passengers" className="flex gap-2 items-center justify-between rounded-md bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
          Max. 2 passengers in the back
          <Checkbox name="max-passengers" id="max-passengers" />
        </Label>
        
        <Label key="smoking-allowed" htmlFor="smoking-allowed" aria-label="Smoking allowed" className="flex gap-2 items-center justify-between rounded-md bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
          Smoking allowed
          <Checkbox name="smoking-allowed" id="smoking-allowed" />
        </Label>
        
        <Label key="pets-allowed" htmlFor="pets-allowed" aria-label="Pets allowed" className="flex gap-2 items-center justify-between rounded-md bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
          Pets allowed
          <Checkbox name="pets-allowed" id="pets-allowed" />
        </Label>
        
        <Label key="air-conditioning" htmlFor="air-conditioning" aria-label="Air conditioning" className="flex gap-2 items-center justify-between rounded-md bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
          Air conditioning
          <Checkbox name="air-conditioning" id="air-conditioning" />
        </Label>
        
      </div>

    </aside>
  )
}

export default Sidebar