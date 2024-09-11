import { Dispatch, SetStateAction, useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { 
  Combobox, 
  ComboboxInput, 
  ComboboxOption, 
  ComboboxOptions,
  } from '@headlessui/react';
import { Profile } from "@/app/lib/definitions";

export default function LocationInput({
  defValue,
  profile,
  setProfile,
}: {
  defValue: string,
  profile: Profile,
  setProfile: Dispatch<SetStateAction<Profile>>,
}) {
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

  const handleInput = (e: { target: { value: string; }; }) => {
    setValue(e.target.value);
  }

  const handleSelect = (val: string) => {
    setValue(val, false);
    setProfile({...profile, location: val});
  };
  
  return (
    <div className="w-full">
      <Combobox onChange={handleSelect} >
        <ComboboxInput 
          defaultValue={defValue}
          onChange={(e) => {handleInput(e)}} 
          disabled={!ready}
          className="w-full h-8 text-base rounded-xl" 
        />
        <ComboboxOptions  className="combo-options absolute w-[196.8px] rounded-xl">
          {status === "OK" && data.map((suggestion) => {
            const {
              place_id,
              structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
              <ComboboxOption 
                key={place_id} 
                value={main_text} 
                className="p-2 data-[focus]:bg-yellow-400 dark:data-[focus]:bg-yellow-700 cursor-pointer rounded-xl data-[focus]:font-bold"
              >
                {main_text} <span className="text-xs">{secondary_text}</span>
              </ComboboxOption>
            )
          })}
        </ComboboxOptions>
      </Combobox>

    </div>
    
  )

}