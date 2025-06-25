import { StoryblokComponent } from "@storyblok/react";

const Page = ({ blok }) => {
  console.log(blok.body)
  return (
    <main>
    
      { blok.body.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))
      }
    </main>
  )
}



export default Page;