import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { Minus, Plus, RefreshCw, CalendarIcon  } from "lucide-react"
import axios from "axios";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Calendar } from "./ui/calendar"
import { Toaster } from "./ui/sonner";
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const apiUri = import.meta.env.VITE_REACT_API_URI

const formSchema = z.object({
  from: z.string(),
  to: z.string(),
  availableSeats: z.number().min(1).max(4),
  price: z.number().nonnegative(),
  startTime: z.date().min(new Date()),
  endTime: z.date().min(new Date()),
  maxTwoPassengersInBackSeats: z.boolean().optional(),
  heavyLuggage: z.boolean().optional(),
  smokingAllowed: z.boolean().optional(),
  petsAllowed: z.boolean().optional(),
  airConditioning: z.boolean().optional(),
  car : z.string(),
})
const toUTCDate = (date) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
};
const PublishCard = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState({"body" :"", "marque":"", "model":""});


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: "",
      to: "",
      availableSeats: 1,
      price: 20,
      startTime: null,
      endTime: null,
      maxTwoPassengersInBackSeats: true,
      heavyLuggage : false,
      smokingAllowed: false,
      petsAllowed: false,
      airConditioning: true,
      car: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const body = {
        availableSeats: data.availableSeats,
        origin: {
          place: data.from,
        },
        destination: {
          place: data.to,
        },
        startTime: toUTCDate(data.startTime),
        endTime: toUTCDate(data.endTime),
        price: data.price,


        vehicleDetails: {
          body: selectedCar.body,
          marque: selectedCar.marque,
          model: selectedCar.model,
        },
        maxTwoPassengersInBackSeats: data.maxTwoPassengersInBackSeats,
        heavyLuggage : data.heavyLuggage,
        smokingAllowed: data.smokingAllowed,
        petsAllowed: data.petsAllowed,
        airConditioning: data.airConditioning,


        
        status: "pending"
      };
      console.log(body);
      await axios.post(`${apiUri}/rides`, body, {withCredentials: true});
      toast("The ride has been Created");
      form.reset();
    } catch (error) {
      console.error('POST request failed:', error);
      toast.error("Failed to create ride");
    }
  };

  const destinations = [
    "Ariana",
    "Ben Arous",
    "Bizerte",
    "Béja",
    "Gabès",
    "Gafsa",
    "Jendouba",
    "Kairouan",
    "Kasserine",
    "Kebili",
    "Kef",
    "Mahdia",
    "Manouba",
    "Medenine",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid",
    "Siliana",
    "Sousse",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan",
  ];

  const fetchCars = async () => {
    try {
      const res = await axios.get(`${apiUri}/cars/getmycars`, {
        withCredentials: true,
      });
      setCars(res.data);
    } catch (err) {
      console.error('Failed to fetch cars:', err);
    }
  };

  const otherFilters = [
    { name: 'maxTwoPassengersInBackSeats', title: "👥 Max 2 Passengers in Back Seats", checked: false },
    { name: 'heavyLuggage', title: "🧳 Heavy Luggage", checked: false },
    { name: 'smokingAllowed', title: "🚬 Smoking Allowed", checked: false },
    { name: 'petsAllowed', title: "🐾 Pets Allowed", checked: false },
    { name: 'airConditioning', title: "❄️ Air Conditioning", checked: false },
  ];

  const carTypes = [
    { label: "City car", value: "citadine", image: "/images/cars/citadine.svg" },
    { label: "Compact", value: "compacte", image: "/images/cars/compacte.svg" },
    { label: "Sedan", value: "berline", image: "/images/cars/berline.svg" },
    { label: "SUV", value: "suv", image: "/images/cars/suv.svg" },
    { label: "Coupe", value: "coupe", image: "/images/cars/coupe.svg" },
    { label: "Minivan", value: "monospace", image: "/images/cars/monospace.svg" },
    { label: "Utility vehicle", value: "utilitaire", image: "/images/cars/utilitaire.svg" },
    { label: "Pickup", value: "pickup", image: "/images/cars/pickup.svg" },
    { label: "Convertible", value: "cabriolet", image: "/images/cars/cabriolet.svg" },
  ];

  const [isSpinning, setIsSpinning] = useState(false);

  const handleClickSpinner = async () => {
    setIsSpinning(true);

    await Promise.all([
      fetchCars(),
      new Promise(resolve => setTimeout(resolve, 1000)) // minimum spin time
    ]);

    setIsSpinning(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create a Ride</CardTitle>
        <CardDescription>Publish your ride with just one click.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full items-center gap-4">
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5">
                  <FormLabel>From</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={`focus-visible:ring-0 md:text-base focus-visible:ring-transparent focus-visible:ring-offset-0 px-1 ${!field.value ? "text-gray-400" : "text-black"}`}>
                      <SelectValue placeholder="City of Departure" />
                      </SelectTrigger>
                      <SelectContent>
                        {destinations.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl><FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5">
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className={`focus-visible:ring-0 md:text-base focus-visible:ring-transparent focus-visible:ring-offset-0   px-1 ${!field.value ? "text-gray-400" : "text-black"}`}>
                        <SelectValue placeholder="City of Destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {destinations.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
              <FormField
                control={form.control}
                name="availableSeats"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5 items-center text-center">
                    <FormLabel>Available seats</FormLabel>
                    <FormControl>
                      <div className="flex gap-2 items-center">
                        <Button variant="outline" size="icon" type="button" onClick={() => field.value>1 && field.onChange(field.value - 1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{field.value}</span>
                        <Button variant="outline" size="icon" type="button" onClick={() => field.value<4 && field.onChange(field.value + 1)}  >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Price" min="0" {...field} onChange={(event) => field.onChange(Number(event.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => {
                const value = field.value ? new Date(field.value) : null;
                const formattedTime = value ? format(value, "HH:mm") : "";

                return (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Departure Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"ghost"}
                            className={cn(
                              "md:text-base px-0 sm:px-4 hover:bg-transparent",
                              !value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon size={20} className="opacity-50 mr-1 text-foreground" />
                            {value ? format(value, "PPPp") : <span>Pick a date</span>}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-4 space-y-2" align="start">
                        <Calendar
                          mode="single"
                          selected={value}
                          onSelect={(selectedDate) => {
                            if (!selectedDate) return;
                            const newDate = new Date(selectedDate);
                            // Preserve existing time if any
                            if (value) {
                              newDate.setHours(value.getHours());
                              newDate.setMinutes(value.getMinutes());
                            }
                            field.onChange(newDate);
                          }}
                          disabled={(date) =>
                            date < new Date().setHours(0, 0, 0, 0)
                          }
                          initialFocus
                        />
                        <Input
                          type="time"
                          value={formattedTime}
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(":").map(Number);
                            const updatedDate = new Date(value || new Date());
                            updatedDate.setHours(hours);
                            updatedDate.setMinutes(minutes);
                            field.onChange(updatedDate);
                          }}
                          className="w-full"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => {
                const value = field.value ? new Date(field.value) : null;
                const formattedTime = value ? format(value, "HH:mm") : "";
                const startValue = form.getValues("startTime");
                const startDate = startValue ? new Date(startValue) : null;

                return (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Arrival Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"ghost"}
                            className={cn(
                              "md:text-base px-0 sm:px-4 hover:bg-transparent",
                              !value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon size={20} className="opacity-50 mr-1 text-foreground" />
                            {value ? format(value, "PPPp") : <span>Pick a date</span>}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-4 space-y-2" align="start">
                        <Calendar
                          mode="single"
                          selected={value}
                          onSelect={(selectedDate) => {
                            if (!selectedDate) return;
                            const newDate = new Date(selectedDate);
                            // Preserve existing time if any
                            if (value) {
                              newDate.setHours(value.getHours());
                              newDate.setMinutes(value.getMinutes());
                            }
                            field.onChange(newDate);
                          }}
                          disabled={(date) => {
                            const today = new Date().setHours(0, 0, 0, 0);
                            if (!startDate) return date < today;
                            return date < today || date < new Date(startDate).setHours(0, 0, 0, 0);
                          }}
                          initialFocus
                        />
                        <Input
                          type="time"
                          value={formattedTime}
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(":").map(Number);
                            const updatedDate = new Date(value || new Date());
                            updatedDate.setHours(hours);
                            updatedDate.setMinutes(minutes);
                            field.onChange(updatedDate);
                          }}
                          className="w-full"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            
            <div className="space-y-2">
              <Label>Options</Label>
              {otherFilters.map((o) => (
                <FormField
                  key={o.name}
                  control={form.control}
                  name={o.name}
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                      <div
                        className="flex-1 cursor-pointer"
                        onClick={() => field.onChange(!field.value)}
                      >
                        <Label htmlFor={o.name} className="cursor-pointer">
                          {o.title}
                        </Label>
                      </div>
                      <FormControl>
                        <Checkbox
                          id={o.name}
                          checked={field.value === true}
                          onCheckedChange={(val) => field.onChange(val)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
              </div>
            
            <FormField
            control={form.control}
            name="car"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-3 mt-3">
                <FormLabel>Select Your Car</FormLabel>
                <FormControl>
                  <div className="flex justify-between">
                    <Select value={field.value} onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedCar({
                          body: value.split("@")[0],
                          marque: value.split("@")[1],
                          model: value.split("@")[2]
                        });
                      }}>
                      <SelectTrigger
                        className={`focus-visible:ring-0 md:text-base focus-visible:ring-transparent focus-visible:ring-offset-0   px-1 ${
                          !field.value ? "text-gray-400" : "text-black"
                        }`}
                      >
                        <SelectValue placeholder="Select Your Car" />
                      </SelectTrigger>
                      <SelectContent>
                        {cars.map((car) => {
                          // Find the matching car type
                          const matchedType = carTypes.find(type => type.value === car.body);
                          const imageSrc = matchedType ? matchedType.image : '/images/cars/default.svg'; // fallback image
                          
                          return (
                            <SelectItem key={car._id} value={`${car.body}@${car.marque}@${car.model}`}>
                              <div className="flex items-center gap-2">
                                <img src={imageSrc} alt={car.body} className="w-6 h-6 rounded" />
                                <span>{car.marque} {car.model}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <RefreshCw
                      onClick={handleClickSpinner}
                      className={`h-4 w-4 mt-3 ml-3 cursor-pointer ${isSpinning ? 'animate-spin linear infinite' : ''}`}
                    />
                </div>
                </FormControl>
              </FormItem>
            )}
          />
            <Button type="submit">Publish</Button>
          </form>
        </Form>
      </CardContent>
      <Toaster />
    </Card>
  )
}

export default PublishCard;