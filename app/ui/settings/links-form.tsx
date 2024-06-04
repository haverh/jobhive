import { Button } from "../button"
import { updateLinks } from "@/app/lib/action";
import { useState, MouseEvent } from "react";
import { Links } from "@/app/lib/definitions";

export default function LinksForm({
  user,
}: {
  user: any;
}) {
  console.log(user.user_metadata.links);

  const [links, setLinks] = useState<Links>(user.user_metadata.links);

  const submitForm = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // const linkedin = formData.get('linkedin-url') as string;
    // const github = formData.get('github-url') as string;
    // const portfolio = formData.get('portfolio') as string;
    // const links: any = {linkedin, github, portfolio};
    console.log("LINKS THING =>", links);

    updateLinks(links);
  }

  return (
    <div className="px-4 py-8 bg-white h-full rounded-b-xl md:p-8">
      <div className="flex justify-center">
        <form className="w-full px-4 min-w-[250px] max-w-[450px] rounded-xl bg-gray-100 md: p-4">
          <div>
            <label htmlFor="linkedin-url"
              className="mb-1 mt-2 block text-md font-medium text-gray-900">LinkedIn URL</label>
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
              className="mb-1 mt-2 block text-md font-medium text-gray-900">GitHub URL</label>
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
              className="mb-1 mt-2 block text-md font-medium text-gray-900">Portfolio URL</label>
            <div className="border border-solid border-gray-400 rounded-xl focus:outline-black flex">
              <input type="text" id="portfolio-url" name="portfolio-url" placeholder="Enter your Portfolio profile link"
                className="w-full pl-3 py-1 rounded-xl border-0 focus:ring-0"
                defaultValue={user.user_metadata.links.portfolio}
                onChange={(e) => { setLinks({...links, portfolio: e.target.value})} }
                />
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button className="px-3 py-2 mt-4 bg-yellow-400 rounded-xl hover:bg-yellow-300 active:bg-yellow-500"
            onClick={(e) => {submitForm(e)}}>
              Update
            </Button>
          </div>
          
        </form>
      </div>
    </div>
  )
}