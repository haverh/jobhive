import usePlacesAutocomplete from "use-places-autocomplete";
import { 
  Combobox, 
  ComboboxInput, 
  ComboboxOption, 
  ComboboxOptions,
  Popover
  } from '@headlessui/react'
import { useState } from "react";
import {  Autocomplete,  AutocompleteSection,  AutocompleteItem} from "@nextui-org/autocomplete";


export default function LocationInput() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ['(cities)'],
    }
  });

  const [selectedValue, setSelected] = useState<null | undefined | string>();

  const handleInput = (inputValue: string) => {
    setValue(inputValue);
    console.log("Value", value);
    console.log("Suggestions", data, status);
  }
  
  return (
    <div className="w-full">
      {/* <Autocomplete 
        label="Choose a location" 
        className="w-full h-8 text-base rounded-xl" 
      >
        {data.map((suggestion) => {
          const {
            place_id,
            structured_formatting: { main_text, secondary_text },
          } = suggestion;

          return (
            <AutocompleteItem key={place_id} value={secondary_text}>
              {secondary_text}
            </AutocompleteItem>
          )
        })}
      </Autocomplete> */}
      <input list="locations" value={value} onChange={(e) => {handleInput(e.target.value)}}
        className="w-full h-8 text-base rounded-xl"></input>
      <div className="w-full h-8 text-base rounded-xl">
        <ul id="locations" className="w-full relative bg-yellow-100 rounded-xl">
          { status === "OK" && data.map((suggestion) => {
            const {
              place_id,
              structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
              <li key={place_id} className="p-2 bg-yellow-100 hover:bg-yellow-200 cursor-pointer rounded-xl"
                onClick={() => console.log("I CLICKED ON IT") }>
                <span className="mr-1">{main_text}</span> <span>({secondary_text})</span>
              </li>
            );
          }) }
        </ul>
      </div>
      

      {/* <Combobox value={selectedValue} onChange={setSelected} >
        <ComboboxInput value={value} onChange={(e) => {handleInput(e.target.value)}}
            className="w-full h-8 text-base rounded-xl"></ComboboxInput>
        <ComboboxOptions  className="absolute w-[196.8px] h-8 text-base bg-yellow-200">
          {status === "OK" && data.map((suggestion) => {
            const {
              place_id,
              structured_formatting: { main_text },
            } = suggestion;

            return (
              <ComboboxOption key={place_id} value={main_text} className="pl-3 bg-yellow-200 data-[focus]:bg-blue-100 ">
                {main_text}
              </ComboboxOption>
            )
          })}
        </ComboboxOptions>
      </Combobox> */}

    </div>
    
  )

}