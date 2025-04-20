import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from './ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Toaster } from "./ui/sonner";

const apiUri = import.meta.env.VITE_REACT_API_URI;

const formSchema = z.object({
  vehicleCarrosserie: z.string().nonempty("Vehicle body is required"),
  vehicleMarque: z.string().nonempty("Vehicle marque is required"),
  vehicleModel: z.string().min(1, "Vehicle model is required"),
});

const PublishCarCard = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      vehicleCarrosserie: "",
      vehicleMarque: "",
      vehicleModel: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const body = {
        body: data.vehicleCarrosserie,
        marque: data.vehicleMarque,
        model: data.vehicleModel,
      };

      await axios.post(`${apiUri}/cars`, body, { withCredentials: true });
      toast("The car has been Added");
      form.reset();
    } catch (error) {
      console.error("POST request failed:", error);
      toast.error("Failed to add car");
    }
  };

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

  const car_factories = [
    "BMW", "Audi", "MercedesBenz", "Volkswagen", "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Tesla", 
    "Hyundai", "Kia", "Porsche", "Jaguar", "LandRover", "Ferrari", "Lamborghini", "Maserati", "AstonMartin", 
    "Bentley", "RollsRoyce", "Bugatti", "Peugeot", "Renault", "Fiat", "Alfa Romeo", "Subaru", "Mazda", "Chrysler", 
    "Dodge", "Jeep", "Cadillac", "Buick"
  ];

  // Mocked models based on brands, you'd need to update this data based on real data.
  const modelsByBrand = {
    BMW: ["X5", "X3", "M3", "3 Series"],
    Audi: ["A4", "Q5", "Q7", "A6"],
    MercedesBenz: ["C-Class", "E-Class", "GLC", "S-Class"],
    Volkswagen: ["Golf", "Polo", "Passat", "Tiguan"],
    Tesla: ["Model S", "Model 3", "Model X", "Model Y"],
    Toyota: ["Corolla", "Camry", "RAV4", "Land Cruiser"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot"],
    Ford: ["F-150", "Mustang", "Explorer", "Focus"],
    Chevrolet: ["Silverado", "Malibu", "Equinox", "Cruze"],
    Nissan: ["Altima", "Sentra", "Maxima", "370Z"],
    Hyundai: ["Sonata", "Elantra", "Tucson", "Santa Fe"],
    Kia: ["Optima", "Sorento", "Sportage", "Telluride"],
    Porsche: ["911", "Cayenne", "Macan", "Taycan"],
    Jaguar: ["F-Type", "XE", "XF", "I-PACE"],
    LandRover: ["Range Rover", "Discovery", "Defender", "Evoque"],
    Ferrari: ["488", "F8", "Portofino", "Roma"],
    Lamborghini: ["Huracán", "Aventador", "Urus"],
    Maserati: ["Ghibli", "Levante", "Quattroporte"],
    AstonMartin: ["Vantage", "DB11", "DBX"],
    Bentley: ["Continental GT", "Flying Spur", "Bentayga"],
    RollsRoyce: ["Phantom", "Cullinan", "Wraith"],
    Bugatti: ["Chiron", "Veyron"],
    Peugeot: ["208", "3008", "508", "2008"],
    Renault: ["Clio", "Megane", "Captur", "Koleos"],
    Fiat: ["500", "Panda", "Tipo", "500X"],
    AlfaRomeo: ["Giulia", "Stelvio", "4C"],
    Subaru: ["Impreza", "Outback", "Forester", "Crosstrek"],
    Mazda: ["Mazda3", "Mazda6", "CX-5", "MX-5 Miata"],
    Chrysler: ["Pacifica", "300", "Voyager"],
    Dodge: ["Charger", "Challenger", "Durango", "Ram 1500"],
    Jeep: ["Wrangler", "Cherokee", "Grand Cherokee", "Renegade"],
    Cadillac: ["Escalade", "CTS", "XT5", "CT6"],
    Buick: ["Enclave", "Encore", "Regal", "LaCrosse"],
    Lexus: ["RX", "ES", "NX", "IS"],
    Acura: ["MDX", "RDX", "TLX", "ILX"],
    Infiniti: ["Q50", "QX60", "QX80", "Q60"],
    Mini: ["Cooper", "Countryman", "Clubman"],
    Genesis: ["G80", "G90", "GV80", "GV70"],
    Lincoln: ["Navigator", "Aviator", "Corsair"]
};

  const [selectedCarrosserie, setSelectedCarrosserie] = useState(null);
  const [selectedMarque, setSelectedMarque] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  const handleSelectCarrosserieChange = (value) => {
    const selectedType = carTypes.find((type) => type.value === value);
    setSelectedCarrosserie(selectedType);
  };

  const handleSelectMarqueChange = (value) => {
    setSelectedMarque(value);
    setSelectedModel(null);  // Reset model when marque changes
  };

  const handleSelectModelChange = (value) => {
    setSelectedModel(value);
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
                      <Select onValueChange={(value) => { field.onChange(value); handleSelectCarrosserieChange(value); }} value={field.value}>
                        <SelectTrigger className={`focus-visible:ring-0 md:text-base focus-visible:ring-transparent focus-visible:ring-offset-0   px-1 ${!field.value ? "text-gray-400" : "text-black"}`}>
                          <SelectValue placeholder="Select Vehicle Body" />
                        </SelectTrigger>
                        <SelectContent>
                          {carTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <img src={type.image} alt={type.label} className="w-6 h-6 rounded" />
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

            {!(form.watch("vehicleCarrosserie"))? 
            ""
            :
            <div className="space-y-2">
              <Label>Vehicle Marque</Label>
              <FormField
                control={form.control}
                name="vehicleMarque"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={(value) => { field.onChange(value); handleSelectMarqueChange(value); }} value={field.value}>
                        <SelectTrigger className={`focus-visible:ring-0 md:text-base focus-visible:ring-transparent focus-visible:ring-offset-0   px-1 ${!field.value ? "text-gray-400" : "text-black"}`}>
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
            }

            
            {!(form.watch("vehicleCarrosserie") && form.watch("vehicleMarque"))? 
            ""
            :
            
              <div className="space-y-2">
                <Label>Vehicle Model</Label>
                <FormField
                  control={form.control}
                  name="vehicleModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={(value) => { field.onChange(value); handleSelectModelChange(value); }} value={field.value}>
                          <SelectTrigger className={`focus-visible:ring-0 md:text-base focus-visible:ring-transparent focus-visible:ring-offset-0   px-1 ${!field.value ? "text-gray-400" : "text-black"}`}>
                            <SelectValue placeholder="Select Vehicle Model" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedMarque && modelsByBrand[selectedMarque]?.map((model, index) => (
                              <SelectItem key={index} value={model}>
                                <div className="flex items-center gap-2">
                                  <span>{model}</span>
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
            }
            {form.watch("vehicleCarrosserie") && form.watch("vehicleMarque") && form.watch("vehicleModel") && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Selected :</h3>
                <div className="flex flex-col items-center mt-2">
                  <img
                    src={selectedCarrosserie.image}
                    alt={selectedCarrosserie.label}
                    className="w-48 h-48 object-cover rounded"
                  />
                  <p>{selectedCarrosserie.label} {selectedMarque} {selectedModel}</p>
                </div>
              </div>
            )}

            <Button type="submit" disabled={!form.watch("vehicleCarrosserie") || !form.watch("vehicleMarque") || !form.watch("vehicleModel")}>
              Add
            </Button>
          </form>
        </Form>
      </CardContent>
      <Toaster position="top-center" />
    </Card>
  );
};

export default PublishCarCard;
