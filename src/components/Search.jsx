import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { z } from "zod"
import { format } from "date-fns"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { CalendarIcon, MapPin, Minus, Plus, User } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

const searchSchema = z.object({
  from: z.string().min(1, "From field is required"), // Ensure 'from' is a non-empty string
  to: z.string().min(1, "To field is required"), // Ensure 'to' is a non-empty string
  seat: z.number().min(1).max(10),
  date: z.date(),
})

const Search = () => {
  const [searchParams] = useSearchParams()
  
  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      from: searchParams.get("from") || "",
      to: searchParams.get("to") || "",
      seat: Number(searchParams.get("seat")) || 1,
      date: searchParams.get("date") ? new Date(searchParams.get("date")) : null
    },
  })

  const onSubmit = (data) => {
    const params = new URLSearchParams()
    params.set("from", data.from)
    params.set("to", data.to)
    params.set("seat", data.seat.toString())
    params.set("date", format(data.date, "yyyy-MM-dd"))
    
    // This updates the URL
    window.location.assign(`/search?${params.toString()}`);

    
    // This updates the form values to match the new URL
    form.reset({
      from: data.from,
      to: data.to,
      seat: data.seat,
      date: data.date
    })
  }

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
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1 sm:flex-row w-full sm:w-fit divide-y sm:divide-y-0 sm:divide-x bg-background border p-3 rounded-lg">
        <div className="flex">
          <FormField
            control={form.control}
            name="from"
            required
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0 w-full md:w-[400px]">
                <MapPin className="opacity-50 sm:ml-2" />
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={`focus-visible:ring-0 md:text-base focus-visible:ring-transparent border-none focus-visible:ring-offset-0 px-1 ${!field.value ? "text-gray-400" : "text-black"}`}>
                    <SelectValue placeholder="From" />
                      {form.formState.errors.from && (
                        <span className="text-red-500">{form.formState.errors.from.message}</span>
                      )}
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
            rules={{
              required: "This field is required", // Error message on required validation failure
            }}
          />
        </div>
        <div className="flex">
          <FormField
            control={form.control}
            name="to"
            required
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0 w-full md:w-[400px]">
                <MapPin className="opacity-50 sm:ml-2" />
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={`focus-visible:ring-0 md:text-base focus-visible:ring-transparent border-none focus-visible:ring-offset-0 px-1 ${!field.value ? "text-gray-400" : "text-black"}`}>
                      <SelectValue placeholder="To" />
                      {form.formState.errors.to && (
                        <span className="text-red-500">{form.formState.errors.to.message}</span>
                      )}
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
            rules={{
              required: "This field is required", // Error message on required validation failure
            }}
          />
        </div>
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="date"
            required
            render={({ field }) => (
              <FormItem className="flex">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={"ghost"} className={cn("md:text-base px-0 sm:px-4 hover:bg-transparent", !field.value && "text-muted-foreground")}>
                        <CalendarIcon size={20} className="opacity-50 mr-1 text-foreground" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        {form.formState.errors.date && (
                          <span className="text-red-500">{form.formState.errors.date.message}</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seat"
            render={({ field }) => (
              <FormItem className="flex">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={"ghost"} className="w-full justify-start md:text-base px-12 sm:px-4 hover:bg-transparent">
                        <User size={20} className="opacity-50 mr-1" />
                        <span className="text-md">{field.value}</span>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-4 flex gap-2 items-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        type="button"
                        onClick={() => field.onChange(Math.max(1, field.value - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span>{field.value}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        type="button"
                        onClick={() => field.onChange(Math.min(10, field.value + 1))}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="md:ml-6">Search</Button>
      </form>
    </Form>
  )
}

export default Search