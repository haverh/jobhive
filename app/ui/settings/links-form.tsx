import { Button } from "../button"
import { updateLinks } from "@/app/lib/action";
import { useState, MouseEvent } from "react";
import { Links } from "@/app/lib/definitions";

export default function LinksForm({
  user,
}: {
  user: any;
}) {

  const [links, setLinks] = useState<Links>(user.user_metadata.links);

  const submitForm = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    updateLinks(links);
  }

  return (
      <div className="px-4 py-8 bg-white dark:bg-[#383838] h-full rounded-b-xl md:p-8">
      <div className="flex justify-center">
        <form className="settings-form w-full px-4 min-w-[250px] max-w-[450px] rounded-xl md: p-4">
          <div>
            <label htmlFor="linkedin-url"
              className="mb-1 mt-2 block text-md font-medium">LinkedIn URL</label>
            <div className="border border-solid border-gray-400 rounded-xl focus:outline-black flex">
              <input type="text" id="linkedin-url" name="linkedin-url" placeholder="Enter your LinkedIn profile link"
                className="w-full pl-3 py-1 rounded-xl border-0 focus:ring-0"
                defaultValue={user.user_metadata.links.linkedin}
                onChange={(e) => { setLinks({...links, linkedin: e.target.value})} }
                />
            </div>
          </div>

          <div>
            <label htmlFor="github-url"
              className="mb-1 mt-2 block text-md font-medium">GitHub URL</label>
            <div className="border border-solid border-gray-400 rounded-xl focus:outline-black flex">
              <input type="text" id="github-url" name="github-url" placeholder="Enter your GitHub profile link"
                className="w-full pl-3 py-1 rounded-xl border-0 focus:ring-0"
                defaultValue={user.user_metadata.links.github}
                onChange={(e) => { setLinks({...links, github: e.target.value})} }
                />
            </div>
          </div>

          <div>
            <label htmlFor="portfolio-url"
              className="mb-1 mt-2 block text-md font-medium">Portfolio URL</label>
            <div className="border border-solid border-gray-400 rounded-xl focus:outline-black flex">
              <input type="text" id="portfolio-url" name="portfolio-url" placeholder="Enter your Portfolio profile link"
                className="w-full pl-3 py-1 rounded-xl border-0 focus:ring-0"
                defaultValue={user.user_metadata.links.portfolio}
                onChange={(e) => { setLinks({...links, portfolio: e.target.value})} }
                />
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button className="px-3 py-2 mt-4 font-bold dark:text-[#333333] bg-yellow-400 dark:bg-[#FF8C42] rounded-xl hover:bg-yellow-300 dark:hover:bg-[#FF7A24] active:bg-yellow-500"
            onClick={(e) => {submitForm(e)}}>
              Update
            </Button>
          </div>
          
        </form>
      </div>
    </div>
  )
}