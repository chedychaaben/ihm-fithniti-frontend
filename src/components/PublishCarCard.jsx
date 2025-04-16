import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { MapPin, Minus, Plus, UserPlus } from "lucide-react"
import axios from "axios";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Toaster } from "./ui/sonner";
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
  seat: z.number().min(1).max(10),
  price: z.number().nonnegative(),
  startTime: z.date().min(new Date()),
  endTime: z.date().min(new Date()),
  vehicleNumber: z.string().optional(),
  vehicleModel: z.string().optional(),
  maxUsersTwoInBack: z.boolean().default(false),
  smokingAllowed: z.boolean().default(false),
  petsAllowed: z.boolean().default(false),
  airConditioning: z.boolean().default(true),
})

const PublishCarCard = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: "",
      to: "",
      seat: 1,
      price: 0,
      startTime: new Date(),
      endTime: new Date(),
      vehicleNumber: "",
      vehicleModel: "",
      maxUsersTwoInBack: false,
      smokingAllowed: false,
      petsAllowed: false,
      airConditioning: true,
    },
  });

  const onSubmit = async (data) => {
    try {
      const body = {
        availableSeats: data.seat,
        origin: {
          place: data.from,
        },
        destination: {
          place: data.to,
        },
        startTime: data.startTime,
        endTime: data.endTime,
        price: data.price,
        vehicleDetails: {
          vehicleNumber: data.vehicleNumber,
          model: data.vehicleModel,
        },
        MaxUsersTwoInBack: data.maxUsersTwoInBack,
        smokingAllowed: data.smokingAllowed,
        petsAllowed: data.petsAllowed,
        AirConditioning: data.airConditioning,
        status: "pending"
      };
      
      await axios.post(`${apiUri}/rides`, body, {withCredentials: true});
      toast("The ride has been Created");
      form.reset();
    } catch (error) {
      console.error('POST request failed:', error);
      toast.error("Failed to create ride");
    }
  };

  const carTypes = [
    {
      label: "City car",
      value: "citadine",
      image: "/images/cars/citadine.svg",
    },
    {
      label: "Compact",
      value: "compacte",
      image: "/images/cars/compacte.svg",
    },
    {
      label: "Sedan",
      value: "berline",
      image: "/images/cars/berline.svg",
    },
    {
      label: "SUV",
      value: "suv",
      image: "/images/cars/suv.svg",
    },
    {
      label: "Coupe",
      value: "coupe",
      image: "/images/cars/coupe.svg",
    },
    {
      label: "Minivan",
      value: "monospace",
      image: "/images/cars/monospace.svg",
    },
    {
      label: "Utility vehicle",
      value: "utilitaire",
      image: "/images/cars/utilitaire.svg",
    },
    {
      label: "Pickup",
      value: "pickup",
      image: "/images/cars/pickup.svg",
    },
    {
      label: "Convertible",
      value: "cabriolet",
      image: "/images/cars/cabriolet.svg",
    },
  ];
  

  const car_factories = [
      "BMW",
      "Audi",
      "Mercedes-Benz",
      "Volkswagen",
      "Toyota",
      "Honda",
      "Ford",
      "Chevrolet",
      "Nissan",
      "Tesla",
      "Hyundai",
      "Kia",
      "Porsche",
      "Jaguar",
      "Land Rover",
      "Ferrari",
      "Lamborghini",
      "Maserati",
      "Aston Martin",
      "Bentley",
      "Rolls-Royce",
      "Bugatti",
      "Peugeot",
      "Renault",
      "Fiat",
      "Alfa Romeo",
      "Subaru",
      "Mazda",
      "Chrysler",
      "Dodge",
      "Jeep",
      "Cadillac",
      "Buick"
  ]
  const [selectedCarrosserie, setSelectedCarrosserie] = useState(null);
  const handleSelectChange = (value) => {
    // Find the selected car type object
    const selectedType = carTypes.find((type) => type.value === value);
    setSelectedCarrosserie(selectedType); // Update the state with the selected car type
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Add Your Car</CardTitle>
        <CardDescription>Add your car details.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full items-center gap-4">
            
            <div className="space-y-2">
              <Label>Vehicle Body</Label>
              <FormField
                control={form.control}
                name="vehicleCarrosserie"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                    <Select onValueChange={(value) => { field.onChange(value); handleSelectChange(value); }} value={field.value}>
                        <SelectTrigger className={`focus-visible:ring-0 md:text-base focus-visible:ring-transparent focus-visible:ring-offset-0 border-none px-1 ${!field.value ? "text-gray-400" : "text-black"}`}>
                          <SelectValue placeholder="Select Vehicle Body" />
                        </SelectTrigger>
                        
                        <SelectContent>
                          {carTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <img
                                  src={type.image}
                                  alt={type.label}
                                  className="w-6 h-6 rounded"
                                />
                                <span>{type.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Image Preview 
            {selectedCarrosserie && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Selected Body</h3>
                <div className="flex flex-col items-center mt-2">
                  <img
                    src={selectedCarrosserie.image}
                    alt={selectedCarrosserie.label}
                    className="w-48 h-48 object-cover rounded"
                  />
                  <p>{selectedCarrosserie.label}</p>
                </div>
              </div>
            )}
            */}
              
            <div className="space-y-2">
              <Label>Vehicle Marque</Label>
              <FormField
                control={form.control}
                name="vehicleMarque"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)} // Ensure react-hook-form's control updates
                        value={field.value} // Bind select value to react-hook-form field value
                      >
                        <SelectTrigger
                          className={`focus-visible:ring-0 md:text-base focus-visible:ring-transparent focus-visible:ring-offset-0 border-none px-1 ${!field.value ? "text-gray-400" : "text-black"}`}
                        >
                          <SelectValue placeholder="Select Vehicle Marque" />
                        </SelectTrigger>
                        
                        <SelectContent>
                          {car_factories.map((factory, index) => (
                            <SelectItem key={index} value={factory}>
                              <div className="flex items-center gap-2">
                                <span>{factory}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Vehicle Model</Label>
              <FormField
                control={form.control}
                name="vehicleModel"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Vehicle Model" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Publish</Button>
          </form>
        </Form>
      </CardContent>
      <Toaster />
    </Card>
  )
}

export default PublishCarCard;