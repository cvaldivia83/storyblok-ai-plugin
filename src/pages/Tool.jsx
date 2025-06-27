import { Box, Typography, TextField } from "@mui/material"
import { StoryblokComponent, useStoryblok } from "@storyblok/react";

const Tool = () => {

 

  const start = useStoryblok("start", { version: "published" })

   console.log(start.content)

  if (!start || !start.content) {
    return (<div>Loading...</div>);
  }

  return (
    <Box padding={4} >
      {<StoryblokComponent blok={start.content} />}
    </Box>
  )
}

export default Tool;