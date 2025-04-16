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

  const otherFilters = [
    { name: 'maxUsersTwoInBack', title: "👥" },
    { name: 'smokingAllowed', title: "🚬" },
    { name: 'petsAllowed', title: "🐾" },
    { name: 'airConditioning', title: "❄️" },
  ];

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
              <Label>Vehicle Carroserie</Label>
              <FormField
                control={form.control}
                name="vehicleNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Vehicle Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              /><FormField
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
            <div className="space-y-2">
              <Label>Options</Label>
              {otherFilters.map(o => (
                <FormField
                  key={o.name}
                  control={form.control}
                  name={o.name}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <Label htmlFor={o.name}>{o.title}</Label>
                      <FormControl>
                        <Checkbox
                          id={o.name}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
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